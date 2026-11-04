"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function About() {
  const { t } = useLanguage();
  const { about } = t;
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="bg-surface">
      <div className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-8">
          <h2 id="sobre-titulo" className="text-[15px] font-semibold">
            {t.ui.aboutTitle}
          </h2>
          <p className="mt-6 text-[30px] font-medium leading-[1.15] tracking-[-0.03em] md:text-[50px] md:leading-[1.12]">
            {about.statement}
          </p>
          <div className="mt-10 max-w-2xl space-y-4 text-base leading-relaxed">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <dl className="space-y-6 lg:col-span-4 lg:self-center">
          {about.education.map((item) => (
            <div key={item.label}>
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="mt-1 text-base font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
