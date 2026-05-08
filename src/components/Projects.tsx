import { IconExternalLink, IconBrandGithub, IconArrowRight } from '@tabler/icons-react';

const projects = [
  {
    title: 'Terminal Dashboard',
    description: 'A responsive bento-grid dashboard built with React and Tailwind CSS. Features real-time data streaming and dynamic themes.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Tailwind', 'TypeScript'],
    links: { github: '#', live: '#' }
  },
  {
    title: 'Nexus UI',
    description: 'An open-source component library focused on accessibility and motion. Heavily relies on modern CSS features.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    tags: ['Design Systems', 'Framer Motion', 'CSS'],
    links: { github: '#', live: '#' }
  },
  {
    title: 'Aura Sync',
    description: 'A smart home automation hub interface that integrates seamlessly with ambient lighting systems.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    tags: ['IoT', 'Node.js', 'React Native'],
    links: { github: '#', live: '#' }
  },
  {
    title: 'Chronos',
    description: 'A minimalist time-tracking tool designed for freelancers to manage their invoices effortlessly.',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Supabase', 'Stripe'],
    links: { live: '#' }
  }
];

export function Projects() {
  return (
    <section id="projects" className="w-full pb-10">
      <div className="mb-6 flex items-center justify-between gap-6">
        <div className="flex flex-1 items-center gap-4">
          <h2 className="whitespace-nowrap text-xl font-medium tracking-tight text-theme-text sm:text-2xl">
            Featured Work
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
                    <a href={project.links.live} aria-label="Live Project" className="hover:text-theme-accent transition-colors">
                      <IconExternalLink size={18} stroke={1.8} />
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
