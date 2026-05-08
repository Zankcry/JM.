import { socialLinks } from '../data/navigation';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconFileCv,
  IconAddressBook,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandPhp,
  IconBrandReact,
  IconBrandVue,
  IconBrandAngular,
  IconBrandTailwind,
  IconBrandMongodb,
  IconBrandMysql,
  IconBrandFirebase,
  IconBrandSupabase,
  IconBrandVercel,
} from '@tabler/icons-react';

type TechStackItem = {
  label: string;
  shortLabel: string;
  tone: string;
  icon: 'brand-html5' | 'brand-css3' | 'brand-javascript' | 'brand-typescript' | 'brand-php' | 'brand-react' | 'brand-vue' | 'brand-angular' | 'brand-tailwind' | 'brand-mongodb' | 'brand-mysql' | 'brand-firebase' | 'brand-supabase' | 'brand-vercel';
};

const techStack: TechStackItem[] = [
  // Core Languages
  { label: 'HTML5', shortLabel: 'H5', tone: '#E34F26', icon: 'brand-html5' },
  { label: 'CSS3', shortLabel: 'CSS', tone: '#1572B6', icon: 'brand-css3' },
  { label: 'JavaScript', shortLabel: 'JS', tone: '#F7DF1E', icon: 'brand-javascript' },
  { label: 'TypeScript', shortLabel: 'TS', tone: '#3178C6', icon: 'brand-typescript' },
  { label: 'PHP', shortLabel: 'PHP', tone: '#777BB4', icon: 'brand-php' },
  // Frontend Frameworks & Libraries
  { label: 'React', shortLabel: 'React', tone: '#61DAFB', icon: 'brand-react' },
  { label: 'Vue', shortLabel: 'Vue', tone: '#4FC08D', icon: 'brand-vue' },
  { label: 'Angular', shortLabel: 'Ng', tone: '#DD0031', icon: 'brand-angular' },
  { label: 'TailwindCSS', shortLabel: 'TW', tone: '#38BDF8', icon: 'brand-tailwind' },
  // Databases & Backend
  { label: 'MongoDB', shortLabel: 'MDB', tone: '#47A248', icon: 'brand-mongodb' },
  { label: 'MySQL', shortLabel: 'SQL', tone: '#4479A1', icon: 'brand-mysql' },
  { label: 'Firebase', shortLabel: 'FB', tone: '#FFCA28', icon: 'brand-firebase' },
  { label: 'Supabase', shortLabel: 'Supa', tone: '#3ECF8E', icon: 'brand-supabase' },
  // Infrastructure
  { label: 'Vercel', shortLabel: 'Ver', tone: '#000000', icon: 'brand-vercel' },
];

const techStackIcons = {
  'brand-html5': IconBrandHtml5,
  'brand-css3': IconBrandCss3,
  'brand-javascript': IconBrandJavascript,
  'brand-typescript': IconBrandTypescript,
  'brand-php': IconBrandPhp,
  'brand-react': IconBrandReact,
  'brand-vue': IconBrandVue,
  'brand-angular': IconBrandAngular,
  'brand-tailwind': IconBrandTailwind,
  'brand-mongodb': IconBrandMongodb,
  'brand-mysql': IconBrandMysql,
  'brand-firebase': IconBrandFirebase,
  'brand-supabase': IconBrandSupabase,
  'brand-vercel': IconBrandVercel,
} as const;

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
      className="flex w-full flex-1 items-start pb-10 pt-8 sm:pt-14 lg:pt-16"
      aria-labelledby="hero-title"
    >
      <div className="w-full max-w-4xl">

        <h1
          id="hero-title"
          className="flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-2 text-3xl font-semibold leading-[1.1] tracking-snug text-theme-text sm:text-4xl lg:text-5xl"
        >
          <span>Hey! I&apos;m</span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="ml-2 text-theme-accent transition-colors duration-300 ease-out">
              James Michael
            </span>
            <video
              className="h-14 w-14 rounded-2xl object-cover transition-transform duration-300 ease-out sm:h-16 sm:w-16"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="/chibi.webm" type="video/webm" />
            </video>
          </span>
        </h1>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-theme-text-muted sm:text-lg">
          <p>
            I&apos;m an IT undergraduate specializing in Web Development. I obsess over pixel-perfect details while building websites for school projects and local businesses like helping a local barbershop increase their online awareness.
          </p>
          <p>
            Right now, my main focus is learning <a href="https://esotericsoftware.com/" className="text-theme-accent px-1.5 py-0.5 rounded-md transition-colors hover:bg-theme-accent/20" target="_blank" rel="noreferrer">Spine 2D</a> and crafting unique UI experiences for future projects. On the side, I love tinkering with and building useful browser extensions and web apps.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-theme-text-muted">
          {socialLinks.map((link, index) => (
            <span key={link.label} className="flex items-center gap-3">
              <a
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith('#') ? undefined : '_blank'}
                rel={link.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2 transition hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
              >
                {link.icon ? (() => {
                  const SocialIcon = socialIcons[link.icon as keyof typeof socialIcons];
                  return <SocialIcon size={18} stroke={1.8} aria-hidden="true" />;
                })() : null}
                <span>{link.label}</span>
              </a>
              {index < socialLinks.length - 1 ? <span className="text-theme-text-muted/40" aria-hidden="true">|</span> : null}
            </span>
          ))}
        </div>

        <div className="mt-12 pt-6">
          <div className="mb-5 flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-theme-text-muted/80">
              Tech stack
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-y-4 pb-1 text-sm text-theme-text-muted">
            {techStack.map((item, index) => (
              <span key={item.label} className="inline-flex items-center whitespace-nowrap">
                <span className="inline-flex items-center gap-2">
                  {(() => {
                    const TechIcon = techStackIcons[item.icon];
                    return <TechIcon size={22} stroke={1.8} style={{ color: item.tone }} aria-hidden="true" />;
                  })()}
                  <span className="text-xs font-medium tracking-tight text-theme-text-muted sm:text-[13px]">
                    {item.label}
                  </span>
                </span>
                {index < techStack.length - 1 ? (
                  <span className="mx-3 text-theme-text-muted/60 sm:mx-4">/</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}