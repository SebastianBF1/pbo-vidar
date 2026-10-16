"use client";

import { useEffect } from "react";

/**
 * Product pages stream their content (Suspense), so the browser's own jump to `#section` can run before the
 * section exists and silently land at the top. On mount, wait for the anchor target and scroll to it once.
 * Used by the language switch, which carries the current section across locales.
 */
export function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    let frame = 0;
    const started = performance.now();
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        // Instant (not smooth) so the user arrives where they were; scroll-margin keeps it clear of the header.
        if (Math.abs(el.getBoundingClientRect().top) > 120) el.scrollIntoView({ behavior: "instant", block: "start" });
        return;
      }
      if (performance.now() - started < 3000) frame = requestAnimationFrame(tryScroll);
    };
    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, []);
  return null;
}
