'use client';

import { useEffect } from 'react';

/**
 * A soft, warm glow that follows the pointer across the whole page. Purely
 * decorative; writes the cursor position to CSS variables consumed by the
 * `.spotlight` layer. No-ops on coarse pointers and reduced-motion.
 */
export function Spotlight() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = document.documentElement;
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
      });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="spotlight" aria-hidden="true" />;
}
