'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Brief intro curtain shown on first paint, then lifts away. */
export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeout = setTimeout(() => setDone(true), reduced ? 150 : 1400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-base"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="overflow-hidden">
            <motion.span
              className="block font-display text-6xl font-light tracking-tightest md:text-7xl"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              Ajayzyx<span className="text-accent">.</span>
            </motion.span>
          </div>
          <motion.div
            className="mt-8 h-px w-48 origin-left overflow-hidden bg-white/[0.12]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block h-full w-full bg-accent" />
          </motion.div>
          <motion.span
            className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Software Engineer
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
