import { techGroups } from "@/data/content";

export default function Technologies() {
  return (
    <section id="tecnologias" aria-labelledby="tecnologias-titulo">
      <div className="shell py-20 md:py-28">
        <h2 id="tecnologias-titulo" className="text-[40px] font-medium leading-none tracking-[-0.04em] md:text-[72px]">
          Tecnologias
        </h2>
        <dl className="mt-12 border-t border-line md:mt-14">
          {techGroups.map((group) => (
            <div key={group.label} className="grid gap-1 border-b border-line py-5 md:grid-cols-12 md:gap-6 md:py-7">
              <dt className="text-sm text-muted md:col-span-3 md:pt-2">{group.label}</dt>
              <dd className="text-xl font-medium leading-snug tracking-[-0.02em] md:col-span-9 md:text-[30px]">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
