import { themeLabels } from '../theme/catppuccin';
import { useTheme } from '../theme/ThemeProvider';

export function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
      <span className="uppercase tracking-[0.35em] text-theme-text-muted/85">Theme</span>
      <div
        className="inline-flex flex-wrap gap-1 rounded-full border border-theme-border/70 bg-theme-bg-elevated/80 p-1 shadow-sm backdrop-blur"
        role="radiogroup"
        aria-label="Color theme"
      >
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
                'rounded-full px-3 py-1.5 font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg',
                isActive
                  ? 'bg-theme-accent text-theme-on-accent shadow-sm'
                  : 'text-theme-text-muted hover:bg-theme-surface/70 hover:text-theme-text',
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