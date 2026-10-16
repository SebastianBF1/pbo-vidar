import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Fira_Sans_Condensed, IBM_Plex_Mono, Inter } from "next/font/google";
import { asset } from "@/lib/asset";
import { getDictionary, hasLocale, htmlLang, locales } from "@/lib/i18n";
import "../globals.css";

const display = Fira_Sans_Condensed({
  variable: "--font-fira-condensed",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#051019",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const { dict } = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: asset("/icon.png") },
    alternates: { languages: { en: asset("/en/"), uk: asset("/ua/") } },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <html
      lang={htmlLang[locale]}
      // Next 16: instant scroll-to-top on route changes while keeping smooth in-page anchor scrolling.
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ink text-fg antialiased">
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        {children}
      </body>
    </html>
  );
}
