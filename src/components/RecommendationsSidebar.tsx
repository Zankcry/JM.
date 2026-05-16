import { useState } from 'react';
import { IconStar, IconBook, IconPlayerPlay, IconCheck } from '@tabler/icons-react';
import { mangaRecommendations, animeRecommendations } from '../data/recommendations';

export function RecommendationsSidebar() {
  const [category, setCategory] = useState<'manga' | 'anime'>('manga');
  const data = category === 'manga' ? mangaRecommendations : animeRecommendations;

  return (
    <aside className="hidden w-full max-w-[320px] flex-col gap-6 lg:flex">
      {/* About Section */}
      <div className="rounded-xl border border-theme-accent/20 bg-theme-bg p-4 shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-widest text-theme-accent">
          My Picks
        </h3>
        <p className="mt-4 text-[13px] leading-relaxed text-theme-text-muted">
          I post whatever I find interesting sometimes unrelated to programming or web development.✌️
        </p>
      </div>

      {/* Recommendations List */}
      <div className="rounded-xl border border-theme-accent/20 bg-theme-bg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-theme-text-subtle">
            {category === 'manga' ? 'Manga' : 'Anime'} Recs
          </h3>

          {/* Switch Button */}
          <button
            onClick={() => setCategory(category === 'manga' ? 'anime' : 'manga')}
            className="flex items-center gap-2 rounded-lg bg-theme-accent/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-tight text-theme-accent transition-all hover:bg-theme-accent/20 active:scale-95"
          >
            {category === 'manga' ? <IconPlayerPlay size={14} /> : <IconBook size={14} />}
            {category === 'manga' ? 'Anime' : 'Manga'}
          </button>
        </div>

        <div className="mt-8 flex max-h-[480px] flex-col gap-8 overflow-y-auto pr-2 custom-scrollbar">
          {data.map((item) => (
            <div key={item.id} className="group flex items-start gap-4">
              {/* Cover Image on the Left */}
              {item.image && (
                <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg border border-theme-accent/20 bg-theme-bg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}

              {/* Content on the Right */}
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-tight ${item.status === 'Finished' ? 'text-green-500' : 'text-theme-accent'}`}>
                    {item.status}
                    {item.status === 'Finished' && <IconCheck size={10} stroke={3} />}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-theme-text-subtle">
                    <IconStar size={10} className="fill-theme-accent text-theme-accent" />
                    {item.rating} / 10
                  </div>
                </div>

                <h4 className="text-[13px] font-bold leading-tight text-theme-text transition-colors group-hover:text-theme-accent">
                  {item.title}
                </h4>

                <p className="line-clamp-3 text-[11px] leading-relaxed text-theme-text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer-like detail */}
      <div className="px-4 text-[11px] text-theme-text-muted/40">
        <p>© 2026 James Michael. Peak taste only.</p>
      </div>
    </aside>
  );
}
