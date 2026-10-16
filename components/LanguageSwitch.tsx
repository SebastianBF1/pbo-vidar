"use client";

import { usePathname } from "next/navigation";
import { BASE_PATH } from "@/lib/asset";
import type { MouseEvent } from "react";

const LANGS = [
  { code: "ua", label: "UA", hrefLang: "uk" },
  { code: "en", label: "EN", hrefLang: "en" },
] as const;

const LOCALE_PREFIX = /^\/(en|ua)(?=\/|$)/;

/** Id of the section currently at the top of the viewport, so a language switch lands in the same place. */
function currentSectionId(): string | null {
  if (window.scrollY < 120) return null;
  const marker = window.innerHeight * 0.3;
  let current: string | null = null;
  for (const el of document.querySelectorAll<HTMLElement>("main section[id], footer[id]")) {
    if (el.offsetParent === null) continue; // skip hidden route trees
    if (el.getBoundingClientRect().top <= marker) current = el.id;
  }
  return current;
}

/**
 * UA | EN switch. The URL is the single source of truth: the active language is read from the
 * pathname, and switching swaps only the locale segment (keeping the rest of the path and the
 * current section). It uses a full document navigation so <html lang>, metadata and every
 * server-rendered string are rebuilt for the new locale.
 */
export function LanguageSwitch({ label, className = "" }: { label: string; className?: string }) {
  const pathname = usePathname() ?? "/en";
  const active = pathname.match(LOCALE_PREFIX)?.[1] ?? "en";
  const rest = pathname.replace(LOCALE_PREFIX, "");

  const onClick = (e: MouseEvent<HTMLAnchorElement>, code: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (code === active) return;
    const section = currentSectionId();
    // Deliberate document navigation: the locale is the root-layout segment, and a soft navigation
    // would keep the previous locale's tree mounted (hidden) alongside the new one.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign(`${BASE_PATH}/${code}${rest}${section ? `#${section}` : ""}`);
  };

  return (
    <nav aria-label={label} className={`flex items-center font-mono text-[0.6875rem] tracking-[0.2em] ${className}`}>
      {LANGS.map((l, i) => {
        const isActive = l.code === active;
        return (
          <span key={l.code} className="flex items-center">
            {i > 0 && <span className="mx-3 h-[1.1em] w-px bg-white/30" aria-hidden />}
            <a
              href={`${BASE_PATH}/${l.code}${rest}`}
              hrefLang={l.hrefLang}
              lang={l.hrefLang}
              aria-current={isActive ? "true" : undefined}
              onClick={(e) => onClick(e, l.code)}
              className={`px-0.5 py-2.5 transition-colors duration-300 ${isActive ? "font-medium text-fg" : "text-fg/60 hover:text-fg"}`}
            >
              {l.label}
              <span
                aria-hidden
                className={`mt-1 block h-px bg-signal transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"}`}
              />
            </a>
          </span>
        );
      })}
    </nav>
  );
}
