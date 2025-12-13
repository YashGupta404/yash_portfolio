import { motion } from 'framer-motion';

interface CinemaNavigationProps {
  currentScene: number;
  scenes: string[];
  onNavigate: (index: number) => void;
}

const CinemaNavigation = ({ currentScene, scenes, onNavigate }: CinemaNavigationProps) => {
  return (
    <motion.nav
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div 
        className="flex items-center gap-4 px-8 py-4 rounded-lg backdrop-blur-md"
        style={{
          background: 'linear-gradient(180deg, hsla(0, 0%, 10%, 0.9) 0%, hsla(0, 0%, 5%, 0.95) 100%)',
          border: '1px solid hsl(40, 30%, 25%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 hsla(40, 30%, 30%, 0.3)',
        }}
      >
        {/* Film reel icon */}
        <div className="mr-4">
          <div 
            className="w-8 h-8 rounded-full border-2 animate-reel-spin"
            style={{ 
              borderColor: 'hsl(45, 70%, 50%)',
              borderTopColor: 'transparent',
            }}
          >
            <div className="absolute inset-2 rounded-full bg-muted" />
          </div>
        </div>

        {/* Scene buttons */}
        <div className="flex items-center gap-2">
          {scenes.map((scene, index) => (
            <button
              key={scene}
              onClick={() => onNavigate(index)}
              className={`
                relative px-4 py-2 font-cinema text-sm uppercase tracking-widest
                transition-all duration-300
                ${currentScene === index 
                  ? 'text-theater-gold' 
                  : 'text-muted-foreground hover:text-film-cream'
                }
              `}
            >
              {scene}
              {currentScene === index && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-theater-gold"
                  layoutId="activeScene"
                  style={{
                    boxShadow: '0 0 10px hsl(45, 80%, 50% / 0.5)',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Reel counter */}
        <div className="ml-4 flex items-center gap-2 text-muted-foreground font-film text-sm">
          <span>Reel</span>
          <span className="text-theater-gold font-cinema">{currentScene + 1}</span>
          <span>/</span>
          <span>{scenes.length}</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default CinemaNavigation;
