import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { socialLinks } from '../data/navigation';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconFileCv,
  IconAddressBook,
  IconMail,
} from '@tabler/icons-react';
import { techStack, techStackIcons } from '../data/tech';
import { useTerminal } from '../context/TerminalContext';

const socialIcons = {
  'brand-github': IconBrandGithub,
  'brand-linkedin': IconBrandLinkedin,
  'brand-instagram': IconBrandInstagram,
  'file-cv': IconFileCv,
  user: IconAddressBook,
  mail: IconMail,
} as const;

export function Hero() {
  const { setHoveredCommand } = useTerminal();

  return (
    <section
      id="home"
      className="flex w-full flex-1 items-start pb-10 "
      aria-labelledby="hero-title"
    >
      <div className="w-full max-w-4xl">

        <h1
          id="hero-title"
          className="flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-2 text-3xl font-semibold leading-[1.1] tracking-snug text-theme-text sm:text-4xl lg:text-5xl"
        >
          <span>Yahho! I&apos;m</span>
          <motion.span
            className="group/name inline-flex items-center gap-2 whitespace-nowrap"
            initial="initial"
            whileHover="hover"
          >
            <div
              className="relative ml-2 inline-flex items-center justify-start cursor-default text-theme-accent select-none"
              style={{ perspective: '800px' }}
            >
              <motion.span
                className="block transition-colors duration-300"
                variants={{
                  initial: { y: 0, opacity: 1, rotateX: 0 },
                  hover: { y: -20, opacity: 0, rotateX: 90 }
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                James Michael
              </motion.span>
              <motion.span
                className="absolute left-0 block font-semibold tracking-wider whitespace-nowrap pointer-events-none"
                variants={{
                  initial: { y: 20, opacity: 0, rotateX: -90 },
                  hover: { y: 0, opacity: 1, rotateX: 0 }
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                ジェームズマイケル
              </motion.span>
            </div>
            <video
              className="h-14 w-14 rounded-2xl object-cover transition-transform duration-500 ease-out group-hover/name:translate-x-24 sm:h-16 sm:w-16"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="/videos/chibi.webm" type="video/webm" />
            </video>
          </motion.span>
        </h1>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-theme-text-muted sm:text-lg">
          <p>
            I&apos;m an IT undergraduate specializing in Web Development. I currently build websites for personal projects and local businesses like helping a local <a
              href="#project-1"
              className="text-theme-accent px-1.5 py-0.5 rounded-md transition-colors hover:bg-theme-accent/20"
              onMouseEnter={() => setHoveredCommand('open projects/charlies-barber-salon')}
              onMouseLeave={() => setHoveredCommand(null)}
            >Barbershop</a> increase their online awareness.
          </p>
          <p>
            Right now, my main focus is learning <a
              href="https://esotericsoftware.com/"
              className="text-theme-accent px-1.5 py-0.5 rounded-md transition-colors hover:bg-theme-accent/20"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHoveredCommand('open spine2d')}
              onMouseLeave={() => setHoveredCommand(null)}
            >Spine 2D</a> and crafting unique UI experiences for future projects. I&apos;m currently seeking web development internships to contribute and grow.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-theme-text-muted">
          {socialLinks.map((link) => {
            const isInternal = (link.href.startsWith('/') || link.href.startsWith('#')) && !link.href.endsWith('.pdf');
            const cls = "group flex items-center gap-2 rounded-lg border border-theme-accent/20 bg-theme-bg/50 px-3 py-1.5 text-xs font-medium text-theme-text-muted transition-all hover:border-theme-accent/50 hover:text-theme-text hover:shadow-sm active:scale-95";

            // Determine command based on button destination/label
            let cmd = '';
            if (link.label === 'GitHub') cmd = 'open github';
            else if (link.label === 'LinkedIn') cmd = 'open linkedin';
            else if (link.label === 'Resume') cmd = 'cat resume.pdf';
            else if (link.label === 'Mail') cmd = 'ssh mail';
            else if (link.label === 'More about me...') cmd = 'about';
            else if (isInternal) cmd = link.href.replace(/^\//, '');
            else cmd = `open ${link.label.toLowerCase()}`;

            const inner = (
              <>
                {link.icon ? (() => {
                  const SocialIcon = socialIcons[link.icon as keyof typeof socialIcons];
                  return <SocialIcon size={16} stroke={1.8} aria-hidden="true" />;
                })() : null}
                <span>{link.label}</span>
              </>
            );

            return (
              <span key={link.label}>
                {isInternal ? (
                  <Link
                    to={link.href}
                    aria-label={link.label}
                    className={cls}
                    onMouseEnter={() => setHoveredCommand(cmd)}
                    onMouseLeave={() => setHoveredCommand(null)}
                  >
                    {inner}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                    onMouseEnter={() => setHoveredCommand(cmd)}
                    onMouseLeave={() => setHoveredCommand(null)}
                  >
                    {inner}
                  </a>
                )}
              </span>
            );
          })}
        </div>

        <div className="mt-12 pt-6">
          <div className="mb-5 flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-theme-text-muted/80">
              Tech stack
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pb-1">
            {techStack.map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-2 rounded-lg border border-theme-accent/10 bg-theme-bg/50 px-2.5 py-1.5 transition-all hover:border-theme-accent/30 hover:bg-theme-bg"
                style={{ '--brand-color': item.tone } as React.CSSProperties}
              >
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5 transition-transform group-hover:scale-110"
                  style={{ color: item.tone }}
                >
                  {(() => {
                    const TechIcon = techStackIcons[item.icon];
                    return <TechIcon size={16} stroke={2} aria-hidden="true" />;
                  })()}
                </div>
                <span className="text-[11px] font-semibold tracking-wide text-theme-text-muted transition-colors group-hover:text-theme-text uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}