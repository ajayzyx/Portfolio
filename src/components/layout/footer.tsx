import { navLinks, socials } from '@/lib/site';

const socialItems = [
  { label: 'GitHub', href: socials.github, external: true },
  { label: 'LinkedIn', href: socials.linkedin, external: true },
  { label: 'Email', href: socials.email, external: false },
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative border-t border-white/[0.07] bg-base">
      <div className="container-content py-10">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          {/* left — identity is already established in the nav + contact, so
              this stays a quiet mark rather than a repeated name block */}
          <p className="font-mono text-[0.7rem] tracking-wide text-muted">
            © {year} · ajayzyx
          </p>

          {/* right — navigation + socials */}
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-7">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <span
              aria-hidden
              className="hidden h-3.5 w-px bg-white/[0.12] md:block"
            />

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socialItems.map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="link-underline text-sm text-muted transition-colors hover:text-cream"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
