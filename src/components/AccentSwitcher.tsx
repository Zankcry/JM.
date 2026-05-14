import { useEffect, useRef, useState } from 'react';
import { accentLabels, catppuccinPalettes } from '../theme/catppuccin';
import { useTheme } from '../theme/ThemeProvider';

export function AccentSwitcher() {
  const { theme, accent, accents, setAccent } = useTheme();
  const palette = catppuccinPalettes[theme];
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 0 });
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

  return (
    <aside className="fixed right-[4.5rem] top-1/2 z-30 hidden -translate-y-1/2 lg:flex xl:right-[4.5rem]">
      <div ref={containerRef} className="relative flex flex-col gap-2">
        <div
          className="absolute rounded-lg border-2 border-theme-accent transition-all duration-500 ease-out pointer-events-none z-20"
          style={{
            top: `${indicatorStyle.top - 4}px`,
            left: `${indicatorStyle.left - 4}px`,
            width: `${indicatorStyle.width + 8}px`,
            height: `${indicatorStyle.height + 8}px`,
            opacity: indicatorStyle.opacity,
          }}
        />
        {accents.map((option) => {
          const isActive = option === accent;
          const swatchColor = palette[option];

          return (
            <button
              key={option}
              type="button"
              aria-label={`Set accent to ${accentLabels[option]}`}
              aria-pressed={isActive}
              onClick={() => setAccent(option)}
              className={[
                'relative z-10 h-4 w-4 rounded border transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg',
                isActive
                  ? 'scale-110 border-theme-border-strong'
                  : 'border-theme-border/50 hover:scale-110 hover:border-theme-border-strong',
              ].join(' ')}
              style={{ backgroundColor: `rgb(${swatchColor[0]} ${swatchColor[1]} ${swatchColor[2]})` }}
            />
          );
        })}
      </div>
    </aside>
  );
}