import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/data/content";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  title,
  description: site.description,
  openGraph: {
    title,
    description: site.description,
    locale: "pt_BR",
    type: "website",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} antialiased`}>
      <body className="font-sans">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-canvas"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
