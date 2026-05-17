import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { primaryNavLinks } from '../data/navigation';
import { AccentSwitcher } from './AccentSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  // Helper to handle hash scrolling if on home page
  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#') && location.pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
          <Link
            to="/"
            onClick={() => handleLinkClick('#home')}
            className="inline-flex items-center gap-1.5 rounded-full px-1 py-1 text-lg font-bold tracking-tight text-theme-text transition-colors duration-300 ease-out hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
            aria-label="Go to home"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-theme-accent transition-colors duration-300 ease-out inline-block"
              >
                {(() => {
                  const path = location.pathname;
                  if (path === '/') return 'ホーム';
                  if (path === '/about') return 'アバウト';
                  if (path === '/projects') return 'プロジェクト';
                  if (path === '/posts') return 'ポスト';
                  if (path.startsWith('/posts/')) return 'コンテンツ';
                  if (path === '/pics') return 'ピクス';
                  return 'ホーム';
                })()}
              </motion.span>
            </AnimatePresence>
            <span className="text-theme-text/40 font-light"></span>
          </Link>

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
                {primaryNavLinks.map((link) => {
                  const isInternal = link.href.startsWith('/') || link.href.startsWith('#');
                  const href = link.href === '#projects' ? '/projects' : link.href;

                  return isInternal ? (
                    <Link
                      key={link.label}
                      to={href}
                      onClick={() => handleLinkClick(href)}
                      className="rounded-2xl px-3 py-2 text-sm text-theme-text-muted transition hover:bg-theme-surface/70 hover:text-theme-text focus:outline-none focus-visible:bg-theme-surface/70"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl px-3 py-2 text-sm text-theme-text-muted transition hover:bg-theme-surface/70 hover:text-theme-text focus:outline-none focus-visible:bg-theme-surface/70"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>


              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[5rem] top-0 z-50 w-0.5 -translate-x-1/2 bg-gradient-to-b from-theme-accent/50 to-transparent hidden lg:block"
        style={{ height: 'calc(50vh - 120px)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[5rem] bottom-0 z-50 w-0.5 -translate-x-1/2 bg-gradient-to-t from-theme-accent/50 to-transparent hidden lg:block"
        style={{ height: 'calc(50vh - 120px)' }}
      />
 
      <aside className="fixed left-[5rem] top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <nav className="flex flex-col items-center gap-7" aria-label="Section navigation">
          {primaryNavLinks.map((link) => {
            const isInternal = link.href.startsWith('/') || link.href.startsWith('#');
            const href = link.href === '#projects' ? '/projects' : link.href;

            return isInternal ? (
              <Link
                key={link.label}
                to={href}
                onClick={() => handleLinkClick(href)}
                className="text-sm text-theme-text-muted transition duration-150 hover:text-theme-accent focus:outline-none focus-visible:text-theme-accent focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-theme-text-muted transition duration-150 hover:text-theme-accent focus:outline-none focus-visible:text-theme-accent focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </aside>

      <AccentSwitcher />
    </>
  );
}
