'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowDownRight, Github } from 'lucide-react';
import { hero, projects, site, socials } from '@/lib/site';
import { BrowserFrame } from '@/components/ui/browser-frame';
import { Magnetic } from '@/components/ui/magnetic';

const previews = projects.filter((p) => p.kind === 'browser' && p.image);

const lineReveal = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.35 + i * 0.12 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.75 + i * 0.1 },
  }),
};

function CyclingPreview() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % previews.length);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  const project = previews[index];
  if (!project) return null;

  return (
    <BrowserFrame url={project.domain}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={project.image as string}
            alt={`${project.name} — live site preview`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>

      {/* project label + progress dots */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pb-3.5 pt-10">
        <AnimatePresence mode="wait">
          <motion.span
            key={project.slug}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs tracking-wide text-cream"
          >
            {project.name}
            <span className="text-muted"> — {project.category}</span>
          </motion.span>
        </AnimatePresence>
        <span className="flex gap-1.5">
          {previews.map((p, i) => (
            <span
              key={p.slug}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-5 bg-accent' : 'w-1.5 bg-white/25'
              }`}
            />
          ))}
        </span>
      </div>
    </BrowserFrame>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const lines = [hero.line1, hero.line2, hero.line3];

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-32 md:pt-28"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] max-w-full -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(255,92,53,0.14), transparent 70%)',
        }}
      />

      <div className="container-content">
        <motion.div style={{ y: headlineY, opacity: fade }}>
          {/* availability */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <span className="eyebrow text-cream">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {hero.available}
            </span>
            <span className="eyebrow">{site.location}</span>
          </motion.div>

          {/* headline */}
          <h1 className="max-w-[15ch] font-display text-fluid-display font-light leading-[0.92] tracking-tightest">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className={`block ${i === 2 ? 'text-cream-fade' : ''}`}
                >
                  {line}
                  {i === 2 && <span className="text-accent">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        {/* lower row: intro + CTA / preview */}
        <div className="mt-14 grid items-end gap-12 lg:mt-20 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="max-w-md text-base leading-relaxed text-muted md:text-lg"
            >
              {hero.intro}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.25}>
                <Link
                  href="#work"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-cream px-8 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent"
                >
                  View Work
                  <ArrowDownRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </Link>
              </Magnetic>
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-4 text-sm text-cream transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                <Github size={16} />
                GitHub
              </a>
            </motion.div>
          </div>

          <motion.div
            style={{ y: previewY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.9 }}
          >
            <CyclingPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
