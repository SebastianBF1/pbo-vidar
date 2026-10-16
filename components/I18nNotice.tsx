/** Review-only badge: shown while UA strings are still TODO_UA and falling back to English. */
export function I18nNotice({ text, count }: { text: string; count: number }) {
  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-3 border border-signal/60 bg-ink/90 px-3 py-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-signal backdrop-blur">
      <span className="h-1.5 w-1.5 animate-pulse bg-signal" aria-hidden />
      {text} · {count} TODO_UA
    </div>
  );
}
