'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { about, education, site, skillGroups, stats } from '@/lib/site';
import { Counter } from '@/components/ui/counter';
import { Reveal } from '@/components/ui/reveal';

function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return <>{value}</>;
  return <Counter value={Number(match[1])} suffix={match[2]} />;
}

function SkillsIndex() {
  const [active, setActive] = useState<number>(0);

  return (
    <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {skillGroups.map((group, i) => {
        const isActive = active === i;
        return (
          <div
            key={group.title}
            onMouseEnter={() => setActive(i)}
            className="group grid grid-cols-1 gap-2 py-6 transition-colors sm:grid-cols-[minmax(0,0.4fr)_1fr] sm:items-center sm:gap-8"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h4
                className={`font-display text-2xl font-light tracking-tight transition-colors duration-300 sm:text-3xl ${
                  isActive ? 'text-cream' : 'text-muted'
                }`}
              >
                {group.title}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2 pl-8 sm:pl-0">
              {group.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0.4 }}
                  transition={{ duration: 0.3, delay: isActive ? si * 0.03 : 0 }}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 font-mono text-[0.72rem] text-cream/90"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-section">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-[0.5fr_1fr] lg:gap-20">
          <div>
            <span className="eyebrow mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              About
            </span>
            <div className="hidden lg:block">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Based in
              </p>
              <p className="mt-1.5 text-cream">{site.location}</p>
              <div className="mt-6 space-y-3">
                {education.map((e) => (
                  <div key={e.school}>
                    <p className="text-sm text-cream">{e.school}</p>
                    <p className="text-xs text-muted">{e.degree}</p>
                    <p className="font-mono text-[0.7rem] text-muted">{e.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Reveal>
              <p className="max-w-prose font-display text-2xl font-light leading-[1.35] tracking-tight text-cream sm:text-[1.9rem]">
                {about.paragraph}
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-8 border-t border-white/[0.07] pt-10 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} index={i}>
                  <div>
                    <p className="font-display text-4xl font-light tracking-tightest text-cream sm:text-5xl">
                      <StatValue value={stat.value} />
                    </p>
                    <p className="mt-2 text-sm leading-snug text-muted">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* skills */}
        <div className="mt-24 md:mt-32">
          <span className="eyebrow mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Toolkit
          </span>
          <SkillsIndex />
        </div>

        {/* education — mobile only */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {education.map((e) => (
            <div key={e.school} className="rounded-xl border border-white/[0.07] p-5">
              <p className="text-sm text-cream">{e.school}</p>
              <p className="text-xs text-muted">{e.degree}</p>
              <p className="mt-1 font-mono text-[0.7rem] text-muted">{e.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
