import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { ScrollToHash } from "@/components/ScrollToHash";
import { OtherPlatforms } from "@/components/product/OtherPlatforms";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductOverview } from "@/components/product/ProductOverview";
import { getPlatform, isStandard, platforms } from "@/data/platforms";
import { MuninPage } from "@/components/munin/MuninPage";
import { fill } from "@/lib/format";
import { alternatesFor } from "@/lib/seo";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { productCopy } from "@/lib/product-copy";

export function generateStaticParams() {
  return locales.flatMap((locale) => platforms.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/platforms/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const platform = getPlatform(slug);
  if (!hasLocale(locale) || !platform) return {};
  const { dict } = getDictionary(locale);
  const category = (dict.platforms.items[platform.key] as { category: string }).category;
  return {
    title: fill(dict.productPage.metaTitle, { name: platform.name }),
    description: `${category.replace(/\.$/, "")}. ${productCopy(dict, platform.key).description}`,
    alternates: alternatesFor(locale, `/platforms/${slug}/`),
  };
}

export default function PlatformPage({ params }: PageProps<"/[locale]/platforms/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <PlatformContent params={params} />
    </Suspense>
  );
}

async function PlatformContent({ params }: { params: PageProps<"/[locale]/platforms/[slug]">["params"] }) {
  const { locale, slug } = await params;
  const platform = getPlatform(slug);
  if (!hasLocale(locale) || !platform) notFound();
  const { dict } = getDictionary(locale);
  const copy = productCopy(dict, platform.key);
  const index = platforms.indexOf(platform);

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
        {isStandard(platform) ? (
          <>
            <ProductHero
              platform={platform}
              copy={copy}
              dict={dict}
              locale={locale}
              index={index}
              total={platforms.length}
            />
            <ProductOverview platform={platform} copy={copy} dict={dict} locale={locale} />
            {platform.page.gallery && <ProductGallery rows={platform.page.gallery} copy={copy} dict={dict} />}
          </>
        ) : (
          <MuninPage platform={platform} dict={dict} locale={locale} />
        )}
        <OtherPlatforms current={platform} dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
      <RevealObserver />
      <ScrollToHash />
    </>
  );
}
