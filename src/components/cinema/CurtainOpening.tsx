import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FilmCountdown from './FilmCountdown';

interface CurtainOpeningProps {
  onComplete: () => void;
}

// Curtain fold component with physics-like behavior
const CurtainFold = ({ 
  index, 
  isLeft, 
  isOpening,
  delay 
}: { 
  index: number; 
  isLeft: boolean; 
  isOpening: boolean;
  delay: number;
}) => {
  const foldRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!foldRef.current || !isOpening) return;
    
    // Each fold moves with spring physics - outer folds lag behind
    const baseDelay = delay + index * 0.08;
    const distance = isLeft ? -120 : 120;
    
    gsap.to(foldRef.current, {
      x: distance + (index * (isLeft ? -15 : 15)),
      scaleX: 0.3 + (index * 0.05),
      duration: 2.5 + (index * 0.15),
      delay: baseDelay,
      ease: "elastic.out(0.4, 0.3)",
    });
    
    // Secondary wave motion
    gsap.to(foldRef.current, {
      rotateY: isLeft ? -25 : 25,
      duration: 1.5,
      delay: baseDelay + 0.3,
      ease: "power2.out",
    });
  }, [isOpening, index, isLeft, delay]);

  const baseColor = 140 + index * 8;
  
  return (
    <div
      ref={foldRef}
      className="absolute top-0 bottom-0 origin-center"
      style={{
        width: '15%',
        left: isLeft ? `${index * 10}%` : 'auto',
        right: !isLeft ? `${index * 10}%` : 'auto',
        background: `linear-gradient(${isLeft ? '90deg' : '270deg'}, 
          hsl(0, 70%, ${baseColor * 0.11}%) 0%,
          hsl(0, 72%, ${baseColor * 0.14}%) 30%,
          hsl(0, 68%, ${baseColor * 0.12}%) 70%,
          hsl(0, 70%, ${baseColor * 0.10}%) 100%
        )`,
        boxShadow: `${isLeft ? '5px' : '-5px'} 0 15px rgba(0,0,0,0.3)`,
        transform: 'perspective(1000px) rotateY(0deg)',
        transformStyle: 'preserve-3d',
        zIndex: 10 - index,
      }}
    >
      {/* Velvet texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Highlight on fold edge */}
      <div 
        className="absolute top-0 bottom-0 w-1"
        style={{
          [isLeft ? 'right' : 'left']: 0,
          background: `linear-gradient(180deg, 
            transparent 0%, 
            rgba(255,200,150,0.1) 30%,
            rgba(255,200,150,0.15) 50%,
            rgba(255,200,150,0.1) 70%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
};

const CurtainOpening = ({ onComplete }: CurtainOpeningProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  const startOpening = () => {
    setShowEnterButton(false);
    
    // Brief anticipation before opening
    gsap.to([leftCurtainRef.current, rightCurtainRef.current], {
      scaleX: 1.02,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIsOpening(true);
        
        // Main curtain body movement
        gsap.to(leftCurtainRef.current, {
          xPercent: -85,
          duration: 3,
          ease: "power3.inOut",
        });
        
        gsap.to(rightCurtainRef.current, {
          xPercent: 85,
          duration: 3,
          ease: "power3.inOut",
          onComplete: () => {
            setTimeout(() => setShowCountdown(true), 300);
          }
        });
      }
    });
  };

  const handleCountdownComplete = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => onComplete(),
    });
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] overflow-hidden">
      {/* Dark theater background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 2%) 100%)',
        }}
      />
      
      {/* Faint screen glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[60%] h-[50%] rounded animate-pulse-slow"
          style={{
            background: 'radial-gradient(ellipse at center, hsla(45, 50%, 95%, 0.04) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Left curtain with folds */}
      <div
        ref={leftCurtainRef}
        className="absolute left-0 top-0 w-[55%] h-full"
        style={{
          background: 'linear-gradient(90deg, hsl(0, 65%, 12%) 0%, hsl(0, 70%, 18%) 100%)',
          transformOrigin: 'left center',
        }}
      >
        {/* Individual curtain folds for physics effect */}
        {[0, 1, 2, 3, 4].map((i) => (
          <CurtainFold key={`left-${i}`} index={i} isLeft={true} isOpening={isOpening} delay={0.1} />
        ))}
        
        {/* Base velvet texture */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Gold tassel fringe */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(40, 70%, 35%) 30%, hsl(35, 60%, 25%) 100%)',
            clipPath: 'polygon(0 0, 3% 100%, 6% 0, 9% 100%, 12% 0, 15% 100%, 18% 0, 21% 100%, 24% 0, 27% 100%, 30% 0, 33% 100%, 36% 0, 39% 100%, 42% 0, 45% 100%, 48% 0, 51% 100%, 54% 0, 57% 100%, 60% 0, 63% 100%, 66% 0, 69% 100%, 72% 0, 75% 100%, 78% 0, 81% 100%, 84% 0, 87% 100%, 90% 0, 93% 100%, 96% 0, 100% 100%, 100% 0)',
          }}
        />
      </div>

      {/* Right curtain with folds */}
      <div
        ref={rightCurtainRef}
        className="absolute right-0 top-0 w-[55%] h-full"
        style={{
          background: 'linear-gradient(270deg, hsl(0, 65%, 12%) 0%, hsl(0, 70%, 18%) 100%)',
          transformOrigin: 'right center',
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <CurtainFold key={`right-${i}`} index={i} isLeft={false} isOpening={isOpening} delay={0.15} />
        ))}
        
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div 
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(40, 70%, 35%) 30%, hsl(35, 60%, 25%) 100%)',
            clipPath: 'polygon(0 0, 3% 100%, 6% 0, 9% 100%, 12% 0, 15% 100%, 18% 0, 21% 100%, 24% 0, 27% 100%, 30% 0, 33% 100%, 36% 0, 39% 100%, 42% 0, 45% 100%, 48% 0, 51% 100%, 54% 0, 57% 100%, 60% 0, 63% 100%, 66% 0, 69% 100%, 72% 0, 75% 100%, 78% 0, 81% 100%, 84% 0, 87% 100%, 90% 0, 93% 100%, 96% 0, 100% 100%, 100% 0)',
          }}
        />
      </div>

      {/* Top valance */}
      <div 
        className="absolute top-0 left-0 right-0 h-20 z-30"
        style={{
          background: 'linear-gradient(180deg, hsl(0, 60%, 14%) 0%, hsl(0, 55%, 12%) 100%)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        }}
      >
        <div 
          className="absolute bottom-0 left-0 right-0 h-6"
          style={{
            background: 'hsl(0, 55%, 11%)',
            borderRadius: '0 0 50% 50% / 0 0 100% 100%',
            transform: 'scaleX(1.1)',
          }}
        />
        {/* Gold rope */}
        <div 
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-40 h-1"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(45, 70%, 50%) 20%, hsl(45, 80%, 60%) 50%, hsl(45, 70%, 50%) 80%, transparent)',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Enter button */}
      {showEnterButton && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="text-center px-8">
            <h1 
              className="font-cinema text-5xl md:text-7xl lg:text-8xl mb-6 tracking-[0.15em]"
              style={{
                color: 'hsl(45, 80%, 55%)',
                textShadow: '0 0 60px hsla(45, 80%, 50%, 0.5), 0 4px 12px rgba(0,0,0,0.9)',
              }}
            >
              CINEMA PORTFOLIO
            </h1>
            <p 
              className="font-film text-xl md:text-2xl mb-12 italic tracking-wide"
              style={{ color: 'hsl(40, 35%, 75%)' }}
            >
              A Cinematic Experience Awaits
            </p>
            <button onClick={startOpening} className="cinema-btn">
              Enter Theater
            </button>
          </div>
        </div>
      )}

      {/* Countdown */}
      {showCountdown && <FilmCountdown onComplete={handleCountdownComplete} />}
    </div>
  );
};

export default CurtainOpening;
