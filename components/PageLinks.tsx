import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { CollaborationLink } from "./product/CollaborationLink";

/**
 * Closing link row of the About and Technology pages: a secondary CTA (the hero's outlined button style)
 * and, optionally, the understated collaboration link used on the product pages.
 */
export function PageLinks({
  locale,
  cta,
  collaboration,
}: {
  locale: string;
  cta: { href: string; label: string; arrow: "right" | "up-right" };
  /** Label of the understated link to the homepage collaboration section. */
  collaboration?: string;
}) {
  const Arrow = cta.arrow === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <section className="relative border-t border-line">
      <div className="container-x flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:gap-10 md:py-20">
        <Link
          href={cta.href}
          className="arrow-link inline-flex h-14 w-full items-center justify-between gap-6 border border-white/25 px-6 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-cyan hover:text-cyan sm:h-[3.25rem] sm:w-auto sm:justify-start"
        >
          {cta.label}
          <Arrow />
        </Link>
        {collaboration && <CollaborationLink locale={locale} label={collaboration} bare />}
      </div>
    </section>
  );
}
