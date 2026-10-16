import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { displaySpecs } from "@/lib/format";
import { getPlatform } from "@/data/platforms";
import { ArrowRight } from "./Icons";

/** Product-led image section for RAGNAR 28: large real photograph + its four confirmed figures. */
export function PlatformFeature({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const platform = getPlatform("ragnar-28");
  if (!platform) return null;
  const r = dict.ragnarFeature;
  const image = platform.featureImage ?? platform.image;
  const item = dict.platforms.items.ragnar28;

  return (
    <section id="ragnar-28" aria-labelledby="ragnar-title" className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="grid lg:min-h-[47.5rem] lg:grid-cols-12">
        <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto">
          <div data-zoom className="absolute inset-0">
            <Image
              src={image.src}
              alt={r.imageAlt}
              fill
              quality={85}
              sizes="(min-width: 1024px) 60vw, 100vw"
              style={{ objectPosition: image.position }}
              className="object-cover brightness-[0.86] contrast-[1.08] saturate-[0.55]"
            />
          </div>
          <div className="absolute inset-0 bg-[#0b3a5a] opacity-45 mix-blend-color" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-2 to-transparent lg:hidden" aria-hidden />
          <div className="absolute inset-y-0 right-0 hidden w-[45%] bg-gradient-to-l from-ink-2 via-ink-2/55 to-transparent lg:block" aria-hidden />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink-2/50 to-transparent" aria-hidden />
          <span className="absolute top-0 left-0 border-r border-b border-line bg-ink/70 px-3 py-2 font-mono text-[0.6875rem] tracking-[0.2em] backdrop-blur-sm">
            02
          </span>
        </div>

        <div className="flex flex-col justify-center px-5 pt-4 pb-16 md:px-10 lg:col-span-5 lg:py-20 lg:pr-16 lg:pl-14">
          <div data-reveal>
            <p className="label flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
              {item.category}
            </p>
            <h2 id="ragnar-title" className="display mt-5 text-[3.5rem] leading-[0.88] md:text-[5rem] xl:text-[6rem]">
              {platform.name}
            </h2>
            <ul className="mt-5 flex flex-col gap-2 font-mono text-[0.6563rem] uppercase tracking-[0.2em] text-muted sm:flex-row sm:flex-wrap sm:items-center md:text-[0.6875rem]">
              {r.descriptor.map((d, i) => (
                <li key={d} className="flex items-center">
                  {i > 0 && <span className="mx-3 hidden h-3 w-px bg-white/25 sm:block" aria-hidden />}
                  <span className="mr-2.5 h-1 w-1 shrink-0 bg-cyan sm:hidden" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-10 grid grid-cols-2 border-t border-line">
            {displaySpecs(platform.cardSpecs, dict, locale).map((s, i) => (
              <div
                key={s.key}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${120 + i * 80}ms` }}
                className="flex flex-col gap-2 border-b border-line-soft py-6 pr-3 [&:nth-child(even)]:border-l [&:nth-child(even)]:pl-6"
              >
                <dt className="order-last font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted md:text-[0.6875rem]">
                  {s.label}
                </dt>
                <dd className="display whitespace-nowrap text-[1.5625rem] normal-case leading-none tracking-normal sm:text-[1.875rem] md:text-[2.375rem]">{s.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={`/${locale}/platforms/${platform.slug}`}
            className="arrow-link mt-10 inline-flex h-14 items-center justify-between gap-6 self-stretch sm:h-[3.25rem] sm:self-start border border-white/25 px-6 font-mono text-[0.75rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-cyan hover:text-cyan"
          >
            {r.cta}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
