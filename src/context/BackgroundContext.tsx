import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type BackgroundEffect = 'none' | 'cyber-pattern' | 'dot-matrix' | 'retro-scanlines' | 'hex-blueprint';

type BackgroundContextType = {
  effect: BackgroundEffect;
  setEffect: (effect: BackgroundEffect) => void;
};

const BackgroundContext = createContext<BackgroundContextType | null>(null);

const STORAGE_KEY = 'portfolio-bg-effect';

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [effect, setEffect] = useState<BackgroundEffect>(() => {
    if (typeof window === 'undefined') return 'none';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return (stored === 'cyber-pattern' || stored === 'dot-matrix' || stored === 'retro-scanlines' || stored === 'hex-blueprint' || stored === 'none') ? (stored as BackgroundEffect) : 'none';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, effect);
  }, [effect]);

  return (
    <BackgroundContext.Provider value={{ effect, setEffect }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}
