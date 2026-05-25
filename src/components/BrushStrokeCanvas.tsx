import React, { useEffect, useRef } from 'react';
import { useBackground } from '../context/BackgroundContext';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  opacity: number;
}

interface Stroke {
  id: string;
  points: Point[];
  isRightClick: boolean;
  opacity: number; // current fading opacity
  isDrawing: boolean;
  splatters: { x: number; y: number; r: number; opacity: number }[];
  releasedAt: number | null;
}

export function BrushStrokeCanvas() {
  const { brushActive, brushWidth } = useBackground();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);

  // Stroke width presets map
  const widthPresets = {
    thin: { base: 10, min: 2, splatter: 2, spread: 20 },
    medium: { base: 20, min: 4, splatter: 3, spread: 35 },
    thick: { base: 35, min: 7, splatter: 5.5, spread: 50 },
  };
  const sizes = widthPresets[brushWidth] || widthPresets.thin;
  const sizesRef = useRef(sizes);

  useEffect(() => {
    sizesRef.current = sizes;
  }, [sizes]);
  const mouseRef = useRef<{ x: number; y: number; clientX: number; clientY: number; isDown: boolean; isRight: boolean }>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    isDown: false,
    isRight: false,
  });

  // Spring physics variables for dragging the brush tip
  const brushRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  });

  const isLoopRunningRef = useRef(false);
  const loopRef = useRef<() => void>();

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Start coordinates of brush on first move
    const handleFirstMove = (e: MouseEvent) => {
      brushRef.current.x = e.clientX + window.scrollX;
      brushRef.current.y = e.clientY + window.scrollY;
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleFirstMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      // Allow drawing with left click (button 0) and right click (button 2)
      if (e.button !== 0 && e.button !== 2) return;

      // Ignore clicks on scrollbars
      if (e.clientX >= document.documentElement.clientWidth || e.clientY >= document.documentElement.clientHeight) {
        return;
      }

      // Ignore clicks on interactive elements to prevent drawing over menus, inputs, buttons, etc.
      const target = e.target as HTMLElement | null;
      if (target) {
        if (
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive')
        ) {
          return;
        }
      }

      const isRight = e.button === 2;
      mouseRef.current = {
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY,
        clientX: e.clientX,
        clientY: e.clientY,
        isDown: true,
        isRight,
      };

      // Set physics brush position directly to click position to start stroke
      brushRef.current.x = e.clientX + window.scrollX;
      brushRef.current.y = e.clientY + window.scrollY;
      brushRef.current.vx = 0;
      brushRef.current.vy = 0;

      const newStroke: Stroke = {
        id: Math.random().toString(36).substr(2, 9),
        points: [
          {
            x: e.clientX + window.scrollX,
            y: e.clientY + window.scrollY,
            vx: 0,
            vy: 0,
            width: 14,
            opacity: 1.0,
          },
        ],
        isRightClick: isRight,
        opacity: 1.0,
        isDrawing: true,
        splatters: [],
        releasedAt: null,
      };

      // Create initial splatters for dynamic sumi-e feedback based on stroke width
      const currentSizes = sizesRef.current;
      const splatterCount = 5;
      const spread = currentSizes.spread;
      for (let i = 0; i < splatterCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * spread;
        newStroke.splatters.push({
          x: e.clientX + window.scrollX + Math.cos(angle) * dist,
          y: e.clientY + window.scrollY + Math.sin(angle) * dist,
          r: Math.random() * currentSizes.splatter + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
        });
      }

      strokesRef.current.push(newStroke);

      // Start the animation loop if it's not already running
      if (!isLoopRunningRef.current && loopRef.current) {
        isLoopRunningRef.current = true;
        requestAnimationFrame(loopRef.current);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX + window.scrollX;
      mouseRef.current.y = e.clientY + window.scrollY;
      mouseRef.current.clientX = e.clientX;
      mouseRef.current.clientY = e.clientY;
    };

    const handleScroll = () => {
      mouseRef.current.x = mouseRef.current.clientX + window.scrollX;
      mouseRef.current.y = mouseRef.current.clientY + window.scrollY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
      // Mark all current drawing strokes as no longer drawing, so they start fading
      strokesRef.current.forEach((stroke) => {
        if (stroke.isDrawing) {
          stroke.isDrawing = false;
          stroke.releasedAt = Date.now();
        }
      });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Drawing and Physics loop
  useEffect(() => {
    let animationFrameId: number;

    const updateAndRender = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        if (isLoopRunningRef.current) {
          animationFrameId = requestAnimationFrame(updateAndRender);
        }
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        if (isLoopRunningRef.current) {
          animationFrameId = requestAnimationFrame(updateAndRender);
        }
        return;
      }

      // Optimize CPU and GPU: pause the loop if there are no active strokes and mouse is not down
      if (strokesRef.current.length === 0 && !mouseRef.current.isDown) {
        isLoopRunningRef.current = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update brush physics using Hooke's Law if mouse is down
      const mouse = mouseRef.current;
      const brush = brushRef.current;

      const spring = 0.08;   // Spring constant (elastic stiffness)
      const damping = 0.78;  // Damping coefficient (friction / drag)

      if (mouse.isDown) {
        const dx = mouse.x - brush.x;
        const dy = mouse.y - brush.y;
        
        // F = -kx (Hooke's Law spring force)
        const fx = dx * spring;
        const fy = dy * spring;

        // Apply force to velocity and damp
        brush.vx = (brush.vx + fx) * damping;
        brush.vy = (brush.vy + fy) * damping;

        // Apply velocity to position
        brush.x += brush.vx;
        brush.y += brush.vy;

        // Add a new point to the currently drawing stroke
        const activeStroke = strokesRef.current.find((s) => s.isDrawing);
        if (activeStroke) {
          const speed = Math.hypot(brush.vx, brush.vy);
          const currentSizes = sizesRef.current;
          
          // Width is inversely proportional to speed (thicker when slow, thinner when fast)
          const baseWidth = currentSizes.base;
          const minWidth = currentSizes.min;
          const targetWidth = Math.max(minWidth, baseWidth - speed * 0.45);

          // Smooth the width from the previous point
          const prevPoint = activeStroke.points[activeStroke.points.length - 1];
          const newWidth = prevPoint ? prevPoint.width * 0.65 + targetWidth * 0.35 : targetWidth;

          activeStroke.points.push({
            x: brush.x,
            y: brush.y,
            vx: brush.vx,
            vy: brush.vy,
            width: newWidth,
            opacity: 1.0,
          });

          // Add a few dynamic splatters for fast movements
          if (speed > 12 && Math.random() < 0.35) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * (speed * 1.5);
            activeStroke.splatters.push({
              x: brush.x + Math.cos(angle) * dist,
              y: brush.y + Math.sin(angle) * dist,
              r: Math.random() * currentSizes.splatter + 0.5,
              opacity: Math.random() * 0.6 + 0.2,
            });
          }
        }
      }

      // Render all strokes
      strokesRef.current.forEach((stroke) => {
        if (stroke.points.length === 0) return;

        // Parse active CSS variables dynamically so strokes immediately respond to accent changes
        const getCSSColor = (variableName: string, defaultColor: { r: number; g: number; b: number }) => {
          if (typeof window === 'undefined') return defaultColor;
          const val = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
          if (!val) return defaultColor;
          const parts = val.split(/\s+/);
          if (parts.length >= 3) {
            return {
              r: parseInt(parts[0], 10),
              g: parseInt(parts[1], 10),
              b: parseInt(parts[2], 10),
            };
          }
          return defaultColor;
        };

        const accentColor = getCSSColor('--theme-accent', { r: 26, g: 26, b: 26 });

        // Both left and right click draw in the active accent color
        const colorBase = accentColor;

        // Draw splatters first
        stroke.splatters.forEach((splat) => {
          ctx.beginPath();
          ctx.arc(splat.x - window.scrollX, splat.y - window.scrollY, splat.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colorBase.r}, ${colorBase.g}, ${colorBase.b}, ${splat.opacity * stroke.opacity})`;
          ctx.fill();
        });

        // Sumi-e drawing: draw smooth brush lines and bristle simulation
        const pts = stroke.points;
        
        // Multi-pass stroke rendering
        // Pass 1: Draw the main fluid calligraphic line with overlapping soft circles
        // This gives a beautiful watery ink-bleed (shading) effect on the edges.
        for (let i = 1; i < pts.length; i++) {
          const p1 = pts[i - 1];
          const p2 = pts[i];
          
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          const steps = Math.max(1, Math.floor(dist / 1.5)); // overlapping steps

          for (let step = 0; step <= steps; step++) {
            const t = step / steps;
            const x = p1.x + (p2.x - p1.x) * t - window.scrollX;
            const y = p1.y + (p2.y - p1.y) * t - window.scrollY;
            const width = p1.width + (p2.width - p1.width) * t;

            // Draw soft watery bleed overlay
            ctx.beginPath();
            ctx.arc(x, y, width * 1.25, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorBase.r}, ${colorBase.g}, ${colorBase.b}, ${0.05 * stroke.opacity})`;
            ctx.fill();

            // Draw solid core
            ctx.beginPath();
            ctx.arc(x, y, width * 0.85, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorBase.r}, ${colorBase.g}, ${colorBase.b}, ${0.85 * stroke.opacity})`;
            ctx.fill();
          }
        }

        // Pass 2: Draw fine bristle lines (dry brush texture) when velocity is high
        for (let i = 1; i < pts.length; i++) {
          const p1 = pts[i - 1];
          const p2 = pts[i];
          
          const speed = Math.hypot(p2.vx, p2.vy);
          
          if (speed > 4) {
            // Calculate normal vector (perpendicular to movement direction)
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;

            // Draw three tiny parallel offset lines simulating splitting bristles
            const bristleOffsets = [-0.5, 0, 0.5];
            bristleOffsets.forEach((offsetFactor) => {
              const offset = offsetFactor * p1.width * 0.7;
              
              ctx.beginPath();
              ctx.moveTo(p1.x + nx * offset - window.scrollX, p1.y + ny * offset - window.scrollY);
              ctx.lineTo(p2.x + nx * offset - window.scrollX, p2.y + ny * offset - window.scrollY);
              ctx.lineWidth = 0.65;
              ctx.strokeStyle = `rgba(${colorBase.r}, ${colorBase.g}, ${colorBase.b}, ${0.25 * stroke.opacity})`;
              ctx.stroke();
            });
          }
        }

        // Fade strokes after a 3-second persistence window
        if (!stroke.isDrawing && stroke.releasedAt) {
          const elapsed = Date.now() - stroke.releasedAt;
          if (elapsed > 3000) {
            // Smoothly fade out over 1 second after persisting for 3 seconds
            stroke.opacity = Math.max(0, 1 - (elapsed - 3000) / 1000);
          } else {
            stroke.opacity = 1.0;
          }
        }
      });

      // Filter out completely faded strokes
      strokesRef.current = strokesRef.current.filter((stroke) => stroke.opacity > 0);

      if (isLoopRunningRef.current) {
        animationFrameId = requestAnimationFrame(updateAndRender);
      }
    };

    loopRef.current = updateAndRender;

    // Start loop initially if there are already strokes
    if (strokesRef.current.length > 0) {
      isLoopRunningRef.current = true;
      animationFrameId = requestAnimationFrame(updateAndRender);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-5] pointer-events-none w-full h-full mix-blend-multiply dark:mix-blend-screen opacity-35 transform-gpu backface-hidden"
      style={{ willChange: 'transform' }}
    />
  );
}
