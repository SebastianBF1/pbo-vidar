import { productEnquiryMail } from "@/data/company";
import { ArrowRight } from "../Icons";
import { CollaborationLink } from "./CollaborationLink";

/**
 * Foot of a product page, before Other Platforms: “Discuss this platform” (outlined CTA → prepared email about
 * this product) and the understated link to the homepage collaboration section.
 */
export function ProductEnquiry({
  productName,
  locale,
  label,
  collaborationLabel,
}: {
  productName: string;
  locale: string;
  label: string;
  collaborationLabel: string;
}) {
  return (
    <div className="container-x flex flex-col items-start gap-6 pt-8 pb-12 sm:flex-row sm:items-center sm:gap-10 md:pt-10 md:pb-16">
      <a
        href={productEnquiryMail(productName).href}
        className="arrow-link inline-flex h-14 w-full items-center justify-between gap-6 border border-white/25 px-6 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-cyan hover:text-cyan sm:h-[3.25rem] sm:w-auto sm:justify-start"
      >
        {label}
        <ArrowRight />
      </a>
      <CollaborationLink locale={locale} label={collaborationLabel} bare />
    </div>
  );
}
