import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconX,
  IconBrandGithub,
  IconExternalLink,
  IconSearch,
  IconChartBar,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';
import { Project } from '../data/projects';
import { ProjectPreview } from './ProjectPreview';
import { techStack, techStackIcons } from '../data/tech';

type ProjectDetailModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lock body scroll when modal is open and prevent layout shifts
  useEffect(() => {
    setLightboxIndex(null);
    if (project) {
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.removeProperty('--scrollbar-width');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.removeProperty('--scrollbar-width');
    };
  }, [project]);

  // Handle Escape key press for main modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxIndex === null) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, lightboxIndex]);

  // Handle Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null || !project?.screenshots) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => 
          prev !== null ? (prev - 1 + project.screenshots!.length) % project.screenshots!.length : null
        );
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => 
          prev !== null ? (prev + 1) % project.screenshots!.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, project?.screenshots]);

  if (!project) return null;

  const details = project.details;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Outer Wrapper for Modal + Outside Close Button */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-stretch">
        
        {/* Modal Dialog Content Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-full rounded-xl border border-theme-accent/15 bg-theme-bg shadow-[0_0_50px_-12px_rgb(var(--theme-shadow)/0.4)] overflow-y-auto md:overflow-hidden max-h-[90vh] md:h-[85vh] md:max-h-[800px] p-6 sm:p-8 text-left flex flex-col md:flex-row gap-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Left Column: Media Presentation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-6 w-full md:w-[45%] md:h-full md:justify-center md:pr-6 md:border-r md:border-theme-border/10 overflow-y-auto md:overflow-hidden custom-scrollbar"
          >
            <div className="flex flex-col gap-5">
              
              {/* Premium Preview Component Container - Placed at Top for Strong Visual Impact */}
              <div className="overflow-hidden rounded-xl border border-theme-border/20 bg-theme-bg-elevated/20 shadow-inner aspect-[16/9] w-full relative group">
                <ProjectPreview
                  project={project}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Tag Cloud */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-[0.15em] text-theme-text-muted uppercase">Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => {
                    const tech = techStack.find(t =>
                      t.label.toLowerCase() === tag.toLowerCase() ||
                      t.shortLabel.toLowerCase() === tag.toLowerCase()
                    );

                    if (!tech) {
                      return (
                        <span
                          key={tag}
                          className="rounded-md border border-theme-border/20 bg-theme-bg-elevated/40 px-2 py-0.5 text-[9px] font-medium tracking-wide text-theme-text-muted/95"
                        >
                          {tag}
                        </span>
                      );
                    }

                    const TechIcon = techStackIcons[tech.icon];

                    return (
                      <div
                        key={tag}
                        className="group/tag flex items-center gap-1.5 rounded-md border border-theme-border/10 bg-theme-bg-elevated/30 px-2 py-0.5 transition-all duration-200 hover:border-theme-accent/20 hover:bg-theme-bg-elevated/60"
                      >
                        <div
                          className="flex h-3.5 w-3.5 items-center justify-center transition-transform duration-300 group-hover/tag:scale-110"
                          style={{ color: tech.tone }}
                        >
                          <TechIcon size={11} stroke={2.5} aria-hidden="true" />
                        </div>
                        <span className="text-[9px] font-semibold tracking-wide text-theme-text-muted/80 transition-colors duration-200 group-hover/tag:text-theme-text">
                          {tech.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Screenshots Gallery - 2x2 Grid */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-theme-text-muted uppercase">Screenshots (Click to View)</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {project.screenshots.map((screenshot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightboxIndex(idx)}
                        className="group/thumb relative aspect-[16/9] rounded-lg overflow-hidden border border-theme-border/20 bg-theme-bg-elevated/40 hover:border-theme-accent/40 hover:shadow-md transition-all duration-300 shadow-sm active:scale-98"
                        aria-label={`View screenshot ${idx + 1}`}
                      >
                        <img 
                          src={screenshot} 
                          alt={`${project.title} screenshot ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <IconSearch size={18} className="text-white drop-shadow-md scale-90 group-hover/thumb:scale-100 transition-transform duration-300" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Case Study Narrative & Sticky Footer */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }}
            className="w-full md:w-[55%] md:h-full flex flex-col justify-between overflow-hidden"
          >
            
            {/* Scrollable Content Container */}
            <div className="overflow-y-auto pr-1 md:pr-3 flex flex-col gap-6 custom-scrollbar pb-6 flex-grow">
              
              {/* Header Title & Subtitle relocated here above the description */}
              <div className="flex flex-col gap-2 pt-2 pr-6">
                {details?.subtitle ? (
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-theme-accent leading-none">
                    {details.subtitle}
                  </span>
                ) : (
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-theme-text-muted leading-none">
                    PROJECT OVERVIEW
                  </span>
                )}
                <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-theme-text leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Detailed Intro Description */}
              {details?.detailedDescription ? (
                <p className="text-sm sm:text-[15px] leading-relaxed text-theme-text-subtle/95 font-light">
                  {details.detailedDescription}
                </p>
              ) : (
                <p className="text-sm sm:text-[15px] leading-relaxed text-theme-text-subtle/95 font-light">
                  {project.description}
                </p>
              )}

              {details ? (
                <div className="flex flex-col gap-8 mt-2">
                  
                  {/* Architecture Blueprint Section */}
                  {details.architecture && details.architecture.length > 0 && (
                    <section className="flex flex-col gap-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-theme-text-muted flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-theme-accent" />
                        [01 // System Architecture]
                      </h3>
                      
                      {/* Vertical Blueprint List */}
                      <div className="relative pl-4 border-l border-theme-border/10 flex flex-col gap-5 ml-1.5 py-1">
                        {details.architecture.map((item, index) => (
                          <div key={index} className="relative group/arch">
                            {/* Connecting Point */}
                            <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full border border-theme-accent bg-theme-bg transition-transform duration-300 group-hover/arch:scale-125 group-hover/arch:bg-theme-accent" />

                            <div className="flex flex-col gap-1">
                              <h4 className="text-[12px] font-semibold tracking-wider font-mono text-theme-accent uppercase">
                                {item.tech}
                              </h4>
                              <p className="text-[13px] text-theme-text-subtle leading-relaxed font-light">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Key Features Section */}
                  {details.keyFeatures && details.keyFeatures.length > 0 && (
                    <section className="flex flex-col gap-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-theme-text-muted flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-theme-accent" />
                        [02 // Key Features]
                      </h3>
                      <ul className="flex flex-col gap-3.5 pl-1.5">
                        {details.keyFeatures.map((feature, index) => {
                          const match = feature.match(/^([\u2300-\u32FF\uDC00-\uDFFF\uD83C-\uD83E][\uFE0F]?)\s*(.*)/);
                          const displayEmoji = match ? match[1] : null;
                          const displayText = match ? match[2] : feature;

                          return (
                            <li key={index} className="flex items-start gap-3 text-[13px] leading-relaxed group/feat">
                              {displayEmoji ? (
                                <span className="text-sm shrink-0 -mt-0.5 opacity-90 transition-transform duration-200 group-hover/feat:scale-110">{displayEmoji}</span>
                              ) : (
                                <span className="text-theme-accent shrink-0 font-mono select-none">—</span>
                              )}
                              <span className="text-theme-text-subtle/90 font-light">{displayText}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  )}

                  {/* Impact, SEO & Analytics Section */}
                  {(details.localSeo || details.ga4Seo) && (
                    <section className="flex flex-col gap-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-theme-text-muted flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-theme-accent" />
                        [03 // Performance & Strategic Loops]
                      </h3>
                      
                      {/* High Fidelity Developer Dashboard grid */}
                      <div className="rounded-xl border border-theme-border/10 bg-theme-bg-elevated/20 p-5 shadow-sm flex flex-col gap-5">
                        
                        {/* SEO Block */}
                        {details.localSeo && (
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono text-theme-accent uppercase tracking-wider flex items-center gap-1.5">
                                <IconSearch size={12} stroke={2.5} />
                                Local SEO Domination
                              </span>
                              <span className="text-[10px] font-mono text-theme-text-muted uppercase">
                                {details.localSeo.achievement}
                              </span>
                            </div>
                            
                            <p className="text-[13px] leading-relaxed text-theme-text-subtle font-light">
                              {details.localSeo.details}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div className="rounded border border-theme-border/5 bg-theme-bg/40 p-2 flex flex-col gap-0.5">
                                <span className="text-[9px] font-mono text-theme-text-muted uppercase">Search Query</span>
                                <span className="text-[11px] font-mono font-semibold text-theme-text truncate">"{details.localSeo.term}"</span>
                              </div>
                              <div className="rounded border border-theme-border/5 bg-theme-bg/40 p-2 flex flex-col gap-0.5">
                                <span className="text-[9px] font-mono text-theme-text-muted uppercase">Location</span>
                                <span className="text-[11px] font-mono font-semibold text-theme-text truncate">{details.localSeo.location}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {details.localSeo && details.ga4Seo && (
                          <div className="h-px w-full bg-theme-border/5" />
                        )}

                        {/* Analytics Block */}
                        {details.ga4Seo && (
                          <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-mono text-theme-accent uppercase tracking-wider flex items-center gap-1.5">
                              <IconChartBar size={12} stroke={2.5} />
                              GA4 Analytics Loops
                            </span>
                            
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-theme-text uppercase tracking-wider font-mono">Strategy & Setup</span>
                                <p className="text-[13px] leading-relaxed text-theme-text-subtle font-light">
                                  {details.ga4Seo.implementation}
                                </p>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-theme-text uppercase tracking-wider font-mono">Results</span>
                                <p className="text-[13px] leading-relaxed text-theme-text-subtle font-light">
                                  {details.ga4Seo.results}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  )}
                </div>
              ) : (
                /* Fallback Standard Layout for simpler projects */
                <div className="flex flex-col gap-6 mt-2">
                  <div className="h-px w-full bg-gradient-to-r from-theme-border/10 via-theme-border/5 to-transparent" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-theme-text-muted flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-theme-accent" />
                      [Project Highlights]
                    </h3>
                    <p className="text-[13px] text-theme-text-subtle font-light leading-relaxed">
                      This standard module features high performance compiling, a light structural core, responsive assets mapping, and clear modular structure.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Always Visible Sticky Footer */}
            <div className="border-t border-theme-border/10 bg-theme-bg pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 mt-auto">
              {/* CTA Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full border border-theme-border/20 bg-theme-bg-elevated/40 hover:bg-theme-bg-elevated/80 px-3.5 py-1.5 text-[9px] font-bold text-theme-text-muted hover:text-theme-accent active:scale-98 transition-all duration-200 font-mono tracking-wider"
                  >
                    <IconExternalLink size={11} stroke={2.5} />
                    LIVE PREVIEW
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full border border-theme-border/20 bg-theme-bg-elevated/40 hover:bg-theme-bg-elevated/80 px-3.5 py-1.5 text-[9px] font-bold text-theme-text-muted hover:text-theme-text active:scale-98 transition-all duration-200 font-mono tracking-wider"
                  >
                    <IconBrandGithub size={11} stroke={2} />
                    REPOSITORY
                  </a>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-[9px] font-bold uppercase tracking-widest text-theme-text-muted hover:text-theme-text transition-colors duration-200 py-0.5 sm:py-0 font-mono border-b border-dotted border-theme-text-muted/40 hover:border-theme-text"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Overlay for Screenshots */}
      {lightboxIndex !== null && project.screenshots && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-all bg-black/40 hover:bg-black/80 rounded-full p-2.5 z-[110] active:scale-95 border border-white/10"
            aria-label="Close image viewer"
          >
            <IconX size={24} />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => 
                prev !== null ? (prev - 1 + project.screenshots!.length) % project.screenshots!.length : null
              );
            }}
            className="absolute left-4 sm:left-8 text-white/70 hover:text-white transition-all bg-black/40 hover:bg-black/80 rounded-full p-3 z-[110] active:scale-95 border border-white/10"
            aria-label="Previous image"
          >
            <IconChevronLeft size={32} />
          </button>

          {/* Main Screenshot Container */}
          <div
            className="relative flex flex-col items-center justify-center max-w-full max-h-[80vh] z-[105]"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={project.screenshots[lightboxIndex]}
              alt={`${project.title} screenshot ${lightboxIndex + 1}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />

            {/* Counter */}
            <div className="mt-5 text-center font-mono pointer-events-none">
              <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">
                {lightboxIndex + 1} / {project.screenshots.length}
              </p>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => 
                prev !== null ? (prev + 1) % project.screenshots!.length : null
              );
            }}
            className="absolute right-4 sm:right-8 text-white/70 hover:text-white transition-all bg-black/40 hover:bg-black/80 rounded-full p-3 z-[110] active:scale-95 border border-white/10"
            aria-label="Next image"
          >
            <IconChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
}
