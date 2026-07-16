'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * An animated terminal that dramatizes the MedInsight extraction pipeline:
 * request → model inference → schema validation → persistence. Loops. Used in
 * place of a screenshot for the backend project ("show, don't tell").
 */
const steps = [
  { kind: 'req', text: 'POST /v1/documents/extract' },
  { kind: 'meta', text: 'clinical_note.pdf · sha-256 verified' },
  { kind: 'run', text: 'Groq Llama-3.3-70B · inferring' },
  { kind: 'json', text: '"type": "CONDITION"   "text": "type 2 diabetes"' },
  { kind: 'json', text: '"type": "MEDICATION"  "text": "metformin 500mg"' },
  { kind: 'json', text: '"confidence": 0.97    "offset": [142, 157]' },
  { kind: 'ok', text: 'Zod schema validated' },
  { kind: 'ok', text: '3 entities persisted · atomic tx' },
] as const;

export function ApiPreview() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(steps.length);
      return;
    }
    const id = setInterval(() => {
      setVisible((v) => (v >= steps.length ? 0 : v + 1));
    }, 780);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-full overflow-hidden bg-[#0b0d0c] p-5 font-mono text-[0.72rem] leading-relaxed sm:text-[0.8rem]">
      <div className="mb-4 flex items-center gap-2 text-muted">
        <span className="h-2 w-2 rounded-full bg-[#5EE6A8]" />
        medinsight · extraction pipeline
      </div>
      <div className="space-y-1.5">
        {steps.slice(0, visible).map((step, i) => (
          <motion.div
            key={`${step.text}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-2"
          >
            {step.kind === 'req' && (
              <span className="rounded bg-[#5EE6A8]/15 px-1.5 text-[#5EE6A8]">POST</span>
            )}
            {step.kind === 'meta' && <span className="text-muted">▸</span>}
            {step.kind === 'run' && (
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            )}
            {step.kind === 'json' && <span className="text-white/25">·</span>}
            {step.kind === 'ok' && <span className="text-[#5EE6A8]">✓</span>}
            <span
              className={
                step.kind === 'json'
                  ? 'text-white/70'
                  : step.kind === 'ok'
                    ? 'text-[#5EE6A8]'
                    : step.kind === 'req'
                      ? 'text-cream'
                      : 'text-muted'
              }
            >
              {step.text}
              {step.kind === 'run' && <span className="animate-pulse"> …</span>}
            </span>
          </motion.div>
        ))}
        {visible < steps.length && (
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-[#5EE6A8]/70" />
        )}
      </div>
    </div>
  );
}
