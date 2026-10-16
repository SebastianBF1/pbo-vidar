import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { IMAGES } from "@/data/images";

/** Image-led break after the platform grid, minimal text. Illustrative image: deliberately no documentary caption. */
export function FieldOperationsSection({ dict }: { dict: Dictionary }) {
  const f = dict.fieldOps;
  return (
    <section
      id="field-operations"
      aria-labelledby="field-ops-title"
      className="relative isolate overflow-hidden border-t border-line bg-ink"
    >
      {/* Image: in flow on mobile (craft + operator stay visible), full-bleed on desktop */}
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto">
        <div data-zoom className="absolute inset-0">
          <Image
            src={IMAGES.fieldOperations.src}
            alt={f.imageAlt}
            fill
            quality={85}
            sizes="100vw"
            className="object-cover object-[86%_50%] saturate-[0.9] sm:object-[70%_50%] lg:object-[50%_40%]"
          />
        </div>
        <div className="absolute inset-0 bg-[#0b3a5a] opacity-15 mix-blend-color" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/70 to-transparent" aria-hidden />
        <div
          className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink to-transparent sm:h-1/3 lg:h-[55%] lg:via-ink/50"
          aria-hidden
        />
        <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink/80 to-transparent lg:block" aria-hidden />
      </div>

      <div className="container-x relative lg:flex lg:min-h-[min(90vh,52.5rem)] lg:items-end lg:pb-20">
        <div className="relative -mt-4 pb-16 sm:-mt-16 lg:mt-0 lg:max-w-[47.5rem] lg:pb-0" data-reveal>
          <p className="label flex items-center gap-3 text-fg/80">
            <span className="h-1.5 w-1.5 bg-signal" aria-hidden />
            {f.label}
          </p>
          <h2 id="field-ops-title" className="display mt-5 text-[2.1875rem] leading-[0.92] md:text-[4.25rem] xl:text-[5.25rem]">
            {f.title}
          </h2>
        </div>
        {/* No caption: illustrative image, not presented as documentary. */}
      </div>
    </section>
  );
}
