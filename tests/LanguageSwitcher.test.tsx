import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { STORAGE_KEY } from "@/components/LanguageProvider";

function setBrowserLanguage(lang: string) {
  vi.spyOn(navigator, "languages", "get").mockReturnValue([lang]);
}

const languageButton = () => screen.getByRole("button", { name: /Alterar idioma|Change language/ });
const option = (name: string) => screen.getByRole("button", { name, hidden: true });

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
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Transformando ideias");
    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("CA02: navegador en-US abre em inglês", () => {
    setBrowserLanguage("en-US");
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Turning ideas");
    expect(document.documentElement.lang).toBe("en");
  });

  it("CA03: botão abre dropdown com Português e English e indica o ativo", () => {
    setBrowserLanguage("pt-BR");
    render(<Home />);
    const button = languageButton();
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(document.getElementById("idiomas")?.hidden).toBe(true);

    fireEvent.click(button);

    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(document.getElementById("idiomas")?.hidden).toBe(false);
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
    for (const pt of ["Experiência", "Projetos em destaque", "Baixar currículo", "Responsabilidades", "Vamos construir", "Pular para o conteúdo", "abre em nova aba"]) {
      expect(text).not.toContain(pt);
    }
    expect(text).toContain("Featured projects");
    expect(screen.getByRole("link", { name: "Kaike Dias Miranda, back to top" })).toBeTruthy();

    fireEvent.click(languageButton());
    fireEvent.click(option("Português"));

    expect(document.documentElement.lang).toBe("pt-BR");
    expect(container.textContent).toContain("Projetos em destaque");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("pt");
  });

  it("CA06: escolha salva é mantida ao recarregar, mesmo com navegador em outro idioma", () => {
    setBrowserLanguage("pt-BR");
    const first = render(<Home />);
    fireEvent.click(languageButton());
    fireEvent.click(option("English"));
    first.unmount();

    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Turning ideas");
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

  it("menu mobile continua abrindo e fechando com Escape no idioma ativo", () => {
    setBrowserLanguage("en-US");
    render(<Home />);
    const menu = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(menu);
    expect(menu.getAttribute("aria-label")).toBe("Close menu");
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(menu.getAttribute("aria-label")).toBe("Open menu");
  });
});
