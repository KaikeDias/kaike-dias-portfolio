import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { content } from "@/data/content";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Static HTML and SEO metadata stay in Portuguese (spec: selecao-idioma, RNF05); LanguageProvider switches lang on the client.
const { site, htmlLang } = content.pt;
const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  title,
  description: site.description,
  openGraph: {
    title,
    description: site.description,
    locale: htmlLang.replace("-", "_"),
    type: "website",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={htmlLang} className={`${manrope.variable} antialiased`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
