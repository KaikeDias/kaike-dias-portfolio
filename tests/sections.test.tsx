import type { ReactElement } from "react";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import { LanguageProvider } from "@/components/LanguageProvider";
import { content, isPending, type Locale } from "@/data/content";
import { STORAGE_KEY } from "@/lib/locale";

const { pt, en } = content;

function renderIn(locale: Locale, ui: ReactElement) {
  localStorage.setItem(STORAGE_KEY, locale);
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("RN04: seções exibem o conteúdo do idioma ativo", () => {
  it("Hero mostra título, papel e link do currículo em nova aba com aviso acessível", () => {
    renderIn("en", <Hero />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(en.hero.headline);
    expect(screen.getByText(`${en.site.name}, ${en.site.role}`)).toBeTruthy();
    const resume = screen.getByRole("link", { name: `${en.ui.viewResume}${en.ui.opensNewTab}` });
    expect(resume.getAttribute("href")).toBe(en.site.resumeUrl);
    expect(resume.getAttribute("rel")).toBe("noopener noreferrer");
    for (const item of en.hero.specialties) expect(screen.getByText(item)).toBeTruthy();
  });

  it("Experience lista todas as experiências e marca a posição atual", () => {
    renderIn("en", <Experience />);
    for (const exp of en.experiences) {
      expect(screen.getByRole("heading", { level: 3, name: exp.role })).toBeTruthy();
    }
    const current = en.experiences.find((e) => e.current);
    expect(screen.getByText(en.ui.currentAt(current?.company ?? ""))).toBeTruthy();
  });

  it("Projects mostra cada projeto, screenshots reais e placeholders de imagem", () => {
    renderIn("en", <Projects />);
    for (const project of en.projects) {
      expect(screen.getByRole("heading", { level: 3, name: project.name })).toBeTruthy();
    }
    const [withShot] = en.projects.filter((p) => p.images[0].src);
    expect(screen.getByRole("img", { name: `${withShot.images[0].label}, ${withShot.name}` })).toBeTruthy();
    const [withoutShot] = en.projects.filter((p) => !p.images[0].src);
    expect(
      screen.getByRole("img", { name: `${en.ui.imagePlaceholder}: ${withoutShot.images[0].label}, ${withoutShot.name}` }),
    ).toBeTruthy();
    const realDemo = en.projects.find((p) => !isPending(p.demoUrl));
    expect(screen.getAllByRole("link", { name: `${en.ui.demo}${en.ui.opensNewTab}` })[0].getAttribute("href")).toBe(realDemo?.demoUrl);
  });

  it("Projects mostra a segunda imagem quando o projeto tem duas", () => {
    renderIn("en", <Projects />);
    const project = en.projects.find((p) => p.images[1]);
    const second = project?.images[1];
    expect(screen.getByRole("img", { name: `${en.ui.imagePlaceholder}: ${second?.label}, ${project?.name}` })).toBeTruthy();
  });

  it("About mostra a apresentação e a formação", () => {
    renderIn("en", <About />);
    expect(screen.getByText(en.about.statement)).toBeTruthy();
    for (const item of en.about.education) expect(screen.getByText(item.value)).toBeTruthy();
  });

  it("Technologies mostra cada grupo com seus itens", () => {
    renderIn("en", <Technologies />);
    expect(screen.getByRole("heading", { level: 2, name: en.ui.technologiesTitle })).toBeTruthy();
    for (const group of en.techGroups) {
      expect(screen.getByText(group.label)).toBeTruthy();
      expect(screen.getByText(group.items.join(", "))).toBeTruthy();
    }
  });

  it("Contact abre links externos em nova aba e mantém e-mail e currículo na mesma aba", () => {
    renderIn("en", <Contact />);
    for (const link of en.contact.links) {
      const anchor = screen.getByText(link.label).closest("a");
      expect(anchor?.getAttribute("href")).toBe(link.href);
      expect(anchor?.getAttribute("target")).toBe(link.href.startsWith("http") ? "_blank" : null);
    }
    expect(screen.getByRole("link", { name: en.ui.downloadResume }).hasAttribute("download")).toBe(true);
  });

  it("Footer mostra nome, ano e navegação", () => {
    renderIn("en", <Footer />);
    expect(screen.getByText(`${en.site.name}, ${en.site.year}`)).toBeTruthy();
    const nav = screen.getByRole("navigation", { name: en.ui.footerNav });
    for (const link of en.navLinks) expect(within(nav).getByRole("link", { name: link.label })).toBeTruthy();
  });

  it("Header mostra o logo, a navegação e o link para pular ao conteúdo", () => {
    renderIn("en", <Header />);
    expect(screen.getByRole("link", { name: en.ui.backToTop }).textContent).toBe(`${en.site.shortName}.`);
    expect(screen.getByRole("link", { name: en.ui.skipToContent })).toBeTruthy();
    const nav = screen.getAllByRole("navigation", { name: en.ui.mainNav })[0];
    for (const link of en.navLinks) expect(within(nav).getByRole("link", { name: link.label })).toBeTruthy();
  });

  it("Header: menu mobile abre, fecha com Escape e devolve o foco ao botão", () => {
    renderIn("en", <Header />);
    const menu = screen.getByRole("button", { name: en.ui.openMenu });
    fireEvent.click(menu);
    expect(menu.getAttribute("aria-label")).toBe(en.ui.closeMenu);
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });
    expect(menu.getAttribute("aria-label")).toBe(en.ui.closeMenu);
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(menu.getAttribute("aria-label")).toBe(en.ui.openMenu);
    expect(document.activeElement).toBe(menu);
  });

  it("RN06: dados pendentes aparecem entre colchetes e links pendentes não viram <a>", () => {
    const { container } = renderIn("pt", <Projects />);
    const project = pt.projects.find((p) => isPending(p.demoUrl));
    const demo = project?.demoUrl;
    if (!demo || !isPending(demo) || !isPending(project.role)) throw new Error("fixture: expected a pending project");
    expect(container.textContent).toContain(`[${demo.pending}]`);
    expect(container.textContent).toContain(`[${project.role.pending}]`);
    const realDemos = pt.projects.filter((p) => !isPending(p.demoUrl)).length;
    expect(screen.getAllByRole("link", { name: `${pt.ui.demo}${pt.ui.opensNewTab}` })).toHaveLength(realDemos);
    expect(container.querySelector('a[href*="["], a[href*="object"]')).toBeNull();
  });

  it("useLanguage fora do LanguageProvider falha com mensagem clara", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Footer />)).toThrow("useLanguage must be used inside <LanguageProvider>");
  });
});
