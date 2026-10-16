"use client";

import Image from "next/image";
import { useRef } from "react";
import { IconClose, IconExpand } from "../Icons";

/** Expand button + native modal dialog (focus trap, Esc to close) showing the view larger. */
export function ViewLightbox({
  title,
  expandLabel,
  closeLabel,
  src,
  width,
  height,
  alt,
  maxWidth,
}: {
  title: string;
  expandLabel: string;
  closeLabel: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS max width of the enlarged image (keeps low-resolution sources from being over-enlarged). */
  maxWidth: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-label={expandLabel}
        className="flex h-11 w-11 items-center justify-center text-fg/75 transition-colors duration-300 hover:text-cyan"
      >
        <IconExpand className="h-[1.125rem] w-[1.125rem]" />
      </button>
      <dialog
        ref={ref}
        aria-label={title}
        onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
        className="m-auto max-h-[92vh] w-[min(92vw,var(--mw))] max-w-none overflow-visible border border-line bg-ink p-0 text-fg backdrop:bg-[rgb(3_8_13/0.88)] backdrop:backdrop-blur-sm"
        style={{ ["--mw" as string]: maxWidth }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-1">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-fg/85">{title}</p>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={closeLabel}
            className="flex h-11 w-11 items-center justify-center text-fg/75 transition-colors duration-300 hover:text-cyan"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>
        <Image src={src} alt={alt} width={width} height={height} quality={85} sizes="92vw" className="block h-auto max-h-[80vh] w-full object-contain" />
      </dialog>
    </>
  );
}
