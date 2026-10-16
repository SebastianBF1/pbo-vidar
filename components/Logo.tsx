import Image from "next/image";
import { IMAGES } from "@/data/images";

/** PBO mark (extracted from supplied material) + PBO VIDAR wordmark. Sized in rem so it follows the fluid scale. */
export function Logo({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const mark =
    size === "lg"
      ? "h-[3.25rem] w-auto"
      : // header: 36px on phones, 50px from lg
        "h-[2.25rem] w-auto lg:h-[3.125rem]";
  const word = size === "lg" ? "text-[1.25rem]" : "text-[0.9375rem] lg:text-[1.25rem]";
  return (
    <span className={`flex items-center gap-3 lg:gap-3.5 ${className}`}>
      <Image
        src={IMAGES.logoMark.src}
        alt=""
        width={IMAGES.logoMark.width}
        height={IMAGES.logoMark.height}
        className={`shrink-0 ${mark}`}
      />
      <span className={`flex flex-col font-sans font-bold uppercase leading-[0.95] tracking-[0.08em] ${word}`}>
        <span>PBO</span>
        <span>Vidar</span>
      </span>
    </span>
  );
}
