import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { accentLabels, catppuccinPalettes } from '../theme/catppuccin';
import { useTheme } from '../theme/ThemeProvider';

interface Ripple {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  color: string;
}

export function AccentSwitcher() {
  const { theme, accent, accents, setAccent } = useTheme();
  const palette = catppuccinPalettes[theme];
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector('[aria-pressed="true"]') as HTMLElement;
      if (activeElement) {
        setIndicatorStyle({
          top: activeElement.offsetTop,
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          height: activeElement.offsetHeight,
          opacity: 1, // Show after initial measurement
        });
      }
    }
  }, [accent]);

  const handleAccentClick = (option: typeof accents[number], event: React.MouseEvent<HTMLButtonElement>) => {
    setAccent(option);

    const button = event.currentTarget;
    const swatchColor = palette[option];
    const colorStr = `rgb(${swatchColor[0]} ${swatchColor[1]} ${swatchColor[2]})`;

    const newRipple: Ripple = {
      id: Math.random().toString(36).substring(2, 9),
      top: button.offsetTop,
      left: button.offsetLeft,
      width: button.offsetWidth,
      height: button.offsetHeight,
      color: colorStr,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  return (
    <aside className="fixed right-[4.5rem] top-1/2 z-50 hidden -translate-y-1/2 lg:flex xl:right-[4.5rem]">
      {/* Dynamic Decorative Line (Top) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-[calc(100%+16px)] w-0.5 -translate-x-1/2 bg-gradient-to-b from-theme-accent/50 to-transparent hidden lg:block"
        style={{ height: 'calc(50vh - 208px)' }}
      />

      <div ref={containerRef} className="relative flex flex-col gap-2">
        {/* Hexagonal Active Marker */}
        <div
          className="absolute transition-all duration-500 ease-out pointer-events-none z-20"
          style={{
            top: `${indicatorStyle.top - 4}px`,
            left: `${indicatorStyle.left - 4}px`,
            width: `${indicatorStyle.width + 8}px`,
            height: `${indicatorStyle.height + 8}px`,
            opacity: indicatorStyle.opacity,
          }}
        >
          <svg
            className="w-full h-full text-theme-accent"
            viewBox="0 0 28 28"
            fill="none"
            style={{ filter: 'drop-shadow(0 0 8px rgb(var(--theme-accent) / 0.5))' }}
          >
            <polygon
              points="14,1.5 24.8,7.8 24.8,20.2 14,26.5 3.2,20.2 3.2,7.8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Expanding Hexagonal Click Ripples */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute pointer-events-none z-0"
              style={{
                top: `${ripple.top}px`,
                left: `${ripple.left}px`,
                width: `${ripple.width}px`,
                height: `${ripple.height}px`,
                color: ripple.color,
              }}
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onAnimationComplete={() => {
                setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}>
                <polygon
                  points="12,2.5 20.2,7.2 20.2,16.8 12,21.5 3.8,16.8 3.8,7.2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>

        {accents.map((option) => {
          const isActive = option === accent;
          const swatchColor = palette[option];

          return (
            <button
              key={option}
              type="button"
              aria-label={`Set accent to ${accentLabels[option]}`}
              aria-pressed={isActive}
              onClick={(e) => handleAccentClick(option, e)}
              className={[
                'relative z-10 h-5 w-5 flex items-center justify-center transition-all duration-500 ease-out focus:outline-none',
                isActive ? 'scale-110' : 'hover:scale-125 active:scale-95',
              ].join(' ')}
              style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}
            >
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
                <polygon
                  points="12,2.5 20.2,7.2 20.2,16.8 12,21.5 3.8,16.8 3.8,7.2"
                  fill={`rgb(${swatchColor[0]} ${swatchColor[1]} ${swatchColor[2]})`}
                  stroke={isActive ? "rgb(var(--theme-border-strong))" : "rgba(var(--theme-border), 0.3)"}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Dynamic Decorative Line (Bottom) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[calc(100%+16px)] w-0.5 -translate-x-1/2 bg-gradient-to-t from-theme-accent/50 to-transparent hidden lg:block"
        style={{ height: 'calc(50vh - 208px)' }}
      />
    </aside>
  );
}