import { useEffect, useState } from 'react';
import { moreNavLinks, primaryNavLinks } from '../data/navigation';
import { AccentSwitcher } from './AccentSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full pt-5 pb-4 px-5 sm:px-8 lg:px-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[175%] -z-10 bg-theme-bg/80 backdrop-blur-md"
          style={{
            maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)'
          }}
        />
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4">
          <a
            href="#home"
            className="inline-flex items-center gap-1 rounded-full px-1 py-1 text-lg font-semibold tracking-tight text-theme-text transition-colors duration-300 ease-out hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
            aria-label="Go to home"
          >
            <span className="text-theme-accent transition-colors duration-300 ease-out">~</span>
            <span>/</span>
          </a>

          <div className="hidden lg:block">
            <ThemeSwitcher />
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-full border border-theme-border/70 px-3 py-2 text-sm text-theme-text-muted transition hover:bg-theme-surface/70 hover:text-theme-text focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            Menu
          </button>
        </div>

        <div
          id="mobile-menu"
          className={[
            'lg:hidden transition-all duration-200',
            menuOpen ? 'pointer-events-auto mt-4 max-h-[48rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="overflow-hidden rounded-3xl border border-theme-border/60 bg-theme-bg-elevated/95 p-4 shadow-soft backdrop-blur">
            <div className="flex flex-col gap-4">
              <nav className="grid gap-2" aria-label="Mobile primary">
                {primaryNavLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-3 py-2 text-sm text-theme-text-muted transition hover:bg-theme-surface/70 hover:text-theme-text focus:outline-none focus-visible:bg-theme-surface/70"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.35em] text-theme-text-muted/85">More</div>
                <div className="grid gap-2">
                  {moreNavLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-theme-border/40 bg-theme-surface/40 px-3 py-3 transition hover:bg-theme-surface/70 focus:outline-none focus-visible:bg-theme-surface/70"
                    >
                      <div className="text-sm font-medium text-theme-text">{link.label}</div>
                      {link.description ? (
                        <div className="mt-1 text-xs leading-5 text-theme-text-muted">{link.description}</div>
                      ) : null}
                    </a>
                  ))}
                </div>
              </div>

              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      <aside className="fixed left-[5rem] top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <nav className="flex flex-col items-center gap-7" aria-label="Section navigation">
          {primaryNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-theme-text-muted transition duration-150 hover:text-theme-accent focus:outline-none focus-visible:text-theme-accent focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
            >
              {link.label}
            </a>
          ))}

          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-sm text-theme-text-muted transition duration-150 hover:text-theme-accent focus:outline-none focus-visible:text-theme-accent focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg">
              <span>More</span>
            </summary>

            <div className="absolute left-full top-1/2 ml-14 w-64 -translate-y-1/2 rounded-3xl border border-theme-border/60 bg-theme-bg-elevated/95 p-2 shadow-soft backdrop-blur">
              {moreNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block rounded-2xl px-3 py-3 transition hover:bg-theme-surface/70 focus:outline-none focus-visible:bg-theme-surface/70"
                >
                  <div className="text-sm font-medium text-theme-text">{link.label}</div>
                  {link.description ? (
                    <div className="mt-1 text-xs leading-5 text-theme-text-muted">{link.description}</div>
                  ) : null}
                </a>
              ))}
            </div>
          </details>
        </nav>
      </aside>

      <AccentSwitcher />
    </>
  );
}