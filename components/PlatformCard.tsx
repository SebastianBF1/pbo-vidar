import Image from "next/image";
import Link from "next/link";
import type { Platform } from "@/data/platforms";
import { ArrowRight } from "./Icons";

export function PlatformCard({
  platform,
  index,
  featured = false,
  locale,
  category,
  imageAlt,
  description,
  cta,
}: {
  platform: Platform;
  index: number;
  /** Lead platform: brighter surface, full-width signal line, signal index chip. */
  featured?: boolean;
  locale: string;
  category: string;
  imageAlt: string;
  /** Product description line (locales products.<key>.description). */
  description: string;
  cta: string;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col border transition-colors duration-500 ${
        featured
          ? "ticks border-white/25 bg-ink-3/90 shadow-[0_1.875rem_5rem_-2.5rem_rgba(30,214,242,0.25)] hover:border-white/40"
          : "border-line bg-ink-2/70 hover:border-white/30"
      }`}
      style={featured ? { ["--tick" as string]: "var(--color-signal)" } : undefined}
    >
      <span
        aria-hidden
        className={`absolute -top-px left-0 z-10 h-[0.125rem] transition-[width] duration-700 ease-out-expo ${
          featured ? "w-full bg-signal" : "w-14 bg-cyan group-hover:w-full"
        }`}
      />

      <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <Image
            src={platform.image.src}
            alt={imageAlt}
            fill
            quality={85}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 85vw"
            style={{ objectPosition: platform.image.position }}
            className={`object-cover ${featured ? "brightness-100 contrast-[1.05]" : "brightness-[0.95]"} saturate-[0.9] transition-[transform,filter] duration-[1400ms] ease-out-expo group-hover:scale-[1.045] group-hover:brightness-[1.08] group-hover:saturate-100`}
          />
        </div>
        <div className="absolute inset-0 bg-[#0b3a5a] opacity-10 mix-blend-color" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden />
        <span
          className={`absolute top-0 left-0 border-r border-b px-3 py-2 font-mono text-[0.6875rem] tracking-[0.2em] backdrop-blur-sm xl:text-[0.75rem] ${
            featured ? "border-signal bg-signal font-medium text-ink" : "border-line bg-ink/70 text-fg"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-4 pb-5 sm:px-5 md:p-6 xl:p-7">
        <p className="label min-h-[4.2em] max-w-[28ch] text-[0.6875rem] md:min-h-[2.8em] md:text-[0.6563rem] xl:min-h-[4.2em] xl:text-[0.71875rem]">{category}</p>
        <h3 className={`display mt-3 leading-none ${featured ? "text-[2.5rem] md:text-[2.875rem] xl:text-[3rem]" : "text-[2.25rem] md:text-[2.625rem] xl:text-[2.75rem]"}`}>{platform.name}</h3>
        <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-fg/75 xl:text-[1rem]">{description}</p>

        <div className="mt-auto pt-7 md:pt-8">
          <span className="mb-5 block h-px bg-line" aria-hidden />
          <Link
            href={`/${locale}/platforms/${platform.slug}`}
            className="arrow-link flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-fg xl:text-[0.75rem] transition-colors duration-300 after:absolute after:inset-0 after:content-[''] group-hover:text-cyan"
          >
            {cta}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
