import Image from "next/image";
import Link from "next/link";
import { MUNIN_PAGE } from "@/data/munin";
import type { Platform } from "@/data/platforms";
import type { Dictionary } from "@/lib/i18n";
import type { MuninCopy } from "@/lib/product-copy";

/**
 * Cinematic hero: the supplied wide illustration full-bleed (desktop) with the copy in its dark left area;
 * on mobile the image comes first at an aspect that keeps the whole vessel in frame, copy below.
 */
export function MuninHero({ platform, copy, dict, locale }: { platform: Platform; copy: MuninCopy; dict: Dictionary; locale: string }) {
  const img = MUNIN_PAGE.hero;
  const category = (dict.platforms.items[platform.key] as { category: string }).category;
  const split = platform.name.lastIndexOf(" ");
  const [line1, line2] = [platform.name.slice(0, split), platform.name.slice(split + 1)];

  return (
    <section aria-labelledby="product-title" className="relative isolate overflow-hidden">
      <div className="relative aspect-[1.85] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src={img.src}
          alt={copy.heroAlt}
          fill
          preload
          quality={85}
          sizes="100vw"
          className="hero-image object-cover object-[88%_50%] lg:object-[100%_50%]"
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/80 to-transparent lg:h-32" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent lg:h-1/4" aria-hidden />
        <div
          className="absolute inset-y-0 left-0 hidden w-[46%] lg:block"
          style={{
            background:
              "linear-gradient(to right, var(--color-ink) 0%, rgb(5 16 25 / 0.85) 35%, rgb(5 16 25 / 0.4) 70%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="container-x relative z-10 -mt-6 pb-10 lg:mt-0 lg:flex lg:min-h-[clamp(32rem,37vw,40rem)] lg:flex-col lg:justify-center lg:pt-[6rem] lg:pb-12">
        <div className="lg:max-w-[42%]">
          <Link
            href={`/${locale}#platforms`}
            className="arrow-link rise inline-flex min-h-11 items-center gap-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-fg/70 transition-colors duration-300 hover:text-cyan lg:text-[0.75rem]"
            style={{ ["--d" as string]: "100ms" }}
          >
            <span aria-hidden className="arrow-back">
              ←
            </span>
            {dict.productPage.back}
          </Link>

          <p className="rise label mt-5 flex items-center gap-3 text-fg/75 lg:mt-6" style={{ ["--d" as string]: "180ms" }}>
            <span className="h-1.5 w-1.5 shrink-0 bg-cyan" aria-hidden />
            {category}
          </p>

          <h1
            id="product-title"
            className="rise display mt-4 text-[clamp(3.25rem,15vw,5rem)] leading-[0.88] lg:mt-5 lg:text-[clamp(4rem,5.6vw,6.25rem)]"
            style={{ ["--d" as string]: "260ms" }}
          >
            <span className="block">{line1}</span>
            <span className="block">{line2}</span>
          </h1>

          <p className="rise mt-5 text-[1.0625rem] leading-relaxed text-fg/85 md:text-[1.25rem] lg:mt-6" style={{ ["--d" as string]: "360ms" }}>
            {copy.description}
          </p>

          <ul
            className="rise mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 font-mono text-[0.71875rem] uppercase tracking-[0.16em] text-muted sm:flex sm:flex-wrap sm:items-center sm:gap-x-0 md:text-[0.75rem] md:tracking-[0.2em]"
            style={{ ["--d" as string]: "440ms" }}
          >
            {copy.roles.map((r, i) => (
              <li key={r} className="flex items-center">
                {i > 0 && <span className="mx-3 hidden h-3 w-px bg-white/25 sm:block" aria-hidden />}
                <span className="mr-2.5 h-1 w-1 shrink-0 bg-cyan sm:hidden" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
