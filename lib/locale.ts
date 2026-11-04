import { locales, type Locale } from "@/data/content";

export const STORAGE_KEY = "locale";

export function detectLocale(saved: string | null, languages?: readonly string[], language?: string): Locale {
  const savedLocale = locales.find(({ code }) => code === saved)?.code;
  if (savedLocale) return savedLocale;
  const preferred = languages?.[0] ?? language;
  return preferred?.toLowerCase().startsWith("pt") ? "pt" : "en";
}
