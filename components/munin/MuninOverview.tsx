import type { ComponentType, SVGProps } from "react";
import { MUNIN_PAGE, type MuninFeature } from "@/data/munin";
import type { DisplaySpec } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import type { MuninCopy } from "@/lib/product-copy";
import { IconLoad, IconMotor, IconRange, IconSignal, IconSpeed, IconWaves } from "../Icons";
import { SectionLabel } from "./SectionLabel";

const ICONS: Record<MuninFeature["id"], ComponentType<SVGProps<SVGSVGElement>>> = {
  speed: IconSpeed,
  range: IconRange,
  payload: IconLoad,
  electric: IconMotor,
  control: IconSignal,
  waters: IconWaves,
};

export function MuninOverview({ copy, dict, specs }: { copy: MuninCopy; dict: Dictionary; specs: DisplaySpec[] }) {
  const o = copy.overview;
  const f = copy.page.features;
  const sub: Partial<Record<MuninFeature["id"], string>> = { electric: f.electricSub, control: f.controlSub };

  return (
    <section id="overview" aria-labelledby="overview-title" className="relative border-t border-line-soft pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-5" data-reveal>
          <SectionLabel id="overview-title">{dict.productPage.overviewLabel}</SectionLabel>
          <p className="display mt-6 max-w-[22ch] text-[1.875rem] leading-[0.98] md:text-[2.375rem]">{o.heading}</p>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-fg/85 md:text-[1.125rem]">{o.lead}</p>
        </div>

        <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <SectionLabel>{f.title}</SectionLabel>
          <ul className="mt-6 grid grid-cols-2 border-t border-line sm:grid-cols-3 lg:mt-8 lg:grid-cols-6 lg:border-t-0">
            {MUNIN_PAGE.features.map((feat, i) => {
              const Icon = ICONS[feat.id];
              const value = feat.spec ? specs.find((s) => s.key === feat.spec)?.value : sub[feat.id];
              return (
                <li
                  key={feat.id}
                  className={`flex flex-col items-center gap-3 border-line-soft px-3 py-6 text-center lg:py-2 ${
                    i > 0 ? "lg:border-l" : ""
                  } max-sm:[&:nth-child(even)]:border-l max-sm:border-b sm:max-lg:border-b sm:max-lg:[&:not(:nth-child(3n+1))]:border-l`}
                >
                  <Icon className="h-8 w-8 text-cyan lg:h-9 lg:w-9" />
                  <span className="font-mono text-[0.71875rem] uppercase leading-snug tracking-[0.14em] text-fg">{f[feat.id]}</span>
                  {value && <span className="text-[0.8125rem] leading-snug text-muted">{value}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
