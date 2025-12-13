import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import CurtainOpening from './cinema/CurtainOpening';
import CinemaScene from './cinema/CinemaScene';
import CinemaNavigation from './cinema/CinemaNavigation';
import SceneTransition from './cinema/SceneTransition';
import FilmGrain from './cinema/FilmGrain';
import Vignette from './cinema/Vignette';
import AboutScene from './scenes/AboutScene';
import ProjectsScene from './scenes/ProjectsScene';
import SkillsScene from './scenes/SkillsScene';
import ContactScene from './scenes/ContactScene';

const scenes = ['About', 'Projects', 'Skills', 'Contact'];

const CinemaPortfolio = () => {
  const [showCurtains, setShowCurtains] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pendingScene, setPendingScene] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleSceneChange = (index: number) => {
    if (index === currentScene || isTransitioning) return;
    setPendingScene(index);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    if (pendingScene !== null) {
      setCurrentScene(pendingScene);
      setPendingScene(null);
    }
    setIsTransitioning(false);
  };

  const renderScene = () => {
    switch (currentScene) {
      case 0: return <AboutScene key="about" />;
      case 1: return <ProjectsScene key="projects" />;
      case 2: return <SkillsScene key="skills" />;
      case 3: return <ContactScene key="contact" />;
      default: return <AboutScene key="about" />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* 3D Cinema Scene */}
      {!showCurtains && <CinemaScene mousePosition={mousePosition} />}

      {/* Curtain Opening */}
      {showCurtains && <CurtainOpening onComplete={() => setShowCurtains(false)} />}

      {/* Content displayed ON the screen */}
      {!showCurtains && (
        <>
          {/* Screen content area - positioned to overlay the 3D screen */}
          <div 
            className="fixed z-10 overflow-hidden projector-flicker"
            style={{
              left: '10%',
              right: '10%',
              top: '12%',
              bottom: '22%',
              background: 'linear-gradient(180deg, hsl(40, 35%, 92%) 0%, hsl(35, 30%, 88%) 100%)',
              boxShadow: 'inset 0 0 60px hsla(30, 20%, 50%, 0.2)',
              borderRadius: '4px',
            }}
          >
            <AnimatePresence mode="wait">
              {renderScene()}
            </AnimatePresence>
          </div>

          <CinemaNavigation currentScene={currentScene} scenes={scenes} onNavigate={handleSceneChange} />
          <SceneTransition isTransitioning={isTransitioning} onTransitionComplete={handleTransitionComplete} />
        </>
      )}

      {/* Overlays */}
      <FilmGrain />
      <Vignette />
    </div>
  );
};

export default CinemaPortfolio;
