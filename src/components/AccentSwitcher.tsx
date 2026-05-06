import { accentLabels, catppuccinPalettes } from '../theme/catppuccin';
import { useTheme } from '../theme/ThemeProvider';

export function AccentSwitcher() {
  const { theme, accent, accents, setAccent } = useTheme();
  const palette = catppuccinPalettes[theme];

  return (
    <aside className="fixed right-[4.5rem] top-1/2 z-30 hidden -translate-y-1/2 lg:flex xl:right-[4.5rem]">
      <div className="flex flex-col gap-2">
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
                'relative h-4 w-4 rounded-md border transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg',
                isActive
                  ? 'scale-110 border-theme-border-strong shadow-[0_0_0_2px_rgb(var(--theme-bg)),0_0_0_4px_rgb(var(--theme-border-strong))]'
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