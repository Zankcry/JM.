import { useState } from 'react';
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
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleAccentClick = (option: typeof accents[number], event: React.MouseEvent<HTMLButtonElement>) => {
    setAccent(option);

    const button = event.currentTarget;
    const swatchColor = palette[option];
    const colorStr = `rgb(${swatchColor[0]} ${swatchColor[1]} ${swatchColor[2]})`;

    const newRipple: Ripple = {
      id: Math.random().toString(36).substring(2, 9),
      top: button.parentElement?.offsetTop || 0,
      left: button.parentElement?.offsetLeft || 0,
      width: button.parentElement?.offsetWidth || button.offsetWidth,
      height: button.parentElement?.offsetHeight || button.offsetHeight,
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

      <div className="relative flex flex-col gap-2">

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
            <div key={option} className="relative h-5 w-5 flex items-center justify-center">
              {isActive && (
                <motion.div
                  layoutId="accent-hex-marker"
                  className="absolute -inset-[4px] pointer-events-none z-20"
                  transition={{ type: 'spring', stiffness: 150, damping: 22 }}
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
                </motion.div>
              )}
              <button
                type="button"
                aria-label={`Set accent to ${accentLabels[option]}`}
                aria-pressed={isActive}
                onClick={(e) => handleAccentClick(option, e)}
                className={[
                  'relative w-full h-full flex items-center justify-center transition-all duration-200 ease-out focus:outline-none',
                  isActive ? 'scale-110' : 'hover:scale-125 active:scale-95',
                ].join(' ')}
                style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}
              >
                <svg className="w-full h-full relative z-10" viewBox="0 0 24 24" fill="none">
                  <polygon
                    points="12,2.5 20.2,7.2 20.2,16.8 12,21.5 3.8,16.8 3.8,7.2"
                    fill={`rgb(${swatchColor[0]} ${swatchColor[1]} ${swatchColor[2]})`}
                    stroke={isActive ? "rgb(var(--theme-border-strong))" : "rgba(var(--theme-border), 0.3)"}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    className="transition-all duration-200 ease-out"
                  />
                </svg>
              </button>
            </div>
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