import Image from "next/image";
import { MUNIN_PAGE } from "@/data/munin";
import { fill, type DisplaySpec } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import type { MuninCopy } from "@/lib/product-copy";
import { StatusTag } from "../StatusTag";
import { SectionLabel } from "./SectionLabel";

const lowerFirst = (s: string) => s.charAt(0).toLocaleLowerCase() + s.slice(1);

export function MuninMissions({ copy, dict, specs }: { copy: MuninCopy; dict: Dictionary; specs: DisplaySpec[] }) {
  const m = copy.page.missions;
  const payload = specs.find((s) => s.key === "payload")?.value ?? "";
  const action = MUNIN_PAGE.action;

  return (
    <section id="missions" aria-labelledby="missions-title" className="relative py-12 md:py-16">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <figure className="relative overflow-hidden border border-line lg:col-span-6" data-reveal>
          <div className="relative" style={{ aspectRatio: `${action.width} / ${action.height}` }}>
            <div data-zoom className="absolute inset-0">
              {/* low-resolution source: served as supplied (no re-compression) */}
              <Image src={action.src} alt={m.actionAlt} fill unoptimized className="object-cover" />
            </div>
          </div>
        </figure>

        <div className="lg:col-span-6" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <SectionLabel id="missions-title">{m.title}</SectionLabel>
          <ul className="mt-6 border-t border-line">
            {MUNIN_PAGE.missions.map((mission) => {
              const text = m[mission.id];
              return (
                <li key={mission.id} className="flex items-center gap-5 border-b border-line-soft py-5">
                  <div
                    className="relative w-[7.5rem] shrink-0 overflow-hidden border border-line-soft md:w-[10.5rem]"
                    style={{ aspectRatio: `${mission.image.width} / ${mission.image.height}` }}
                  >
                    <Image src={mission.image.src} alt="" fill unoptimized className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-fg md:text-[0.8125rem]">
                      {text.title}
                      {mission.status && <StatusTag status={mission.status} label={dict.status[mission.status]} />}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg/80">
                      {fill(text.body, { payload: lowerFirst(payload) })}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
