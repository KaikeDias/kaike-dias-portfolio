"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { content, type Content, type Locale } from "@/data/content";
import { detectLocale, STORAGE_KEY } from "@/lib/locale";

function readSaved() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked (private mode, policy): fall back to browser detection (spec CE01).
    return null;
  }
}

const detectionEvents = ["languagechange", "storage"] as const;
// Re-detect when the browser language changes or another tab saves a choice.
const subscribeToDetection = (onChange: () => void) => {
  detectionEvents.forEach((event) => window.addEventListener(event, onChange));
  return () => detectionEvents.forEach((event) => window.removeEventListener(event, onChange));
};

type LanguageContextValue = { locale: Locale; t: Content; setLocale: (locale: Locale) => void };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<{ locale: Locale; saved: boolean } | null>(null);
  // A choice storage could not keep wins for this session (spec CE01); otherwise storage is the source of
  // truth, so a choice saved in another tab shows up here too.
  const preferred = () => (choice && !choice.saved ? choice.locale : (readSaved() ?? choice?.locale ?? null));
  // Static HTML is rendered in pt; the client snapshot applies the saved/browser locale after hydration (spec RNF05).
  const locale = useSyncExternalStore(
    subscribeToDetection,
    () => detectLocale(preferred(), navigator.languages, navigator.language),
    () => "pt" as const,
  );

  useEffect(() => {
    document.documentElement.lang = content[locale].htmlLang;
  }, [locale]);

  const setLocale = (next: Locale) => {
    let saved = true;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      saved = false;
    }
    setChoice({ locale: next, saved });
  };

  return <LanguageContext value={{ locale, t: content[locale], setLocale }}>{children}</LanguageContext>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return value;
}
