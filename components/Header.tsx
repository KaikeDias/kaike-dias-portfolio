"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export function Logo() {
  return (
    <span className="text-[22px] font-bold tracking-[-0.04em]">
      Kaike Dias<span className="text-olive">.</span>
    </span>
  );
}

export default function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-canvas"
      >
        {t.ui.skipToContent}
      </a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas">
        <div className="shell flex h-[72px] items-center justify-between">
          <a href="#inicio" aria-label={t.ui.backToTop} className="inline-flex min-h-11 items-center">
            <Logo />
          </a>

          <div className="flex items-center gap-6 md:gap-12">
            <nav aria-label={t.ui.mainNav} className="hidden items-center gap-12 md:flex">
              <ul className="flex items-center gap-9 text-[15px] font-medium">
                {t.navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-olive-strong">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={t.site.resumeUrl}
                download
                className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold transition-colors duration-200 hover:text-olive-strong"
              >
                <Download aria-hidden size={18} strokeWidth={1.75} />
                <span className="border-b border-current">{t.ui.downloadResume}</span>
              </a>
            </nav>

            <LanguageSwitcher />

            <button
              type="button"
              className="-mr-2.5 inline-flex size-11 items-center justify-center md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden size={24} strokeWidth={1.75} /> : <Menu aria-hidden size={24} strokeWidth={1.75} />}
            </button>
          </div>
        </div>

        <nav
          id="menu-mobile"
          aria-label={t.ui.mainNav}
          hidden={!open}
          className="border-t border-line bg-canvas md:hidden"
        >
          <ul className="shell py-3 text-lg font-medium">
            {t.navLinks.map((link) => (
              <li key={link.href} className="border-b border-line last:border-0">
                <a href={link.href} onClick={close} className="flex min-h-12 items-center">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={t.site.resumeUrl} download onClick={close} className="flex min-h-12 items-center gap-2 font-semibold">
                <Download aria-hidden size={18} strokeWidth={1.75} />
                {t.ui.downloadResume}
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
