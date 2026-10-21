import type { Dictionary, Locale } from "@/lib/i18n";
import { platforms } from "@/data/platforms";
import { displaySpecs } from "@/lib/format";
import { PlatformCard } from "./PlatformCard";

export function PlatformsSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.platforms;
  return (
    <section id="platforms" aria-labelledby="platforms-title" className="relative overflow-hidden border-t border-line pt-16 pb-20 md:pt-20 md:pb-28">
      <div
        className="tech-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        aria-hidden
      />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <p className="label flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
              {p.label}
            </p>
            <h2 id="platforms-title" className="display mt-5 text-[2.125rem] md:text-[2.75rem] xl:text-[3.25rem]">
              {p.title.split(/(?<=\.)\s+/).map((line, i) => (
                <span key={line} className={`block ${i === 2 ? "text-fg/45" : ""}`}>
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p data-reveal className="label border-l border-signal pl-4 leading-relaxed text-fg/80 md:mb-2 md:text-right md:border-l-0 md:border-r md:pl-0 md:pr-4">
            {p.statement[0]}
            <br />
            {p.statement[1]}
          </p>
        </div>

        <div data-line className="mt-8 h-px bg-line md:mt-10" aria-hidden />

        <ul className="carousel-x no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-px-5 px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 xl:grid-cols-4 xl:gap-5">
          {platforms.map((platform, i) => {
            const item = p.items[platform.key] as { category: string; imageAlt: string; note?: string };
            return (
              <li
                key={platform.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="w-[88%] shrink-0 snap-start sm:w-[60%] md:w-auto"
              >
                <PlatformCard
                  platform={platform}
                  index={i}
                  featured={i === 0}
                  locale={locale}
                  category={item.category}
                  imageAlt={item.imageAlt}
                  note={platform.hasNote ? item.note : undefined}
                  specs={displaySpecs(platform.cardSpecs, dict, locale)}
                  cta={p.viewDetails}
                />
              </li>
            );
          })}
        </ul>
        <p className="label mt-5 flex items-center gap-3 md:hidden" aria-hidden>
          <span className="h-px w-8 bg-white/30" />
          {p.swipe} →
        </p>
      </div>
    </section>
  );
}
