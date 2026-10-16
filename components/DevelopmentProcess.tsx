export function DevelopmentProcess({ title, steps, notes }: { title: string; steps: string[]; notes: string[] }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-6" data-reveal>
        <h3 className="display text-[1.875rem] md:text-[2.75rem] lg:text-[4rem]">{title}</h3>
        <span className="label hidden md:block lg:text-[0.8125rem]">01 — 0{steps.length}</span>
      </div>
      <div data-line className="mt-8 h-px bg-line lg:mt-10" aria-hidden />
      <ol className="grid grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
            className="relative border-line-soft py-8 pr-4 max-lg:[&:nth-child(-n+2)]:border-b max-lg:[&:nth-child(even)]:border-l max-lg:[&:nth-child(even)]:pl-5 lg:py-16 lg:pr-14 lg:[&:nth-child(n+2)]:pl-10 lg:[&:nth-child(n+2)]:border-l"
          >
            <span
              className={`display block text-[3.5rem] leading-none tracking-normal md:text-[5rem] lg:text-[7.5rem] ${
                i % 2 === 0 ? "text-cyan" : "text-signal"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-5 block font-mono text-[0.75rem] uppercase tracking-[0.22em] text-fg md:text-[0.8125rem] lg:mt-7 lg:text-[1rem] lg:tracking-[0.2em]">
              {step}
            </span>
            <span className="mt-3 block max-w-[26ch] text-[0.875rem] leading-snug text-muted md:text-[0.9375rem] lg:mt-4 lg:text-[1.125rem] lg:leading-[1.45]">{notes[i]}</span>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-1/2 right-4 hidden -translate-y-1/2 font-mono text-[1.25rem] text-muted lg:right-5 lg:block lg:text-[1.75rem]"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
