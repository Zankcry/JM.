import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isVisible]);

  const toggleTooltip = (e: React.MouseEvent) => {
    // Prevent mouse events from triggering double-toggle on touch screens
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  };

  return (
    <span
      ref={tooltipRef}
      className="relative inline-block cursor-help select-none"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={toggleTooltip}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 4, scale: 0.95, x: '-50%' }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-64 rounded-xl border border-theme-accent/20 bg-theme-bg p-3 text-xs leading-relaxed text-theme-text shadow-xl"
            role="tooltip"
          >
            {content}
            <span className="absolute top-full left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-theme-accent/20 bg-theme-bg" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export function YahhoTooltip({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip
      content={
        <span className="block font-sans text-center">
          <strong className="text-theme-accent">やっほー (Yahho!)</strong>
          <span className="block mt-1 text-[11px] leading-normal text-theme-text-muted">
            A friendly, casual Japanese greeting meaning <span className="text-theme-text">"Yo!"</span>, <span className="text-theme-text">"Hey!"</span>, or <span className="text-theme-text">"Hi!"</span>.
          </span>
        </span>
      }
    >
      <span className="border-b border-dashed border-theme-accent/50 pb-0.5 transition-colors hover:text-theme-accent">
        {children}
      </span>
    </Tooltip>
  );
}
