import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { displaySpecs } from "@/lib/format";
import { IMAGES } from "@/data/images";
import { piranhaHeroSpecs } from "@/data/platforms";
import { ArrowRight } from "./Icons";
import { SpecificationStrip } from "./SpecificationStrip";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col overflow-hidden lg:min-h-[max(100svh,47.5rem)]"
    >
      {/* Area above the spec strip: the illustration never sits under the strip, so the jet unit stays visible. */}
      <div className="relative flex flex-1 flex-col">
        {/* Supplied illustration (pre-graded). Mobile: in flow at the top, cropped to both boards.
            Desktop: right 72% of the hero, full height, boards right of the text column. */}
        <div className="relative mt-14 h-[46svh] min-h-[20rem] max-h-[31.25rem] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:max-h-none lg:w-[72%]">
          <Image
            src={IMAGES.homeHeroPiranha.src}
            alt={h.imageAlt}
            fill
            preload
            quality={90}
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="hero-image object-cover object-[90%_50%] lg:object-[85%_45%]"
          />
          {/* edge fades only — no colour grade on top of the supplied image */}
          <div
            className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink to-transparent lg:h-28 lg:from-ink/70"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink via-ink/60 to-transparent lg:h-1/5 lg:via-ink/30"
            aria-hidden
          />
          <div
            className="absolute inset-y-0 left-0 hidden w-[40%] bg-gradient-to-r from-ink via-ink/60 to-transparent lg:block"
            aria-hidden
          />
        </div>

        {/* Copy */}
        <div className="container-x relative z-10 -mt-2 flex flex-1 flex-col pb-10 lg:mt-0 lg:justify-center lg:pt-[7rem] lg:pb-12">
          <div className="max-w-[40rem]">
            <p className="rise label flex items-start gap-3 text-fg/75" style={{ ["--d" as string]: "150ms" }}>
              <span className="mt-[0.3125rem] h-px w-8 bg-signal" aria-hidden />
              <span>
                {h.eyebrow[0]}
                <br />
                {h.eyebrow[1]}
              </span>
            </p>

            <h1
              id="hero-title"
              className="rise display mt-5 text-[clamp(4.75rem,22vw,6.5rem)] leading-[0.86] lg:mt-7 lg:text-[clamp(7.5rem,11.5vw,11.5rem)]"
              style={{ ["--d" as string]: "250ms" }}
            >
              {h.title}
            </h1>

            <p
              className="rise mt-4 max-w-[30ch] font-display text-[1.1875rem] font-semibold uppercase leading-[1.15] tracking-[0.04em] text-fg md:text-[1.5rem] lg:mt-6"
              style={{ ["--d" as string]: "380ms" }}
            >
              {h.subtitle}
            </p>

            <ul
              className="rise mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 font-mono text-[0.6563rem] uppercase tracking-[0.2em] text-muted sm:flex sm:flex-wrap sm:items-center sm:gap-x-0 md:text-[0.6875rem]"
              style={{ ["--d" as string]: "480ms" }}
            >
              {h.roles.map((r, i) => (
                <li key={r} className="flex items-center">
                  {i > 0 && <span className="mx-3 hidden h-3 w-px bg-white/25 sm:block" aria-hidden />}
                  <span className="mr-2.5 h-1 w-1 shrink-0 bg-cyan sm:hidden" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>

            <div className="rise mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10" style={{ ["--d" as string]: "600ms" }}>
              <Link
                href={`/${locale}/platforms/piranha`}
                className="arrow-link inline-flex h-14 items-center justify-between gap-6 bg-signal px-6 font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-[#ffe03a] sm:h-[3.25rem] sm:justify-start"
              >
                {h.ctaPrimary}
                <ArrowRight />
              </Link>
              <Link
                href={`/${locale}#platforms`}
                className="arrow-link inline-flex h-14 items-center justify-between gap-6 border border-white/25 px-6 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-cyan hover:text-cyan sm:h-[3.25rem] sm:justify-start"
              >
                {h.ctaSecondary}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <SpecificationStrip
          specs={displaySpecs(piranhaHeroSpecs, dict, locale)}
          caption={h.specsLabel}
          figure={h.figure}
        />
      </div>
    </section>
  );
}
