import Image from "next/image";
import Link from "next/link";
import type { StandardPlatform } from "@/data/platforms";
import type { DisplaySpec } from "@/lib/format";
import { fill } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import type { ProductCopy } from "@/lib/product-copy";
import { SpecificationStrip } from "../SpecificationStrip";

/** Desktop hero height — identical on every product page; framing per product via object-position. */
const HERO_HEIGHT = "clamp(37.5rem, 46vw, 45rem)";

/**
 * Product hero. Desktop: text left, product image bleeding to the right edge, framed at the image's own
 * aspect so the whole vessel stays in view. Mobile: image first (4:3), then text. Key-spec strip below.
 */
export function ProductHero({
  platform,
  copy,
  dict,
  locale,
  index,
  total,
  keySpecs,
}: {
  platform: StandardPlatform;
  copy: ProductCopy;
  dict: Dictionary;
  locale: string;
  index: number;
  total: number;
  keySpecs: DisplaySpec[];
}) {
  const { hero } = platform.page;
  const category = (dict.platforms.items[platform.key] as { category: string }).category;
  const long = platform.name.length > 10;

  return (
    <section
      aria-labelledby="product-title"
      className="relative isolate flex flex-col overflow-hidden"
      style={{ ["--hero-h" as string]: HERO_HEIGHT }}
    >
      <div className="relative aspect-[4/3] overflow-hidden lg:absolute lg:top-0 lg:right-0 lg:aspect-auto lg:h-[var(--hero-h)] lg:w-[58%]">
        <div
          className="absolute inset-0 scale-[var(--zoom-m)] lg:scale-100"
          style={{
            ["--zoom-m" as string]: hero.mobileZoom?.scale ?? 1,
            transformOrigin: hero.mobileZoom?.origin ?? "50% 50%",
          }}
        >
          <Image
            src={hero.image.src}
            alt={copy.heroAlt}
            fill
            preload
            quality={85}
            sizes="(min-width: 1024px) 58vw, 100vw"
            style={{
              ["--pos-m" as string]: hero.mobilePosition,
              ["--pos-d" as string]: hero.image.position,
              filter: hero.filter,
            }}
            className="hero-image object-cover object-[var(--pos-m)] lg:object-[var(--pos-d)]"
          />
        </div>
        <div
          className="absolute inset-0 bg-[#0b3a5a] mix-blend-color"
          style={{ opacity: hero.tint ?? 0.15 }}
          aria-hidden
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/80 to-transparent" aria-hidden />
        <div
          className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink to-transparent lg:h-1/5 lg:from-ink/70"
          aria-hidden
        />
        {/* Soft multi-stop fade into the text column (no hard seam). */}
        <div
          className="absolute inset-y-0 left-0 hidden lg:block"
          style={{
            width: `${hero.fade ?? 20}%`,
            background:
              "linear-gradient(to right, var(--color-ink) 0%, rgb(5 16 25 / 0.82) 22%, rgb(5 16 25 / 0.5) 48%, rgb(5 16 25 / 0.18) 76%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col pt-5 pb-10 lg:min-h-[var(--hero-h)] lg:justify-center lg:pt-[5.75rem] lg:pb-12">
        <div className="lg:max-w-[44%]">
          <Link
            href={`/${locale}#platforms`}
            className="arrow-link rise inline-flex min-h-11 items-center gap-3 self-start py-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-fg/70 transition-colors duration-300 hover:text-cyan"
            style={{ ["--d" as string]: "100ms" }}
          >
            <span aria-hidden className="arrow-back">
              ←
            </span>
            {dict.productPage.back}
          </Link>

          <p className="rise label mt-6 flex items-start gap-3 lg:mt-10" style={{ ["--d" as string]: "180ms" }}>
            <span className="mt-[0.25rem] h-1.5 w-1.5 shrink-0 bg-cyan" aria-hidden />
            <span>{category}</span>
          </p>

          <h1
            id="product-title"
            className={`rise display mt-4 leading-[0.88] lg:mt-6 ${
              long
                ? "text-[clamp(2.625rem,13vw,4.75rem)] lg:text-[clamp(3.75rem,6vw,6.5rem)]"
                : "text-[clamp(3.5rem,18vw,6rem)] lg:text-[clamp(5rem,8vw,8.25rem)]"
            }`}
            style={{ ["--d" as string]: "260ms" }}
          >
            {platform.name}
          </h1>

          <p
            className="rise mt-5 max-w-[34ch] text-[1.0625rem] leading-relaxed text-fg/85 md:text-[1.1875rem] lg:mt-7"
            style={{ ["--d" as string]: "360ms" }}
          >
            {copy.description}
          </p>

          <ul
            className={`rise mt-5 grid ${copy.roles.some((r) => r.length > 16) ? "grid-cols-1" : "grid-cols-2"} gap-x-4 gap-y-2.5 font-mono text-[0.7188rem] uppercase tracking-[0.16em] text-muted sm:flex sm:flex-wrap sm:items-center sm:gap-x-0 md:text-[0.6875rem] md:tracking-[0.2em]`}
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

          <p className="rise label mt-8 text-fg/60" style={{ ["--d" as string]: "520ms" }}>
            {fill(dict.productPage.index, {
              n: String(index + 1).padStart(2, "0"),
              total: String(total).padStart(2, "0"),
            })}
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <SpecificationStrip
          specs={keySpecs}
          caption={fill(dict.productPage.keySpecs, { name: platform.name })}
          figure={dict.productPage.keySpecsNote}
          statusLabels={dict.status}
          legend={dict.productPage.legend}
        />
      </div>
    </section>
  );
}
