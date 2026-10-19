import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevelopmentSection } from "@/components/DevelopmentSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageLinks } from "@/components/PageLinks";
import { RevealObserver } from "@/components/RevealObserver";
import { ScrollToHash } from "@/components/ScrollToHash";
import { TechnologySection } from "@/components/TechnologySection";
import { asset } from "@/lib/asset";
import { fill } from "@/lib/format";
import { getDictionary, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]/technology">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const { dict } = getDictionary(locale);
  return {
    title: fill(dict.productPage.metaTitle, { name: dict.technologyPage.title }),
    description: dict.meta.description,
    alternates: { languages: { en: asset("/en/technology/"), uk: asset("/ua/technology/") } },
  };
}

/** Technology & capabilities: What we do / Why PBO VIDAR and the development approach (moved from the homepage). */
export default async function TechnologyPage({ params }: PageProps<"/[locale]/technology">) {
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
        <TechnologySection dict={dict} title={dict.technologyPage.title} />
        <DevelopmentSection dict={dict} />
        <PageLinks
          locale={locale}
          cta={{ href: `/${locale}#platforms`, label: dict.hero.ctaSecondary, arrow: "right" }}
          collaboration={dict.opportunities.productLink}
        />
      </main>
      <Footer dict={dict} locale={locale} />
      <RevealObserver />
      <ScrollToHash />
    </>
  );
}
