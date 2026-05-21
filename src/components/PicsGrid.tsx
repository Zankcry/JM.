import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Photo } from '../data/photos';

type PicsGridProps = {
  photos: Photo[];
  onPhotoClick: (globalIndex: number) => void;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.015,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const, // ultra-smooth cubic bezier tuple
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: [0.7, 0, 0.84, 0] as const,
    },
  },
};

const ASPECT_RATIO_LOOKUP: Record<string, number> = {
  '20251019220051.png': 1080 / 1920,
  '20251106221909.png': 1080 / 1920,
  '20251106223343.png': 1080 / 1920,
  'august.jpg': 2608 / 4640,
  'aurora-trip.jpg': 3024 / 4032,
  'baguio.jpg': 1836 / 3264,
  'billiards.jpg': 4032 / 3024,
  'bonfire.jpg': 4640 / 2608,
  'cafe-chill.jpg': 4032 / 3024,
  'captured-moments.jpg': 917 / 688,
  'christmas-day.jpg': 2608 / 4640,
  'christmas-eve.jpg': 2608 / 4640,
  'elegant-furina.png': 1080 / 1920,
  'good-times.jpg': 917 / 1223,
  'heading-to-class.jpg': 4032 / 3024,
  'holy-angel.webp': 4032 / 3024,
  'late-night.jpg': 4032 / 3024,
  'leaving-for-class.jpg': 3024 / 4032,
  'luyang-academy.png': 1080 / 1920,
  'mecha-oishii.jpeg': 2048 / 1536,
  'missing.jpg': 474 / 843,
  'motivation.jpg': 1440 / 1080,
  'quiet-afternoon.jpg': 3024 / 4032,
  'silly-furina.png': 1080 / 1920,
  'starting-2025.jpg': 2608 / 4640,
  'temple-of-space.png': 1080 / 1920,
  'wandering.png': 1080 / 1920,
  'windmills.png': 1080 / 1920
};

export default function PicsGrid({ photos, onPhotoClick }: PicsGridProps) {
  const [columnsCount, setColumnsCount] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 640) {
        setColumnsCount(2);
      } else {
        setColumnsCount(1);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Partition photos using a greedy height-balancing algorithm to keep columns balanced
  const cols = Array.from({ length: columnsCount }, () => [] as Photo[]);
  const colHeights = Array.from({ length: columnsCount }, () => 0);

  photos.forEach((photo) => {
    const filename = photo.src.split('/').pop() || '';
    const ratio = ASPECT_RATIO_LOOKUP[filename] || 0.75;

    // Find the column with the minimum height
    let minColIndex = 0;
    let minHeight = colHeights[0];
    for (let i = 1; i < columnsCount; i++) {
      if (colHeights[i] < minHeight) {
        minHeight = colHeights[i];
        minColIndex = i;
      }
    }

    cols[minColIndex].push(photo);
    colHeights[minColIndex] += ratio;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start"
    >
      {cols.map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {col.map((photo) => {
            const globalIndex = photos.findIndex(p => p.id === photo.id);
            return (
              <motion.div
                key={photo.id}
                variants={cardVariants}
                className="relative group cursor-pointer overflow-hidden bg-theme-bg shadow-lg rounded-3xl"
                onClick={() => onPhotoClick(globalIndex)}
              >
                <img
                  src={photo.src}
                  alt={photo.id}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                  <p className="text-white text-xs font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,1)] line-clamp-2">
                    "{photo.comment}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}

