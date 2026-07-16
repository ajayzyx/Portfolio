'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';
import { site, socials } from '@/lib/site';
import { Magnetic } from '@/components/ui/magnetic';

const links = [
  { label: 'GitHub', href: socials.github, external: true },
  { label: 'LinkedIn', href: socials.linkedin, external: true },
  { label: 'Email', href: socials.email, external: false },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-section">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[440px] w-[820px] max-w-full -translate-x-1/2 translate-y-1/4 rounded-full opacity-70 blur-[120px]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(255,92,53,0.16), transparent 70%)',
        }}
      />

      <div className="container-content text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[14ch] font-display text-fluid-display font-light leading-[0.92] tracking-tightest"
        >
          Let’s build
          <br />
          <span className="text-cream-fade">something</span>
          <span className="text-accent">.</span>
        </motion.h2>

        <div className="mt-12 flex justify-center">
          <Magnetic strength={0.2}>
            <a
              href={socials.email}
              className="group inline-flex items-center gap-3 rounded-full bg-cream px-9 py-4 text-base font-medium text-ink transition-colors duration-300 hover:bg-accent"
            >
              {site.email}
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className="link-underline text-sm text-muted transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-cream"
          >
            <FileText size={14} />
            Résumé
          </a>
        </div>
      </div>
    </section>
  );
}
