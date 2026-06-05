import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type BackgroundEffect = 'none' | 'cyber-pattern' | 'dot-matrix' | 'retro-scanlines' | 'hex-blueprint' | 'woven-grid';
type BrushWidth = 'thin' | 'medium' | 'thick';

type BackgroundContextType = {
  effect: BackgroundEffect;
  setEffect: (effect: BackgroundEffect) => void;
  brushActive: boolean;
  setBrushActive: (active: boolean) => void;
  brushWidth: BrushWidth;
  setBrushWidth: (width: BrushWidth) => void;
};

const BackgroundContext = createContext<BackgroundContextType | null>(null);

const STORAGE_KEY = 'portfolio-bg-effect';
const BRUSH_STORAGE_KEY = 'portfolio-brush-active';
const BRUSH_WIDTH_KEY = 'portfolio-brush-width';

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [effect, setEffect] = useState<BackgroundEffect>(() => {
    if (typeof window === 'undefined') return 'none';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return (stored === 'cyber-pattern' || stored === 'dot-matrix' || stored === 'retro-scanlines' || stored === 'hex-blueprint' || stored === 'woven-grid' || stored === 'none') ? (stored as BackgroundEffect) : 'none';
  });

  const [brushActive, setBrushActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = window.localStorage.getItem(BRUSH_STORAGE_KEY);
    return stored === null ? true : stored === 'true';
  });

  const [brushWidth, setBrushWidth] = useState<BrushWidth>(() => {
    if (typeof window === 'undefined') return 'thin';
    const stored = window.localStorage.getItem(BRUSH_WIDTH_KEY);
    return (stored === 'thin' || stored === 'medium' || stored === 'thick') ? (stored as BrushWidth) : 'thin';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, effect);
  }, [effect]);

  useEffect(() => {
    window.localStorage.setItem(BRUSH_STORAGE_KEY, String(brushActive));
  }, [brushActive]);

  useEffect(() => {
    window.localStorage.setItem(BRUSH_WIDTH_KEY, brushWidth);
  }, [brushWidth]);

  return (
    <BackgroundContext.Provider value={{ effect, setEffect, brushActive, setBrushActive, brushWidth, setBrushWidth }}>
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
