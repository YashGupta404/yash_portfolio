import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilmCountdownProps {
  onComplete: () => void;
}

const FilmCountdown = ({ onComplete }: FilmCountdownProps) => {
  const [count, setCount] = useState(3);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0 && !isComplete) {
      setIsComplete(true);
      setTimeout(onComplete, 500);
    }
  }, [count, isComplete, onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background z-40">
      {/* Film frame border */}
      <div 
        className="absolute inset-8 border-4 rounded"
        style={{
          borderColor: 'hsl(40, 25%, 25%)',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)',
        }}
      />

      {/* Film sprocket holes - left */}
      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-around py-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={`left-${i}`}
            className="w-6 h-4 bg-background rounded-sm mx-auto"
            style={{
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
              border: '1px solid hsl(40, 20%, 20%)',
            }}
          />
        ))}
      </div>

      {/* Film sprocket holes - right */}
      <div className="absolute right-0 top-0 bottom-0 w-12 flex flex-col justify-around py-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={`right-${i}`}
            className="w-6 h-4 bg-background rounded-sm mx-auto"
            style={{
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
              border: '1px solid hsl(40, 20%, 20%)',
            }}
          />
        ))}
      </div>

      {/* Countdown circle */}
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 w-64 h-64 -m-32 rounded-full border-4"
          style={{
            borderColor: 'hsl(40, 25%, 30%)',
            borderTopColor: 'hsl(45, 80%, 50%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner circle */}
        <div 
          className="w-48 h-48 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, hsl(40, 20%, 15%) 0%, hsl(0, 0%, 5%) 100%)',
            border: '3px solid hsl(40, 25%, 25%)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Crosshairs */}
          <div className="absolute w-full h-0.5 bg-muted-foreground/30" />
          <div className="absolute h-full w-0.5 bg-muted-foreground/30" />

          {/* Number */}
          <AnimatePresence mode="wait">
            {count > 0 && (
              <motion.span
                key={count}
                className="font-cinema text-8xl text-theater-gold"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  textShadow: '0 0 20px hsl(45, 80%, 50% / 0.5), 0 4px 8px rgba(0,0,0,0.8)',
                }}
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Tick marks around circle */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-4 bg-muted-foreground/50"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '50% -80px',
              transform: `rotate(${i * 30}deg) translateY(-80px)`,
            }}
          />
        ))}
      </div>

      {/* Film scratches effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `
            linear-gradient(90deg, transparent 0%, transparent 45%, rgba(255,255,255,0.1) 45.5%, transparent 46%, transparent 100%),
            linear-gradient(90deg, transparent 0%, transparent 72%, rgba(255,255,255,0.05) 72.5%, transparent 73%, transparent 100%)
          `,
          animation: 'film-scratch 0.2s linear infinite',
        }}
      />

      {/* Dust particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-film-sepia/40"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `dust-float ${10 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FilmCountdown;
