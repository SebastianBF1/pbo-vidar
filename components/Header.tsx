"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HEADER_NAV, navHref } from "@/lib/nav";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

export interface NavLabels {
  about: string;
  platforms: string;
  technology: string;
  impact: string;
  contact: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  home: string;
}


export function Header({ locale, nav, tagline }: { locale: string; nav: NavLabels; tagline: string[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock while the mobile menu is open. The cleanup always releases it, including when this
  // route tree is unmounted or hidden by a navigation.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        // No backdrop-filter while the menu is open: it would become the containing block of the fixed overlay.
        open
          ? "border-b border-transparent bg-ink"
          : solid
            ? "border-b border-line-soft bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-[4.75rem] lg:h-[5.75rem]">
        <Link href={`/${locale}`} aria-label={nav.home} className="relative z-10" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 lg:flex xl:gap-12">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-7 xl:gap-10">
              {HEADER_NAV.map((id) => (
                <li key={id}>
                  <Link
                    href={navHref(id, locale)}
                    className="group relative py-2 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-fg/85 transition-colors duration-300 hover:text-fg xl:text-[0.8125rem]"
                  >
                    {nav[id]}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-cyan transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span className="h-6 w-px bg-white/20" aria-hidden />
          <LanguageSwitch label={nav.language} className="text-[0.75rem] xl:text-[0.8125rem]" />
        </div>

        <button
          type="button"
          className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? nav.closeMenu : nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-fg transition-transform duration-500 ease-out-expo ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px bg-fg transition-all duration-500 ease-out-expo ${
                open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-0 z-0 flex flex-col bg-ink transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="container-x relative flex flex-1 flex-col pt-28 pb-10">
          <nav aria-label="Mobile">
            <ul className="border-t border-line">
              {HEADER_NAV.map((id, i) => (
                <li
                  key={id}
                  className="border-b border-line transition-[opacity,transform] duration-700 ease-out-expo"
                  style={{
                    transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(12px)",
                  }}
                >
                  <Link
                    href={navHref(id, locale)}
                    onClick={() => setOpen(false)}
                    className="arrow-link flex items-baseline justify-between py-5"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className={`font-mono text-[0.6875rem] tracking-[0.2em] ${i % 2 ? "text-signal" : "text-cyan"}`}>
                        0{i + 1}
                      </span>
                      <span className="display text-[2.5rem] leading-none">{nav[id]}</span>
                    </span>
                    <span className="arrow text-muted">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex items-end justify-between gap-6 pt-10">
            <p className="label leading-relaxed">
              {tagline[0]}
              <br />
              {tagline[1]}
            </p>
            <LanguageSwitch label={nav.language} className="text-[0.8125rem]" />
          </div>
        </div>
      </div>
    </header>
  );
}
