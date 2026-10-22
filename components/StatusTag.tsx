import type { SpecStatus } from "@/data/platforms";

/** Small technical tag marking an optional configuration. */
export function StatusTag({ status, label, className = "" }: { status: SpecStatus; label: string; className?: string }) {
  if (status === "stated") return null;
  return (
    <span
      className={`inline-flex items-center border border-cyan/60 px-1.5 py-[0.1875rem] font-mono text-[0.6563rem] leading-none uppercase tracking-[0.12em] text-cyan md:text-[0.5938rem] md:tracking-[0.16em] whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  );
}
