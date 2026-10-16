import Image from "next/image";
import type { StandardPlatform } from "@/data/platforms";
import type { Dictionary } from "@/lib/i18n";
import type { ProductCopy } from "@/lib/product-copy";
import { StatusTag } from "../StatusTag";

/** Editorial overview: source imagery + source copy, with status tags on optional / target items. */
export function ProductOverview({ platform, copy, dict }: { platform: StandardPlatform; copy: ProductCopy; dict: Dictionary }) {
  const { overview } = platform.page;
  const o = copy.overview;
  const portrait = overview.span === 5;

  return (
    <section id="overview" aria-labelledby="overview-title" className="relative border-t border-line py-16 md:py-24">
      <div
        className="tech-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
        aria-hidden
      />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <figure
          className={`ticks relative overflow-hidden border border-line ${portrait ? "mx-auto w-full max-w-[28.75rem] lg:col-span-5 lg:mx-0 lg:max-w-[27.5rem]" : "lg:col-span-7"}`}
          data-reveal
        >
          <div className="relative" style={{ aspectRatio: overview.aspect }}>
            <div data-zoom className="absolute inset-0">
              <Image
                src={overview.image.src}
                alt={o.imageAlt}
                fill
                quality={85}
                sizes={portrait ? "(min-width: 1024px) 38vw, 460px" : "(min-width: 1024px) 55vw, 100vw"}
                style={{ objectPosition: overview.image.position }}
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-[#0b3a5a] opacity-10 mix-blend-color" aria-hidden />
          </div>
          {o.caption && (
            <figcaption className="label absolute bottom-0 left-0 border-t border-r border-line bg-ink/75 px-4 py-3 text-fg/75 backdrop-blur-sm">
              {o.caption}
            </figcaption>
          )}
        </figure>

        <div
          className={portrait ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-5"}
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
        >
          <p className="label flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-signal" aria-hidden />
            {dict.productPage.overviewLabel}
          </p>
          <h2 id="overview-title" className="display mt-5 text-[2rem] leading-[0.95] md:text-[2.75rem] xl:text-[3rem]">
            {o.heading}
          </h2>
          {o.lead && <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg/85 md:text-[1.1875rem]">{o.lead}</p>}
          {o.chips && (
            <ul className="mt-7 flex flex-wrap gap-2">
              {o.chips.map((c) => (
                <li key={c} className="border border-line px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fg/85 md:text-[0.6563rem] md:tracking-[0.2em] md:text-fg/80">
                  {c}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 border-t border-line md:mt-10">
            {overview.blocks.map(({ id, status = "stated" }) => {
              const b = o.blocks[id];
              if (!b) return null;
              return (
                <div key={id} className="border-b border-line-soft py-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-mono text-[0.75rem] uppercase leading-relaxed tracking-[0.18em] text-fg">{b.title}</h3>
                    {status !== "stated" && <StatusTag status={status} label={dict.status[status]} />}
                  </div>
                  {b.body && <p className="mt-3 text-[0.9688rem] leading-relaxed text-fg/80">{b.body}</p>}
                  {b.items && (
                    <ul className="mt-4 space-y-2.5">
                      {b.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[0.9688rem] leading-snug text-fg/85">
                          <span className="mt-[0.5rem] h-1 w-1 shrink-0 bg-cyan" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
