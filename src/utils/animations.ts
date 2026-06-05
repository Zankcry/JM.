import type { Transition, Variants } from 'framer-motion';

// ── Shared spring transition preset ──────────────────────────────────────────
// Previously copy-pasted as { type: 'spring', stiffness: 220, damping: 26 }
// across Projects.tsx 6+ times. Centralised here for easy tuning.

const springTransition: Transition = {
  type: 'spring',
  stiffness: 220,
  damping: 26,
};

// ── Horizontal slide variants (used by the Projects carousel) ─────────────────
// Accepts an optional pixel offset (defaults to 30% for bg, 40px for text).

export function slideVariants(offset: number | string = '30%'): Variants {
  return {
    initial: (dir: 'next' | 'prev' | null) => ({
      x: dir === 'next' ? offset : dir === 'prev' ? (typeof offset === 'number' ? -offset : `-${offset}`) : 0,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: springTransition,
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: 'next' | 'prev' | null) => ({
      x: dir === 'next' ? (typeof offset === 'number' ? -offset : `-${offset}`) : dir === 'prev' ? offset : 0,
      opacity: 0,
      transition: {
        x: springTransition,
        opacity: { duration: 0.35 },
      },
    }),
  };
}

// ── Staggered thumbnail slide variants (used by ProjectThumbnailStrip) ────────
// Each card staggers its entry by `staggerDelay` seconds times its local index.

export function thumbnailVariants(staggerDelay: number = 0.05): Variants {
  return {
    initial: (dir: 'next' | 'prev' | null) => ({
      x: dir === 'next' ? 60 : dir === 'prev' ? -60 : 0,
      opacity: 0,
    }),
    animate: (localIdx: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        x: { ...springTransition, delay: localIdx * staggerDelay },
        opacity: { duration: 0.35, delay: localIdx * staggerDelay },
      },
    }),
    exit: (dir: 'next' | 'prev' | null) => ({
      x: dir === 'next' ? -60 : dir === 'prev' ? 60 : 0,
      opacity: 0,
      transition: {
        x: springTransition,
        opacity: { duration: 0.3 },
      },
    }),
  };
}

// ── Fade + slide-up variants (used by ProjectDetailModal columns) ─────────────

export function fadeUpVariants(delay: number = 0): Variants {
  return {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut', delay },
    },
    exit: {
      opacity: 0,
      y: 12,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  };
}
