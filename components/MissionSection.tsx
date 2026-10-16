import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { IMAGES } from "@/data/images";

export function MissionSection({ dict }: { dict: Dictionary }) {
  const m = dict.mission;
  return (
    <section id="impact" aria-labelledby="impact-title" className="relative isolate overflow-hidden border-t border-line bg-ink">
      {/* Brand image (brochure aerial): image first on mobile, right half on desktop */}
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/12] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2">
        <div data-zoom className="absolute inset-0">
          <Image
            src={IMAGES.brandAerial.src}
            alt={m.imageAlt}
            fill
            quality={85}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[68%_50%] saturate-[0.95] lg:object-[66%_50%]"
          />
        </div>
        <div className="absolute inset-0 bg-[#0b3a5a] opacity-15 mix-blend-color" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/70 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/60 to-transparent lg:h-1/3" aria-hidden />
        <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-ink via-ink/50 to-transparent lg:block" aria-hidden />
      </div>

      <div className="container-x relative flex flex-col pb-20 md:pb-28 lg:min-h-[61.25rem] lg:justify-between lg:py-28">
        <div className="relative -mt-28 sm:-mt-36 lg:mt-0 lg:max-w-[50%] lg:pt-10" data-reveal>
          <p className="label flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-signal" aria-hidden />
            {m.label}
          </p>
          <h2 id="impact-title" className="display mt-6 text-[3.125rem] leading-[0.9] md:text-[5.25rem] xl:text-[6.25rem]">
            {m.statement[0]}
            <br />
            <span className="text-fg/90">{m.statement[1]}</span>
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-12 bg-signal" aria-hidden />
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.32em] text-fg/85">{m.tagline}</p>
          </div>
        </div>

        {/* Mission / Vision: one panel, overlapping into the image on desktop */}
        <div className="mt-20 grid border border-line bg-ink/75 backdrop-blur-md sm:grid-cols-2 lg:mt-20 lg:w-[66%]">
          {[
            { title: m.missionTitle, body: m.missionBody, accent: "bg-cyan" },
            { title: m.visionTitle, body: m.visionBody, accent: "bg-signal" },
          ].map((block, i) => (
            <div
              key={block.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${150 + i * 120}ms` }}
              className={`relative p-7 md:p-9 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""}`}
            >
              <span aria-hidden className={`absolute top-0 left-0 h-[0.125rem] w-16 ${block.accent}`} />
              <h3 className="display text-[1.5rem] tracking-[0.02em] md:text-[1.75rem]">{block.title}</h3>
              <p className="mt-4 text-[1.0625rem] leading-[1.6] text-fg/90 md:text-[1.125rem]">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
