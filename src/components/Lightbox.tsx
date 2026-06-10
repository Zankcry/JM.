import { useEffect, useState, useRef } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

type LightboxItem = {
  src: string;
  comment?: string;
};

type LightboxProps = {
  items: (string | LightboxItem)[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext
}: LightboxProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Lock body scroll when lightbox is active
  useBodyScrollLock(currentIndex !== null);

  // Reset loaded state when changing image
  useEffect(() => {
    setLoaded(false);
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [currentIndex]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null || items.length === 0) return null;

  const currentItem = items[currentIndex];
  const src = typeof currentItem === 'string' ? currentItem : currentItem.src;
  const comment = typeof currentItem === 'string' ? undefined : currentItem.comment;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
        onClick={onClose}
      >


        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute bottom-4 left-4 h-12 w-12 sm:bottom-auto sm:top-0 sm:left-0 sm:h-full sm:w-[120px] z-[110] flex items-center justify-center cursor-pointer group bg-transparent focus:outline-none border-none"
          aria-label="Previous image"
        >
          <IconChevronLeft
            size={36}
            className="text-white/60 sm:text-white/20 group-hover:text-white/90 group-active:scale-95 transition-all duration-300"
          />
        </button>

        {/* Main Content Container */}
        <div
          className="relative flex flex-col items-center justify-center max-w-full max-h-[80vh] z-[105]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex items-center justify-center">
            {/* Loading Spinner */}
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/70 animate-spin" />
              </div>
            )}

            <motion.img
              ref={imgRef}
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.97 }}
              transition={{ duration: 0.25 }}
              src={src}
              alt="Lightbox view"
              onLoad={() => setLoaded(true)}
              className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain shadow-2xl"
            />
          </div>

          {/* Footer Metadata / Caption */}
          <div className="mt-5 w-full flex flex-col items-center gap-2 font-mono pointer-events-none text-center">
            {comment && (
              <p className="text-white text-sm sm:text-base max-w-xl px-4 select-text selection:bg-theme-accent/30">
                "{comment}"
              </p>
            )}
            <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">
              {currentIndex + 1} / {items.length}
            </p>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute bottom-4 right-4 h-12 w-12 sm:bottom-auto sm:top-0 sm:right-0 sm:h-full sm:w-[120px] z-[110] flex items-center justify-center cursor-pointer group bg-transparent focus:outline-none border-none"
          aria-label="Next image"
        >
          <IconChevronRight
            size={36}
            className="text-white/60 sm:text-white/20 group-hover:text-white/90 group-active:scale-95 transition-all duration-300"
          />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
