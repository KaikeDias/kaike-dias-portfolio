import { describe, expect, it, vi } from "vitest";
import RootLayout, { metadata } from "@/app/layout";
import { content } from "@/data/content";

vi.mock("next/font/google", () => ({ Manrope: () => ({ variable: "font-manrope" }) }));

const { site, htmlLang } = content.pt;

describe("layout", () => {
  it("RNF05: HTML estático e metadados saem em português", () => {
    const html = RootLayout({ children: null } as LayoutProps<"/">);
    expect(html.props.lang).toBe(htmlLang);
    expect(metadata.title).toBe(`${site.name} | ${site.role}`);
    expect(metadata.description).toBe(site.description);
    expect(metadata.openGraph).toMatchObject({ locale: "pt_BR", siteName: site.name });
  });
});
