import type { ComponentType, SVGProps } from "react";

export function CapabilityPillar({
  index,
  title,
  body,
  Icon,
}: {
  index: number;
  title: string;
  body: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="group relative flex h-full flex-col border-t border-line py-7 md:border-t-0 md:border-l md:px-7 md:py-2 lg:px-8">
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-10 bg-cyan md:top-0 md:h-10 md:w-px transition-[height,width] duration-700 ease-out-expo md:group-hover:h-20"
      />
      <div className="flex items-center justify-between md:flex-col md:items-start md:gap-10">
        <Icon className="h-8 w-8 text-cyan md:h-9 md:w-9" />
        <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-muted md:order-first">0{index + 1}</span>
      </div>
      <span className="hidden md:block md:flex-1 md:min-h-16" aria-hidden />
      <h3 className="display mt-6 text-[1.625rem] leading-[1] md:mt-0 md:flex md:min-h-[2em] md:items-end md:text-[1.75rem]">{title}</h3>
      <p className="mt-3 max-w-[24ch] text-[0.9375rem] leading-relaxed text-fg/70 md:min-h-[6.6em]">{body}</p>
    </div>
  );
}
