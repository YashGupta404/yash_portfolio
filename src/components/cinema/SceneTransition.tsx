import { motion, AnimatePresence } from 'framer-motion';

interface SceneTransitionProps {
  isTransitioning: boolean;
  onTransitionComplete: () => void;
}

const SceneTransition = ({ isTransitioning, onTransitionComplete }: SceneTransitionProps) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: 'hsl(20, 10%, 8%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={(def) => {
            if (def === 'animate') {
              setTimeout(onTransitionComplete, 1200);
            }
          }}
        >
          {/* Film grain */}
          <div 
            className="absolute inset-0 opacity-20 film-grain"
            style={{ mixBlendMode: 'overlay' }}
          />

          {/* Vignette */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.8) 100%)',
            }}
          />

          {/* Film reel animation */}
          <div className="relative">
            {/* Spinning reel */}
            <motion.div
              className="relative w-36 h-36"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            >
              {/* Reel body */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, hsl(30, 15%, 18%) 0%, hsl(25, 12%, 12%) 100%)',
                  border: '4px solid hsl(30, 20%, 25%)',
                  boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                }}
              />
              
              {/* Reel spokes */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <div
                  key={angle}
                  className="absolute top-1/2 left-1/2 w-1 h-12 origin-bottom"
                  style={{
                    background: 'hsl(30, 15%, 22%)',
                    transform: `rotate(${angle}deg) translateY(-100%)`,
                    marginLeft: '-2px',
                  }}
                />
              ))}
              
              {/* Center hub */}
              <div 
                className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(30, 20%, 25%) 0%, hsl(25, 15%, 15%) 100%)',
                  border: '2px solid hsl(30, 25%, 30%)',
                }}
              />
              
              {/* Film edge */}
              <div 
                className="absolute inset-1 rounded-full border-2 opacity-50"
                style={{ borderColor: 'hsl(25, 20%, 25%)' }}
              />
            </motion.div>

            {/* Film strip coming out */}
            <motion.div
              className="absolute left-full top-1/2 -translate-y-1/2 flex"
              initial={{ x: -20 }}
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-16 ml-0.5"
                  style={{
                    background: 'hsl(30, 15%, 20%)',
                    borderLeft: '1px solid hsl(30, 20%, 28%)',
                    borderRight: '1px solid hsl(30, 20%, 28%)',
                  }}
                >
                  {/* Sprocket holes */}
                  <div className="flex flex-col justify-between h-full py-1">
                    <div className="w-2 h-1.5 bg-black/60 ml-0.5 rounded-sm" />
                    <div className="w-2 h-1.5 bg-black/60 ml-0.5 rounded-sm" />
                    <div className="w-2 h-1.5 bg-black/60 ml-0.5 rounded-sm" />
                    <div className="w-2 h-1.5 bg-black/60 ml-0.5 rounded-sm" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Text */}
          <motion.p
            className="absolute bottom-[20%] font-cinema text-xl tracking-[0.3em]"
            style={{ color: 'hsl(40, 40%, 65%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.8] }}
            transition={{ duration: 1.2, times: [0, 0.2, 0.8, 1] }}
          >
            CHANGING REEL
          </motion.p>

          {/* Projector flicker overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'hsla(40, 50%, 90%, 0.03)' }}
            animate={{ opacity: [0, 0.08, 0, 0.05, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SceneTransition;
