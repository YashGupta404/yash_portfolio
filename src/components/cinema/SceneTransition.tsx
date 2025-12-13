import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface SceneTransitionProps {
  isTransitioning: boolean;
  onTransitionComplete: () => void;
}

const SceneTransition = ({ isTransitioning, onTransitionComplete }: SceneTransitionProps) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={(definition) => {
            if (definition === 'animate') {
              setTimeout(onTransitionComplete, 800);
            }
          }}
        >
          {/* Film reel animation */}
          <div className="relative">
            {/* Spinning reel */}
            <motion.div
              className="w-32 h-32 rounded-full border-8"
              style={{
                borderColor: 'hsl(40, 25%, 25%)',
                background: 'radial-gradient(circle, hsl(40, 20%, 15%) 0%, hsl(0, 0%, 5%) 100%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              {/* Reel holes */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-background"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 60}deg) translateY(-35px) translate(-50%, -50%)`,
                  }}
                />
              ))}
              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background" />
            </motion.div>

            {/* Film strip */}
            <motion.div
              className="absolute -left-20 top-1/2 -translate-y-1/2 w-16 h-24"
              initial={{ x: -50 }}
              animate={{ x: 50 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 10%, hsl(40, 20%, 20%) 10%, hsl(40, 20%, 20%) 90%, transparent 90%)',
                }}
              >
                {/* Sprocket holes */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1 w-2 h-3 bg-background"
                    style={{ top: `${15 + i * 22}%` }}
                  />
                ))}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute right-1 w-2 h-3 bg-background"
                    style={{ top: `${15 + i * 22}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Changing reel text */}
          <motion.p
            className="absolute bottom-20 font-cinema text-2xl text-theater-gold tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1] }}
          >
            CHANGING REEL...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SceneTransition;
