import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconNews, IconStar, IconBook, IconPlayerPlay, IconCheck, IconHeart, IconX } from '@tabler/icons-react';
import { PostCard } from '../components/PostCard';
import { posts } from '../data/posts';
import { mangaRecommendations, animeRecommendations } from '../data/recommendations';

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'recs'>('posts');
  const [recCategory, setRecCategory] = useState<'manga' | 'anime'>('manga');
  const [showTastePopup, setShowTastePopup] = useState(false);
  const [isNoHovered, setIsNoHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#recs' || location.hash === '#manga') {
      setActiveTab('recs');
      if (location.hash === '#manga') {
        setRecCategory('manga');
      }
    }
  }, [location.hash]);

  const recData = recCategory === 'manga' ? mangaRecommendations : animeRecommendations;

  useEffect(() => {
    if (!showTastePopup) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowTastePopup(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTastePopup]);

  const openTastePopup = () => {
    setShowTastePopup(true);
    setIsNoHovered(false);
  };

  const closeTastePopup = () => {
    setShowTastePopup(false);
    setIsNoHovered(false);
  };

  return (
    <div className="flex flex-1 flex-col items-center gap-12 w-full pt-8 sm:pt-14 lg:pt-16 pb-20 sm:pb-32 max-w-5xl mx-auto">

      {/* Dynamic Header Section */}
      <div className="w-full flex flex-col gap-8">
        <header className="flex w-full items-center gap-6">
          <h1 className="flex shrink-0 items-center gap-3 text-4xl font-bold tracking-tight text-theme-text sm:text-5xl">
            {activeTab === 'posts' ? (
              <>
                <IconNews size={42} stroke={2} className="text-theme-accent" />
                Posts
              </>
            ) : (
              <>
                <IconHeart size={42} stroke={2} className="text-theme-accent animate-pulse" />
                My Picks
              </>
            )}
          </h1>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-theme-accent/40" />
        </header>

        {/* Premium Segmented Tab Control */}
        <div id="recs" className="flex justify-start">
          <div
            className="relative inline-flex p-1.5 rounded-2xl border border-theme-accent/10 shadow-md"
            role="radiogroup"
          >
            <button
              role="radio"
              aria-checked={activeTab === 'posts'}
              onClick={() => setActiveTab('posts')}
              className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors duration-200 active:scale-95 ${activeTab === 'posts'
                ? 'text-theme-on-accent'
                : 'text-theme-text-muted hover:text-theme-text'
                }`}
            >
              {activeTab === 'posts' && (
                <motion.span
                  layoutId="posts-tab-pill"
                  className="absolute inset-0 rounded-xl bg-theme-accent shadow-md"
                  transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2.5">
                <IconNews size={16} />
                Writing
              </span>
            </button>
            <button
              role="radio"
              aria-checked={activeTab === 'recs'}
              onClick={() => setActiveTab('recs')}
              className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors duration-200 active:scale-95 ${activeTab === 'recs'
                ? 'text-theme-on-accent'
                : 'text-theme-text-muted hover:text-theme-text'
                }`}
            >
              {activeTab === 'recs' && (
                <motion.span
                  layoutId="posts-tab-pill"
                  className="absolute inset-0 rounded-xl bg-theme-accent shadow-md"
                  transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2.5">
                <IconStar size={16} />
                Curated Recs
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center">
        {activeTab === 'posts' ? (
          /* Single Column Elegant Typographic Feed */
          <div className="flex w-full max-w-3xl flex-col gap-6 pt-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-20 text-theme-text-muted">
                <p className="text-lg">No posts yet. Check back soon! ✍️</p>
              </div>
            )}
          </div>
        ) : (
          /* Curated Media recommendations list */
          <div className="flex w-full flex-col gap-10 pt-4">
            {/* Intro & Categories Switcher */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b border-theme-accent/10 pb-8 w-full">
              {/* Left Side: Profile and Filters */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 max-w-2xl">
                <img
                  src="/images/peak.jpg"
                  alt="Peak Taste"
                  className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border border-theme-accent/20 shrink-0 shadow-sm transition-all duration-300 hover:scale-105 hover:rotate-3"
                />
                <div className="flex flex-col gap-4">
                  <p className="text-[14px] leading-relaxed text-theme-text-muted font-light">
                    A highly subjective list of anime, manga and manhwa that left a lasting impression on me. Peak taste only. ✌️
                  </p>

                  {/* Sub-Category Filter Buttons */}
                  <div className="flex gap-2.5 mt-2">
                    <button
                      onClick={() => setRecCategory('manga')}
                      className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-300 active:scale-95 border ${recCategory === 'manga'
                        ? 'border-theme-accent bg-theme-accent/10 text-theme-accent shadow-sm'
                        : 'border-theme-accent/10 hover:border-theme-accent/30 text-theme-text-muted hover:text-theme-text'
                        }`}
                    >
                      <IconBook size={15} />
                      Manga
                    </button>
                    <button
                      onClick={() => setRecCategory('anime')}
                      className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-300 active:scale-95 border ${recCategory === 'anime'
                        ? 'border-theme-accent bg-theme-accent/10 text-theme-accent shadow-sm'
                        : 'border-theme-accent/10 hover:border-theme-accent/30 text-theme-text-muted hover:text-theme-text'
                        }`}
                    >
                      <IconPlayerPlay size={15} />
                      Anime
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: The Question Box */}
              <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 pt-2 lg:pt-8">
                <p className="text-[13px] font-medium text-theme-text-muted tracking-wide">
                  Agree with my peak taste?
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={openTastePopup}
                    className="w-16 h-8 rounded-full border border-theme-accent/30 bg-transparent text-theme-accent text-xs font-bold transition-all hover:border-theme-accent hover:bg-theme-accent hover:text-theme-on-accent active:scale-95 flex items-center justify-center"
                  >
                    Yes
                  </button>
                  <button
                    onClick={openTastePopup}
                    onMouseEnter={() => setIsNoHovered(true)}
                    onMouseLeave={() => setIsNoHovered(false)}
                    className="w-16 h-8 rounded-full border border-theme-accent/30 bg-transparent text-theme-accent text-xs font-bold transition-all hover:border-theme-accent hover:bg-theme-accent hover:text-theme-on-accent active:scale-95 flex items-center justify-center"
                  >
                    {isNoHovered ? 'Yes' : 'No'}
                  </button>
                </div>
              </div>
            </div>

            {/* High-Fidelity Multi-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
              {recData.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col sm:flex-row items-start gap-6 p-5 rounded-2xl transition-all duration-300 hover:bg-theme-accent/[0.02]"
                >
                  {/* High Quality Cover Image */}
                  {item.image && (
                    <div className="relative aspect-[2/3] w-32 shrink-0 overflow-hidden rounded-2xl border border-theme-accent/10 bg-theme-bg-elevated shadow-lg group-hover:shadow-theme-accent/5 transition-all duration-300">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Rating Overlay */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-theme-bg/85 border border-theme-accent/20 px-2 py-0.5 rounded-lg backdrop-blur-sm shadow-sm">
                        <IconStar size={11} className="fill-theme-accent text-theme-accent" />
                        <span className="text-[10px] font-bold text-theme-text">{item.rating}/10</span>
                      </div>
                    </div>
                  )}

                  {/* Curated Text Content */}
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border ${item.status === 'Finished'
                        ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500'
                        : 'border-theme-accent/20 bg-theme-accent/5 text-theme-accent'
                        }`}>
                        {item.status}
                        {item.status === 'Finished' && <IconCheck size={10} stroke={3} />}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold leading-tight text-theme-text group-hover:text-theme-accent transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-[13px] leading-relaxed text-theme-text-muted font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showTastePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeTastePopup}
        >
          <div
            className="relative w-full max-w-md overflow-hidden bg-theme-bg shadow-2xl rounded-md"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeTastePopup}
              className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/30 p-2 text-white/80 transition hover:text-white"
              aria-label="Close popup"
            >
              <IconX size={16} />
            </button>
            <img
              src="/images/myboiii.jpg"
              alt="Peak taste popup"
              className="block h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-widest text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                My Boiii!!!
              </h2>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

