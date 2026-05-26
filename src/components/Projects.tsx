import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight, IconHeart } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '../data/projects';
import { techStack, techStackIcons } from '../data/tech';
import { useTerminal } from '../context/TerminalContext';
import { ProjectDetailModal } from './ProjectDetailModal';

export function Projects() {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [slides, setSlides] = useState<Project[]>(projects);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { setHoveredCommand } = useTerminal();

  // Shift the first element to the end of the array
  const handleNext = () => {
    setDirection('next');
    setSlides((prevSlides) => {
      const [first, ...rest] = prevSlides;
      return [...rest, first];
    });
  };

  // Shift the last element to the beginning of the array
  const handlePrev = () => {
    setDirection('prev');
    setSlides((prevSlides) => {
      const last = prevSlides[prevSlides.length - 1];
      const rest = prevSlides.slice(0, -1);
      return [last, ...rest];
    });
  };

  // The active project in the deck is item 2 (index 1)
  const activeSlideProject = slides[1] || slides[0];
  const activeProjectSlug = activeSlideProject?.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Synchronize terminal hover state with the currently active slide
  useEffect(() => {
    if (isHovered && activeProjectSlug) {
      setHoveredCommand(`open projects/${activeProjectSlug}`);
    } else {
      setHoveredCommand(null);
    }
  }, [isHovered, activeProjectSlug, setHoveredCommand]);

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

      {/* Embedded CSS Styles scoped with proj- prefix */}
      <style>{`
        .proj-slider-container {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          width: 100%;
          height: 560px;
          overflow: hidden;
          position: relative;
          border-radius: 16px;
          background-color: rgb(var(--theme-bg-elevated) / 0.3);
          border: 1px solid rgb(var(--theme-accent) / 0.15);
          box-shadow: 0 20px 40px -15px rgb(var(--theme-shadow) / 0.3);
        }

        .proj-slide {
          width: 100%;
          height: 100%;
        }

        .proj-item {
          width: 260px;
          height: 155px; /* Landscape aspect ratio! */
          background-position: 50% 50%;
          background-size: cover;
          display: inline-block;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                      left 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                      width 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                      height 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                      opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                      border-radius 0.6s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          position: absolute;
          z-index: 1;
          bottom: 40px; /* Align thumbnails at the bottom! */
          border-radius: 12px;
          box-shadow: 0 20px 40px rgb(0 0 0 / 0.5);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        /* Item 1 and Item 2 fill up the entire background screen */
        .proj-item:nth-child(1),
        .proj-item:nth-child(2) {
          left: 0;
          top: 0;
          bottom: 0;
          transform: translate(0, 0);
          border-radius: 0;
          width: 100%;
          height: 100%;
          box-shadow: none;
          border: none;
        }

        /* Positioning for preview thumbnails (Items 3, 4, 5) aligned at bottom */
        .proj-item:nth-child(3) { left: 50%; bottom: 40px; }
        .proj-item:nth-child(4) { left: calc(50% + 280px); bottom: 40px; }
        .proj-item:nth-child(5) { left: calc(50% + 560px); bottom: 40px; }
        
        /* Elements from the 6th position onwards stay hidden off-screen */
        .proj-item:nth-child(n+6) {
          left: calc(50% + 840px);
          bottom: 40px;
          opacity: 0;
          pointer-events: none;
        }

        /* Hover effect for thumbnail cards to lift them slightly from the bottom */
        .proj-item:nth-child(n+3):hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 15px 35px rgb(0 0 0 / 0.6);
          border-color: rgb(var(--theme-accent) / 0.5);
        }

        /* Floating frosted-glass card overlay for the active slide (Item 2) on bottom-left */
        .proj-item .proj-content {
          position: absolute;
          bottom: 40px; /* Align description at the bottom! */
          left: 60px;
          width: 440px;
          text-align: left;
          padding: 28px;
          color: #ffffff;
          background: rgba(15, 15, 20, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          box-shadow: 0 20px 40px rgb(0 0 0 / 0.45);
          display: none;
          z-index: 10;
          flex-direction: column;
          gap: 16px;
        }

        /* Display text content only on the active main screen (2nd item) */
        .proj-item:nth-child(2) .proj-content {
          display: flex;
        }


        .proj-item .proj-name {
          font-family: inherit;
          font-size: 24px;
          font-weight: 700;
          opacity: 0;
          animation: showcontent 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.1s 1 forwards;
          color: #ffffff;
          line-height: 1.2;
        }

        .proj-item .proj-des {
          font-family: inherit;
          font-size: 13px;
          line-height: 1.5;
          opacity: 0;
          animation: showcontent 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.25s 1 forwards;
          color: rgba(255, 255, 255, 0.7);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .proj-item .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          opacity: 0;
          animation: showcontent 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.4s 1 forwards;
        }

        .proj-item .proj-see-more {
          align-self: flex-start;
          padding: 8px 18px;
          border: 1px solid rgb(var(--theme-accent));
          background: rgb(var(--theme-accent) / 0.1);
          color: rgb(var(--theme-text));
          font-family: inherit;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 6px;
          cursor: pointer;
          opacity: 0;
          animation: showcontent 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.55s 1 forwards;
          transition: all 0.25s ease;
        }

        .proj-item .proj-see-more:hover {
          background-color: rgb(var(--theme-accent));
          color: rgb(var(--theme-on-accent));
          box-shadow: 0 0 15px rgb(var(--theme-accent) / 0.45);
          transform: translateY(-1px);
        }

        @keyframes showcontent {
          from {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        /* Navigation Controls - Left and Right Vertically Centered */
        .proj-buttons {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          width: 100%;
          z-index: 20;
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          pointer-events: none; /* Let pointer events fall through the container */
        }

        .proj-buttons button {
          pointer-events: auto; /* Re-enable pointer events on the buttons */
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgb(var(--theme-accent) / 0.4);
          background: rgb(var(--theme-bg) / 0.85);
          backdrop-filter: blur(4px);
          color: rgb(var(--theme-text));
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 10px rgb(0 0 0 / 0.15);
        }

        .proj-buttons button:hover {
          background-color: rgb(var(--theme-accent));
          color: rgb(var(--theme-on-accent));
          border-color: rgb(var(--theme-accent));
          box-shadow: 0 0 15px rgb(var(--theme-accent) / 0.45);
          transform: scale(1.08);
        }

        .proj-buttons button:active {
          transform: scale(0.95);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .proj-slider-container {
            height: 500px;
          }
          .proj-item {
            width: 190px;
            height: 115px;
            border-radius: 8px;
            bottom: 30px;
          }
          .proj-item:nth-child(3) { left: 52%; bottom: 30px; }
          .proj-item:nth-child(4) { left: calc(52% + 205px); bottom: 30px; }
          .proj-item:nth-child(5) { left: calc(52% + 410px); bottom: 30px; }
          .proj-item:nth-child(n+6) {
            left: calc(52% + 615px);
            bottom: 30px;
          }
          .proj-item .proj-content {
            left: 40px;
            bottom: 30px;
            width: 380px;
            padding: 24px;
          }
          .proj-buttons {
            padding: 0 15px;
          }
        }

        @media (max-width: 768px) {
          .proj-slider-container {
            height: 440px;
          }
          /* Hide preview deck on mobile to maximize active content readability */
          .proj-item:nth-child(n+3) {
            display: none;
            opacity: 0;
            pointer-events: none;
          }
          .proj-item .proj-content {
            left: 20px;
            right: 20px;
            width: auto;
            bottom: 24px;
          }
          /* Dim background more aggressively on mobile */
          .proj-item:nth-child(2)::before {
            background: rgba(var(--theme-bg), 0.85);
          }
          .proj-buttons {
            padding: 0 10px;
          }
        }
      `}</style>

      <div
        className="proj-slider-container group/slider selection:bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="proj-slide">
          {/* Card 1: Exiting/Background slide (matching :nth-child(1)) */}
          <div
            className="proj-item"
            style={{
              backgroundImage: `url(${slides[0]?.image || activeSlideProject.image})`,
              opacity: 0.3 /* Dim the underneath background during transitions */
            }}
          />

          {/* Card 2: Active Background slide and glass text card (matching :nth-child(2)) */}
          <div
            className="proj-item"
            onClick={() => setActiveProject(activeSlideProject)}
            style={{ overflow: 'hidden', position: 'absolute' }}
          >
            {/* Smooth spring slide-and-fade background transitions */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeSlideProject.title}
                custom={direction}
                variants={{
                  initial: (dir) => ({
                    x: dir === 'next' ? '30%' : dir === 'prev' ? '-30%' : 0,
                    opacity: 0
                  }),
                  animate: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      x: { type: 'spring', stiffness: 220, damping: 26 },
                      opacity: { duration: 0.35 }
                    }
                  },
                  exit: (dir) => ({
                    x: dir === 'next' ? '-30%' : dir === 'prev' ? '30%' : 0,
                    opacity: 0,
                    transition: {
                      x: { type: 'spring', stiffness: 220, damping: 26 },
                      opacity: { duration: 0.35 }
                    }
                  })
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${activeSlideProject.image})` }}
              />
            </AnimatePresence>

            {/* Sync text content transition with navigation direction */}
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={activeSlideProject.title}
                custom={direction}
                variants={{
                  initial: (dir) => ({
                    x: dir === 'next' ? 40 : dir === 'prev' ? -40 : 0,
                    opacity: 0
                  }),
                  animate: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      x: { type: 'spring', stiffness: 220, damping: 26 },
                      opacity: { duration: 0.35 }
                    }
                  },
                  exit: (dir) => ({
                    x: dir === 'next' ? -40 : dir === 'prev' ? 40 : 0,
                    opacity: 0,
                    transition: {
                      x: { type: 'spring', stiffness: 220, damping: 26 },
                      opacity: { duration: 0.35 }
                    }
                  })
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                className="proj-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="proj-name">{activeSlideProject.title}</div>
                <div className="proj-des">{activeSlideProject.description}</div>

                <div className="proj-tags">
                  {activeSlideProject.tags.map((tag) => {
                    const tech = techStack.find(t =>
                      t.label.toLowerCase() === tag.toLowerCase() ||
                      t.shortLabel.toLowerCase() === tag.toLowerCase()
                    );

                    if (!tech) {
                      return (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white/70"
                        >
                          {tag}
                        </span>
                      );
                    }

                    const TechIcon = techStackIcons[tech.icon];

                    return (
                      <div
                        key={tag}
                        className="group/tag flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 transition-all hover:border-white/25 hover:bg-white/10"
                      >
                        <div
                          className="flex h-3 w-3 items-center justify-center transition-transform group-hover/tag:scale-110"
                          style={{ color: tech.tone }}
                        >
                          <TechIcon size={12} stroke={2} aria-hidden="true" />
                        </div>
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-white/70 transition-colors group-hover/tag:text-white">
                          {tech.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cards 3-6: The 4 screenshot previews with staggered, synced sliding transitions */}
          <AnimatePresence mode="popLayout" custom={direction}>
            {activeSlideProject.screenshots?.map((screenshot, idx) => {
              return (
                <motion.div
                  key={`${activeSlideProject.title}-screenshot-${idx}`}
                  custom={direction}
                  variants={{
                    initial: (dir) => ({
                      x: dir === 'next' ? 60 : dir === 'prev' ? -60 : 0,
                      opacity: 0
                    }),
                    animate: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        x: { type: 'spring', stiffness: 220, damping: 26, delay: idx * 0.05 },
                        opacity: { duration: 0.35, delay: idx * 0.05 }
                      }
                    },
                    exit: (dir) => ({
                      x: dir === 'next' ? -60 : dir === 'prev' ? 60 : 0,
                      opacity: 0,
                      transition: {
                        x: { type: 'spring', stiffness: 220, damping: 26 },
                        opacity: { duration: 0.3 }
                      }
                    })
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="proj-item"
                  style={{ backgroundImage: `url(${screenshot})` }}
                  onClick={() => {
                    setActiveProject(activeSlideProject);
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>

        <div className="proj-buttons">
          <button
            onClick={handlePrev}
            aria-label="Previous Project"
            onMouseEnter={() => setHoveredCommand('prev project')}
            onMouseLeave={() => setHoveredCommand(isHovered ? `open projects/${activeProjectSlug}` : null)}
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Project"
            onMouseEnter={() => setHoveredCommand('next project')}
            onMouseLeave={() => setHoveredCommand(isHovered ? `open projects/${activeProjectSlug}` : null)}
          >
            ❯
          </button>
        </div>
      </div>

      {/* Elegant AnimatePresence Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

