import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IconArrowUpRight,
  IconBookmark,
  IconPlaylist,
  IconBrandGooglePhotos,
  IconLanguage,
  IconNews,
  IconBrandSpotify
} from '@tabler/icons-react';
import { posts } from '../data/posts';
import { PostCard } from './PostCard';
import { AvailabilityCard, ConnectCard, LocationCard } from './BentoProfile';
import { useTerminal } from '../context/TerminalContext';

export function RecentActivity() {
  const { setHoveredCommand } = useTerminal();

  const recentPosts = posts.slice(0, 2);

  const exploreCards = [
    {
      title: 'Word of the Week',
      description: 'Sharing my love for the Japanese language',
      icon: IconLanguage,
      href: '/about#word-of-the-week',
    },
    {
      title: 'Music I Code To',
      description: 'My top tracks I listen to while coding',
      icon: IconPlaylist,
      href: '/about#music',
    },
    {
      title: 'Manga Recommendations',
      description: 'My personal manga/anime recommendations',
      icon: IconBookmark,
      href: '/posts#recs',
    }
  ];

  const getCommandFromHref = (href: string) => {
    const page = href.split('#')[0];
    return page.replace(/^\//, '') || 'home';
  };

  return (
    <section className="flex w-full flex-col gap-12">
      {/* Recent Posts Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-1 items-center gap-4">
            <h2 className="flex items-center gap-2 whitespace-nowrap text-xl font-medium tracking-tight text-theme-text sm:text-2xl">
              <IconNews size={24} className="text-theme-accent" />
              Recent Posts
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-theme-accent/40 to-transparent"></div>
          </div>
          <Link
            to="/posts"
            onMouseEnter={() => setHoveredCommand('posts')}
            onMouseLeave={() => setHoveredCommand(null)}
            className="group flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-theme-text-muted transition-colors hover:text-theme-accent"
          >
            View All
            <IconArrowUpRight size={16} stroke={2} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Dashboard Section (Asymmetric Bento Grid) */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h2 className="flex items-center gap-2 whitespace-nowrap text-xl font-medium tracking-tight text-theme-text sm:text-2xl">
            Explore & Connect
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-theme-accent/40 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Row 1 - 1x1 slots */}
          {exploreCards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              onMouseEnter={() => setHoveredCommand(getCommandFromHref(card.href))}
              onMouseLeave={() => setHoveredCommand(null)}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-theme-accent/20 bg-theme-bg p-5 shadow-lg transition-all hover:border-theme-accent/70"
            >
              {/* Background Preview - Layered above card bg but below content */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {card.title === 'Word of the Week' ? (
                  <>
                    <img
                      src="/images/pics/holy-angel.webp"
                      alt=""
                      className="h-full w-full object-cover opacity-20 transition-all duration-500 group-hover:scale-105 group-hover:opacity-45"
                    />
                    <div className="absolute -right-2 -top-4 select-none text-[7rem] font-bold leading-none text-theme-accent opacity-[0.08] transition-all duration-500 group-hover:opacity-[0.15] group-hover:scale-110">
                      語
                    </div>
                  </>
                ) : card.title === 'Manga Recommendations' ? (
                  <img
                    src="/images/anime_manga/myBias.webp"
                    alt=""
                    className="h-full w-full object-cover opacity-20 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
                  />
                ) : (
                  <img
                    src="/images/spotify.png"
                    alt=""
                    className="h-full w-full object-cover opacity-20 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
                  />
                )}
                {/* Gradient for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent"></div>
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-theme-accent/10 bg-theme-bg/80 text-theme-accent backdrop-blur-sm transition-colors group-hover:bg-theme-accent/10">
                  <card.icon size={20} stroke={1.5} />
                </div>

                <div className="mt-auto">
                  <h3 className="mb-1 text-sm font-bold tracking-tight text-theme-text group-hover:text-theme-accent">
                    {card.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-theme-text-muted opacity-80">
                    {card.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-theme-accent">
                    <span>View</span>
                    <IconArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Location map (1x1 square) */}
          <LocationCard />

          {/* Row 2 - 2x1 Photo Gallery */}
          <Link
            to="/photos"
            onMouseEnter={() => setHoveredCommand('photos')}
            onMouseLeave={() => setHoveredCommand(null)}
            className="group relative flex flex-col md:flex-row overflow-hidden rounded-xl border border-theme-accent/20 bg-theme-bg p-5 shadow-lg transition-all hover:border-theme-accent/70 sm:col-span-2 lg:col-span-2 min-h-[180px]"
          >
            {/* Background image preview covering the right half */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 overflow-hidden pointer-events-none opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:scale-105">
              <img
                src="/images/pics/quiet-afternoon.jpg"
                alt="Gallery Preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-theme-bg via-theme-bg/60 to-transparent"></div>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between w-full md:w-1/2">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-theme-accent/10 bg-theme-bg/80 text-theme-accent backdrop-blur-sm transition-colors group-hover:bg-theme-accent/10">
                  <IconBrandGooglePhotos size={20} stroke={1.5} />
                </div>
                <h3 className="mb-1 text-sm font-bold tracking-tight text-theme-text group-hover:text-theme-accent">
                  Photo Gallery
                </h3>
                <p className="text-[12px] leading-relaxed text-theme-text-muted opacity-80">
                  Captured moments and visual inspirations.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-theme-accent">
                <span>View Gallery</span>
                <IconArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>

          {/* Availability Widget (1x1) */}
          <AvailabilityCard />

          {/* Connect Card (1x1) */}
          <ConnectCard />
        </div>
      </div>
    </section>
  );
}
