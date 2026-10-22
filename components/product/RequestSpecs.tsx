import { specsRequestMail } from "@/data/company";
import type { Dictionary } from "@/lib/i18n";
import { ArrowRight } from "../Icons";
import { CollaborationLink } from "./CollaborationLink";

/**
 * “Request specifications” panel beside the product description: specifications are not published, so the
 * button opens a prepared email about this product (blue, like “Get in contact” in the homepage hero).
 */
export function RequestSpecs({ productName, dict, locale }: { productName: string; dict: Dictionary; locale: string }) {
  const r = dict.productPage.requestSpecs;
  return (
    <div id="request-specifications" className="relative mt-8 border border-line bg-ink-2 px-5 pt-6 pb-4 md:mt-10 md:px-7 md:pt-7">
      <span className="absolute -top-px left-0 h-[0.125rem] w-14 bg-signal" aria-hidden />
      <p className="max-w-[46ch] text-[0.9688rem] leading-relaxed text-fg/85 md:text-[1.0625rem]">{r.text}</p>
      <a
        href={specsRequestMail(productName).href}
        className="arrow-link mt-5 inline-flex h-[3.25rem] w-full items-center justify-between gap-6 bg-[#1d63ed] px-6 font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#3a78f2] sm:w-auto"
      >
        {r.label}
        <ArrowRight />
      </a>
      <div className="mt-3">
        <CollaborationLink locale={locale} label={dict.opportunities.productLink} bare />
      </div>
    </div>
  );
}
