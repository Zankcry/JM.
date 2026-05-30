import { useState, useEffect, useRef } from 'react';
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

  // The active project in the deck is item 2 (index 1)
  const activeSlideProject = slides[1] || slides[0];
  const activeProjectSlug = activeSlideProject?.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Infinite horizontal scroll loop
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingPaused = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    const scrollSpeed = 0.65; // Slow, premium sliding motion

    const scroll = () => {
      if (el && !isScrollingPaused.current) {
        el.scrollLeft += scrollSpeed;

        // Find the first duplicated card to calculate exact seamless loop offset
        const screenshotsCount = activeSlideProject.screenshots?.length || 0;
        const firstDuplicatedCard = el.children[screenshotsCount] as HTMLElement;

        if (firstDuplicatedCard) {
          // Reset to 0 when the first duplicated card reaches the starting alignment position
          if (el.scrollLeft >= firstDuplicatedCard.offsetLeft - 20) {
            el.scrollLeft = 0;
          }
        } else {
          // Fallback if elements aren't measured yet
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft = 0;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [activeSlideProject]);

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

  const activeIndex = projects.findIndex(p => p.title === activeSlideProject?.title);

  const goToProjectIndex = (targetIndex: number) => {
    const targetProj = projects[targetIndex];
    if (!targetProj) return;

    const currentIndexInSlides = slides.findIndex(s => s.title === targetProj.title);
    if (currentIndexInSlides === -1) return;

    const shift = currentIndexInSlides - 1;
    if (shift === 0) return;

    setDirection(shift > 0 ? 'next' : 'prev');
    setSlides((prevSlides) => {
      const rotated = [...prevSlides];
      if (shift > 0) {
        for (let i = 0; i < shift; i++) {
          const first = rotated.shift()!;
          rotated.push(first);
        }
      } else {
        const absShift = Math.abs(shift);
        for (let i = 0; i < absShift; i++) {
          const last = rotated.pop()!;
          rotated.unshift(last);
        }
      }
      return rotated;
    });
  };

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
      <div className="mb-8 flex items-center gap-4">
        <h2 className="flex shrink-0 items-center gap-2 text-xl font-medium tracking-tight text-theme-text sm:text-2xl">
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
        <div className="h-px flex-1 bg-gradient-to-r from-theme-accent/40 to-transparent" />
        <Link
          to="/projects"
          onMouseEnter={() => setHoveredCommand('projects')}
          onMouseLeave={() => setHoveredCommand(null)}
          className="group flex shrink-0 items-center gap-2 text-sm font-medium text-theme-text-muted transition-colors hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg rounded-md px-1"
        >
          View All
          <IconArrowRight size={16} stroke={2} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div
        className="w-full h-[500px] xl:h-[540px] 2xl:h-[620px] max-lg:h-[480px] max-md:h-[440px] overflow-hidden relative rounded-2xl bg-theme-bg-elevated/30 border border-theme-accent/15 shadow-[0_20px_40px_-15px_rgba(var(--theme-shadow),0.3)] group/slider selection:bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full h-full">
          {/* Card 1: Exiting/Background slide (matching :nth-child(1)) */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 z-0 pointer-events-none"
            style={{
              backgroundImage: `url(${slides[0]?.image || activeSlideProject.image})`,
            }}
          />

          {/* Card 2: Active Background slide and glass text card (matching :nth-child(2)) */}
          <div
            className="absolute inset-0 z-[1] overflow-hidden cursor-pointer"
            onClick={() => setActiveProject(activeSlideProject)}
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
              >
                {/* Cinematic bottom-left gradient overlay to make text highly readable */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/25 to-transparent pointer-events-none" />
              </motion.div>
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
                className="absolute bottom-10 left-10 w-[440px] text-left p-7 text-white z-10 flex flex-col gap-4 max-lg:left-10 max-lg:bottom-[30px] max-lg:w-[380px] max-lg:p-6 max-md:left-5 max-md:right-5 max-md:bottom-6 max-md:w-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-lg font-bold leading-tight sm:text-2xl">{activeSlideProject.title}</div>
                <div className="text-[11px] leading-relaxed text-white/70 line-clamp-2 sm:text-xs">{activeSlideProject.description}</div>

                <div className="hidden sm:flex flex-wrap gap-1.5">
                  {activeSlideProject.tags.map((tag) => {
                    const tech = techStack.find(t =>
                      t.label.toLowerCase() === tag.toLowerCase() ||
                      t.shortLabel.toLowerCase() === tag.toLowerCase()
                    );

                    if (!tech) {
                      return (
                        <span
                          key={tag}
                          className="rounded-md bg-white/5 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white/70"
                        >
                          {tag}
                        </span>
                      );
                    }

                    const TechIcon = techStackIcons[tech.icon];

                    return (
                      <div
                        key={tag}
                        className="group/tag flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 transition-all hover:bg-white/10"
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

          {/* Cards 3-6: The 4 screenshot previews wrapped in an infinite marquee scroller */}
          <div
            className="absolute left-[480px] bottom-10 right-0 h-[175px] z-10 overflow-hidden bg-transparent max-lg:left-[440px] max-lg:bottom-[30px] max-lg:h-[135px] max-md:hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, white 50px)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, white 50px)'
            }}
          >
            <div
              className="flex gap-5 overflow-x-auto overflow-y-hidden w-full h-full pt-2.5 pb-2.5 pl-5 pr-[120px] items-end [scrollbar-width:none] [-ms-overflow-style:none] bg-transparent [&::-webkit-scrollbar]:hidden max-lg:pl-5 max-lg:pr-[100px]"
              ref={scrollRef}
              onMouseEnter={() => { isScrollingPaused.current = true; }}
              onMouseLeave={() => { isScrollingPaused.current = false; }}
            >
              <AnimatePresence mode="popLayout" custom={direction}>
                {[...(activeSlideProject.screenshots || []), ...(activeSlideProject.screenshots || [])].map((screenshot, idx) => {
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
                            x: { type: 'spring', stiffness: 220, damping: 26, delay: (idx % (activeSlideProject.screenshots?.length || 1)) * 0.05 },
                            opacity: { duration: 0.35, delay: (idx % (activeSlideProject.screenshots?.length || 1)) * 0.05 }
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
                      className="flex-shrink-0 w-[260px] h-[155px] bg-center bg-cover rounded-md cursor-pointer transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:scale-[1.05] max-lg:w-[190px] max-lg:h-[115px]"
                      style={{ backgroundImage: `url(${screenshot})` }}
                      onClick={() => {
                        setActiveProject(activeSlideProject);
                      }}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-full z-20 flex justify-between p-0 pointer-events-none">
          <button
            onClick={handlePrev}
            aria-label="Previous Project"
            onMouseEnter={() => setHoveredCommand('prev project')}
            onMouseLeave={() => setHoveredCommand(isHovered ? `open projects/${activeProjectSlug}` : null)}
            className="pointer-events-auto w-[100px] h-full border-none bg-transparent text-white transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer flex items-center justify-start pl-5 text-3xl opacity-35 hover:opacity-95 hover:pl-3 hover:bg-gradient-to-r hover:from-black/15 hover:to-transparent active:opacity-60"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Project"
            onMouseEnter={() => setHoveredCommand('next project')}
            onMouseLeave={() => setHoveredCommand(isHovered ? `open projects/${activeProjectSlug}` : null)}
            className="pointer-events-auto w-[100px] h-full border-none bg-transparent text-white transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer flex items-center justify-end pr-5 text-3xl opacity-35 hover:opacity-95 hover:pr-3 hover:bg-gradient-to-l hover:from-black/15 hover:to-transparent active:opacity-60"
          >
            ❯
          </button>
        </div>

        {/* Project indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 pointer-events-auto">
          {projects.map((proj, idx) => (
            <button
              key={proj.title}
              onClick={() => goToProjectIndex(idx)}
              onMouseEnter={() => setHoveredCommand(`go to project ${idx + 1}`)}
              onMouseLeave={() => setHoveredCommand(isHovered ? `open projects/${activeProjectSlug}` : null)}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-theme-accent ${activeIndex === idx
                ? 'bg-theme-accent w-5'
                : 'bg-white/40 hover:bg-white/70'
                }`}
              aria-label={`Go to project ${idx + 1}`}
              title={proj.title}
            />
          ))}
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

