export function TechnicalPanel({
  title,
  items,
  tone,
  code,
}: {
  title: string;
  items: string[];
  tone: "cyan" | "signal";
  code: string;
}) {
  const accentBg = tone === "cyan" ? "bg-cyan" : "bg-signal";
  const accentText = tone === "cyan" ? "text-cyan" : "text-signal";
  return (
    <div
      className="ticks relative h-full border border-line bg-ink/60 p-6 md:p-12 xl:p-16"
      style={{ ["--tick" as string]: tone === "cyan" ? "var(--color-cyan)" : "var(--color-signal)" }}
    >
      <span aria-hidden className={`absolute -top-px left-0 h-[0.125rem] w-24 lg:w-32 ${accentBg}`} />
      <div className="flex items-center justify-between">
        <h3 className="display text-[1.875rem] md:text-[2.625rem] lg:text-[3.25rem]">{title}</h3>
        <span className={`font-mono text-[0.6875rem] tracking-[0.2em] lg:text-[0.875rem] ${accentText}`}>{code}</span>
      </div>
      <ul className="mt-8 border-t border-line md:mt-10 lg:mt-12">
        {items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-5 border-b border-line-soft py-4 md:gap-7 md:py-[1.1875rem] lg:gap-8 lg:py-[1.375rem]">
            <span className={`font-mono text-[0.6875rem] tracking-[0.16em] md:text-[0.8125rem] lg:text-[0.875rem] ${accentText}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[1rem] leading-[1.45] text-fg md:text-[1.0938rem] lg:text-[1.25rem]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
