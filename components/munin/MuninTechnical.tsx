import Image from "next/image";
import { MUNIN_PAGE, type MuninView } from "@/data/munin";
import type { SpecGroup, SpecStatus } from "@/data/platforms";
import { fill, type DisplaySpec } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import type { MuninCopy } from "@/lib/product-copy";
import { StatusTag } from "../StatusTag";
import { SectionLabel } from "./SectionLabel";
import { ViewLightbox } from "./ViewLightbox";

const GROUP_ORDER: SpecGroup[] = ["dimensions", "performance", "propulsion", "control", "construction", "equipment"];
const STATUS_ORDER: Exclude<SpecStatus, "stated">[] = ["calculated", "optional", "target"];

function ViewTile({
  view,
  index,
  copy,
  beamLabel,
  specs,
}: {
  view: MuninView;
  index: number;
  copy: MuninCopy;
  beamLabel: DisplaySpec;
  specs: DisplaySpec[];
}) {
  const v = copy.page.views;
  const name = v[view.id];
  const alt = v[`${view.id}Alt` as const];
  const { src, width, height } = view.image;

  return (
    <figure className="border border-line bg-[#06111a]" data-reveal>
      <div className="group relative aspect-[2/1] overflow-hidden">
        {view.mode === "illustration" ? (
          <Image
            src={src}
            alt={alt}
            fill
            quality={85}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.02]"
          />
        ) : (
          <>
            {/* dark stage matching the illustrated views; the photograph is shown small (low-resolution source) */}
            <div className="tech-grid absolute inset-0 opacity-60 [background-size:2.5rem_2.5rem]" aria-hidden />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,rgba(40,110,160,0.16),transparent_70%)]"
              aria-hidden
            />
            <div
              className="absolute top-[56%] left-1/2 h-[74%] -translate-x-1/2 -translate-y-1/2"
              style={{ aspectRatio: `${width} / ${height}` }}
            >
              <div
                className="absolute inset-0"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 14%, black 86%, transparent), linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
                  maskComposite: "intersect",
                }}
              >
                <Image src={src} alt={alt} fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-[#0b3a5a] opacity-15 mix-blend-color" aria-hidden />
              </div>
              {view.beam && (
                <>
                  <svg
                    className="absolute inset-0 h-full w-full overflow-visible text-cyan"
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <g stroke="currentColor" fill="none" strokeWidth={1.25} vectorEffect="non-scaling-stroke">
                      <line
                        x1={view.beam.x1}
                        y1={view.beam.y}
                        x2={view.beam.x2}
                        y2={view.beam.y}
                        vectorEffect="non-scaling-stroke"
                      />
                      <line
                        x1={view.beam.x1}
                        y1={view.beam.y - 5}
                        x2={view.beam.x1}
                        y2={view.beam.y + 5}
                        vectorEffect="non-scaling-stroke"
                      />
                      <line
                        x1={view.beam.x2}
                        y1={view.beam.y - 5}
                        x2={view.beam.x2}
                        y2={view.beam.y + 5}
                        vectorEffect="non-scaling-stroke"
                      />
                      <line
                        x1={view.beam.x1}
                        y1={view.beam.y}
                        x2={view.beam.x1}
                        y2={view.beam.drop}
                        strokeDasharray="3 3"
                        opacity={0.7}
                        vectorEffect="non-scaling-stroke"
                      />
                      <line
                        x1={view.beam.x2}
                        y1={view.beam.y}
                        x2={view.beam.x2}
                        y2={view.beam.drop}
                        strokeDasharray="3 3"
                        opacity={0.7}
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  </svg>
                  <p
                    className="absolute flex -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] items-baseline gap-2 whitespace-nowrap"
                    style={{
                      left: `${((view.beam.x1 + view.beam.x2) / 2 / width) * 100}%`,
                      top: `${(view.beam.y / height) * 100}%`,
                    }}
                    aria-hidden
                  >
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fg/70">
                      {beamLabel.label}
                    </span>
                    <span className="font-display text-[1rem] font-semibold text-fg md:text-[1.125rem]">
                      {beamLabel.value}
                    </span>
                  </p>
                </>
              )}
            </div>
          </>
        )}

        {/* tile header: index + view name, expand */}
        <figcaption className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-[#06111a]/85 to-transparent pl-4 md:pl-5">
          <span className="flex items-center gap-3 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-fg md:text-[0.8125rem]">
            <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
            <span className="text-cyan">{String(index + 1).padStart(2, "0")}</span>
            {name}
          </span>
          <ViewLightbox
            title={name}
            expandLabel={fill(v.expand, { view: name })}
            closeLabel={v.close}
            src={src}
            width={width}
            height={height}
            alt={alt}
            maxWidth={view.mode === "photo" ? `${(width * 2) / 16}rem` : "80rem"}
          />
        </figcaption>
      </div>
      {/* phones: the drawn dimension labels are too small to read, so repeat them as text */}
      {view.mode === "illustration" && (
        <p className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line-soft px-4 py-2.5 md:hidden">
          {view.dims.map((k) => {
            const s = specs.find((x) => x.key === k);
            return (
              s && (
                <span key={k} className="flex items-baseline gap-2">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{s.label}</span>
                  <span className="font-display text-[1rem] font-semibold text-fg">{s.value}</span>
                </span>
              )
            );
          })}
        </p>
      )}
    </figure>
  );
}

export function MuninTechnical({
  copy,
  dict,
  specs,
}: {
  copy: MuninCopy;
  dict: Dictionary;
  /** Public specs with their group. */
  specs: (DisplaySpec & { group: SpecGroup })[];
}) {
  const p = dict.productPage;
  const groups = GROUP_ORDER.map((g) => ({ g, rows: specs.filter((s) => s.group === g) })).filter((x) => x.rows.length);
  const present = STATUS_ORDER.filter((s) => specs.some((x) => x.status === s));
  const beam = specs.find((s) => s.key === "beam");
  if (!beam) throw new Error("MUNIN technical views need the public beam spec");

  return (
    <section
      id="specifications"
      aria-labelledby="specs-title"
      className="relative pt-14 pb-12 md:pt-16 lg:pt-20 lg:pb-16"
    >
      <div
        className="tech-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
        aria-hidden
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* three views, in order: front, side, rear */}
        <div className="lg:col-span-7">
          <SectionLabel>{copy.page.views.title}</SectionLabel>
          <div className="mt-6 space-y-5 md:mt-7">
            {MUNIN_PAGE.views.map((view, i) => (
              <ViewTile key={view.id} view={view} index={i} copy={copy} beamLabel={beam} specs={specs} />
            ))}
          </div>
          <p className="label mt-4 flex items-center gap-3 text-fg/60">
            <span className="h-px w-5 bg-white/30" aria-hidden />
            {copy.page.views.note}
          </p>
        </div>

        {/* grouped specifications — stays in view while the views scroll past */}
        <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
          <SectionLabel id="specs-title">{copy.page.specsTitle}</SectionLabel>
          <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <li className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg/70">
              <span className="h-px w-5 bg-white/40" aria-hidden />
              {p.legend.stated}
            </li>
            {present.map((s) => (
              <li
                key={s}
                className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg/70"
              >
                <StatusTag status={s} label={dict.status[s]} />
                <span className="sr-only">{p.legend[s]}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-9">
            {groups.map(({ g, rows }, gi) => (
              <div key={g} data-reveal style={{ ["--reveal-delay" as string]: `${gi * 60}ms` }}>
                <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-cyan md:text-[0.71875rem]">
                  {p.groups[g]}
                </h3>
                <dl className="mt-3 border-t border-line">
                  {rows.map((r) => (
                    <div
                      key={r.key}
                      className={`border-b border-line-soft py-3.5 sm:grid sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:items-baseline sm:gap-6 ${
                        r.kind === "amount" ? "flex items-baseline justify-between gap-4" : "flex flex-col gap-1.5"
                      }`}
                    >
                      <dt className="font-mono text-[0.71875rem] leading-5 uppercase tracking-[0.12em] text-muted md:text-[0.6875rem] md:tracking-[0.14em]">
                        {r.label}
                      </dt>
                      <dd
                        className={`flex flex-wrap items-baseline gap-x-3 gap-y-1.5 sm:justify-start ${r.kind === "amount" ? "justify-end" : ""}`}
                      >
                        <span
                          className={
                            r.kind === "amount"
                              ? "font-display text-[1.1875rem] leading-6 font-semibold tracking-[0.01em] whitespace-nowrap text-fg"
                              : "text-[0.9688rem] leading-6 text-fg/90"
                          }
                        >
                          {r.value}
                        </span>
                        {r.status !== "stated" && <StatusTag status={r.status} label={dict.status[r.status]} />}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
