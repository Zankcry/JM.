import { createContext, useContext, useState, type ReactNode } from 'react';

type TerminalContextType = {
  hoveredCommand: string | null;
  setHoveredCommand: (cmd: string | null) => void;
};

const TerminalContext = createContext<TerminalContextType | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [hoveredCommand, setHoveredCommand] = useState<string | null>(null);

  return (
    <TerminalContext.Provider value={{ hoveredCommand, setHoveredCommand }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}
