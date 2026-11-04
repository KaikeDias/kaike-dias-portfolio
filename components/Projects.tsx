"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { isPending, type MaybePending, type Project, type Screenshot } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";
import ExternalLink from "@/components/ExternalLink";

function ProjectImage({ image, projectName, secondary, className }: {
  image: Screenshot;
  projectName: string;
  secondary?: boolean;
  className: string;
}) {
  const { t } = useLanguage();
  if (image.src) {
    return (
      <div className={`relative overflow-hidden rounded-[3px] border border-line ${className}`}>
        <Image src={image.src} alt={`${image.label}, ${projectName}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-top-left" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${t.ui.imagePlaceholder}: ${image.label}, ${projectName}`}
      className={`flex flex-col justify-end rounded-[3px] border border-line p-5 md:p-6 ${secondary ? "bg-surface-soft" : "bg-surface"} ${className}`}
    >
      {!secondary && <ImageIcon aria-hidden size={18} strokeWidth={1.5} className="mb-3" />}
      <p className="text-sm font-semibold md:text-base">{image.label}</p>
      <p className="mt-1 text-[13px] text-muted md:text-sm">{secondary ? t.ui.replaceImage : t.ui.replaceImageOf(projectName)}</p>
    </div>
  );
}

function PendingMarker({ value, className }: { value: MaybePending; className?: string }) {
  if (!isPending(value)) return value;
  return <span className={className ? `placeholder ${className}` : "placeholder"}>[{value.pending}]</span>;
}

function ProjectLink({ href, label }: { href?: MaybePending; label: string }) {
  if (!href) return null;
  if (isPending(href)) {
    return (
      <span className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold">
        {label} <PendingMarker value={href} className="text-sm font-normal" />
      </span>
    );
  }
  return (
    <ExternalLink
      href={href}
      className="inline-flex min-h-11 items-center text-[15px] font-semibold transition-colors duration-200 hover:text-olive-strong"
    >
      <span className="border-b border-current">{label}</span>
    </ExternalLink>
  );
}

function ProjectInfo({ project }: { project: Project }) {
  const { t } = useLanguage();
  return (
    <div>
      <p className="text-sm text-olive-strong">{project.category}</p>
      <h3 className="mt-2 text-[32px] font-medium leading-tight tracking-[-0.03em] md:text-[40px]">{project.name}</h3>
      <p className="mt-3 text-base leading-relaxed">{project.description}</p>
      <dl className="mt-6 grid grid-cols-[4.5rem_1fr] gap-y-2 text-[15px]">
        <dt className="text-muted">{t.ui.projectRole}</dt>
        <dd><PendingMarker value={project.role} /></dd>
        <dt className="text-muted">{t.ui.projectStatus}</dt>
        <dd><PendingMarker value={project.status} /></dd>
        <dt className="text-muted">{t.ui.projectStack}</dt>
        <dd>{project.technologies.join(", ")}</dd>
      </dl>
      <div className="mt-6 flex flex-wrap gap-x-6">
        <ProjectLink href={project.demoUrl} label={t.ui.demo} />
        <ProjectLink href={project.sourceUrl} label={t.ui.source} />
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { projects, projectsIntro } = t;
  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="border-t border-line">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="projetos-titulo"
            className="text-[40px] font-medium leading-[1.02] tracking-[-0.04em] md:text-[72px] lg:col-span-6"
          >
            {t.ui.projectsTitle}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg lg:col-span-5 lg:col-start-8">
            {projectsIntro}
          </p>
        </div>

        <ul className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {projects.map((project, i) => {
            const [main, secondary] = project.images;
            const alternate = i % 2 === 1;
            return (
              <li key={project.name}>
                <article className="grid gap-6 lg:grid-cols-12">
                  <div className={`grid gap-4 lg:col-span-8 lg:gap-6 ${secondary ? "grid-cols-8" : ""}`}>
                    <ProjectImage
                      image={main}
                      projectName={project.name}
                      className={secondary ? "col-span-5 aspect-4/5" : "aspect-16/10"}
                    />
                    {secondary && (
                      <ProjectImage
                        image={secondary}
                        projectName={project.name}
                        secondary
                        className="col-span-3 aspect-3/4 self-end"
                      />
                    )}
                  </div>
                  <div className={alternate ? "lg:order-first lg:col-span-4 lg:pr-6" : "lg:col-span-4 lg:self-end"}>
                    <ProjectInfo project={project} />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
