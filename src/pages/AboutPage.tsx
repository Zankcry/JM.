import { IconBrandSpotify } from '@tabler/icons-react';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconFileCv,
} from '@tabler/icons-react';

type SpotifyEmbed = {
  type: 'track' | 'playlist';
  id: string;
};

const spotifyEmbeds: SpotifyEmbed[] = [
  { type: 'track', id: '348NF6vX0Yh22xvH0EZEro' },
  { type: 'track', id: '14mT8BCOXiUUcGlb7KujkT' },
  { type: 'track', id: '1FXrYwvWwjmbw8cqFC1OWz' },
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col gap-16 w-full pt-8 sm:pt-14 lg:pt-16">

      {/* ── Page header ─────────────────────────────────── */}
      <header className="flex w-full items-center gap-6">
        <h1 className="shrink-0 text-4xl font-bold tracking-tight text-theme-text sm:text-5xl">
          About
        </h1>
        <div className="h-px flex-1 bg-gradient-to-r from-theme-border/60 to-transparent" />
      </header>

      {/* ── Hero bio ────────────────────────────────────── */}
      <section className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        {/* Avatar + quick facts */}
        <div className="flex shrink-0 flex-col items-center gap-6 lg:items-start lg:pt-2">
          <div className="relative">
            <div className="h-48 w-48 overflow-hidden rounded-[2.5rem] border-2 border-theme-accent/40 bg-theme-surface/50 shadow-xl">
              <img
                src="/images/profilePic.jpg"
                alt="James Michael"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-lg font-semibold text-theme-text">James Michael</p>
            <p className="text-xs font-mono text-theme-text-muted tracking-widest">ジェームズ・マイケル</p>
            <p className="text-sm text-theme-accent">@Zankcry</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 text-theme-text-muted">
            {[
              { icon: IconBrandGithub, href: 'https://github.com/Zankcry', label: 'GitHub' },
              { icon: IconBrandLinkedin, href: 'https://www.linkedin.com/in/james-michael-duque-100154350/', label: 'LinkedIn' },
              { icon: IconBrandInstagram, href: 'https://www.instagram.com/jme_smichael/?hl=en', label: 'Instagram' },
              { icon: IconFileCv, href: '/resume.pdf', label: 'Resume' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-lg p-2 transition hover:bg-theme-surface/60 hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus"
              >
                <Icon size={18} stroke={1.8} />
              </a>
            ))}
          </div>
        </div>

        {/* Bio text */}
        <div className="flex flex-col gap-5 text-base leading-8 text-theme-text-muted sm:text-[17px]">
          <p>
            Yahho! (やっほー) I&apos;m an IT undergraduate from{' '}
            <span className="text-theme-accent">Holy Angel University</span> based in{' '}
            <span className="text-theme-accent">
              Pampanga, Philippines{' '}
              <img
                src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f5-1f1ed.svg"
                alt="🇵🇭"
                className="inline-block h-[1.1em] w-auto align-middle mb-0.5"
              />
            </span>. I&apos;m
            primarily a <span className="text-theme-accent">Frontend Web Developer</span>,
            but I&apos;m fully capable of working across the{' '}
            <span className="text-theme-accent">Full Stack</span>.
          </p>
          <p>
            I&apos;ve worked on school projects and helped a local barbershop level up
            their online presence. Right now I&apos;m deep in learning{' '}
            <a
              href="https://esotericsoftware.com/"
              target="_blank"
              rel="noreferrer"
              className="text-theme-accent px-1.5 py-0.5 rounded-md transition hover:bg-theme-accent/20"
            >
              Spine 2D
            </a>{' '}
            to animate characters and build richer UI experiences.
          </p>
          <p>
            Outside the screen, I spend my free time learning{' '}
            <span className="text-theme-accent">Japanese</span> and diving into anime and
            manga, especially ones with <span className="text-theme-accent">amazing visuals</span>.
            I also tinker with PC builds, OS-hop for fun, and build browser extensions nobody asked for.
          </p>
        </div>
      </section>

      {/* ── Music I Code To ─────────────────────────────── */}
      <section className="flex flex-col gap-6 pb-4">
        {/* Section header */}
        <div className="flex items-center gap-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.35em] text-theme-text-muted/80">
            Music I Code To
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-theme-border/40 to-transparent" />
          {/* Animated equalizer bars */}
          <div className="flex items-end gap-[3px]" aria-hidden="true">
            {[12, 18, 10, 16, 8].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-theme-accent"
                style={{
                  height: `${h}px`,
                  animation: `eq-bounce ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
          <a
            href="https://open.spotify.com/user/zankcry"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-theme-text-muted/60 transition hover:text-[#1DB954]"
          >
            <IconBrandSpotify size={14} />
            Spotify
          </a>
        </div>

        {/* Embeds */}
        <div className="flex flex-col gap-4">
          {spotifyEmbeds.map(({ type, id }) => (
            <div
              key={id}
              className="overflow-hidden rounded-2xl border border-theme-border/40 bg-theme-surface/20 shadow-sm transition hover:border-theme-accent/30"
            >
              <iframe
                src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=1`}
                width="100%"
                height={type === 'playlist' ? 232 : 80}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-0"
                title={`Spotify ${type} embed`}
              />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
