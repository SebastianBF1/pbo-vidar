import Link from "next/link";
import { ArrowUpRight } from "../Icons";

/** Small link at the foot of a product page to the homepage “Open for opportunities” section (same language). */
export function CollaborationLink({ locale, label }: { locale: string; label: string }) {
  return (
    <div className="container-x pt-8 pb-12 md:pt-10 md:pb-16">
      <Link
        href={`/${locale}#opportunities`}
        className="arrow-link inline-flex min-h-11 items-center gap-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-fg/70 transition-colors duration-300 hover:text-cyan"
      >
        <span className="h-px w-6 shrink-0 bg-cyan" aria-hidden />
        {/* the arrow follows the last word when the label wraps on phones */}
        <span>
          {label}
          <ArrowUpRight className="ml-2.5 align-[-0.2em]" />
        </span>
      </Link>
    </div>
  );
}
