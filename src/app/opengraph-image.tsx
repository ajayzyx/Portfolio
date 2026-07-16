import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0B',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF5C35',
              fontSize: 30,
            }}
          >
            A
          </div>
          <span style={{ color: '#87867F', fontSize: 22, fontFamily: 'monospace', letterSpacing: 4 }}>
            {site.role.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              color: '#F4F2ED',
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Backend systems.
          </span>
          <span
            style={{
              color: '#F4F2ED',
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Frontend experiences.
          </span>
          <span
            style={{
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#B9B7B0',
            }}
          >
            AI products<span style={{ color: '#FF5C35' }}>.</span>
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <span style={{ color: '#87867F', fontSize: 24, maxWidth: 760, fontFamily: 'sans-serif' }}>
            {site.name} · TypeScript · Node.js · Next.js · Prisma
          </span>
          <span style={{ width: 14, height: 14, borderRadius: 999, background: '#FF5C35' }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
