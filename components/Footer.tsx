import { navLinks, site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="on-dark bg-ink text-canvas">
      <div className="shell flex flex-col gap-4 pb-10 pt-6 text-sm md:flex-row md:items-center md:justify-between">
        <p>
          {site.name}, {site.year}
        </p>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-surface">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
