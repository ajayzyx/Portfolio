/**
 * Single source of truth for all portfolio content and external links.
 * Every fact, metric, link, and date here is taken from Ajay's resume —
 * nothing is invented. Editing content here keeps components declarative.
 *
 * The production domain is configurable: set NEXT_PUBLIC_SITE_URL at build
 * time (e.g. in Vercel project settings) once the real domain exists.
 */

export const site = {
  name: 'Ajay Singh Raghuwanshi',
  shortName: 'Ajay Singh',
  role: 'Software Engineer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  location: 'Vadodara, India',
  email: 'ajay1c4002@gmail.com',
  phone: '+91 90982 19742',
  phoneHref: 'tel:+919098219742',
  resume: '/resume.pdf',
  description:
    'Software Engineer building production software end to end — typed REST APIs on Node.js with Prisma and PostgreSQL, React and Next.js frontends tuned for Core Web Vitals, and LLM systems where every model response is schema-validated before it is trusted.',
  keywords: [
    'Ajay Singh Raghuwanshi',
    'Software Engineer',
    'Backend Engineer',
    'Full Stack Developer',
    'TypeScript',
    'Node.js',
    'Next.js',
    'React',
    'Prisma',
    'PostgreSQL',
    'Portfolio',
  ],
} as const;

export const socials = {
  github: 'https://github.com/ajayzyx',
  linkedin: 'https://www.linkedin.com/in/ajay-singh-raghuwanshi-516625270',
  email: `mailto:${site.email}`,
} as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

export const hero = {
  /** Three-line editorial headline — backend, frontend, AI. */
  line1: 'Backend systems.',
  line2: 'Frontend experiences.',
  line3: 'AI products',
  /** One short supporting sentence. */
  intro:
    'I’m Ajay — a software engineer shipping production software end to end, from typed APIs and data models to interfaces tuned to the millisecond.',
  available: 'Open to software engineering roles',
} as const;

/* ------------------------------------------------------------------ */
/* Projects — the centerpiece                                           */
/* ------------------------------------------------------------------ */

export type ProjectLink = { label: string; href: string; type: 'live' | 'github' };

export type Project = {
  slug: string;
  name: string;
  /** e.g. "AI Backend", "Full-Stack", "Frontend" */
  category: string;
  year: string;
  /** 1–2 sentence homepage description. */
  blurb: string;
  /** How the preview renders. */
  kind: 'browser' | 'api';
  /** Screenshot for the browser mockup (public path). */
  image?: string;
  domain?: string;
  stack: string[];
  links: ProjectLink[];
  /** Accent color for this project's card + modal. */
  accent: string;
  /** Expanded detail shown in the modal. */
  detail: {
    problem: string;
    highlights: string[];
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'medinsight-ai',
    name: 'MedInsight AI',
    category: 'AI Backend',
    year: '2026',
    blurb:
      'A production REST API that turns unstructured clinical documents into structured, reviewable medical entities — with every LLM response validated before it is trusted.',
    kind: 'api',
    stack: ['TypeScript', 'Hono', 'Prisma', 'PostgreSQL', 'Zod', 'Groq Llama 3.3'],
    links: [{ label: 'GitHub', href: 'https://github.com/ajayzyx/MedInsight-AI', type: 'github' }],
    accent: '#5EE6A8',
    detail: {
      problem:
        'LLM output can’t be trusted blindly in a clinical context. Every extraction must be schema-validated, confidence-filtered, deduplicated, and traceable to exact character offsets — so a human reviewer always has the final say.',
      highlights: [
        'Groq Llama-3.3-70B extraction, every response validated against a strict Zod schema',
        'PostgreSQL schema across six related entities with composite indexes and soft deletes',
        'API-key auth + RBAC, sliding-window rate limiting, in-memory key cache',
        'SHA-256 content hashing for dedup; multi-entity writes in atomic transactions',
      ],
      outcome:
        'A backend where the hard guarantees — validation, dedup, atomicity, and human-in-the-loop review — sit around the model, not inside it.',
    },
  },
  {
    slug: 'econest-global',
    name: 'Econest Global',
    category: 'Frontend',
    year: '2026',
    blurb:
      'A premium B2B site for a sugarcane-pulp tableware exporter — a catalog-first experience that turns international foodservice buyers into quote requests.',
    kind: 'browser',
    image: '/work/econest.jpg',
    domain: 'econest-global.vercel.app',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    links: [{ label: 'Live', href: 'https://econest-global.vercel.app', type: 'live' }],
    accent: '#8FE388',
    detail: {
      problem:
        'B2B buyers evaluate manufacturers on trust. The site had to communicate export-grade credibility — certifications, capacity, single-source supply — while making a large product range effortless to browse and quote.',
      highlights: [
        'Catalog-first UX with interactive product spec cards',
        'Quote-request funnel reachable from every screen',
        'Certification and trust signals throughout',
        'Rich imagery kept off the critical rendering path',
      ],
      outcome:
        'A production site presenting the complete range from a single source, with a direct quote-request funnel across devices.',
    },
  },
  {
    slug: 'digifrills',
    name: 'DigiFrills',
    category: 'Frontend',
    year: '2025',
    blurb:
      'The company’s live marketing site — architected on the Next.js App Router with static generation and a reusable component system, tuned for first paint and SEO.',
    kind: 'browser',
    image: '/work/digifrills.jpg',
    domain: 'digifrills.in',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    links: [{ label: 'Live', href: 'https://digifrills.in', type: 'live' }],
    accent: '#7C93FF',
    detail: {
      problem:
        'A marketing site lives or dies on first paint and search ranking. Motion had to elevate the brand without ever competing with render-critical work.',
      highlights: [
        'Every route pre-rendered with static generation for instant delivery',
        'Scroll-driven motion isolated from the critical path',
        'Reusable component system for structural consistency',
        'SEO-optimized, accessible, fully responsive routes',
      ],
      outcome:
        'Live in production at digifrills.in with first paint and Core Web Vitals protected across the layout.',
    },
  },
  {
    slug: 'medlinkpro',
    name: 'MedLinkPro',
    category: 'Frontend',
    year: '2025',
    blurb:
      'A healthcare platform frontend connecting patients, doctors, and hospital systems — a modular React architecture built for clarity across every age and device.',
    kind: 'browser',
    image: '/work/medlinkpro.jpg',
    domain: 'med-link-theta.vercel.app',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    links: [{ label: 'Live', href: 'https://med-link-theta.vercel.app', type: 'live' }],
    accent: '#4CA6FF',
    detail: {
      problem:
        'Healthcare interfaces must work for patients of all ages, on any device. Clarity and accessibility aren’t nice-to-haves — they are the product.',
      highlights: [
        'Modular component architecture for patient and staff workflows',
        'React Hooks for state management',
        'Accessibility-first, fully responsive UX',
        'Patient dashboard built from one reusable component set',
      ],
      outcome:
        'Deployed live on Vercel with patient and staff workflows composed from a single reusable component set.',
    },
  },
];

/* ------------------------------------------------------------------ */
/* About + stats                                                        */
/* ------------------------------------------------------------------ */

export const about = {
  /** Scannable, human, specific — no résumé wall, no buzzwords. */
  paragraph:
    'I care about the details users never notice — the API that never hands the frontend a shape it didn’t expect, the interaction that lands exactly when it should. I work across the stack in TypeScript: typed backends on Node and Hono, React and Next.js frontends, and LLM pipelines where the model’s output is checked before anyone trusts it. I like problems where correctness and craft both matter.',
} as const;

/** Only verifiable proof points — no fabricated metrics. */
export const stats = [
  { value: '30%', label: 'Faster page loads on live client sites' },
  { value: '500+', label: 'DSA problems across 6 platforms' },
  { value: 'Top 10', label: 'PU Code Hackathon 2.0' },
] as const;

/* ------------------------------------------------------------------ */
/* Skills — grouped, shown as an elegant interactive index              */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Java', 'SQL'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Accessibility', 'SEO'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Hono', 'Express', 'REST APIs', 'Prisma', 'Zod', 'RBAC'],
  },
  {
    title: 'Data & Cloud',
    skills: ['PostgreSQL', 'Neon', 'MongoDB', 'Docker', 'AWS', 'Vercel'],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Experience                                                           */
/* ------------------------------------------------------------------ */

export type ExperienceEntry = {
  date: string;
  company: string;
  companyUrl?: string;
  role: string;
  location: string;
  summary: string;
};

export const experience: ExperienceEntry[] = [
  {
    date: '2024 — 2025',
    company: 'DigiFrills',
    companyUrl: 'https://digifrills.in',
    role: 'Full Stack Development Intern',
    location: 'Remote',
    summary:
      'Shipped production frontends in React, Next.js and TypeScript — Figma handoff to Vercel deploy. Cut page load times 30% and built a reusable, mobile-first component library.',
  },
];

/* ------------------------------------------------------------------ */
/* Education — compact                                                  */
/* ------------------------------------------------------------------ */

export const education = [
  {
    school: 'Parul University',
    degree: 'B.Tech, Computer Science & Engineering',
    period: '2023 — 2027',
  },
  {
    school: 'IIT Madras',
    degree: 'BS, Data Science & Applications',
    period: '2024 — 2025',
  },
] as const;

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;
