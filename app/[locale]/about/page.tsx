import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MissionSection } from "@/components/MissionSection";
import { PageLinks } from "@/components/PageLinks";
import { RevealObserver } from "@/components/RevealObserver";
import { ScrollToHash } from "@/components/ScrollToHash";
import { asset } from "@/lib/asset";
import { fill } from "@/lib/format";
import { getDictionary, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const { dict } = getDictionary(locale);
  return {
    title: fill(dict.productPage.metaTitle, { name: dict.about.title }),
    description: dict.meta.description,
    alternates: { languages: { en: asset("/en/about/"), uk: asset("/ua/about/") } },
  };
}

/** About PBO VIDAR: the company introduction with its three pillars, then mission and vision (all moved from the homepage). */
export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const { dict } = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
      >
        {dict.nav.skip}
      </a>
      <Header locale={locale} nav={dict.nav} tagline={dict.footer.tagline} />
      <main id="main">
        <AboutSection dict={dict} locale={locale} variant="full" />
        <MissionSection dict={dict} variant="full" />
        <PageLinks
          locale={locale}
          cta={{ href: `/${locale}#opportunities`, label: dict.opportunities.productLink, arrow: "up-right" }}
        />
      </main>
      <Footer dict={dict} locale={locale} />
      <RevealObserver />
      <ScrollToHash />
    </>
  );
}
