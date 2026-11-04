"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { locales } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, t, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="idiomas"
        aria-label={t.ui.changeLanguage}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[15px] font-semibold uppercase transition-colors duration-200 hover:text-olive-strong"
      >
        <Languages aria-hidden size={18} strokeWidth={1.75} />
        {locale}
        <ChevronDown aria-hidden size={16} strokeWidth={1.75} />
      </button>

      <ul
        id="idiomas"
        hidden={!open}
        className="absolute right-0 top-full mt-2 min-w-40 rounded-[3px] border border-line bg-canvas py-1 text-[15px] font-medium shadow-sm"
      >
        {locales.map(({ code, label }) => (
          <li key={code}>
            <button
              type="button"
              lang={code}
              aria-current={code === locale}
              onClick={() => {
                setLocale(code);
                setOpen(false);
              }}
              className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 px-4 text-left transition-colors duration-200 hover:bg-surface-soft"
            >
              {label}
              {code === locale && <Check aria-hidden size={16} strokeWidth={1.75} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
