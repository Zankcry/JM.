import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FrameData {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
  frameX: number;
  frameY: number;
  frameWidth: number;
  frameHeight: number;
}

// Sparrows/Funkin Packer XML frame layout coordinates parsed into JSON format
const FOXY_FRAMES: FrameData[] = [
  { name: '385', x: 1339, y: 2055, width: 243, height: 438, rotated: true, frameX: -263, frameY: -198, frameWidth: 1024, frameHeight: 768 },
  { name: '386', x: 2083, y: 1280, width: 278, height: 458, rotated: true, frameX: -252, frameY: -165, frameWidth: 1024, frameHeight: 768 },
  { name: '387', x: 2083, y: 781, width: 317, height: 496, rotated: true, frameX: -228, frameY: -126, frameWidth: 1024, frameHeight: 768 },
  { name: '389', x: 1984, y: 1911, width: 540, height: 354, rotated: false, frameX: -202, frameY: -89, frameWidth: 1024, frameHeight: 768 },
  { name: '390', x: 1604, y: 1911, width: 377, height: 585, rotated: true, frameX: -175, frameY: -65, frameWidth: 1024, frameHeight: 768 },
  { name: '391', x: 701, y: 2055, width: 635, height: 389, rotated: false, frameX: -145, frameY: -51, frameWidth: 1024, frameHeight: 768 },
  { name: '392', x: 1, y: 2053, width: 697, height: 420, rotated: false, frameX: -108, frameY: -22, frameWidth: 1024, frameHeight: 768 },
  { name: '393', x: 1704, y: 1, width: 453, height: 777, rotated: true, frameX: -60, frameY: 0, frameWidth: 1024, frameHeight: 768 },
  { name: '394', x: 1604, y: 1028, width: 476, height: 880, rotated: true, frameX: 0, frameY: 0, frameWidth: 1024, frameHeight: 768 },
  { name: '395', x: 1, y: 1543, width: 940, height: 507, rotated: false, frameX: 0, frameY: 0, frameWidth: 1024, frameHeight: 768 },
  { name: '396', x: 1028, y: 1028, width: 573, height: 1024, rotated: true, frameX: 0, frameY: 0, frameWidth: 1024, frameHeight: 768 },
  { name: '397', x: 1028, y: 1, width: 673, height: 1024, rotated: true, frameX: 0, frameY: 0, frameWidth: 1024, frameHeight: 768 },
  { name: '398', x: 1, y: 1, width: 1024, height: 768, rotated: false, frameX: 0, frameY: 0, frameWidth: 1024, frameHeight: 768 },
  { name: '399', x: 1, y: 772, width: 1024, height: 768, rotated: false, frameX: 0, frameY: 0, frameWidth: 1024, frameHeight: 768 },
];

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function KonamiEasterEgg() {
  const [activated, setActivated] = useState(false);
  const [showText, setShowText] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload foxy assets in the background (only on desktop where it's visible)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const img = new Image();
      img.src = 'foxy/foxy-jump.png';
      imgRef.current = img;

      const audio = new Audio('foxy/Xscream3.ogg');
      audio.preload = 'auto';
      audio.load();
      audioRef.current = audio;
    }
  }, []);

  // Konami code listener
  useEffect(() => {
    let current = 0;

    const handleKey = (e: KeyboardEvent) => {
      const key =
        e.key === 'ArrowUp' ? 'ArrowUp' :
          e.key === 'ArrowDown' ? 'ArrowDown' :
            e.key === 'ArrowLeft' ? 'ArrowLeft' :
              e.key === 'ArrowRight' ? 'ArrowRight' :
                e.key.toLowerCase();

      if (key === KONAMI_SEQUENCE[current]) {
        current++;

        if (current === KONAMI_SEQUENCE.length) {
          current = 0;
          setActivated(true);
          setShowText(false);
        }
      } else {
        current = 0;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Text timeout effect
  useEffect(() => {
    if (showText) {
      const t = setTimeout(() => {
        setShowText(false);
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [showText]);

  // Audio and spritesheet loading and playback loop
  useEffect(() => {
    if (!activated) return;

    // Use preloaded elements if available
    const img = imgRef.current || new Image();
    if (!imgRef.current) {
      img.src = 'foxy/foxy-jump.png';
    }

    const audio = audioRef.current || new Audio('foxy/Xscream3.ogg');
    audio.volume = 1;
    audio.currentTime = 0;
    audio.play().catch(err => {
      console.warn('Audio autoplay prevented or failed:', err);
    });

    let animationFrameId: number;
    let isPlaying = true;
    let currentFrameIndex = 0;
    let lastTime = 0;
    const fps = 24; // Jump scare playback frame rate
    const frameDuration = 1000 / fps;
    let isLingering = false;
    let lingerTimeoutId: NodeJS.Timeout;

    const renderLoop = (time: number) => {
      if (!isPlaying) return;

      const canvas = canvasRef.current;
      if (canvas && img.complete) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Set standard canvas sizes (matches native frameWidth/frameHeight)
          if (canvas.width !== 1024 || canvas.height !== 768) {
            canvas.width = 1024;
            canvas.height = 768;
          }

          if (lastTime === 0) {
            lastTime = time;
          }

          const elapsed = time - lastTime;

          if (elapsed >= frameDuration) {
            lastTime = time - (elapsed % frameDuration);

            // Draw current frame
            const frame = FOXY_FRAMES[currentFrameIndex];
            ctx.clearRect(0, 0, 1024, 768);

            ctx.save();

            // Add scary violent shake offsets only at the end (when lingering)!
            if (isLingering) {
              const shakeIntensity = 35;
              const shakeX = (Math.random() - 0.5) * shakeIntensity;
              const shakeY = (Math.random() - 0.5) * shakeIntensity;
              ctx.translate(shakeX, shakeY);
            }

            const destX = -frame.frameX;
            const destY = -frame.frameY;

            if (frame.rotated) {
              // Sparrow XML rotated sheets are rotated 90 degrees counter-clockwise.
              // To draw upright: translate to dest top-left, then down by height, rotate 90 deg clockwise.
              ctx.translate(destX, destY);
              ctx.translate(0, frame.width); // width in XML corresponds to height on-screen
              ctx.rotate(-Math.PI / 2);
              ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, 0, 0, frame.width, frame.height);
            } else {
              ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height, destX, destY, frame.width, frame.height);
            }
            ctx.restore();

            // Advance frame index or trigger lingering
            if (currentFrameIndex < FOXY_FRAMES.length - 1) {
              currentFrameIndex++;
            } else if (!isLingering) {
              isLingering = true;
              // Let the terrifying final frame linger on screen shaking violently for 2200ms
              lingerTimeoutId = setTimeout(() => {
                isPlaying = false;
                setActivated(false);
                setShowText(true);
              }, 2200);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    img.onload = () => {
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // If image is already cached/complete, start immediately
    if (img.complete) {
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    return () => {
      isPlaying = false;
      cancelAnimationFrame(animationFrameId);
      if (lingerTimeoutId) clearTimeout(lingerTimeoutId);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [activated]);

  return (
    <>
      <AnimatePresence>
        {activated && (
          <motion.div
            className="fixed inset-0 z-[99999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Visible Canvas scaling to cover the full viewport */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showText && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none text-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <span className="text-white text-3xl font-bold tracking-wide animate-pulse drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Im sorry.. hehe ✌️
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
