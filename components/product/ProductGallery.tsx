import Image from "next/image";
import type { GalleryItem } from "@/data/platforms";
import type { Dictionary } from "@/lib/i18n";
import type { ProductCopy } from "@/lib/product-copy";

/**
 * Justified gallery (md+): every row at one height, each image at its own aspect ratio — nothing is cropped.
 * Mobile: a row with several images becomes a swipe strip at a fixed modest height, so low-resolution source
 * photos are never blown up to full width; a single image stays full width.
 */
export function ProductGallery({ rows, copy, dict }: { rows: GalleryItem[][]; copy: ProductCopy; dict: Dictionary }) {
  return (
    <section id="imagery" aria-labelledby="imagery-title" className="relative border-t border-line py-16 md:py-24">
      <div className="container-x">
        <p id="imagery-title" className="label flex items-center gap-3" data-reveal>
          <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
          {dict.productPage.galleryLabel}
        </p>
        <div className="mt-8 space-y-6 md:mt-10 md:space-y-5">
          {rows.map((row, ri) => {
            const total = row.reduce((sum, it) => sum + it.image.width / it.image.height, 0);
            const strip = row.length > 1;
            return (
              <div
                key={ri}
                className={
                  strip
                    ? "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 md:mx-0 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
                    : ""
                }
              >
                {row.map((item, i) => {
                  const ratio = item.image.width / item.image.height;
                  const text = copy.gallery?.[item.id];
                  return (
                    <figure
                      key={item.id}
                      data-reveal
                      style={{ ["--r" as string]: ratio, ["--reveal-delay" as string]: `${i * 90}ms` }}
                      className={`group min-w-0 ${strip ? "shrink-0 snap-start md:shrink md:[flex:var(--r)_1_0%]" : ""}`}
                    >
                      <div
                        className={`ticks relative overflow-hidden border border-line ${strip ? "h-[13.75rem] md:h-auto" : ""}`}
                        style={{ aspectRatio: ratio }}
                      >
                        <Image
                          src={item.image.src}
                          alt={text?.alt ?? ""}
                          fill
                          quality={85}
                          sizes={strip ? `(min-width: 768px) ${Math.ceil((ratio / total) * 100)}vw, ${Math.ceil(220 * ratio)}px` : "100vw"}
                          style={{ objectPosition: item.image.position }}
                          className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-[#0b3a5a] opacity-10 mix-blend-color" aria-hidden />
                      </div>
                      {text?.caption && <figcaption className="label mt-3 text-fg/70">{text.caption}</figcaption>}
                    </figure>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
