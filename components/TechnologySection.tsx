import type { Dictionary } from "@/lib/i18n";
import { TechnicalPanel } from "./TechnicalPanel";

/** With `title`: top of the Technology page — the title becomes the page's h1 and the section clears the header. */
export function TechnologySection({ dict, title }: { dict: Dictionary; title?: string }) {
  const c = dict.capabilities;
  return (
    <section
      id="technology"
      aria-label={title ? undefined : c.label}
      aria-labelledby={title ? "technology-title" : undefined}
      className={`relative pb-20 md:pb-28 lg:pb-32 ${title ? "pt-32 md:pt-40 lg:pt-44" : "border-t border-line pt-20 md:pt-28 lg:pt-32"}`}
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden />
      <div className="container-x relative">
        <p className="label flex items-center gap-3" data-reveal>
          <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
          {c.label}
        </p>
        {title && (
          <h1 id="technology-title" className="display mt-5 text-[2.75rem] md:text-[3.75rem] xl:text-[4rem]" data-reveal>
            {title}
          </h1>
        )}
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
