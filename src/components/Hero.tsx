import { Link } from 'react-router-dom';
import { socialLinks } from '../data/navigation';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconFileCv,
  IconAddressBook,
} from '@tabler/icons-react';
import { techStack, techStackIcons } from '../data/tech';

const socialIcons = {
  'brand-github': IconBrandGithub,
  'brand-linkedin': IconBrandLinkedin,
  'brand-instagram': IconBrandInstagram,
  'file-cv': IconFileCv,
  user: IconAddressBook,
} as const;

export function Hero() {
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
          <span className="group/name inline-flex items-center gap-2 whitespace-nowrap">
            <span className="relative ml-2 inline-block cursor-default text-theme-accent transition-colors duration-300 ease-out">
              <span className="inline-block transition-all duration-500 ease-out group-hover/name:pointer-events-none group-hover/name:-translate-y-4 group-hover/name:opacity-0">
                James Michael
              </span>
              <span className="absolute left-0 top-0 inline-block translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover/name:translate-y-0 group-hover/name:opacity-100">
                ジェームズマイケル
              </span>
            </span>
            <video
              className="h-14 w-14 rounded-2xl object-cover transition-transform duration-500 ease-out group-hover/name:translate-x-16 sm:h-16 sm:w-16"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="/videos/chibi.webm" type="video/webm" />
            </video>
          </span>
        </h1>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-theme-text-muted sm:text-lg">
          <p>
            I&apos;m an IT undergraduate specializing in Web Development. I currently build websites for personal projects and local businesses like helping a local <a href="#project-1" className="text-theme-accent px-1.5 py-0.5 rounded-md transition-colors hover:bg-theme-accent/20">Barbershop</a> increase their online awareness.
          </p>
          <p>
            Right now, my main focus is learning <a href="https://esotericsoftware.com/" className="text-theme-accent px-1.5 py-0.5 rounded-md transition-colors hover:bg-theme-accent/20" target="_blank" rel="noreferrer">Spine 2D</a> and crafting unique UI experiences for future projects. I just love creating and developing websites with unique visuals.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-theme-text-muted">
          {socialLinks.map((link) => {
            const isInternal = link.href.startsWith('/') || link.href.startsWith('#');
            const cls = "group flex items-center gap-2 rounded-lg border border-theme-accent/20 bg-theme-bg/50 px-3 py-1.5 text-xs font-medium text-theme-text-muted transition-all hover:border-theme-accent/50 hover:text-theme-text hover:shadow-sm active:scale-95";

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
                  <Link to={link.href} aria-label={link.label} className={cls}>{inner}</Link>
                ) : (
                  <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
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