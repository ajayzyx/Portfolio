import type Lenis from 'lenis';

/**
 * Module-level handle to the single Lenis instance created in SmoothScroll.
 * Lets non-provider components (e.g. the case-study modal) pause/resume
 * momentum scrolling and trigger eased scroll-to without prop drilling.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}
