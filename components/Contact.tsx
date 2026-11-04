import { ArrowUpRight, Download } from "lucide-react";
import { contact, site } from "@/data/content";

const rowClass =
  "group flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-night-line py-4 transition-colors duration-200 hover:text-surface";

export default function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="on-dark bg-ink text-canvas">
      <div className="shell pb-16 pt-20 md:pb-20 md:pt-32">
        <h2
          id="contato-titulo"
          className="max-w-5xl text-[44px] font-medium leading-[1.02] tracking-[-0.045em] md:text-[80px] lg:text-[112px]"
        >
          {contact.heading}
        </h2>

        <ul className="mt-14 border-t border-night-line md:mt-24 lg:ml-[calc(100%*4/12)]">
          {contact.links.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className={rowClass}
                >
                  <span className="text-xl font-medium md:text-2xl">{link.label}</span>
                  <span className="inline-flex items-center gap-1.5 text-[15px] text-night-muted transition-colors duration-200 group-hover:text-canvas">
                    {link.value}
                    {external && <ArrowUpRight aria-hidden size={16} strokeWidth={1.75} />}
                    {external && <span className="sr-only">, abre em nova aba</span>}
                  </span>
                </a>
              </li>
            );
          })}
          <li>
            <a href={site.resumeUrl} download className={rowClass}>
              <span className="text-xl font-medium md:text-2xl">Baixar currículo</span>
              <Download aria-hidden size={18} strokeWidth={1.75} />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
