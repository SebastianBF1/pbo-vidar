import type { SVGProps } from "react";

/** Thin technical line icons (24px grid, 1.25 stroke). */
const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  ...props,
});

export const IconLength = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M2.5 12h19M2.5 8v8M21.5 8v8M6 9.5 3.5 12 6 14.5M18 9.5l2.5 2.5-2.5 2.5" />
  </svg>
);
export const IconWidth = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M7 3.5v17M17 3.5v17M8.5 12h7M10.5 10l-2 2 2 2M13.5 10l2 2-2 2" />
  </svg>
);
export const IconWeight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6.5 9h11l2.5 11.5H4z" />
    <circle cx="12" cy="6" r="2.5" />
  </svg>
);
export const IconSpeed = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3.5 17a8.5 8.5 0 1 1 17 0" />
    <path d="M12 17l4.5-5.5M12 8.5v1.5M6 11l1 1M18 11l-1 1" />
  </svg>
);
export const IconMotor = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6z" />
  </svg>
);
export const IconLoad = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3.5 12.5h17v8h-17zM12 2.5v7M9 6.5l3 3 3-3" />
  </svg>
);
export const IconCog = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
  </svg>
);
export const IconInsight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9 17.5h6M10 20.5h4M12 3.5a6 6 0 0 0-3.5 10.9V17.5h7v-3.1A6 6 0 0 0 12 3.5z" />
  </svg>
);
export const IconShield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 2.5 4.5 5.5v6c0 4.6 3.1 8.4 7.5 10 4.4-1.6 7.5-5.4 7.5-10v-6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </svg>
);
export const ArrowRight = ({ className = "" }: { className?: string }) => (
  <span aria-hidden className={`arrow ${className}`}>
    →
  </span>
);
/** ↗ drawn as SVG: the text glyph falls back to a thin system font and reads smaller than →. */
export const ArrowUpRight = ({ className = "" }: { className?: string }) => (
  <span aria-hidden className={`arrow ${className}`}>
    <svg
      viewBox="0 0 16 16"
      width="1.3em"
      height="1.3em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="square"
      className="block"
    >
      <path d="M4.5 11.5 11.5 4.5M5.75 4.5h5.75v5.75" />
    </svg>
  </span>
);
export const IconRange = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="6" cy="17.5" r="2" />
    <circle cx="18" cy="6.5" r="2" />
    <path d="M7.5 16 16.5 8M3.5 21.5h17" strokeDasharray="2 2.5" />
  </svg>
);
export const IconBattery = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 7.5h16v9H3zM19 10.5h2v3h-2M7 10v4M10.5 10v4" />
  </svg>
);
/* Social glyphs, drawn in the same 1.25-stroke line style as the technical icons. */
export const IconFacebook = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M15.5 7.5h-1.75A2.25 2.25 0 0 0 11.5 9.75V21M9 12.5h6" />
  </svg>
);
export const IconInstagram = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.25" cy="6.75" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
export const IconYouTube = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
    <path d="M10 9.25v5.5l4.75-2.75z" fill="currentColor" stroke="none" />
  </svg>
);
export const IconMail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 5.5h18v13H3zM3 6l9 7 9-7" />
  </svg>
);
export const IconSignal = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="10" r="1.5" />
    <path d="M12 11.5v9M8.5 6.5a5 5 0 0 0 0 7M15.5 6.5a5 5 0 0 1 0 7M5.75 3.75a9 9 0 0 0 0 12.5M18.25 3.75a9 9 0 0 1 0 12.5" />
  </svg>
);
export const IconWaves = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M2.5 8c1.6-1.4 3.2-1.4 4.75 0s3.15 1.4 4.75 0 3.15-1.4 4.75 0 3.15 1.4 4.75 0M2.5 13c1.6-1.4 3.2-1.4 4.75 0s3.15 1.4 4.75 0 3.15-1.4 4.75 0 3.15 1.4 4.75 0M2.5 18c1.6-1.4 3.2-1.4 4.75 0s3.15 1.4 4.75 0 3.15-1.4 4.75 0 3.15 1.4 4.75 0" />
  </svg>
);
export const IconExpand = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M14.5 3.5h6v6M20.5 3.5l-7 7M9.5 20.5h-6v-6M3.5 20.5l7-7" />
  </svg>
);
export const IconClose = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);
