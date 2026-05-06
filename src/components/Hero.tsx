import { socialLinks } from '../data/navigation';

type TechStackItem = {
  label: string;
  shortLabel: string;
  tone: string;
};

const techStack: TechStackItem[] = [
  { label: 'JavaScript', shortLabel: 'JS', tone: '#F7DF1E' },
  { label: 'HTML5', shortLabel: 'H5', tone: '#E34F26' },
  { label: 'TailwindCSS', shortLabel: 'TW', tone: '#38BDF8' },
];

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
          className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-snug text-theme-text sm:text-5xl lg:text-6xl"
        >
          Hey! I&apos;m <span className="text-theme-accent transition-colors duration-300 ease-out">Alex Carter</span>
        </h1>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-theme-text-muted sm:text-lg">
          <p>
            I build product interfaces, design systems, and lightweight tools that help teams ship
            quickly without losing the details that make a site feel considered.
          </p>
          <p>
            Right now I&apos;m focused on polished frontend experiences, thoughtful information
            hierarchy, and the kind of small interactions that make a page feel calm instead of
            cluttered.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-theme-text-muted">
          {socialLinks.map((link, index) => (
            <span key={link.label} className="flex items-center gap-3">
              <a
                href={link.href}
                className="transition hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
              >
                {link.label}
              </a>
              {index < socialLinks.length - 1 ? <span aria-hidden="true">|</span> : null}
            </span>
          ))}
        </div>

        <div className="mt-12 pt-6">
          <div className="mb-4 flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-theme-text-muted/80">
              Tech stack
            </p>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-1 text-sm text-theme-text-muted sm:gap-4">
            {techStack.map((item, index) => (
              <span key={item.label} className="inline-flex items-center whitespace-nowrap">
                <span className="inline-flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-theme-border/60 bg-theme-bg-elevated/85 shadow-sm backdrop-blur">
                    <span
                      className="text-[9px] font-semibold tracking-[0.2em]"
                      style={{ color: item.tone }}
                    >
                      {item.shortLabel}
                    </span>
                  </span>
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