import { useEffect, useRef, useState } from 'react';
import { themeLabels } from '../theme/catppuccin';
import { useTheme } from '../theme/ThemeProvider';

export function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Theme Switch Animation
  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector('[aria-checked="true"]') as HTMLElement;
      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          opacity: 1, // Show after initial measurement
        });
      }
    }
  }, [theme]);

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
      <span className="uppercase tracking-[0.35em] text-theme-text-muted/85">Theme</span>
      <div
        ref={containerRef}
        className="relative inline-flex flex-wrap gap-1 rounded-full border border-theme-border/70 bg-theme-bg-elevated/80 p-1 shadow-sm backdrop-blur"
        role="radiogroup"
        aria-label="Color theme"
      >
        <div
          className="absolute bottom-1 top-1 rounded-full bg-theme-accent shadow-sm transition-all duration-500 ease-out"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
          }}
        />
        {themes.map((option) => {
          const isActive = option === theme;

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setTheme(option)}
              className={[
                'relative z-10 rounded-full px-3 py-1.5 font-medium transition-colors duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg',
                isActive
                  ? 'text-theme-on-accent'
                  : 'text-theme-text-muted hover:text-theme-text',
              ].join(' ')}
            >
              {themeLabels[option]}
            </button>
          );
        })}
      </div>
    </div>
  );
}