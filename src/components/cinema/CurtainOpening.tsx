import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FilmCountdown from './FilmCountdown';

interface CurtainOpeningProps {
  onComplete: () => void;
}

const CurtainOpening = ({ onComplete }: CurtainOpeningProps) => {
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(true);

  const startOpening = () => {
    setShowEnterButton(false);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setShowCountdown(true);
      }
    });

    // Subtle curtain sway before opening
    tl.to([leftCurtainRef.current, rightCurtainRef.current], {
      skewY: 0.5,
      duration: 0.3,
      ease: "power1.inOut",
    })
    .to([leftCurtainRef.current, rightCurtainRef.current], {
      skewY: -0.3,
      duration: 0.3,
      ease: "power1.inOut",
    })
    .to([leftCurtainRef.current, rightCurtainRef.current], {
      skewY: 0,
      duration: 0.2,
      ease: "power1.out",
    })
    // Open curtains
    .to(leftCurtainRef.current, {
      xPercent: -100,
      duration: 2.5,
      ease: "power2.inOut",
    }, "open")
    .to(rightCurtainRef.current, {
      xPercent: 100,
      duration: 2.5,
      ease: "power2.inOut",
    }, "open");
  };

  const handleCountdownComplete = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Theater ambient lighting */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center top, hsla(0, 0%, 15%, 1) 0%, hsl(0, 0%, 3%) 70%)',
        }}
      />

      {/* Theater screen glow behind curtains */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-[70%] h-[60%] rounded-lg animate-pulse-slow"
          style={{
            background: 'radial-gradient(ellipse at center, hsla(45, 40%, 95%, 0.05) 0%, transparent 60%)',
            boxShadow: '0 0 100px 50px hsla(45, 40%, 90%, 0.05)',
          }}
        />
      </div>

      {/* Left Curtain */}
      <div
        ref={leftCurtainRef}
        className="absolute left-0 top-0 w-[52%] h-full z-10"
        style={{
          background: `linear-gradient(90deg, 
            hsl(0, 70%, 15%) 0%,
            hsl(0, 68%, 18%) 10%,
            hsl(0, 72%, 22%) 25%,
            hsl(0, 70%, 20%) 35%,
            hsl(0, 68%, 24%) 50%,
            hsl(0, 72%, 21%) 65%,
            hsl(0, 70%, 18%) 80%,
            hsl(0, 68%, 16%) 90%,
            hsl(0, 65%, 12%) 100%
          )`,
          transformOrigin: 'left center',
        }}
      >
        {/* Curtain folds */}
        <div 
          className="absolute inset-0 animate-curtain-wave"
          style={{
            background: `repeating-linear-gradient(90deg,
              transparent 0px,
              rgba(0,0,0,0.15) 8px,
              transparent 16px,
              rgba(0,0,0,0.08) 24px,
              transparent 32px,
              rgba(255,255,255,0.03) 40px,
              transparent 48px
            )`,
          }}
        />
        {/* Velvet sheen */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.1) 100%)',
          }}
        />
        {/* Velvet texture overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Gold fringe at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-10"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(45, 70%, 40%) 40%, hsl(40, 60%, 30%) 100%)',
            clipPath: 'polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)',
          }}
        />
      </div>

      {/* Right Curtain */}
      <div
        ref={rightCurtainRef}
        className="absolute right-0 top-0 w-[52%] h-full z-10"
        style={{
          background: `linear-gradient(270deg, 
            hsl(0, 70%, 15%) 0%,
            hsl(0, 68%, 18%) 10%,
            hsl(0, 72%, 22%) 25%,
            hsl(0, 70%, 20%) 35%,
            hsl(0, 68%, 24%) 50%,
            hsl(0, 72%, 21%) 65%,
            hsl(0, 70%, 18%) 80%,
            hsl(0, 68%, 16%) 90%,
            hsl(0, 65%, 12%) 100%
          )`,
          transformOrigin: 'right center',
        }}
      >
        {/* Curtain folds */}
        <div 
          className="absolute inset-0 animate-curtain-wave"
          style={{
            background: `repeating-linear-gradient(270deg,
              transparent 0px,
              rgba(0,0,0,0.15) 8px,
              transparent 16px,
              rgba(0,0,0,0.08) 24px,
              transparent 32px,
              rgba(255,255,255,0.03) 40px,
              transparent 48px
            )`,
            animationDelay: '0.5s',
          }}
        />
        {/* Velvet sheen */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.1) 100%)',
          }}
        />
        {/* Velvet texture overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Gold fringe at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-10"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(45, 70%, 40%) 40%, hsl(40, 60%, 30%) 100%)',
            clipPath: 'polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)',
          }}
        />
      </div>

      {/* Top valance/pelmet */}
      <div 
        className="absolute top-0 left-0 right-0 h-24 z-20"
        style={{
          background: 'linear-gradient(180deg, hsl(0, 65%, 18%) 0%, hsl(0, 62%, 16%) 70%, hsl(0, 60%, 14%) 100%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Swag decoration */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden"
        >
          <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M0,0 Q12.5,10 25,0 T50,0 T75,0 T100,0 L100,10 L0,10 Z" 
              fill="hsl(0, 62%, 15%)"
            />
          </svg>
        </div>
        {/* Gold rope decoration */}
        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(45, 70%, 45%) 20%, hsl(45, 80%, 55%) 50%, hsl(45, 70%, 45%) 80%, transparent 100%)',
            boxShadow: '0 2px 8px hsla(45, 80%, 50%, 0.3)',
          }}
        />
      </div>

      {/* Enter button - visible before opening */}
      {showEnterButton && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center px-8">
            <h1 
              className="font-cinema text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wider"
              style={{
                color: 'hsl(45, 80%, 55%)',
                textShadow: '0 0 40px hsla(45, 80%, 50%, 0.4), 0 4px 8px rgba(0,0,0,0.8)',
              }}
            >
              CINEMA PORTFOLIO
            </h1>
            <p className="font-film text-xl md:text-2xl mb-12 italic" style={{ color: 'hsl(40, 35%, 80%)' }}>
              A Cinematic Experience
            </p>
            <button
              onClick={startOpening}
              className="cinema-btn text-base md:text-lg"
            >
              Enter Theater
            </button>
          </div>
        </div>
      )}

      {/* Countdown appears after curtains open */}
      {showCountdown && (
        <FilmCountdown onComplete={handleCountdownComplete} />
      )}
    </div>
  );
};

export default CurtainOpening;
