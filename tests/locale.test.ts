import { describe, expect, it } from "vitest";
import { detectLocale } from "@/lib/locale";

describe("detectLocale", () => {
  it.each([
    [["pt-BR", "en"], "pt"],
    [["pt-PT"], "pt"],
    [["PT"], "pt"],
    [["en-US", "pt-BR"], "en"],
    [["es-ES"], "en"],
  ] as const)("CA01/CA02: idioma do navegador %j abre em %s", (languages, expected) => {
    expect(detectLocale(null, languages)).toBe(expected);
  });

  it("RN03: escolha salva válida vence o idioma do navegador", () => {
    expect(detectLocale("en", ["pt-BR"])).toBe("en");
    expect(detectLocale("pt", ["en-US"])).toBe("pt");
  });

  it("CE02: escolha salva inválida é ignorada", () => {
    expect(detectLocale("fr", ["pt-BR"])).toBe("pt");
    expect(detectLocale("", ["en-US"])).toBe("en");
  });

  it("CE03: sem navigator.languages usa navigator.language", () => {
    expect(detectLocale(null, [], "pt-BR")).toBe("pt");
    expect(detectLocale(null, undefined, "en-GB")).toBe("en");
  });

  it("CE03: sem nenhum idioma disponível usa inglês", () => {
    expect(detectLocale(null)).toBe("en");
  });
});
