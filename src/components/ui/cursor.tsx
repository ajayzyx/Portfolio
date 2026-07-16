'use client';

import { useEffect, useRef, useState } from 'react';

/** Base diameter in px. Growth is done with scale() so it stays GPU-only. */
const SIZE = 12;
/** Scale when hovering something interactive (~41px). */
const ACTIVE_SCALE = 3.4;
/** Position lerp — high enough to read as instant, low enough to stay silky. */
const FOLLOW = 0.4;
const SCALE_FOLLOW = 0.2;
const FADE_FOLLOW = 0.2;

const INTERACTIVE =
  'a, button, input, textarea, select, label, summary, [role="button"], [data-cursor]';

/**
 * The site's cursor. The native cursor is hidden globally for fine pointers
 * (see globals.css), so this element IS the cursor — it must therefore render
 * for every fine pointer regardless of viewport width, and paint above every
 * overlay (modal z-80, loader z-95).
 *
 * Coarse pointers (touch) and reduced-motion users keep the native cursor and
 * this renders nothing — the CSS that hides the native cursor is gated on the
 * same two conditions, so the two can never disagree and leave no cursor.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fine && !reduced) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = dotRef.current;
    if (!el) return;

    // Kept in refs/closure and written straight to style in a rAF loop — the
    // cursor never re-renders React, so it can't stutter under load.
    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let targetScale = 1;
    let scale = 1;
    let targetAlpha = 0;
    let alpha = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      targetAlpha = 1;
      const t = e.target as Element | null;
      targetScale = t?.closest?.(INTERACTIVE) ? ACTIVE_SCALE : 1;
    };
    const onOut = () => {
      targetAlpha = 0;
    };
    const onOver = () => {
      targetAlpha = 1;
    };

    const tick = () => {
      x += (targetX - x) * FOLLOW;
      y += (targetY - y) * FOLLOW;
      scale += (targetScale - scale) * SCALE_FOLLOW;
      alpha += (targetAlpha - alpha) * FADE_FOLLOW;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = String(alpha * 0.85);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onOut);
    document.addEventListener('mouseenter', onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onOut);
      document.removeEventListener('mouseenter', onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference"
      style={{
        width: SIZE,
        height: SIZE,
        opacity: 0,
        willChange: 'transform, opacity',
      }}
    />
  );
}
