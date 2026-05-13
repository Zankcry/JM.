import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IconArrowRight,
  IconBook,
  IconMusic,
  IconCamera,
  IconLanguage,
  IconNews,
  IconBrandSpotify
} from '@tabler/icons-react';
import { posts } from '../data/posts';
import { PostCard } from './PostCard';
import { ProfileWidgets } from './BentoProfile';

export function RecentActivity() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const recentPosts = posts.slice(0, 2);

  const exploreCards = [
    {
      title: 'Word of the Week',
      description: 'Sharing my love for the japanese language',
      icon: IconLanguage,
      href: '/about#word-of-the-week',
      color: '#FF4B4B'
    },
    {
      title: 'Music I Code To',
      description: 'My top musics I listen to while coding',
      icon: IconMusic,
      href: '/about#music',
      color: '#1DB954'
    },
    {
      title: 'Manga Recommendations',
      description: 'My personal manga/anime reccomendations',
      icon: IconBook,
      href: '/about#manga',
      color: '#A855F7'
    },
    {
      title: 'Photo Gallery',
      description: 'My Captured moments and visual inspirations.',
      icon: IconCamera,
      href: '/pics',
      color: '#38BDF8'
    }
  ];

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
            className="group flex items-center gap-2 whitespace-nowrap text-sm font-medium text-theme-text-muted transition-colors hover:text-theme-accent"
          >
            All posts
            <IconArrowRight size={16} stroke={2} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Dashboard Section (Explore + Profile) */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h2 className="flex items-center gap-2 whitespace-nowrap text-xl font-medium tracking-tight text-theme-text sm:text-2xl">
            Explore & Connect
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-theme-accent/40 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Explore Cards */}
          {exploreCards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-theme-accent/40 bg-theme-bg/30 p-5 shadow-soft transition-all hover:border-theme-accent/70 hover:bg-theme-bg"
            >
              {/* Background Preview - Layered above card bg but below content */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {card.title === 'Word of the Week' ? (
                  <div className="absolute -right-2 -top-4 select-none text-[7rem] font-bold leading-none text-theme-text opacity-[0.08] transition-all duration-500 group-hover:opacity-[0.15] group-hover:scale-110">
                    語
                  </div>
                ) : card.title === 'Music I Code To' ? (
                  <div className="absolute -right-4 -top-4 opacity-[0.12] transition-all duration-500 group-hover:opacity-[0.25] group-hover:scale-110">
                    <IconBrandSpotify size={140} style={{ color: '#1DB954' }} />
                  </div>
                ) : (
                  <img
                    src={card.title === 'Photo Gallery' ? '/images/pics/quiet-afternoon.jpg' : '/images/manga/randomChat.webp'}
                    alt=""
                    className="h-full w-full object-cover opacity-20 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
                  />
                )}
                {/* Gradient for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent"></div>
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-theme-accent/10 bg-theme-bg/80 backdrop-blur-sm transition-colors group-hover:bg-theme-accent/10"
                  style={{ color: card.color }}
                >
                  <card.icon size={20} stroke={1.5} />
                </div>

                <div className="mt-auto">
                  <h3 className="mb-1 text-sm font-bold tracking-tight text-theme-text group-hover:text-theme-accent">
                    {card.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-theme-text-muted opacity-80">
                    {card.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-theme-accent opacity-0 transition-opacity group-hover:opacity-100">
                    <span>View</span>
                    <IconArrowRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Profile Widgets (Merged into the same grid) */}
          <ProfileWidgets currentTime={currentTime} />
        </div>
      </div>
    </section>
  );
}
