import Image from "next/image";
import { MUNIN_PAGE } from "@/data/munin";
import type { MuninCopy } from "@/lib/product-copy";
import { SectionLabel } from "./SectionLabel";

export function MuninEnvironments({ copy }: { copy: MuninCopy }) {
  const e = copy.page.environments;
  return (
    <section id="environments" aria-labelledby="environments-title" className="relative pt-4 pb-16 md:pb-24">
      <div className="container-x">
        <SectionLabel id="environments-title">{e.title}</SectionLabel>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:mt-7 md:gap-4 lg:grid-cols-4">
          {MUNIN_PAGE.environments.map((env, i) => (
            <li
              key={env.id}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className="group relative aspect-[16/10] overflow-hidden border border-line lg:aspect-[16/9]"
            >
              <Image
                src={env.image.src}
                alt=""
                fill
                unoptimized
                className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 to-transparent" aria-hidden />
              <p className="absolute bottom-3 left-3 flex items-center gap-2.5 font-mono text-[0.71875rem] uppercase tracking-[0.16em] text-fg md:bottom-4 md:left-4 md:text-[0.8125rem]">
                <span className="h-4 w-[0.1875rem] bg-cyan" aria-hidden />
                {e[env.id]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
