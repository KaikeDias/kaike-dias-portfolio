"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function ExternalLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const { t } = useLanguage();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only">{t.ui.opensNewTab}</span>
    </a>
  );
}
