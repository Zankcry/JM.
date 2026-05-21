import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconExternalLink, IconBrandGithub, IconArrowRight, IconHeart } from '@tabler/icons-react';
import { projects } from '../data/projects';
import { ProjectPreview } from './ProjectPreview';
import { techStack, techStackIcons } from '../data/tech';
import { useTerminal } from '../context/TerminalContext';

export function Projects() {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { setHoveredCommand } = useTerminal();

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
          <div className="h-px flex-1 bg-gradient-to-r from-theme-accent/40 to-transparent"></div>
        </div>
        <Link
          to="/projects"
          onMouseEnter={() => setHoveredCommand('projects')}
          onMouseLeave={() => setHoveredCommand(null)}
          className="group flex items-center gap-2 whitespace-nowrap text-sm font-medium text-theme-text-muted transition-colors hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg rounded-md px-1"
        >
          View all projects
          <IconArrowRight size={16} stroke={2} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.slice(0, 2).map((project, i) => (
          <div
            key={i}
            id={i === 0 ? 'project-1' : undefined}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-theme-accent/20 bg-theme-bg shadow-lg transition-all hover:border-theme-accent/50"
            onMouseEnter={() => setHoveredCommand('projects')}
            onMouseLeave={() => setHoveredCommand(null)}
          >
            <ProjectPreview project={project} />

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[17px] font-semibold tracking-tight text-theme-text transition-colors group-hover:text-theme-accent">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 text-theme-text-muted">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="hover:text-theme-accent transition-colors">
                      <IconBrandGithub size={18} stroke={1.8} />
                    </a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" aria-label="Live Project" className="group/link hover:text-theme-accent transition-colors">
                      <IconExternalLink size={18} stroke={1.8} className="transition-transform duration-300 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-2.5 text-[13px] leading-relaxed text-theme-text-muted">
                {project.description}
              </p>

              <div className="pt-6 flex flex-wrap gap-2 flex-grow items-start">
                {project.tags.map((tag) => {
                  const tech = techStack.find(t => 
                    t.label.toLowerCase() === tag.toLowerCase() || 
                    t.shortLabel.toLowerCase() === tag.toLowerCase()
                  );

                  if (!tech) {
                    return (
                      <span
                        key={tag}
                        className="rounded-lg border border-theme-accent/10 bg-theme-bg/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-theme-text-muted"
                      >
                        {tag}
                      </span>
                    );
                  }

                  const TechIcon = techStackIcons[tech.icon];

                  return (
                    <div 
                      key={tag} 
                      className="group/tag flex items-center gap-1.5 rounded-lg border border-theme-accent/10 bg-theme-bg/50 px-2 py-1 transition-all hover:border-theme-accent/30 hover:bg-theme-bg"
                    >
                      <div 
                        className="flex h-4 w-4 items-center justify-center transition-transform group-hover/tag:scale-110"
                        style={{ color: tech.tone }}
                      >
                        <TechIcon size={14} stroke={2} aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-text-muted transition-colors group-hover/tag:text-theme-text">
                        {tech.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
