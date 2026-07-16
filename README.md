# Ajay Singh Raghuwanshi — Engineering Portfolio

An Awwwards-caliber, production-ready software engineering portfolio. Dark,
kinetic, and performance-obsessed — built from scratch with no templates.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS** design system
- **Framer Motion** for choreographed animation
- **Lenis** for momentum smooth scrolling
- Hand-written **Canvas** + **SVG** visuals (network graph, tech ecosystem) —
  chosen over heavy 3D libraries to keep the bundle lean and hit top Lighthouse
  scores while staying original.

## Highlights

- Full-screen kinetic hero with an animated engineering-network backdrop
- Interactive, hoverable tech-stack graph (SVG, keyboard accessible)
- Flagship project cards with 3D tilt, architecture pipelines, and live metrics
- Git-commit-styled experience timeline
- Animated competitive-programming counters
- Terminal-inspired contact section with magnetic buttons
- Custom cursor, scroll reveals, parallax, glassmorphism, grain overlay
- Complete SEO: metadata, Open Graph image, JSON-LD, sitemap, robots, manifest
- Accessible: semantic HTML, skip link, focus states, reduced-motion support

## Develop

```bash
npm install
npm run dev
```

## Verify

```bash
npm run typecheck   # no TypeScript errors
npm run lint        # no ESLint errors
npm run build       # production build
```

## Content

All copy, links, projects, and data live in a single source of truth:
[`src/lib/site.ts`](src/lib/site.ts). Every fact, metric, link, and date is
taken directly from the resume — nothing is invented.

### Remaining TODOs (need Ajay's input)

- [ ] Set `NEXT_PUBLIC_SITE_URL` (e.g. in Vercel project env settings) to the
      real production domain — it drives canonical URL, OG tags, sitemap,
      and robots. Falls back to `http://localhost:3000` until set.
- [ ] MedLinkPro — no GitHub button is shown; add the exact repo URL in
      `src/lib/site.ts` to enable one.
- [ ] DigiFrills — add a GitHub button if a public repository exists.
- [ ] Econest Global — confirm the build period label if you want a date shown.

## Deploy

Zero-config on [Vercel](https://vercel.com). Push the repo, import it, done.

---

Designed & engineered by Ajay Singh Raghuwanshi.
