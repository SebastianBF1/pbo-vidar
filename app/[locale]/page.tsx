import { notFound } from "next/navigation";
import { AboutSection } from "@/components/AboutSection";
import { DevelopmentSection } from "@/components/DevelopmentSection";
import { FieldOperationsSection } from "@/components/FieldOperationsSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { I18nNotice } from "@/components/I18nNotice";
import { MissionSection } from "@/components/MissionSection";
import { PlatformsSection } from "@/components/PlatformsSection";
import { RevealObserver } from "@/components/RevealObserver";
import { ScrollToHash } from "@/components/ScrollToHash";
import { TechnologySection } from "@/components/TechnologySection";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const { dict, pendingKeys } = getDictionary(locale);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-signal focus:px-4 focus:py-2 focus:text-ink">
        {dict.nav.skip}
      </a>
      <Header locale={locale} nav={dict.nav} tagline={dict.footer.tagline} />
      <main id="main">
        <Hero dict={dict} locale={locale} />
        <PlatformsSection dict={dict} locale={locale} />
        <AboutSection dict={dict} locale={locale} />
        <TechnologySection dict={dict} />
        <FieldOperationsSection dict={dict} />
        <DevelopmentSection dict={dict} />
        <MissionSection dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
      {/* Review aid only: run `SHOW_I18N_BADGE=1 npm run dev` to see how many UA strings are still TODO_UA. */}
      {process.env.NODE_ENV === "development" && process.env.SHOW_I18N_BADGE === "1" && pendingKeys > 0 && (
        <I18nNotice text={dict.i18n.pending} count={pendingKeys} />
      )}
      <RevealObserver />
      <ScrollToHash />
    </>
  );
}
