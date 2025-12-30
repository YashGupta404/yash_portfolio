import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SceneTransitionProps {
  isTransitioning: boolean;
  onTransitionComplete: () => void;
}

const SceneTransition = ({ isTransitioning, onTransitionComplete }: SceneTransitionProps) => {
  const [stage, setStage] = useState<'flicker' | 'burn' | 'reel' | 'restart'>('flicker');

  useEffect(() => {
    if (!isTransitioning) return;

    // Multi-stage transition timeline
    const timeline = [
      { stage: 'flicker', duration: 400 },
      { stage: 'burn', duration: 800 },
      { stage: 'reel', duration: 1400 },
      { stage: 'restart', duration: 600 },
    ];

    let currentTime = 0;
    const timers: NodeJS.Timeout[] = [];

    timeline.forEach(({ stage: nextStage, duration }) => {
      const timer = setTimeout(() => {
        setStage(nextStage as any);
      }, currentTime);
      timers.push(timer);
      currentTime += duration;
    });

    // Complete transition
    const completeTimer = setTimeout(() => {
      onTransitionComplete();
      setStage('flicker');
    }, currentTime);
    timers.push(completeTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isTransitioning, onTransitionComplete]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden"
          style={{ background: 'hsl(20, 10%, 8%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Film grain overlay */}
          <div
            className="absolute inset-0 opacity-25 film-grain"
            style={{ mixBlendMode: 'overlay' }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.85) 100%)',
            }}
          />

          {/* Stage 1: Flicker */}
          {stage === 'flicker' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: [1, 0.3, 1, 0.2, 0.8, 0],
              }}
              transition={{ duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: 'radial-gradient(ellipse at center, hsla(40, 50%, 90%, 0.1) 0%, transparent 50%)',
                }}
              />
            </motion.div>
          )}

          {/* Stage 2: Film Burn */}
          {stage === 'burn' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Burn circle expanding from corner */}
              <motion.div
                className="absolute"
                style={{
                  top: '20%',
                  right: '15%',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, hsl(35, 80%, 70%) 0%, hsl(30, 70%, 50%) 20%, hsl(25, 60%, 30%) 40%, hsl(20, 50%, 15%) 60%, transparent 80%)',
                  filter: 'blur(3px)',
                }}
                animate={{
                  scale: [1, 25],
                  opacity: [0, 1, 1, 0.5],
                }}
                transition={{ duration: 0.8, ease: "easeIn" }}
              />

              {/* Burn edge effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 85% 20%, transparent 0%, transparent 30%, hsl(25, 40%, 20%) 50%, hsl(20, 10%, 8%) 70%)',
                }}
                animate={{
                  opacity: [0, 1],
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

              {/* Smoke particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${20 + Math.random() * 10}%`,
                    right: `${15 + Math.random() * 10}%`,
                    width: `${20 + Math.random() * 30}px`,
                    height: `${20 + Math.random() * 30}px`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, hsla(0, 0%, 20%, ${0.3 + Math.random() * 0.2}) 0%, transparent 70%)`,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    y: [-10, -60 - Math.random() * 40],
                    x: [0, (Math.random() - 0.5) * 40],
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 1.5],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Stage 3: Reel Change */}
          {stage === 'reel' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Source reel (slowing down) */}
                <motion.div
                  className="absolute -left-48 top-0 w-40 h-40"
                  animate={{ rotate: [0, 180] }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                >
                  {/* Reel body */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, hsl(30, 18%, 20%) 0%, hsl(25, 14%, 14%) 100%)',
                      border: '5px solid hsl(30, 22%, 28%)',
                      boxShadow: '0 0 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.4)',
                    }}
                  />

                  {/* Reel spokes */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <div
                      key={angle}
                      className="absolute top-1/2 left-1/2 w-1.5 h-16 origin-bottom"
                      style={{
                        background: 'linear-gradient(180deg, hsl(30, 18%, 24%) 0%, hsl(25, 14%, 18%) 100%)',
                        transform: `rotate(${angle}deg) translateY(-100%)`,
                        marginLeft: '-3px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  ))}

                  {/* Center hub */}
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, hsl(30, 22%, 28%) 0%, hsl(25, 16%, 18%) 100%)',
                      border: '3px solid hsl(30, 28%, 32%)',
                      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
                    }}
                  />
                </motion.div>

                {/* Destination reel (starting to spin) */}
                <motion.div
                  className="absolute -right-48 top-0 w-40 h-40"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1.4, ease: "easeIn" }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, hsl(30, 18%, 20%) 0%, hsl(25, 14%, 14%) 100%)',
                      border: '5px solid hsl(30, 22%, 28%)',
                      boxShadow: '0 0 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.4)',
                    }}
                  />

                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <div
                      key={angle}
                      className="absolute top-1/2 left-1/2 w-1.5 h-16 origin-bottom"
                      style={{
                        background: 'linear-gradient(180deg, hsl(30, 18%, 24%) 0%, hsl(25, 14%, 18%) 100%)',
                        transform: `rotate(${angle}deg) translateY(-100%)`,
                        marginLeft: '-3px',
                      }}
                    />
                  ))}

                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, hsl(30, 22%, 28%) 0%, hsl(25, 16%, 18%) 100%)',
                      border: '3px solid hsl(30, 28%, 32%)',
                    }}
                  />
                </motion.div>

                {/* Film strip moving between reels */}
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 flex"
                  animate={{ x: [-192, 0] }}
                  transition={{ duration: 1.4, ease: "linear" }}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="w-16 h-20 ml-1"
                      style={{
                        background: 'hsl(30, 16%, 22%)',
                        borderLeft: '1px solid hsl(30, 22%, 30%)',
                        borderRight: '1px solid hsl(30, 22%, 30%)',
                      }}
                    >
                      {/* Sprocket holes */}
                      <div className="flex flex-col justify-between h-full py-1.5">
                        {[0, 1, 2, 3, 4].map((j) => (
                          <div key={j} className="w-2.5 h-2 bg-black/70 ml-1 rounded-sm" />
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Text */}
              <motion.p
                className="absolute bottom-[18%] font-cinema text-2xl tracking-[0.35em] uppercase"
                style={{ color: 'hsl(40, 42%, 68%)' }}
                animate={{ opacity: [0, 1, 1, 0.7] }}
                transition={{ duration: 1.4, times: [0, 0.15, 0.85, 1] }}
              >
                Changing Reel
              </motion.p>
            </div>
          )}

          {/* Stage 4: Restart (projector light coming back) */}
          {stage === 'restart' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 0.6, times: [0, 0.5, 1] }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: 'radial-gradient(ellipse at center, hsla(40, 60%, 92%, 0.2) 0%, hsla(40, 50%, 85%, 0.1) 30%, transparent 60%)',
                }}
              />
            </motion.div>
          )}

          {/* Continuous projector flicker overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'hsla(40, 50%, 90%, 0.02)' }}
            animate={{ opacity: [0, 0.12, 0, 0.08, 0] }}
            transition={{ duration: 0.15, repeat: Infinity }}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SceneTransition;
