import { describe, expect, it } from "vitest";
import { content, isPending, locales, type MaybePending } from "@/data/content";

const { pt, en } = content;

describe("conteúdo por idioma", () => {
  it("CA09: nomes, empresas, tecnologias de projetos e URLs são iguais nos dois idiomas", () => {
    expect(en.site.name).toBe(pt.site.name);
    expect(en.site.resumeUrl).toBe(pt.site.resumeUrl);
    expect(en.experiences.map((e) => e.company)).toEqual(pt.experiences.map((e) => e.company));
    expect(en.projects.map((p) => [p.name, p.technologies, p.images.map((i) => i?.src)])).toEqual(
      pt.projects.map((p) => [p.name, p.technologies, p.images.map((i) => i?.src)]),
    );
    const realUrl = (u?: MaybePending) => (u && isPending(u) ? "pending" : u);
    expect(en.projects.map((p) => [realUrl(p.demoUrl), realUrl(p.sourceUrl)])).toEqual(
      pt.projects.map((p) => [realUrl(p.demoUrl), realUrl(p.sourceUrl)]),
    );
    expect(en.contact.links.map((l) => [l.value, l.href])).toEqual(pt.contact.links.map((l) => [l.value, l.href]));
    expect(en.navLinks.map((l) => l.href)).toEqual(pt.navLinks.map((l) => l.href));
  });

  it("RN06: placeholders continuam placeholders em inglês", () => {
    pt.projects.forEach((p, i) => {
      expect(isPending(en.projects[i].role)).toBe(isPending(p.role));
      expect(isPending(en.projects[i].status)).toBe(isPending(p.status));
    });
  });

  it("RN01/RN07: idiomas suportados e atributo lang", () => {
    expect(locales.map((l) => l.code)).toEqual(["pt", "en"]);
    expect(pt.htmlLang).toBe("pt-BR");
    expect(en.htmlLang).toBe("en");
  });
});
