import Link from "next/link";
import { platforms, type Platform } from "@/data/platforms";
import { displaySpecs } from "@/lib/format";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ArrowRight } from "../Icons";
import { PlatformCard } from "../PlatformCard";

/** The other three platforms, in the homepage card style (swipe carousel on mobile). */
export function OtherPlatforms({ current, dict, locale }: { current: Platform; dict: Dictionary; locale: Locale }) {
  const p = dict.productPage;
  const others = platforms.filter((x) => x.slug !== current.slug);

  return (
    <section id="other-platforms" aria-labelledby="other-title" className="relative overflow-hidden border-t border-line pt-16 pb-14 md:pt-24 md:pb-20">
      <div
        className="tech-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        aria-hidden
      />
      <div className="container-x relative">
        <div className="flex items-end justify-between gap-6" data-reveal>
          <div>
            <p className="label flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
              {p.exploreLabel}
            </p>
            <h2 id="other-title" className="display mt-5 text-[2.25rem] md:text-[3rem]">
              {p.exploreTitle}
            </h2>
          </div>
          <Link
            href={`/${locale}#platforms`}
            className="arrow-link hidden items-center gap-5 border border-white/25 px-5 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-cyan hover:text-cyan md:inline-flex"
          >
            {p.back}
            <ArrowRight />
          </Link>
        </div>

        <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
          {others.map((platform, i) => {
            const item = dict.platforms.items[platform.key] as { category: string; imageAlt: string; note?: string };
            return (
              <li
                key={platform.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="w-[88%] shrink-0 snap-start sm:w-[60%] md:w-auto"
              >
                <PlatformCard
                  platform={platform}
                  index={platforms.indexOf(platform)}
                  locale={locale}
                  category={item.category}
                  imageAlt={item.imageAlt}
                  note={platform.hasNote ? item.note : undefined}
                  specs={displaySpecs(platform.cardSpecs, dict, locale)}
                  cta={dict.platforms.viewDetails}
                />
              </li>
            );
          })}
        </ul>

        <Link
          href={`/${locale}#platforms`}
          className="arrow-link mt-6 flex h-14 items-center justify-between border border-white/25 px-5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-cyan hover:text-cyan md:hidden"
        >
          {p.back}
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
