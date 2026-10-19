import Image from "next/image";
import { COLLABORATION_MAILTO } from "@/data/company";
import { IMAGES } from "@/data/images";
import type { Dictionary } from "@/lib/i18n";
import { ArrowUpRight } from "./Icons";

/**
 * Collaboration invitation. One panel at container width: text + email CTA left, integration image right
 * (fading toward the text); image first on phones. The CTA is a plain mailto: link — it opens the visitor's
 * email app with a prepared draft, nothing is sent from the site.
 */
export function OpportunitiesSection({ dict }: { dict: Dictionary }) {
  const o = dict.opportunities;
  return (
    <section
      id="opportunities"
      aria-labelledby="opportunities-title"
      className="relative border-t border-line py-20 md:py-28 lg:py-32"
    >
      <div className="container-x">
        <div className="relative grid overflow-hidden border border-line bg-ink-2 lg:grid-cols-12" data-reveal>
          <span aria-hidden className="absolute -top-px left-0 z-10 h-[0.125rem] w-24 bg-signal lg:w-32" />

          <div className="relative aspect-[16/10] overflow-hidden lg:order-2 lg:col-span-5 lg:aspect-auto">
            <div data-zoom className="absolute inset-0">
              <Image
                src={IMAGES.piranhaUsv.src}
                alt={o.imageAlt}
                fill
                quality={85}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_30%] lg:object-[50%_42%]"
              />
            </div>
            <div className="absolute inset-0 bg-[#0b3a5a] opacity-15 mix-blend-color" aria-hidden />
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-2 via-ink-2/50 to-transparent lg:hidden"
              aria-hidden
            />
            <div
              className="absolute inset-y-0 left-0 hidden w-3/5 bg-gradient-to-r from-ink-2 via-ink-2/55 to-transparent lg:block"
              aria-hidden
            />
          </div>

          <div className="relative px-6 pt-1 pb-10 sm:px-10 sm:pb-12 lg:order-1 lg:col-span-7 lg:px-14 lg:py-16 xl:px-16 xl:py-20">
            <p className="label flex items-center gap-3 text-cyan">
              <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
              {o.label}
            </p>
            <h2
              id="opportunities-title"
              className="display mt-6 text-[clamp(2.375rem,11vw,3.25rem)] leading-[0.9] md:text-[4.25rem] lg:text-[clamp(3.5rem,5.6vw,5.25rem)]"
            >
              {o.title}
            </h2>
            <p className="mt-8 max-w-[34ch] text-[1.25rem] leading-snug text-fg md:text-[1.5rem]">{o.intro}</p>
            <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-fg/75 md:text-[1.125rem]">{o.body}</p>
            <a
              href={COLLABORATION_MAILTO}
              className="arrow-link mt-10 inline-flex h-14 w-full items-center justify-between gap-6 bg-signal px-6 font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-[#ffe03a] sm:h-[3.25rem] sm:w-auto sm:justify-start"
            >
              {o.cta}
              <ArrowUpRight />
              <span className="sr-only"> — {o.ctaHint}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
