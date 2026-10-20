import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/images";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

/**
 * Homepage hero introducing the company (replaces the PIRANHA hero, which stays in components/Hero.tsx).
 * Same structure as the product heroes: text left over the navy page, the river image on the right with a
 * soft fade toward the text; on phones the image comes first, below the header.
 */
export function CompanyHero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.companyHero;
  // UA lines are longer (“для безпечнішого”): a smaller size keeps the headline on three lines
  const long = Math.max(...h.title.map((l) => l.length)) > 12;
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex flex-col overflow-hidden lg:min-h-[max(100svh,47.5rem)]">
      <div className="relative mt-16 aspect-[4/3] overflow-hidden md:mt-[4.75rem] md:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[66%]">
        <Image
          src={IMAGES.heroCompany.src}
          alt={h.imageAlt}
          fill
          preload
          quality={85}
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="hero-image object-cover object-[50%_76%] md:object-[50%_70%] lg:object-[60%_50%]"
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink to-transparent lg:h-32 lg:from-ink/80" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink to-transparent lg:h-1/5 lg:from-ink/70" aria-hidden />
        {/* dark navy fade toward the text column */}
        <div
          className="absolute inset-y-0 left-0 hidden w-[42%] lg:block"
          style={{
            background:
              "linear-gradient(to right, var(--color-ink) 0%, rgb(5 16 25 / 0.85) 25%, rgb(5 16 25 / 0.5) 55%, rgb(5 16 25 / 0.15) 82%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col pt-0 pb-10 md:pt-2 md:pb-14 lg:justify-center lg:pt-[7rem] lg:pb-16">
        <div className="max-w-[40rem]">
          <p className="rise label flex items-start gap-3 text-fg/75" style={{ ["--d" as string]: "150ms" }}>
            <span className="mt-[0.3125rem] h-px w-8 bg-signal" aria-hidden />
            <span>
              {dict.hero.eyebrow[0]}
              <br />
              {dict.hero.eyebrow[1]}
            </span>
          </p>

          <h1
            id="hero-title"
            className={`rise display mt-4 leading-[0.9] md:mt-5 lg:mt-7 ${
              long
                ? "text-[clamp(2.125rem,9.2vw,3rem)] lg:text-[clamp(3.5rem,5.1vw,4.6rem)]"
                : "text-[clamp(2.875rem,12.5vw,4.5rem)] lg:text-[clamp(4.75rem,6.6vw,7.25rem)]"
            }`}
            style={{ ["--d" as string]: "250ms" }}
          >
            {h.title.map((line, i) => (
              <span key={line} className="block">
                {line}
                {i < h.title.length - 1 && " "}
              </span>
            ))}
          </h1>

          <p
            className="rise mt-4 max-w-[38ch] text-[1.0625rem] leading-relaxed text-fg/85 md:mt-6 md:text-[1.1875rem] lg:mt-8"
            style={{ ["--d" as string]: "380ms" }}
          >
            {h.body}
          </p>

          <div className="rise mt-6 flex flex-col gap-3 sm:flex-row md:mt-8 lg:mt-10" style={{ ["--d" as string]: "500ms" }}>
            <Link
              href={`/${locale}#platforms`}
              className="arrow-link inline-flex h-[3.25rem] items-center justify-between gap-6 bg-signal px-6 font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-[#ffe03a] sm:justify-start"
            >
              {dict.hero.ctaSecondary}
              <ArrowRight />
            </Link>
            <Link
              href={`/${locale}/about`}
              className="arrow-link inline-flex h-[3.25rem] items-center justify-between gap-6 border border-white/25 px-6 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-cyan hover:text-cyan sm:justify-start"
            >
              {dict.about.title}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
