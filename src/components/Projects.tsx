import { useState } from 'react';
import { IconExternalLink, IconBrandGithub, IconArrowRight, IconHeart } from '@tabler/icons-react';

const projects = [
  {
    title: 'Charlie\'s Barber & Salon',
    description: 'A high-performance static website highlighting services, portfolio, and an integrated blog section. Designed for excellent user experience and local SEO visibility.',
    image: '/project_1.png',
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Firebase'],
    links: { github: 'https://github.com/Zankcry/Barbershop_Website', live: 'https://charliesbarbershop.vercel.app/' }
  },
  {
    title: 'Cognosphere / Hoyoverse Hub',
    description: 'A web application built with Angular, showcasing the games and services of Cognosphere (Hoyoverse). Features dedicated sections for products, services, and the company profile.',
    image: '/project_2.png',
    tags: ['Angular', 'TypeScript', 'Tailwind CSS'],
    links: { github: 'https://github.com/Zankcry/prelim-project-JM', live: 'https://prelim-project-jm.vercel.app' }
  },
];

export function Projects() {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  return (
    <section id="projects" className="w-full pb-10">
      <div className="mb-8 flex items-center justify-between gap-6">
        <div className="flex flex-1 items-center gap-4">
          <h2 className="flex items-center gap-2 whitespace-nowrap text-xl font-medium tracking-tight text-theme-text sm:text-2xl">
            <button
              onClick={() => setIsHeartFilled(!isHeartFilled)}
              className="text-theme-accent transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus rounded-full"
              aria-label={isHeartFilled ? "Unlike" : "Like"}
              title={isHeartFilled ? "Unlike" : "Like"}
            >
              <IconHeart
                size={24}
                fill={isHeartFilled ? "currentColor" : "none"}
                className="transition-all duration-300"
              />
            </button>
            Featured Projects
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-theme-border/70 to-transparent"></div>
        </div>
        <a
          href="#all-projects"
          className="group flex items-center gap-2 whitespace-nowrap text-sm font-medium text-theme-text-muted transition-colors hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg rounded-md px-1"
        >
          View all projects
          <IconArrowRight size={16} stroke={2} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.slice(0, 2).map((project, i) => (
          <div
            key={i}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-theme-border/60 bg-theme-surface/30 shadow-sm transition-all hover:border-theme-border-strong hover:bg-theme-surface/50"
          >
            <div className="aspect-[16/9] w-full overflow-hidden border-b border-theme-border/50">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[17px] font-semibold tracking-tight text-theme-text transition-colors group-hover:text-theme-accent">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 text-theme-text-muted">
                  {project.links.github && (
                    <a href={project.links.github} aria-label="GitHub Repository" className="hover:text-theme-accent transition-colors">
                      <IconBrandGithub size={18} stroke={1.8} />
                    </a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} aria-label="Live Project" className="group/link hover:text-theme-accent transition-colors">
                      <IconExternalLink size={18} stroke={1.8} className="transition-transform duration-300 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-2.5 text-[13px] leading-relaxed text-theme-text-muted">
                {project.description}
              </p>

              <div className="mt-auto pt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-theme-bg-elevated/80 px-2.5 py-1 text-[11px] font-medium tracking-wide text-theme-text-subtle shadow-sm ring-1 ring-theme-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
