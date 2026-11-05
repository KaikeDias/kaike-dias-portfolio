import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { content } from "@/data/content";
import { STORAGE_KEY } from "@/lib/locale";

const { pt, en } = content;

function setBrowserLanguage(lang: string) {
  vi.spyOn(navigator, "languages", "get").mockReturnValue([lang]);
}

const languageButton = () => screen.getByRole("button", { name: /Alterar idioma|Change language/ });
const option = (name: string) => screen.getByRole("button", { name, hidden: true });
const dropdown = (button: HTMLElement) => document.getElementById(button.getAttribute("aria-controls") ?? "");

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = "pt-BR";
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("seleção de idioma", () => {
  it("CA01: navegador pt-BR abre em português", () => {
    setBrowserLanguage("pt-BR");
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(pt.hero.headline);
    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("CA02: navegador en-US abre em inglês", () => {
    setBrowserLanguage("en-US");
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(en.hero.headline);
    expect(document.documentElement.lang).toBe("en");
  });

  it("CA03: botão abre dropdown com Português e English e indica o ativo", () => {
    setBrowserLanguage("pt-BR");
    render(<Home />);
    const button = languageButton();
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(dropdown(button)?.hidden).toBe(true);

    fireEvent.click(button);

    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(dropdown(button)?.hidden).toBe(false);
    expect(option("Português").getAttribute("aria-current")).toBe("true");
    expect(option("English").getAttribute("aria-current")).toBe("false");
  });

  it("CA04/CA05/CA07: selecionar idioma traduz o site, atualiza lang, salva e fecha o dropdown", () => {
    setBrowserLanguage("pt-BR");
    const { container } = render(<Home />);

    fireEvent.click(languageButton());
    fireEvent.click(option("English"));

    expect(languageButton().getAttribute("aria-expanded")).toBe("false");
    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("en");
    const text = container.textContent ?? "";
    const { ui } = pt;
    for (const ptText of [ui.experienceTitle, ui.projectsTitle, ui.downloadResume, ui.responsibilities, pt.contact.heading, ui.skipToContent, ui.opensNewTab]) {
      expect(text).not.toContain(ptText);
    }
    expect(text).toContain(en.ui.projectsTitle);
    expect(screen.getByRole("link", { name: en.ui.backToTop })).toBeTruthy();

    fireEvent.click(languageButton());
    fireEvent.click(option("Português"));

    expect(document.documentElement.lang).toBe("pt-BR");
    expect(container.textContent).toContain(pt.ui.projectsTitle);
    expect(localStorage.getItem(STORAGE_KEY)).toBe("pt");
  });

  it("CA06: escolha salva é mantida ao recarregar, mesmo com navegador em outro idioma", () => {
    setBrowserLanguage("pt-BR");
    const first = render(<Home />);
    fireEvent.click(languageButton());
    fireEvent.click(option("English"));
    first.unmount();

    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(en.hero.headline);
  });

  it("CA07: dropdown fecha com Escape e devolve o foco ao botão", () => {
    render(<Home />);
    const button = languageButton();
    fireEvent.click(button);
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });
    expect(button.getAttribute("aria-expanded")).toBe("true");

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(button);
  });

  it("CA07: dropdown fecha ao clicar fora e não fecha ao clicar dentro", () => {
    render(<Home />);
    const button = languageButton();
    fireEvent.click(button);

    fireEvent.pointerDown(option("English"));
    expect(button.getAttribute("aria-expanded")).toBe("true");

    fireEvent.pointerDown(document.body);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("CA10/CE01: com localStorage indisponível o site carrega e a troca funciona na sessão", () => {
    setBrowserLanguage("en-US");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<Home />);
    expect(document.documentElement.lang).toBe("en");

    fireEvent.click(languageButton());
    fireEvent.click(option("Português"));
    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("RN02: sem escolha salva, acompanha a troca de idioma do navegador", () => {
    setBrowserLanguage("pt-BR");
    render(<Home />);
    setBrowserLanguage("en-US");
    act(() => {
      window.dispatchEvent(new Event("languagechange"));
    });
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(en.hero.headline);
  });

  it("CA08: botão de idioma fica fora da navegação desktop e do menu mobile", () => {
    render(<Home />);
    // Both navs are hidden at one breakpoint each; outside them the button shows on mobile and desktop.
    expect(languageButton().closest("nav")).toBeNull();
    expect(languageButton().closest("header")).toBeTruthy();
  });

  it("RN03: escolha salva em outra aba é aplicada, mesmo depois de uma escolha nesta aba", () => {
    setBrowserLanguage("pt-BR");
    render(<Home />);
    fireEvent.click(languageButton());
    fireEvent.click(option("English"));

    localStorage.setItem(STORAGE_KEY, "pt");
    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
    });
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(pt.hero.headline);
  });

  it("CE01: se só a gravação falhar, a escolha vale na sessão mesmo com valor antigo salvo", () => {
    localStorage.setItem(STORAGE_KEY, "pt");
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    render(<Home />);
    fireEvent.click(languageButton());
    fireEvent.click(option("English"));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(en.hero.headline);
  });

  it("RNF05: HTML estático em português hidrata sem erro e troca para o idioma do navegador", async () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(<Home />);
    document.body.appendChild(container);
    expect(container.querySelector("h1")?.textContent).toContain(pt.hero.headline);

    setBrowserLanguage("en-US");
    const onRecoverableError = vi.fn();
    const root = await act(async () => hydrateRoot(container, <Home />, { onRecoverableError }));

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.querySelector("h1")?.textContent).toContain(en.hero.headline);
    act(() => root.unmount());
    container.remove();
  });
});
