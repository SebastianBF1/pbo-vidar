import type { Dictionary } from "@/lib/i18n";
import { TechnicalPanel } from "./TechnicalPanel";

export function TechnologySection({ dict }: { dict: Dictionary }) {
  const c = dict.capabilities;
  return (
    <section id="technology" aria-label={c.label} className="relative border-t border-line py-20 md:py-28 lg:py-32">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden />
      <div className="container-x relative">
        <p className="label flex items-center gap-3" data-reveal>
          <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
          {c.label}
        </p>
        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <div data-reveal>
            <TechnicalPanel title={c.whatWeDo.title} items={c.whatWeDo.items} tone="cyan" code="A" />
          </div>
          <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <TechnicalPanel title={c.whyUs.title} items={c.whyUs.items} tone="signal" code="B" />
          </div>
        </div>
      </div>
    </section>
  );
}
