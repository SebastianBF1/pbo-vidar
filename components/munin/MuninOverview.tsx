import type { Dictionary } from "@/lib/i18n";
import type { MuninCopy } from "@/lib/product-copy";
import { RequestSpecs } from "../product/RequestSpecs";
import { SectionLabel } from "./SectionLabel";

export function MuninOverview({
  copy,
  dict,
  productName,
  locale,
}: {
  copy: MuninCopy;
  dict: Dictionary;
  productName: string;
  locale: string;
}) {
  const o = copy.overview;

  return (
    <section id="overview" aria-labelledby="overview-title" className="relative border-t border-line-soft pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="container-x grid lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-5" data-reveal>
          <SectionLabel id="overview-title">{dict.productPage.overviewLabel}</SectionLabel>
          <p className="display mt-6 max-w-[22ch] text-[1.875rem] leading-[0.98] md:text-[2.375rem]">{o.heading}</p>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-fg/85 md:text-[1.125rem]">{o.lead}</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <RequestSpecs productName={productName} dict={dict} locale={locale} />
        </div>
      </div>
    </section>
  );
}
