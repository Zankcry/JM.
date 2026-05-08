import React, { useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { catppuccinPalettes } from '../theme/catppuccin';

type Point = {
  x: number;
  y: number;
  timestamp: number;
  isNewStroke?: boolean;
};

export const SmokeEffect: React.FC = () => {
  const { theme, accent } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const points = useRef<Point[]>([]);
  const animationFrameId = useRef<number>();
  
  const currentColor = useRef<readonly [number, number, number]>([223, 142, 29]);
  
  useEffect(() => {
    currentColor.current = catppuccinPalettes[theme][accent];
  }, [theme, accent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const addPoint = (e: PointerEvent, isNewStroke = false) => {
      points.current.push({ x: e.pageX, y: e.pageY, timestamp: Date.now(), isNewStroke });
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Allow drawing with left (0) or right (2) click
      if (e.button === 0 || e.button === 2) {
        isDrawing.current = true;
        addPoint(e, true);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing.current) return;
      
      const lastPoint = points.current[points.current.length - 1];
      if (lastPoint && !lastPoint.isNewStroke) {
        const dx = e.pageX - lastPoint.x;
        const dy = e.pageY - lastPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Interpolate points if cursor moves too fast to make stroke smooth
        if (dist > 15) {
          const steps = Math.floor(dist / 15);
          const now = Date.now();
          for (let i = 1; i <= steps; i++) {
            points.current.push({
              x: lastPoint.x + dx * (i / steps),
              y: lastPoint.y + dy * (i / steps),
              timestamp: now
            });
          }
        }
      }
      addPoint(e);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.button === 0 || e.button === 2) {
        isDrawing.current = false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      // Prevent context menu to allow right-click drawing (like in osu!)
      e.preventDefault();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('contextmenu', handleContextMenu);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const maxAgeMs = 5000; // Total duration of smoke (5 seconds)
      const baseRadius = 8;
      
      const [r, g, b] = currentColor.current;
      
      const now = Date.now();
      const sx = window.scrollX;
      const sy = window.scrollY;
      
      points.current = points.current.filter(p => (now - p.timestamp) < maxAgeMs);

      if (points.current.length > 0) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        for (let i = 1; i < points.current.length; i++) {
          const p1 = points.current[i - 1];
          const p2 = points.current[i];
          
          if (p2.isNewStroke) continue;
          
          const ageMs = now - p2.timestamp;
          
          const ageRatio = ageMs / maxAgeMs;
          // Smooth continuous fade from newest point (alpha 0.5) to oldest point (alpha 0)
          const alpha = Math.max(0, (1 - ageRatio) * 0.5); 

          const radius = baseRadius + (ageRatio * 20); // Spread smoke over time
          
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = radius;
          ctx.beginPath();
          ctx.moveTo(p1.x - sx, p1.y - sy);
          ctx.lineTo(p2.x - sx, p2.y - sy);
          ctx.stroke();
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('contextmenu', handleContextMenu);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-70"
      style={{ filter: 'blur(4px)' }}
    />
  );
};
