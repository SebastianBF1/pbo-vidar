import type { SpecStatus } from "@/data/platforms";

const STYLE: Record<Exclude<SpecStatus, "stated">, string> = {
  calculated: "border-signal/70 text-signal",
  optional: "border-cyan/60 text-cyan",
  target: "border-dashed border-white/40 text-fg/75",
};

/** Small technical tag that distinguishes calculated / optional / integration-target values from stated specs. */
export function StatusTag({ status, label, className = "" }: { status: SpecStatus; label: string; className?: string }) {
  if (status === "stated") return null;
  return (
    <span
      className={`inline-flex items-center border px-1.5 py-[0.1875rem] font-mono text-[0.6563rem] leading-none uppercase tracking-[0.12em] md:text-[0.5938rem] md:tracking-[0.16em] whitespace-nowrap ${STYLE[status]} ${className}`}
    >
      {label}
    </span>
  );
}
