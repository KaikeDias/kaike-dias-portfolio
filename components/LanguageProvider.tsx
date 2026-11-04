"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { content, type Content, type Locale } from "@/data/content";

export const STORAGE_KEY = "locale";

/** Escolha salva válida vence; senão, `pt*` no idioma preferido do navegador abre em português; resto em inglês. */
export function detectLocale(saved: string | null, languages?: readonly string[], language?: string): Locale {
  if (saved === "pt" || saved === "en") return saved;
  const preferred = languages?.[0] ?? language;
  return preferred?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

function readSaved() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

type LanguageContextValue = { locale: Locale; t: Content; setLocale: (locale: Locale) => void };

const LanguageContext = createContext<LanguageContextValue>({ locale: "pt", t: content.pt, setLocale: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Começa em "pt" para casar com o HTML estático; o idioma real é aplicado após a hidratação.
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- navigator/localStorage só existem no cliente
    setLocaleState(detectLocale(readSaved(), navigator.languages, navigator.language));
  }, []);

  useEffect(() => {
    document.documentElement.lang = content[locale].htmlLang;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sem armazenamento: a escolha vale só nesta sessão.
    }
  };

  return <LanguageContext value={{ locale, t: content[locale], setLocale }}>{children}</LanguageContext>;
}

export const useLanguage = () => useContext(LanguageContext);
