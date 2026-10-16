import type { ElementType, ReactNode } from "react";

/** Mockup section label: short cyan rule + cyan mono caps. */
export function SectionLabel({
  children,
  as: Tag = "h2",
  id,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={`flex items-center gap-3.5 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-cyan md:text-[0.8125rem] ${className}`}
    >
      <span className="h-px w-7 shrink-0 bg-cyan" aria-hidden />
      {children}
    </Tag>
  );
}
