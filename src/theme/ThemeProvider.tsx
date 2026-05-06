import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  accentOrder,
  getThemeVariables,
  themeOrder,
  type ThemeAccent,
  type ThemeFlavor,
} from './catppuccin';

const STORAGE_KEY = 'portfolio-theme';
const STORAGE_ACCENT_KEY = 'portfolio-accent';

type ThemeContextValue = {
  theme: ThemeFlavor;
  themes: readonly ThemeFlavor[];
  setTheme: (theme: ThemeFlavor) => void;
  accent: ThemeAccent;
  accents: readonly ThemeAccent[];
  setAccent: (accent: ThemeAccent) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const isThemeFlavor = (value: string | null): value is ThemeFlavor =>
  value !== null && (themeOrder as readonly string[]).includes(value);

const isThemeAccent = (value: string | null): value is ThemeAccent =>
  value !== null && (accentOrder as readonly string[]).includes(value);

const getInitialTheme = (): ThemeFlavor => {
  if (typeof window === 'undefined') {
    return 'latte';
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return isThemeFlavor(storedTheme) ? storedTheme : 'latte';
};

const getInitialAccent = (): ThemeAccent => {
  if (typeof window === 'undefined') {
    return 'peach';
  }

  const storedAccent = window.localStorage.getItem(STORAGE_ACCENT_KEY);
  return isThemeAccent(storedAccent) ? storedAccent : 'peach';
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeFlavor>(getInitialTheme);
  const [accent, setAccent] = useState<ThemeAccent>(getInitialAccent);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.accent = accent;
    root.style.colorScheme = theme === 'latte' ? 'light' : 'dark';

    const themeVariables = getThemeVariables(theme, accent);
    Object.entries(themeVariables).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });

    window.localStorage.setItem(STORAGE_KEY, theme);
    window.localStorage.setItem(STORAGE_ACCENT_KEY, accent);
  }, [theme, accent]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, themes: themeOrder, setTheme, accent, accents: accentOrder, setAccent }),
    [theme, accent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}