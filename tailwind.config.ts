import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0B',
        /** Dark text-on-light color. Named `ink` (not `base`) because
         *  `text-base` collides with Tailwind's font-size utility. */
        ink: '#0A0A0B',
        surface: '#111112',
        line: 'rgba(255,255,255,0.08)',
        cream: '#F4F2ED',
        accent: {
          DEFAULT: '#FF5C35',
          soft: 'rgba(255, 92, 53, 0.12)',
        },
        muted: '#87867F',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'fluid-display': 'clamp(2.6rem, 9vw, 8.5rem)',
        'fluid-h2': 'clamp(2rem, 5.5vw, 4.5rem)',
        'fluid-h3': 'clamp(1.5rem, 3vw, 2.5rem)',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        content: '1280px',
        prose: '780px',
      },
      spacing: {
        section: 'clamp(6rem, 14vw, 13rem)',
      },
      borderRadius: {
        xl2: '1.5rem',
      },
      transitionTimingFunction: {
        /** The single easing curve used across the whole site. */
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
