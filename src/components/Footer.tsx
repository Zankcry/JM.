import { IconBrandGithub, IconBrandLinkedin, IconMail, IconArrowUp, IconFileCv } from '@tabler/icons-react';
import { socialLinks } from '../data/navigation';
import { useTerminal } from '../context/TerminalContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { setHoveredCommand } = useTerminal();

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
      case 'GitHub': return 'ssh github';
      case 'LinkedIn': return 'open linkedin';
      case 'Resume': return 'cat resume.pdf';
      default: return 'ssh mail';
    }
  };

  return (
    <footer className="mt-auto w-full border-t border-theme-accent/10 bg-theme-bg/50 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
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

          {/* Middle: Status/Quote */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-theme-accent/40">
              <span>Designing with intent</span>
              <span className="h-1 w-1 rounded-full bg-theme-accent/40"></span>
              <span>Building with passion</span>
            </div>
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
