import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import CurtainOpening from './cinema/CurtainOpening';
import CinemaScene from './cinema/CinemaScene';
import CinemaNavigation from './cinema/CinemaNavigation';
import SceneTransition from './cinema/SceneTransition';
import FilmGrain from './cinema/FilmGrain';
import Vignette from './cinema/Vignette';
import Scanlines from './cinema/Scanlines';
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

  const handleCurtainComplete = () => {
    setShowCurtains(false);
  };

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
      case 0:
        return <AboutScene key="about" />;
      case 1:
        return <ProjectsScene key="projects" />;
      case 2:
        return <SkillsScene key="skills" />;
      case 3:
        return <ContactScene key="contact" />;
      default:
        return <AboutScene key="about" />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* 3D Cinema Scene - always rendered in background */}
      {!showCurtains && (
        <CinemaScene mousePosition={mousePosition} />
      )}

      {/* Curtain Opening Sequence */}
      {showCurtains && (
        <CurtainOpening onComplete={handleCurtainComplete} />
      )}

      {/* Main Content */}
      {!showCurtains && (
        <>
          {/* Scene Content */}
          <div className="relative z-10 w-full h-full overflow-y-auto">
            <div 
              className="min-h-screen projector-flicker"
              style={{
                background: 'radial-gradient(ellipse at center top, hsla(45, 30%, 95%, 0.03) 0%, transparent 50%)',
              }}
            >
              <AnimatePresence mode="wait">
                {renderScene()}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <CinemaNavigation
            currentScene={currentScene}
            scenes={scenes}
            onNavigate={handleSceneChange}
          />

          {/* Scene Transition */}
          <SceneTransition
            isTransitioning={isTransitioning}
            onTransitionComplete={handleTransitionComplete}
          />
        </>
      )}

      {/* Post-processing overlays */}
      <FilmGrain />
      <Vignette />
      <Scanlines />
    </div>
  );
};

export default CinemaPortfolio;
