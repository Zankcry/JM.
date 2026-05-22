import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  IconX, 
  IconBrandGithub, 
  IconExternalLink, 
  IconSearch, 
  IconChartBar, 
  IconCpu, 
  IconCircleCheck 
} from '@tabler/icons-react';
import { Project } from '../data/projects';
import { ProjectPreview } from './ProjectPreview';

type ProjectDetailModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const details = project.details;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Modal Dialog Content Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative z-10 w-full max-w-3xl rounded-2xl border border-theme-accent/20 bg-theme-bg shadow-2xl overflow-y-auto scrollbar-thin max-h-[85vh] p-6 sm:p-10 text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full border border-theme-accent/15 bg-theme-bg-elevated/40 text-theme-text-muted hover:text-theme-accent hover:border-theme-accent/40 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-theme-accent/40"
          aria-label="Close details"
        >
          <IconX size={20} stroke={2} />
        </button>

        {/* Dynamic Detailed Content View */}
        {details ? (
          <div className="flex flex-col gap-10">
            {/* Header Area */}
            <header className="flex flex-col gap-3 pt-2">
              {details.subtitle && (
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-theme-accent">
                  {details.subtitle}
                </span>
              )}
              <h2 id="modal-project-title" className="text-3xl font-black tracking-tight text-theme-text sm:text-4xl lg:text-5xl leading-tight">
                {project.title}
              </h2>

              {/* Tag Cloud */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-theme-accent/10 bg-theme-bg-elevated/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-theme-text-muted/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Animated WebP / Video Banner */}
            <div className="overflow-hidden rounded-xl border border-theme-accent/25 bg-theme-bg-elevated/10 shadow-lg aspect-[16/9] w-full relative">
              <ProjectPreview project={project} className="h-full w-full" />
            </div>

            {/* Gradient Decorative Line Divider */}
            <div className="h-px w-full bg-gradient-to-r from-theme-accent/40 via-theme-accent/15 to-transparent" />

            {/* Structured Project Body */}
            <div className="flex flex-col gap-10 text-sm leading-relaxed text-theme-text-subtle font-light">
              
              {/* Introduction */}
              {details.detailedDescription && (
                <section className="flex flex-col gap-3">
                  <p className="text-[15px] sm:text-base leading-relaxed text-theme-text/90 font-normal">
                    {details.detailedDescription}
                  </p>
                </section>
              )}

              {/* Section 1: Architecture Breakdown */}
              {details.architecture && details.architecture.length > 0 && (
                <section className="flex flex-col gap-4">
                  <h3 className="flex items-center gap-3.5 text-lg font-bold tracking-tight text-theme-text">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-theme-accent/10 text-xs text-theme-accent font-mono font-bold">
                      01
                    </span>
                    System Architecture
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 mt-2">
                    {details.architecture.map((item, index) => (
                      <div 
                        key={index}
                        className="rounded-xl border border-theme-accent/10 bg-theme-bg-elevated/20 p-4 shadow-sm hover:border-theme-accent/25 hover:bg-theme-bg-elevated/35 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2 text-theme-accent">
                          <IconCpu size={16} />
                          <h4 className="text-[13px] font-bold uppercase tracking-wider font-mono">
                            {item.tech}
                          </h4>
                        </div>
                        <p className="text-[12px] text-theme-text-muted leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section 2: Key Features */}
              {details.keyFeatures && details.keyFeatures.length > 0 && (
                <section className="flex flex-col gap-4">
                  <h3 className="flex items-center gap-3.5 text-lg font-bold tracking-tight text-theme-text">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-theme-accent/10 text-xs text-theme-accent font-mono font-bold">
                      02
                    </span>
                    Key Features
                  </h3>
                  <ul className="grid gap-3 sm:grid-cols-2 mt-1">
                    {details.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-[13px]">
                        <IconCircleCheck size={18} className="text-theme-accent shrink-0 mt-0.5" />
                        <span className="text-theme-text-subtle">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Section 3: Local SEO Domination Achievement */}
              {details.localSeo && (
                <section className="flex flex-col gap-4">
                  <h3 className="flex items-center gap-3.5 text-lg font-bold tracking-tight text-theme-text">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-theme-accent/10 text-xs text-theme-accent font-mono font-bold">
                      03
                    </span>
                    Local Search Optimization
                  </h3>
                  
                  {/* Premium Accent Box */}
                  <div className="rounded-xl border border-theme-accent/20 bg-theme-accent/5 p-5 border-l-4 border-l-theme-accent shadow-md flex flex-col md:flex-row gap-5 items-start">
                    <div className="p-2.5 rounded-lg bg-theme-accent/10 text-theme-accent shrink-0">
                      <IconSearch size={22} stroke={2} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[15px] font-bold text-theme-text">
                        {details.localSeo.achievement}
                      </h4>
                      <p className="text-[13px] leading-relaxed text-theme-text-subtle font-light">
                        {details.localSeo.details}
                      </p>
                      
                      {/* Sub-metrics badge indicators */}
                      <div className="flex flex-wrap gap-2 mt-2.5">
                        <span className="rounded-md bg-theme-bg px-2.5 py-1 text-[11px] font-mono text-theme-accent border border-theme-accent/15">
                          Query: "{details.localSeo.term}"
                        </span>
                        <span className="rounded-md bg-theme-bg px-2.5 py-1 text-[11px] font-mono text-theme-text-muted border border-theme-accent/10">
                          Target: {details.localSeo.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Section 4: GA4 Analytics & Strategic SEO Loops */}
              {details.ga4Seo && (
                <section className="flex flex-col gap-4">
                  <h3 className="flex items-center gap-3.5 text-lg font-bold tracking-tight text-theme-text">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-theme-accent/10 text-xs text-theme-accent font-mono font-bold">
                      04
                    </span>
                    Data Analytics & GA4 Feedback Loop
                  </h3>
                  
                  <div className="grid gap-6 sm:grid-cols-2 mt-1">
                    <div className="rounded-xl border border-theme-accent/10 bg-theme-bg-elevated/20 p-5 shadow-sm">
                      <h4 className="flex items-center gap-2 mb-2.5 text-xs font-bold uppercase tracking-wider text-theme-accent font-mono">
                        <IconChartBar size={15} />
                        Analytics Tracking Setup
                      </h4>
                      <p className="text-[12px] text-theme-text-muted leading-relaxed font-light">
                        {details.ga4Seo.implementation}
                      </p>
                    </div>
                    <div className="rounded-xl border border-theme-accent/10 bg-theme-bg-elevated/20 p-5 shadow-sm">
                      <h4 className="flex items-center gap-2 mb-2.5 text-xs font-bold uppercase tracking-wider text-theme-accent font-mono">
                        <IconChartBar size={15} />
                        Optimization & Results
                      </h4>
                      <p className="text-[12px] text-theme-text-muted leading-relaxed font-light">
                        {details.ga4Seo.results}
                      </p>
                    </div>
                  </div>
                </section>
              )}

            </div>

            {/* Footer Area with Navigation Actions */}
            <footer className="flex flex-col gap-6 pt-4">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-theme-accent/20 to-transparent" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold text-theme-text hover:text-theme-accent tracking-widest transition-colors font-mono"
                    >
                      <IconBrandGithub size={18} />
                      REPOSITORY
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold text-theme-text hover:text-theme-accent tracking-widest transition-colors font-mono"
                    >
                      <IconExternalLink size={18} />
                      LIVE PREVIEW
                    </a>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-xs font-bold uppercase tracking-widest text-theme-text-muted hover:text-theme-text transition-colors text-left"
                >
                  Close Details
                </button>
              </div>
            </footer>
          </div>
        ) : (
          /* Fallback Standard Layout for simpler projects */
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-2 pt-2">
              <h2 id="modal-project-title" className="text-3xl font-bold tracking-tight text-theme-text sm:text-4xl">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-theme-bg-elevated px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-theme-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Animated WebP / Video Banner */}
            <div className="overflow-hidden rounded-xl border border-theme-accent/25 bg-theme-bg-elevated/10 shadow-lg aspect-[16/9] w-full relative">
              <ProjectPreview project={project} className="h-full w-full" />
            </div>

            <div className="h-px w-full bg-theme-border/20" />

            <p className="text-sm leading-relaxed text-theme-text-subtle font-light">
              {project.description}
            </p>

            <div className="h-px w-full bg-theme-border/20" />

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-theme-text hover:text-theme-accent transition-colors font-mono"
                  >
                    <IconBrandGithub size={16} />
                    GITHUB
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-theme-text hover:text-theme-accent transition-colors font-mono"
                  >
                    <IconExternalLink size={16} />
                    LIVE
                  </a>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-xs font-semibold uppercase text-theme-text-muted hover:text-theme-text transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
