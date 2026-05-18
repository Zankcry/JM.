import React from 'react';
import { motion } from 'framer-motion';
import { Photo } from '../data/photos';

type PicsFilterProps = {
  tags: string[];
  filter: string;
  setFilter: (tag: string) => void;
  allPhotos: Photo[];
};

export default function PicsFilter({ tags, filter, setFilter, allPhotos }: PicsFilterProps) {
  const getCount = (tag: string) => {
    if (tag === 'all') return allPhotos.length;
    return allPhotos.filter(p => p.tags.includes(tag)).length;
  };

  return (
    <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-theme-surface/50 w-fit">
      {tags.map(tag => {
        const isActive = filter === tag;
        return (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className="relative px-3 py-1.5 text-xs rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-theme-accent/60"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-lg bg-theme-accent"
                transition={{ type: 'spring', stiffness: 150, damping: 22 }}
              />
            )}
            <span
              className="relative z-10 flex items-baseline gap-1.5 transition-colors duration-200"
              style={{ color: isActive ? 'rgb(var(--theme-bg))' : 'rgb(var(--theme-text-muted))' }}
            >
              <span className={isActive ? 'font-semibold' : ''}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
              <span className="opacity-60 text-[10px]">({getCount(tag)})</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
