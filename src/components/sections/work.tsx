'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Github, Plus, X } from 'lucide-react';
import { projects, type Project } from '@/lib/site';
import { getLenis } from '@/lib/lenis';
import { BrowserFrame } from '@/components/ui/browser-frame';
import { ApiPreview } from '@/components/ui/api-preview';

function LinkPill({
  href,
  label,
  type,
}: {
  href: string;
  label: string;
  type: 'live' | 'github';
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-4 py-2 text-xs font-medium text-cream transition-colors duration-300 hover:border-accent/50 hover:text-accent"
    >
      {type === 'github' ? <Github size={14} /> : <ArrowUpRight size={14} />}
      {label}
    </a>
  );
}

function Preview({ project, active }: { project: Project; active: boolean }) {
  if (project.kind === 'api') {
    return (
      <BrowserFrame active={active}>
        <ApiPreview />
      </BrowserFrame>
    );
  }
  return (
    <BrowserFrame url={project.domain} active={active}>
      <Image
        src={project.image as string}
        alt={`${project.name} — live site`}
        fill
        sizes="(max-width: 1024px) 100vw, 620px"
        className={`object-cover object-top transition-transform duration-[1.1s] ease-smooth ${
          active ? 'scale-[1.04]' : 'scale-100'
        }`}
      />
    </BrowserFrame>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Scroll parallax lives on its OWN element so it never fights the
  // hover-lift transform (inline styles would otherwise win over classes).
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const flip = index % 2 === 1;

  // ONE source of truth for the whole card. Set by native mouseenter/mouseleave
  // on the root — these fire once when the pointer enters the article subtree
  // and once when it fully leaves, regardless of which child (image, text,
  // chips, whitespace, corners) is under the cursor and independent of z-index
  // or stacking contexts. Every child reads this boolean, so the card is a
  // single interactive object with no dead zones.
  const [active, setActive] = useState(false);

  // Clicking anywhere on the card opens the case study (mouse enhancement).
  // Keyboard / screen-reader users use the explicit "Case study" button and the
  // links below — so the article stays a non-interactive container and we avoid
  // nesting interactive elements. Links inside stop propagation to navigate.
  const handleClick = useCallback(() => onOpen(project), [onOpen, project]);

  return (
    <motion.article
      ref={ref}
      id={`project-${project.slug}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={handleClick}
      data-cursor
      className="group relative grid cursor-pointer items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      {/* Whole-card hover glow. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-x-4 -inset-y-8 -z-10 rounded-[3rem] blur-3xl transition-opacity duration-500 sm:-inset-x-8 sm:-inset-y-12 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ background: `radial-gradient(45% 55% at ${flip ? '75%' : '25%'} 50%, ${project.accent}2e, transparent)` }}
      />

      {/* media — parallax outer, hover-lift inner (separate transforms) */}
      <motion.div
        style={{ y: parallaxY }}
        className={flip ? 'lg:order-2' : ''}
      >
        <motion.div
          animate={{ y: active ? -10 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Preview project={project} active={active} />
        </motion.div>
      </motion.div>

      {/* text */}
      <div className={flip ? 'lg:order-1' : ''}>
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-cream">0{index + 1}</span>
          <span
            className={`h-px bg-white/20 transition-all duration-500 ease-smooth ${
              active ? 'w-12' : 'w-8'
            }`}
          />
          <span style={{ color: project.accent }}>{project.category}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>

        <h3
          className={`mt-5 font-display text-fluid-h3 font-light leading-none tracking-tightest transition-transform duration-500 ease-smooth ${
            active ? 'translate-x-1.5' : 'translate-x-0'
          }`}
        >
          {project.name}
        </h3>

        <p
          className={`mt-5 max-w-md text-[0.95rem] leading-relaxed transition-colors duration-300 ${
            active ? 'text-cream/75' : 'text-muted'
          }`}
        >
          {project.blurb}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech, ti) => (
            <li
              key={tech}
              style={{ transitionDelay: active ? `${ti * 40}ms` : '0ms' }}
              className={`rounded-full border bg-white/[0.02] px-3 py-1 font-mono text-[0.68rem] transition-colors duration-300 ${
                active ? 'border-white/25 text-cream/85' : 'border-white/10 text-muted'
              }`}
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
            className={`group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-ink transition-colors duration-300 ${
              active ? 'bg-accent' : 'bg-cream'
            }`}
          >
            <Plus size={14} className="transition-transform duration-300 group-hover/btn:rotate-90" />
            Case study
          </button>
          {project.links.map((link) => (
            <LinkPill key={link.href} href={link.href} label={link.label} type={link.type} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = getLenis();
    const scroller = scrollRef.current;

    // Lock the background WITHOUT moving it. Pause Lenis (it owns momentum),
    // then freeze native scroll and compensate for the scrollbar so the page
    // behind doesn't shift. window.scrollY is never touched, so closing
    // returns the user exactly where they were — no jump to top.
    lenis?.stop();
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    // Always begin the modal at the first line, and move focus into it.
    if (scroller) scroller.scrollTop = 0;
    // Remember what opened the modal so focus can return there on close.
    const trigger = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });

    const focusable = () => {
      const panel = panelRef.current;
      if (!panel) return [] as HTMLElement[];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.getClientRects().length > 0);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Focus trap — Tab cycles within the dialog, never behind it.
      if (e.key !== 'Tab') return;
      const list = focusable();
      if (!list.length) return;
      const first = list[0]!;
      const last = list[list.length - 1]!;
      const activeEl = document.activeElement;
      if (e.shiftKey) {
        if (activeEl === first || activeEl === panelRef.current) {
          e.preventDefault();
          last.focus();
        }
      } else if (activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      window.removeEventListener('keydown', onKey);
      lenis?.start();
      // Return focus to whatever opened the dialog.
      trigger?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.985 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl2 border border-white/10 bg-surface shadow-2xl shadow-black/70 outline-none"
      >
        {/* accent bar */}
        <div
          className="h-1 w-full shrink-0"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        {/* ── Header (fixed) ── */}
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.07] px-7 py-5 sm:px-10 sm:py-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              <span style={{ color: project.accent }}>{project.category}</span>
              <span aria-hidden>·</span>
              <span>{project.year}</span>
            </div>
            <h3 className="mt-2 font-display text-3xl font-light leading-none tracking-tightest sm:text-4xl">
              {project.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 bg-base/40 text-muted transition-colors hover:border-accent/50 hover:text-cream"
          >
            <X size={16} />
          </button>
        </header>

        {/* ── Scrollable content (the only scroller) ──
            data-lenis-prevent stops the page's Lenis smooth-scroll from
            swallowing wheel/touch events here, so this element scrolls
            natively. Without it the div is scrollable programmatically but a
            real wheel/trackpad can't move it. */}
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-7 py-8 sm:px-10"
        >
          <div className="overflow-hidden rounded-xl border border-white/[0.07]">
            <div className="relative aspect-[16/9]">
              {project.kind === 'api' ? (
                <ApiPreview />
              ) : (
                <Image
                  src={project.image as string}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover object-top"
                />
              )}
            </div>
          </div>

          <div className="mt-10 space-y-9">
            <section>
              <h4 className="eyebrow mb-3">The problem</h4>
              <p className="max-w-prose text-[0.95rem] leading-relaxed text-cream/85">
                {project.detail.problem}
              </p>
            </section>

            <section>
              <h4 className="eyebrow mb-4">Approach</h4>
              <ul className="space-y-3">
                {project.detail.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-[0.95rem] leading-relaxed text-cream/85"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: project.accent }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="eyebrow mb-3">Results</h4>
              <p className="max-w-prose text-[0.95rem] leading-relaxed text-cream/85">
                {project.detail.outcome}
              </p>
            </section>
          </div>
        </div>

        {/* ── Footer (fixed) ── */}
        <footer className="flex shrink-0 flex-col gap-4 border-t border-white/[0.07] bg-surface px-7 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.66rem] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 flex-wrap gap-2.5">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className={
                  link.type === 'live'
                    ? 'inline-flex items-center gap-1.5 rounded-full bg-cream px-5 py-2.5 text-xs font-medium text-ink transition-colors duration-300 hover:bg-accent'
                    : 'inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium text-cream transition-colors duration-300 hover:border-accent/50 hover:text-accent'
                }
              >
                {link.type === 'github' ? <Github size={14} /> : <ArrowUpRight size={14} />}
                {link.type === 'live' ? 'Live Demo' : 'GitHub'}
              </a>
            ))}
          </div>
        </footer>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export function Work() {
  const [selected, setSelected] = useState<Project | null>(null);

  // Open a project: smoothly bring its card into view first if it isn't
  // already, THEN open the modal — so deep links / hash navigation never jump
  // abruptly. For an in-view card (the normal click), nothing scrolls.
  const openProject = useCallback((project: Project) => {
    const el = document.getElementById(`project-${project.slug}`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const inView = rect.top >= 64 && rect.bottom <= window.innerHeight;
      if (!inView) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, { offset: -100 });
        else el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    setSelected(project);
    // Make the open state shareable without polluting history.
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${project.slug}`);
    }
  }, []);

  const closeProject = useCallback(() => {
    setSelected(null);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Deep link: open the matching project on load (e.g. /#econest-global) and
  // stay in sync if the hash changes afterwards (back/forward, shared links).
  useEffect(() => {
    const sync = () => {
      const slug = window.location.hash.replace(/^#/, '').replace(/^project-/, '');
      const match = slug ? projects.find((p) => p.slug === slug) : null;
      if (match) openProject(match);
      else setSelected(null);
    };
    // Wait for layout + entry animations so scroll-into-view lands correctly.
    const t = setTimeout(sync, 600);
    window.addEventListener('hashchange', sync);
    return () => {
      clearTimeout(t);
      window.removeEventListener('hashchange', sync);
    };
  }, [openProject]);

  return (
    <section id="work" className="relative py-section">
      <div className="container-content">
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <div>
            <span className="eyebrow mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Selected Work
            </span>
            <h2 className="max-w-[16ch] font-display text-fluid-h2 font-light leading-[0.95] tracking-tightest">
              Products shipped to production.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right">
            Backend systems, AI pipelines, and frontend work — each one live in
            production or open-source.
          </p>
        </div>

        <div className="space-y-24 md:space-y-40">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} onOpen={openProject} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={closeProject} />}
      </AnimatePresence>
    </section>
  );
}
