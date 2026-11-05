"use client";

import { MapPin } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import ExternalLink from "@/components/ExternalLink";

export default function Hero() {
  const { t } = useLanguage();
  const { hero, site } = t;
  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="shell pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="motion-safe:animate-rise">
        <p className="flex flex-wrap items-center gap-x-7 gap-y-1 text-[15px] md:text-base">
          <span>
            {site.name}, {site.role}
          </span>
          <span className="inline-flex items-center gap-1.5 text-olive-strong">
            <MapPin aria-hidden size={16} strokeWidth={1.75} />
            {site.location}
          </span>
        </p>

        <h1
          id="inicio-titulo"
          className="mt-8 text-[44px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[64px] md:mt-14 md:text-[88px] lg:text-[116px] lg:leading-[0.98]"
        >
          {hero.headline}
          <span className="text-olive">.</span>
        </h1>
      </div>

      <div className="mt-10 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6 md:col-start-7 md:row-start-1">
          <p className="text-lg leading-relaxed md:text-[22px] md:leading-[1.55] md:tracking-[-0.01em]">{hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="#projetos"
              className="group inline-flex min-h-12 items-center justify-center rounded-[3px] bg-ink px-5 text-[15px] font-semibold text-canvas transition-colors duration-200 hover:bg-olive-strong"
            >
              <span className="link-underline">{t.ui.exploreProjects}</span>
            </a>
            <ExternalLink
              href={site.resumeUrl}
              className="group inline-flex min-h-11 items-center justify-center text-[15px] font-semibold transition-colors duration-200 hover:text-olive-strong"
            >
              <span className="link-underline">{t.ui.viewResume}</span>
            </ExternalLink>
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-5 md:row-start-1">
          <h2 className="sr-only text-sm text-muted md:not-sr-only">{t.ui.specialties}</h2>
          <ul className="border-t border-line md:mt-3">
            {hero.specialties.map((item) => (
              <li key={item} className="border-b border-line py-3 text-base md:text-lg">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
