import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { IMAGES } from "@/data/images";
import { CapabilityPillar } from "./CapabilityPillar";
import { ArrowRight, IconCog, IconInsight, IconShield } from "./Icons";

const PILLAR_ICONS = [IconCog, IconInsight, IconShield];

/**
 * variant "intro" (homepage): heading, first paragraph and a link to the About page.
 * variant "full" (About page, top of the page): both paragraphs and the three pillars; the heading is the page's h1.
 */
export function AboutSection({
  dict,
  locale,
  variant = "intro",
}: {
  dict: Dictionary;
  locale: string;
  variant?: "intro" | "full";
}) {
  const a = dict.about;
  const full = variant === "full";
  const Heading = full ? "h1" : "h2";
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className={`relative isolate overflow-hidden bg-ink-2 ${full ? "" : "border-t border-line"}`}
    >
      {/* Side visual: supplied MUNIN image (already graded dark navy, so no extra filter or tint) */}
      <div className="absolute inset-0 -z-10 hidden lg:left-[32%] lg:block">
        <Image
          src={IMAGES.aboutMunin.src}
          alt={a.imageAlt}
          fill
          quality={85}
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[96%_50%]"
        />
        <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink-2 via-ink-2/70 to-transparent lg:block" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-ink-2 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-ink-2/70 to-transparent" aria-hidden />
      </div>

      <div
        className={`container-x grid gap-14 pb-20 max-md:gap-8 max-md:pb-14 md:pb-28 lg:min-h-[45rem] lg:grid-cols-12 lg:gap-10 ${
          full ? "pt-32 md:pt-40 lg:pt-44" : "pt-20 max-md:pt-14 md:pt-28"
        }`}
      >
        <div className="flex flex-col lg:col-span-5" data-reveal>
          <p className="label flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-signal" aria-hidden />
            {dict.nav.about}
          </p>
          <Heading
            id="about-title"
            className="display mt-5 text-[2.75rem] max-md:mt-3 max-md:text-[2.125rem] max-md:tracking-[-0.005em] md:text-[3.75rem] xl:text-[4rem]"
          >
            {a.title}
          </Heading>
          {/* phones: a short yellow rule replaces the long side border */}
          <div className="mt-8 space-y-5 border-l border-white/15 pl-6 max-md:mt-5 max-md:space-y-3 max-md:border-l-0 max-md:pl-0">
            <span className="block h-px w-10 bg-signal md:hidden" aria-hidden />
            <p className="text-[1.1875rem] leading-[1.55] text-fg max-md:text-[1rem] max-md:leading-[1.5] md:text-[1.3125rem]">{a.body[0]}</p>
            {full && <p className="text-[1rem] leading-[1.65] text-muted max-md:text-[0.9375rem] max-md:leading-[1.55] md:text-[1.0625rem]">{a.body[1]}</p>}
          </div>
          <Link
            // homepage → About page; About page → Technology page (the former #technology section)
            href={full ? `/${locale}/technology` : `/${locale}/about`}
            className="arrow-link mt-10 inline-flex h-[3.25rem] items-center gap-6 self-start border border-white/25 bg-ink-2/40 px-6 font-mono text-[0.75rem] uppercase tracking-[0.2em] backdrop-blur-sm transition-colors duration-300 hover:border-cyan hover:text-cyan max-md:mt-6 max-md:h-11 max-md:gap-4 max-md:border-white/20 max-md:px-5 max-md:text-[0.6875rem] max-md:tracking-[0.22em]"
          >
            {a.cta}
            <ArrowRight />
          </Link>
        </div>

        {/* Mobile/tablet: the same photograph as a framed visual */}
        <figure className="ticks relative -mt-2 overflow-hidden border border-line max-md:mt-0 max-md:border-0 lg:hidden" data-reveal>
          <span className="absolute top-0 left-0 z-10 h-[0.125rem] w-12 bg-signal md:hidden" aria-hidden />
          <div className="relative aspect-[4/3] max-md:aspect-[16/10]">
            <Image
              src={IMAGES.aboutMunin.src}
              alt=""
              fill
              quality={85}
              sizes="100vw"
              className="object-cover object-[92%_50%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-2/90 to-transparent max-md:h-1/2 max-md:via-ink-2/40" aria-hidden />
          </div>
          <figcaption className="label absolute bottom-0 left-0 px-4 py-3 text-fg/75 max-md:px-3 max-md:py-2 max-md:text-[0.625rem] max-md:tracking-[0.16em] max-md:whitespace-nowrap max-md:text-fg/85">{a.imageCaption}</figcaption>
        </figure>

        <div className="flex flex-col lg:col-span-6 lg:col-start-7">
          <p className="label hidden items-center justify-end gap-3 text-fg/60 lg:flex" data-reveal>
            {a.imageCaption}
            <span className="h-px w-8 bg-white/40" aria-hidden />
          </p>
          {full && (
            <div className="grid flex-1 md:grid-cols-3 lg:mt-auto lg:flex-none lg:pt-40">
              {a.pillars.map((pillar, i) => (
                <div key={pillar.title} data-reveal style={{ ["--reveal-delay" as string]: `${120 + i * 110}ms` }}>
                  <CapabilityPillar index={i} title={pillar.title} body={pillar.body} Icon={PILLAR_ICONS[i]} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
