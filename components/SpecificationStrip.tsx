import type { ComponentType, SVGProps } from "react";
import type { SpecKey, SpecStatus } from "@/data/platforms";
import type { DisplaySpec } from "@/lib/format";
import { IconBattery, IconLength, IconLoad, IconMotor, IconRange, IconSpeed, IconWeight, IconWidth } from "./Icons";
import { StatusTag } from "./StatusTag";

const ICONS: Partial<Record<SpecKey, ComponentType<SVGProps<SVGSVGElement>>>> = {
  length: IconLength,
  width: IconWidth,
  beam: IconWidth,
  height: IconWidth,
  systemWeight: IconWeight,
  weightEmpty: IconWeight,
  inflatableHull: IconWeight,
  jetDrive: IconMotor,
  battery: IconBattery,
  topSpeed: IconSpeed,
  maxSpeed: IconSpeed,
  estSpeed50: IconSpeed,
  bldcMotor: IconMotor,
  engines: IconMotor,
  ratedLoad: IconLoad,
  payload: IconLoad,
  confirmedPayload: IconLoad,
  range: IconRange,
  rangeCruise: IconRange,
  estRange50: IconRange,
};

export function SpecificationStrip({
  specs,
  caption,
  figure,
  statusLabels,
  legend,
}: {
  specs: DisplaySpec[];
  caption: string;
  figure: string;
  statusLabels?: Record<Exclude<SpecStatus, "stated">, string>;
  /** Legend texts per status; shown for the statuses present in this strip. */
  legend?: Partial<Record<SpecStatus, string>>;
}) {
  // Reserve the qualifier line (“Up to”) in every tile when any tile has one, so all figures share a baseline.
  const reservePrefix = specs.some((s) => s.prefix);
  const present = statusLabels
    ? ([...new Set(specs.map((s) => s.status))].filter((s) => s !== "stated") as Exclude<SpecStatus, "stated">[])
    : [];
  return (
    <div className="relative border-t border-line bg-ink/80 backdrop-blur-md lg:bg-ink/55">
      <div className="container-x">
        <div className="flex flex-col gap-2 border-b border-line-soft py-3 md:flex-row md:items-center md:justify-between md:gap-4">
          <p className="label flex items-center gap-3">
            <span className="h-1.5 w-1.5 shrink-0 bg-cyan" aria-hidden />
            {caption}
          </p>
          <div className={`items-center gap-5 ${present.length ? "flex flex-wrap" : "hidden md:flex"}`}>
            <p className="label">{figure}</p>
            {present.map((st) => (
              <p key={st} className="label flex items-center gap-2">
                <StatusTag status={st} label={statusLabels![st]} />
                {legend?.[st] && <span className="normal-case tracking-[0.06em]">= {legend[st]}</span>}
              </p>
            ))}
          </div>
        </div>
        <dl className="grid grid-cols-2 lg:grid-cols-6">
          {specs.map((s, i) => {
            const Icon = ICONS[s.key];
            return (
              <div
                key={s.key}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className="flex flex-col gap-3 border-line-soft py-5 pr-4 lg:py-7 [&:nth-child(even)]:border-l [&:nth-child(even)]:pl-5 [&:nth-child(-n+4)]:border-b lg:[&:nth-child(-n+4)]:border-b-0 lg:[&:nth-child(n+2)]:border-l lg:[&:nth-child(n+2)]:pl-6"
              >
                {Icon && <Icon className="h-5 w-5 text-cyan" />}
                <dt className="order-last flex flex-col items-start gap-2">
                  <span className="label text-[0.6875rem] tracking-[0.16em] md:tracking-[0.22em]">{s.label}</span>
                  {statusLabels && <StatusTag status={s.status} label={statusLabels[s.status as Exclude<SpecStatus, "stated">]} />}
                </dt>
                <dd className="flex flex-col gap-1.5">
                  {(s.prefix || reservePrefix) && (
                    <span className="font-mono text-[0.6875rem] leading-[0.875rem] uppercase tracking-[0.16em] text-fg/70 md:text-[0.625rem] md:tracking-[0.18em] md:text-fg/60" aria-hidden={!s.prefix}>
                      {s.prefix ?? " "}
                    </span>
                  )}
                  <span
                    className={`display flex min-h-[1.875rem] items-end normal-case leading-none tracking-normal md:min-h-[2.25rem] xl:min-h-[2.5rem] ${
                      s.main.length > 12
                        ? "text-[1.375rem] md:text-[1.5rem] xl:text-[1.625rem] xl:whitespace-nowrap"
                        : s.main.length > 9
                          ? "text-[1.5rem] md:text-[1.75rem] xl:text-[2rem]"
                          : "text-[1.875rem] md:text-[2.25rem] xl:text-[2.5rem]"
                    }`}
                  >
                    {s.main}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
