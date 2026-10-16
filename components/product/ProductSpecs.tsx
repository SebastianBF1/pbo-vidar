import type { SpecGroup, SpecStatus, StandardPlatform } from "@/data/platforms";
import type { DisplaySpec } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import { StatusTag } from "../StatusTag";

const GROUP_ORDER: SpecGroup[] = ["dimensions", "performance", "propulsion", "control", "construction", "equipment"];
const STATUS_ORDER: Exclude<SpecStatus, "stated">[] = ["calculated", "optional", "target"];

/**
 * Full technical table. Shared rules on every product page:
 *  - fixed label column (sm+), so values start at the same offset in every table
 *  - one row rhythm: 24px value line, 16px vertical padding
 *  - figures beside their label on mobile; text values stack under the label
 *  - status tags inline after the value, same style everywhere
 */
export function ProductSpecs({
  platform,
  dict,
  specs,
}: {
  platform: StandardPlatform;
  dict: Dictionary;
  /** Public specs with their group. */
  specs: (DisplaySpec & { group: SpecGroup })[];
}) {
  const p = dict.productPage;
  const groups = GROUP_ORDER.map((g) => ({ g, rows: specs.filter((s) => s.group === g) })).filter((x) => x.rows.length);
  const present = STATUS_ORDER.filter((s) => specs.some((x) => x.status === s));
  const notes = (platform.page.notes ?? []).map((n) =>
    n === "jetSledPayload" ? (dict.platforms.items.jetSled as { note: string }).note : n,
  );

  return (
    <section id="specifications" aria-labelledby="specs-title" className="relative border-t border-line bg-ink-2 py-16 md:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-reveal>
          <div>
            <p className="label flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
              {platform.name}
            </p>
            <h2 id="specs-title" className="display mt-5 text-[2.125rem] md:text-[3rem]">
              {p.technicalLabel}
            </h2>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
            <li className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg/75 md:text-[0.6563rem] md:tracking-[0.16em] md:text-fg/70">
              <span className="h-px w-5 bg-white/40" aria-hidden />
              {p.legend.stated}
            </li>
            {present.map((s) => (
              <li key={s} className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg/75 md:text-[0.6563rem] md:tracking-[0.16em] md:text-fg/70">
                <StatusTag status={s} label={dict.status[s]} />
                <span className="sr-only">{p.legend[s]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-line className="mt-8 h-px bg-line md:mt-10" aria-hidden />

        <div className="mt-10 grid gap-10 md:mt-12">
          <div>
            {/* Two balanced columns on desktop. */}
            <div className="gap-x-14 lg:-mb-12 lg:columns-2 [&>*+*]:mt-10 lg:[&>*+*]:mt-0">
              {groups.map(({ g, rows }, gi) => (
                <div
                  key={g}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${gi * 70}ms` }}
                  className="break-inside-avoid lg:pb-12"
                >
                  <h3 className="flex items-center gap-3 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-cyan md:text-[0.6875rem] md:tracking-[0.22em]">
                    <span className="h-px w-6 bg-cyan" aria-hidden />
                    {p.groups[g]}
                  </h3>
                  <dl className="mt-4 border-t border-line">
                    {rows.map((r) => (
                      <div
                        key={r.key}
                        className={`border-b border-line-soft py-4 sm:grid sm:grid-cols-[13.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 ${
                          r.kind === "amount" ? "flex items-baseline justify-between gap-4" : "flex flex-col gap-2"
                        }`}
                      >
                        <dt className="font-mono text-[0.7188rem] leading-5 uppercase tracking-[0.12em] text-muted md:text-[0.6875rem] md:tracking-[0.14em]">
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

            {notes.length > 0 && (
              <div className="mt-10 space-y-2 border-l border-signal/60 pl-4">
                {notes.map((n) => (
                  <p key={n} className="text-[0.8438rem] leading-relaxed text-fg/70">
                    * {n}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
