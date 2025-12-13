import { motion } from 'framer-motion';

interface CinemaNavigationProps {
  currentScene: number;
  scenes: string[];
  onNavigate: (index: number) => void;
}

const CinemaNavigation = ({ currentScene, scenes, onNavigate }: CinemaNavigationProps) => {
  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div 
        className="flex items-center gap-3 px-6 py-3 rounded"
        style={{
          background: 'linear-gradient(180deg, hsla(25, 15%, 12%, 0.95) 0%, hsla(20, 12%, 8%, 0.98) 100%)',
          border: '1px solid hsl(35, 25%, 22%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 hsla(40, 30%, 30%, 0.2)',
        }}
      >
        {/* Film reel icon */}
        <div className="mr-3 relative">
          <motion.div 
            className="w-7 h-7 rounded-full"
            style={{
              border: '2px solid hsl(40, 60%, 45%)',
              borderTopColor: 'transparent',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div 
            className="absolute inset-1.5 rounded-full"
            style={{ background: 'hsl(25, 15%, 15%)' }}
          />
        </div>

        {/* Scene buttons */}
        <div className="flex items-center gap-1">
          {scenes.map((scene, index) => (
            <button
              key={scene}
              onClick={() => onNavigate(index)}
              className="relative px-4 py-2 font-cinema text-xs uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                color: currentScene === index ? 'hsl(45, 70%, 55%)' : 'hsl(35, 20%, 50%)',
              }}
            >
              {scene}
              {currentScene === index && (
                <motion.div
                  className="absolute bottom-0 left-2 right-2 h-0.5"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(45, 70%, 50%), transparent)',
                    boxShadow: '0 0 8px hsla(45, 80%, 50%, 0.5)',
                  }}
                  layoutId="navIndicator"
                />
              )}
            </button>
          ))}
        </div>

        {/* Reel number */}
        <div className="ml-3 flex items-center gap-1.5 font-film text-xs" style={{ color: 'hsl(35, 20%, 45%)' }}>
          <span>Reel</span>
          <span className="font-cinema" style={{ color: 'hsl(45, 60%, 55%)' }}>{currentScene + 1}</span>
          <span>/</span>
          <span>{scenes.length}</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default CinemaNavigation;
