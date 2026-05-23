import { IconBrandGithub, IconBrandLinkedin, IconMail, IconArrowUp, IconFileCv } from '@tabler/icons-react';
import { socialLinks } from '../data/navigation';
import { useTerminal } from '../context/TerminalContext';
import { EffectSwitcher } from './EffectSwitcher';
import { useBackground } from '../context/BackgroundContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { setHoveredCommand } = useTerminal();
  const { effect } = useBackground();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (label: string) => {
    switch (label) {
      case 'GitHub': return IconBrandGithub;
      case 'LinkedIn': return IconBrandLinkedin;
      case 'Resume': return IconFileCv;
      default: return IconMail;
    }
  };

  const getHoverCommand = (label: string) => {
    switch (label) {
      case 'GitHub': return 'open github';
      case 'LinkedIn': return 'open linkedin';
      case 'Resume': return 'cat resume.pdf';
      default: return 'ssh mail';
    }
  };

  return (
    <footer className={[
      "mt-auto w-full py-12 transition-all duration-300 ease-out",
      effect !== 'none'
        ? "border-t border-transparent bg-transparent"
        : "border-t border-theme-accent/10 bg-theme-bg/50 backdrop-blur-sm"
    ].join(' ')}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        
        {/* Top Row: Branding, Easter Egg Hint & Socials */}
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">

          {/* Left: Branding & Copyright */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tighter text-theme-text">
                JM<span className="text-theme-accent">.</span>
              </span>
              <div className="h-4 w-px bg-theme-accent/20"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-theme-text-muted">
                Portfolio v2
              </span>
            </div>
            <p className="text-[11px] font-medium text-theme-text-muted/60">
              © {currentYear} James Michael. All rights reserved.
            </p>
          </div>

          {/* Middle: Konami Code Hint */}
          <div className="hidden lg:flex flex-col items-center gap-1.5 text-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-theme-text-muted/30">
              HINT //
            </span>
            <div className="flex items-center gap-1">
              {['↑','↑','↓','↓','←','→','←','→','B','A'].map((key, i) => (
                <span
                  key={i}
                  className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-theme-accent/15 bg-theme-bg-elevated/30 px-1 font-mono text-[9px] font-bold text-theme-text-muted/40 transition-colors hover:border-theme-accent/40 hover:text-theme-accent/60"
                >
                  {key}
                </span>
              ))}
            </div>
            <span className="text-[8px] tracking-[0.2em] text-theme-text-muted/20 uppercase font-medium">
              try it on keyboard
            </span>
          </div>

          {/* Right: Socials & Back to Top */}
          <div className="flex flex-col items-center gap-6 sm:items-end sm:gap-4">
            <div className="flex items-center gap-5">
              {socialLinks.slice(0, 4).map((link) => {
                const Icon = getIcon(link.label);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-theme-text-muted transition-colors hover:text-theme-accent"
                    aria-label={link.label}
                    onMouseEnter={() => setHoveredCommand(getHoverCommand(link.label))}
                    onMouseLeave={() => setHoveredCommand(null)}
                  >
                    <Icon size={20} stroke={1.5} />
                  </a>
                );
              })}
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-theme-text-muted transition-colors hover:text-theme-accent"
              onMouseEnter={() => setHoveredCommand('cd ~')}
              onMouseLeave={() => setHoveredCommand(null)}
            >
              <span>Back to Top</span>
              <IconArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
            </button>
          </div>

        </div>

        {/* Console Dashboard Panel (FX Switcher) */}
        <div className="mt-8">
          <div className={[
            "w-full rounded-2xl border px-6 py-4 transition-all duration-300 ease-out",
            effect !== 'none'
              ? "border-theme-accent/15 bg-theme-bg/10 backdrop-blur-md"
              : "border-theme-accent/15 bg-theme-bg-elevated/40 shadow-soft"
          ].join(' ')}>
            <EffectSwitcher />
          </div>
        </div>

        {/* Bottom bar: Tech details */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-theme-accent/5 pt-8 text-[9px] font-bold uppercase tracking-[0.2em] text-theme-text-muted/40">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-theme-accent/40"></span>
            Built with React & Tailwind
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-theme-accent/40"></span>
            Deployed on Vercel
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-theme-accent/40"></span>
            Open Source
          </div>
        </div>
      </div>
    </footer>
  );
}
