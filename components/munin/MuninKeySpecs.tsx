import type { DisplaySpec } from "@/lib/format";
import { SectionLabel } from "./SectionLabel";

/** Number emphasised; qualifier (“Up to”), approximation sign and unit set smaller — as in the mockup. */
export function SpecFigure({ spec, size = "md" }: { spec: DisplaySpec; size?: "md" | "lg" }) {
  const [num, ...unit] = spec.main.split(" ");
  return (
    <span className="inline-flex flex-wrap items-baseline justify-center gap-x-1.5 font-display font-semibold leading-none text-fg">
      {spec.prefix && <span className="text-[0.9375rem] font-medium text-fg/80 lg:text-[1rem]">{spec.prefix}</span>}
      <span className={size === "lg" ? "text-[1.75rem] lg:text-[2rem]" : "text-[1.5rem] lg:text-[1.75rem]"}>{num}</span>
      {unit.length > 0 && <span className="text-[0.9375rem] font-medium text-fg/85 lg:text-[1rem]">{unit.join(" ")}</span>}
    </span>
  );
}

export function MuninKeySpecs({ title, specs }: { title: string; specs: DisplaySpec[] }) {
  return (
    <section id="key-specifications" aria-labelledby="key-specs-title" className="relative">
      <div className="container-x">
        <div className="relative border border-line bg-ink-2/70 px-5 pt-6 pb-2 md:px-8 lg:pb-3" data-reveal>
          <SectionLabel id="key-specs-title">{title}</SectionLabel>
          <dl className="mt-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {specs.map((s, i) => (
              <div
                key={s.key}
                className={`flex flex-col items-center gap-3 px-2 py-5 text-center lg:py-6 ${
                  i === specs.length - 1 ? "max-md:col-span-2" : ""
                } border-line-soft max-md:[&:nth-child(even)]:border-l max-md:[&:nth-child(-n+6)]:border-b md:max-lg:[&:nth-child(4n+2)]:border-l md:max-lg:[&:nth-child(4n+3)]:border-l md:max-lg:[&:nth-child(4n+4)]:border-l md:max-lg:[&:nth-child(-n+4)]:border-b lg:[&:nth-child(n+2)]:border-l`}
              >
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted lg:text-[0.71875rem]">{s.label}</dt>
                <dd>
                  <SpecFigure spec={s} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
