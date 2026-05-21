import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { ProjectPreview } from './ProjectPreview';
import { techStack, techStackIcons } from '../data/tech';
import { useTerminal } from '../context/TerminalContext';

type Project = {
  title: string;
  description: string;
  image: string;
  poster?: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
  };
};

export function ProjectCard({ project, id, padding = 'p-5' }: { project: Project; id?: string; padding?: string }) {
  const { setHoveredCommand } = useTerminal();
  const projectSlug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div
      id={id}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-theme-accent/20 bg-theme-bg shadow-lg transition-all hover:border-theme-accent/50"
      onMouseEnter={() => setHoveredCommand(`open projects/${projectSlug}`)}
      onMouseLeave={() => setHoveredCommand(null)}
    >
      <ProjectPreview project={project} />

      <div className={`flex flex-1 flex-col ${padding}`}>
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
  );
}
