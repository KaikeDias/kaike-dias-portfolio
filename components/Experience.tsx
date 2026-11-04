import { experiences } from "@/data/content";

export default function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-titulo" className="border-t border-line">
      <div className="shell py-20 md:py-28">
        <h2 id="experiencia-titulo" className="text-[40px] font-medium leading-none tracking-[-0.04em] md:text-[72px]">
          Experiência
        </h2>

        <ol className="mt-12 md:mt-20">
          {experiences.map((exp, i) => (
            <li key={`${exp.company}-${exp.period}`} className="grid md:grid-cols-12 md:gap-6">
              <p className="hidden pt-2 text-[15px] md:col-span-3 md:block">{exp.period}</p>

              {/* Linha do tempo: o traço segue até o próximo item, exceto no último. */}
              <div
                className={`relative border-l border-line pl-7 md:col-span-9 md:pl-8 ${
                  i === experiences.length - 1 ? "pb-0" : "pb-14 md:pb-20"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute -left-[6.5px] top-3 size-3 rounded-full border-2 border-olive ${
                    exp.current ? "bg-olive" : "bg-canvas"
                  }`}
                />
                <p className="text-sm md:hidden">{exp.period}</p>
                <h3 className="mt-1 text-[28px] font-medium leading-tight tracking-[-0.03em] md:mt-0 md:text-[44px]">
                  {exp.role}
                </h3>
                <p className="mt-1 text-lg text-olive-strong md:text-xl">
                  {exp.company}
                  {exp.current && ", posição atual"}
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-9 lg:gap-6">
                  <div className="lg:col-span-5">
                    <h4 className="text-sm text-muted">Responsabilidades</h4>
                    <ul className="mt-3 list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed marker:text-ink">
                      {exp.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-3 lg:col-start-7">
                    <h4 className="text-sm text-muted">Tecnologias</h4>
                    <p className="mt-3 text-[15px] leading-relaxed">{exp.technologies.join(", ")}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
