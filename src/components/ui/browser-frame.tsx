import type { ReactNode } from 'react';

/**
 * A minimal browser chrome wrapper for product screenshots. Purely
 * presentational; the caller supplies the viewport content (an image, a
 * cycling preview, etc.).
 */
export function BrowserFrame({
  url,
  children,
  className = '',
  active = false,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
  /** Driven by the parent card's shared hover state — brightens the border. */
  active?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl2 border bg-[#161617] shadow-2xl shadow-black/60 transition-colors duration-500 ${
        active ? 'border-white/25' : 'border-white/[0.09]'
      } ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        {url ? (
          <span className="mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[0.66rem] text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
            {url}
          </span>
        ) : (
          <span className="mx-auto" />
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-base">
        {children}
      </div>
    </div>
  );
}
