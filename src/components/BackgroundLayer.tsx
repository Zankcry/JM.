import { useBackground } from '../context/BackgroundContext';

export function BackgroundLayer() {
  const { effect } = useBackground();

  if (effect === 'none') {
    return null;
  }

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* 1. Hardware accelerated sliding background pattern */}
      <div 
        className={`absolute inset-[-120px] ${effect}-layer`} 
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      
      {/* 2. Static vignette overlay centered on the screen */}
      {effect !== 'hex-blueprint' && (
        <div className={`absolute inset-0 ${effect}-vignette`} />
      )}
    </div>
  );
}
