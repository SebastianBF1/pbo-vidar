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
          className="object-cover object-[78%_50%]"
        />
        <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink-2 via-ink-2/70 to-transparent lg:block" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-ink-2 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-ink-2/70 to-transparent" aria-hidden />
      </div>

      <div
        className={`container-x grid gap-14 pb-20 md:pb-28 lg:min-h-[45rem] lg:grid-cols-12 lg:gap-10 ${
          full ? "pt-32 md:pt-40 lg:pt-44" : "pt-20 md:pt-28"
        }`}
      >
        <div className="flex flex-col lg:col-span-5" data-reveal>
          <p className="label flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-signal" aria-hidden />
            {dict.nav.about}
          </p>
          <Heading id="about-title" className="display mt-5 text-[2.75rem] md:text-[3.75rem] xl:text-[4rem]">
            {a.title}
          </Heading>
          <div className="mt-8 space-y-5 border-l border-white/15 pl-6">
            <p className="text-[1.1875rem] leading-[1.55] text-fg md:text-[1.3125rem]">{a.body[0]}</p>
            {full && <p className="text-[1rem] leading-[1.65] text-muted md:text-[1.0625rem]">{a.body[1]}</p>}
          </div>
          <Link
            // homepage → About page; About page → Technology page (the former #technology section)
            href={full ? `/${locale}/technology` : `/${locale}/about`}
            className="arrow-link mt-10 inline-flex h-[3.25rem] items-center gap-6 self-start border border-white/25 bg-ink-2/40 px-6 font-mono text-[0.75rem] uppercase tracking-[0.2em] backdrop-blur-sm transition-colors duration-300 hover:border-cyan hover:text-cyan"
          >
            {a.cta}
            <ArrowRight />
          </Link>
        </div>

        {/* Mobile/tablet: the same photograph as a framed visual */}
        <figure className="ticks relative -mt-2 overflow-hidden border border-line lg:hidden" data-reveal>
          <div className="relative aspect-[4/3]">
            <Image
              src={IMAGES.aboutMunin.src}
              alt=""
              fill
              quality={85}
              sizes="100vw"
              className="object-cover object-[62%_60%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-2/90 to-transparent" aria-hidden />
          </div>
          <figcaption className="label absolute bottom-0 left-0 px-4 py-3 text-fg/75">{a.imageCaption}</figcaption>
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
