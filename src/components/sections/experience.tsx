import { ArrowUpRight } from 'lucide-react';
import { experience } from '@/lib/site';
import { Reveal } from '@/components/ui/reveal';

export function Experience() {
  return (
    <section id="experience" className="relative py-section">
      <div className="container-content">
        <div className="mb-16 md:mb-20">
          <span className="eyebrow mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Experience
          </span>
          <h2 className="max-w-[18ch] font-display text-fluid-h2 font-light leading-[0.95] tracking-tightest">
            Where I’ve shipped.
          </h2>
        </div>

        <div className="border-t border-white/[0.07]">
          {experience.map((job, i) => (
            <Reveal key={job.company} index={i}>
              <div className="group grid gap-4 border-b border-white/[0.07] py-10 md:grid-cols-[0.3fr_0.5fr_1fr] md:items-baseline md:gap-8">
                <p className="font-mono text-sm text-muted">{job.date}</p>
                <div>
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 font-display text-2xl font-light tracking-tight transition-colors hover:text-accent"
                    >
                      {job.company}
                      <ArrowUpRight size={16} className="text-muted" />
                    </a>
                  ) : (
                    <span className="font-display text-2xl font-light tracking-tight">
                      {job.company}
                    </span>
                  )}
                  <p className="mt-1 text-sm text-muted">
                    {job.role} · {job.location}
                  </p>
                </div>
                <p className="max-w-md text-[0.95rem] leading-relaxed text-cream/80">
                  {job.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
