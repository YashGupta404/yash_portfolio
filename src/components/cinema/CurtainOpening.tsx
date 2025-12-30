import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import FilmCountdown from './FilmCountdown';

interface CurtainOpeningProps {
  onComplete: () => void;
}

// ============================================================================
// CURTAIN FOLD - Simple elegant red velvet
// ============================================================================

const CurtainFold = ({
  index,
  totalFolds,
  isLeft,
  isOpening,
  baseDelay,
}: {
  index: number;
  totalFolds: number;
  isLeft: boolean;
  isOpening: boolean;
  baseDelay: number;
}) => {
  const foldRef = useRef<HTMLDivElement>(null);

  const foldWidth = 100 / totalFolds;
  const foldPosition = index * foldWidth;
  const zIndex = totalFolds - index;

  useEffect(() => {
    const fold = foldRef.current;
    if (!fold) return;

    gsap.killTweensOf(fold);

    if (!isOpening) {
      // Gentle sway
      gsap.to(fold, {
        x: Math.sin(index * 0.6) * 2,
        duration: 2.5 + index * 0.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      return;
    }

    // Opening animation
    const delay = baseDelay + index * 0.05;
    const distance = isLeft ? -(110 + index * 12) : (110 + index * 12);

    gsap.to(fold, {
      x: distance,
      scaleX: 0.35 + index * 0.03,
      rotateY: isLeft ? -15 - index * 1.5 : 15 + index * 1.5,
      duration: 2.2 + index * 0.08,
      delay,
      ease: "power2.out",
    });

  }, [isOpening, index, isLeft, totalFolds, baseDelay]);

  const baseLight = 13 + index * 1.5;
  const gradientDir = isLeft ? '90deg' : '270deg';
  const gradient = `linear-gradient(${gradientDir}, 
    hsl(0, 72%, ${baseLight - 3}%) 0%, 
    hsl(0, 75%, ${baseLight}%) 30%, 
    hsl(0, 78%, ${baseLight + 2}%) 50%, 
    hsl(0, 75%, ${baseLight}%) 70%, 
    hsl(0, 68%, ${baseLight - 4}%) 100%
  )`;

  return (
    <div
      ref={foldRef}
      className="absolute top-0 bottom-0"
      style={{
        width: `${foldWidth + 0.5}%`,
        [isLeft ? 'left' : 'right']: `${foldPosition}%`,
        background: gradient,
        boxShadow: `${isLeft ? '3px' : '-3px'} 0 12px rgba(0,0,0,0.35)`,
        transformStyle: 'preserve-3d',
        zIndex,
      }}
    >
      {/* Velvet texture */}
      <div
        className="absolute inset-0 opacity-12"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Shadow line */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          width: '1px',
          [isLeft ? 'right' : 'left']: 0,
          background: 'rgba(0,0,0,0.25)',
        }}
      />
    </div>
  );
};

// ============================================================================
// GOLD FRINGE
// ============================================================================

const GoldFringe = ({ isLeft, isOpening }: { isLeft: boolean; isOpening: boolean }) => {
  const fringeRef = useRef<HTMLDivElement>(null);

  // Memoize fringe heights to prevent flickering on re-renders
  const fringeHeights = useMemo(() =>
    Array.from({ length: 35 }, () => 6 + Math.random() * 4),
    []
  );

  useEffect(() => {
    if (!fringeRef.current || !isOpening) return;

    gsap.to(fringeRef.current, {
      x: isLeft ? '-95%' : '95%',
      duration: 2.5,
      ease: "power2.inOut",
    });
  }, [isOpening, isLeft]);

  return (
    <div
      ref={fringeRef}
      className="absolute bottom-0 h-10"
      style={{
        width: '55%',
        [isLeft ? 'left' : 'right']: 0,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-2.5"
        style={{
          background: 'linear-gradient(180deg, #c9a54d 0%, #a67c32 60%, #8b6528 100%)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
        }}
      />
      <div className="absolute top-2.5 left-0 right-0 flex justify-center">
        {fringeHeights.map((height, i) => (
          <div
            key={i}
            className="mx-0.5"
            style={{
              width: '2.5px',
              height: `${height}px`,
              background: 'linear-gradient(180deg, #c9a54d 0%, #8b6528 100%)',
              borderRadius: '0 0 40% 40%',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN CURTAIN OPENING
// ============================================================================

const CurtainOpening = ({ onComplete }: CurtainOpeningProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  const [showCountdown, setShowCountdown] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(true);
  const [isOpening, setIsOpening] = useState(false);

  const numFolds = 7;

  const startOpening = useCallback(() => {
    setShowEnterButton(false);

    setTimeout(() => setIsOpening(true), 150);

    const tl = gsap.timeline();

    tl.to(leftCurtainRef.current, {
      xPercent: -95,
      duration: 2.5,
      delay: 0.2,
      ease: "power2.inOut",
    }, 0);

    tl.to(rightCurtainRef.current, {
      xPercent: 95,
      duration: 2.5,
      delay: 0.2,
      ease: "power2.inOut",
      onComplete: () => setTimeout(() => setShowCountdown(true), 300),
    }, 0);

  }, []);

  const handleCountdownComplete = useCallback(() => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => onComplete(),
    });
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] overflow-hidden">
      {/* Cinema theater background - warm dark tones, not black */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a0f0a 0%, #0f0806 50%, #1a0f0a 100%)',
        }}
      />

      {/* Subtle screen glow in center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[70%] h-[60%] opacity-[0.04]"
          style={{
            background: 'radial-gradient(ellipse, #fff8e0 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Left Side Dust Particles */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[15%] pointer-events-none"
        style={{ zIndex: 45 }}
      >
        {/* Dust specks layer */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background: `
              radial-gradient(1px 1px at 10% 15%, rgba(255,250,220,0.6), transparent),
              radial-gradient(1.5px 1.5px at 25% 30%, rgba(255,240,200,0.5), transparent),
              radial-gradient(1px 1px at 5% 45%, rgba(255,255,240,0.5), transparent),
              radial-gradient(1.5px 1.5px at 35% 55%, rgba(255,245,210,0.4), transparent),
              radial-gradient(1px 1px at 15% 65%, rgba(255,250,220,0.55), transparent),
              radial-gradient(1.5px 1.5px at 8% 80%, rgba(255,240,190,0.5), transparent),
              radial-gradient(1px 1px at 28% 88%, rgba(255,250,230,0.5), transparent)
            `,
            animation: 'dustFloat 10s ease-in-out infinite',
          }}
        />
        {/* Film grain texture - reduced intensity */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Right Side Dust Particles */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[15%] pointer-events-none"
        style={{ zIndex: 45 }}
      >
        {/* Dust specks layer */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background: `
              radial-gradient(1.5px 1.5px at 75% 20%, rgba(255,250,220,0.55), transparent),
              radial-gradient(1px 1px at 90% 35%, rgba(255,240,200,0.5), transparent),
              radial-gradient(1.5px 1.5px at 65% 48%, rgba(255,255,240,0.4), transparent),
              radial-gradient(1px 1px at 85% 58%, rgba(255,245,210,0.55), transparent),
              radial-gradient(1.5px 1.5px at 70% 70%, rgba(255,250,220,0.5), transparent),
              radial-gradient(1px 1px at 95% 78%, rgba(255,240,190,0.55), transparent),
              radial-gradient(1.5px 1.5px at 60% 85%, rgba(255,250,230,0.4), transparent)
            `,
            animation: 'dustFloat 9s ease-in-out infinite reverse',
          }}
        />
        {/* Film grain texture - reduced intensity */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* CSS Animation for floating dust */}
      <style>{`
        @keyframes dustFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-3px) translateX(2px); }
          50% { transform: translateY(-1px) translateX(-1px); }
          75% { transform: translateY(2px) translateX(1px); }
        }
      `}</style>

      {/* LEFT CURTAIN */}
      <div
        ref={leftCurtainRef}
        className="absolute left-0 top-0 w-[55%] h-full overflow-hidden"
        style={{ transformOrigin: 'left center' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, hsl(0, 68%, 11%) 0%, hsl(0, 72%, 16%) 100%)' }}
        />

        {Array.from({ length: numFolds }, (_, i) => (
          <CurtainFold
            key={`left-${i}`}
            index={i}
            totalFolds={numFolds}
            isLeft={true}
            isOpening={isOpening}
            baseDelay={0.08}
          />
        ))}

        <GoldFringe isLeft={true} isOpening={isOpening} />
      </div>

      {/* RIGHT CURTAIN */}
      <div
        ref={rightCurtainRef}
        className="absolute right-0 top-0 w-[55%] h-full overflow-hidden"
        style={{ transformOrigin: 'right center' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(270deg, hsl(0, 68%, 11%) 0%, hsl(0, 72%, 16%) 100%)' }}
        />

        {Array.from({ length: numFolds }, (_, i) => (
          <CurtainFold
            key={`right-${i}`}
            index={i}
            totalFolds={numFolds}
            isLeft={false}
            isOpening={isOpening}
            baseDelay={0.1}
          />
        ))}

        <GoldFringe isLeft={false} isOpening={isOpening} />
      </div>

      {/* TOP VALANCE */}
      <div
        className="absolute top-0 left-0 right-0 z-50"
        style={{
          height: '70px',
          background: 'linear-gradient(180deg, hsl(0, 62%, 11%) 0%, hsl(0, 58%, 8%) 100%)',
          boxShadow: '0 8px 35px rgba(0,0,0,0.75)',
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-5"
          style={{
            background: 'hsl(0, 52%, 7%)',
            clipPath: 'ellipse(50% 100% at 50% 0%)',
          }}
        />
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #c9a54d 20%, #e8c06a 50%, #c9a54d 80%, transparent)',
            boxShadow: '0 0 8px rgba(201, 165, 77, 0.3)',
          }}
        />
      </div>

      {/* ENTER BUTTON */}
      {showEnterButton && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="text-center">
            <h1
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#c9a54d',
                textShadow: '0 0 50px rgba(201, 165, 77, 0.5), 0 4px 12px rgba(0,0,0,0.8)',
                letterSpacing: '0.08em',
              }}
            >
              Yash Gupta's Portfolio
            </h1>
            <p
              className="mb-8 mt-2"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                fontStyle: 'italic',
                color: '#a08060',
              }}
            >
              A Cinematic Experience
            </p>
            <button
              onClick={startOpening}
              className="px-10 py-4 uppercase tracking-[0.2em] transition-all hover:brightness-110 hover:scale-105"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                background: 'linear-gradient(180deg, #d4af37 0%, #c9a54d 30%, #8b6528 70%, #6a4a1a 100%)',
                border: '3px solid #e8c06a',
                color: '#1a0c06',
                borderRadius: '4px',
                boxShadow: '0 0 30px rgba(201, 165, 77, 0.5), 0 4px 15px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                textShadow: '0 1px 1px rgba(255,255,255,0.3)',
              }}
            >
              ★ Enter Theater ★
            </button>
          </div>
        </div>
      )}

      {showCountdown && <FilmCountdown onComplete={handleCountdownComplete} />}
    </div>
  );
};

export default CurtainOpening;
