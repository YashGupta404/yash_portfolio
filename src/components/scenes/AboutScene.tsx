import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AboutSceneProps {
  showIntro?: boolean;
  onIntroComplete?: () => void;
}

// Torn paper edge SVG path
const TornEdgeTop = () => (
  <svg className="absolute -top-2 left-0 right-0 w-full h-3" preserveAspectRatio="none" viewBox="0 0 100 10">
    <path d="M0,10 L0,5 Q5,8 10,4 Q15,7 20,3 Q25,6 30,5 Q35,8 40,4 Q45,6 50,5 Q55,7 60,4 Q65,8 70,5 Q75,6 80,4 Q85,7 90,5 Q95,8 100,4 L100,10 Z"
      fill="hsla(40, 25%, 92%, 0.9)" />
  </svg>
);

const TornEdgeBottom = () => (
  <svg className="absolute -bottom-2 left-0 right-0 w-full h-3" preserveAspectRatio="none" viewBox="0 0 100 10">
    <path d="M0,0 L0,5 Q5,2 10,6 Q15,3 20,7 Q25,4 30,5 Q35,2 40,6 Q45,4 50,5 Q55,3 60,6 Q65,2 70,5 Q75,4 80,6 Q85,3 90,5 Q95,2 100,6 L100,0 Z"
      fill="hsla(40, 25%, 92%, 0.9)" />
  </svg>
);

const AboutScene = ({ showIntro = false, onIntroComplete }: AboutSceneProps) => {
  // Show trailer only if showIntro prop is true
  const [showTrailer, setShowTrailer] = useState(showIntro);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const trailerPhrases = [
    "In a world of endless possibilities...",
    "Where AI meets innovation...",
    "One developer dared to create...",
  ];

  useEffect(() => {
    if (!showTrailer) return;
    if (currentPhrase < trailerPhrases.length) {
      const timer = setTimeout(() => setCurrentPhrase(prev => prev + 1), 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowTrailer(false);
        onIntroComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentPhrase, showTrailer, onIntroComplete]);

  return (
    <motion.div
      className="w-full h-full flex flex-col p-6 relative overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'radial-gradient(ellipse at center, hsl(42, 30%, 88%) 0%, hsl(38, 25%, 82%) 100%)',
      }}
    >
      {/* Trailer Intro */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div className="absolute inset-0 flex items-center justify-center z-20"
            style={{ background: 'radial-gradient(ellipse at center, #1a1510 0%, #0a0805 100%)' }}
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {trailerPhrases.map((phrase, index) => (
              <motion.p key={index} className="absolute text-center px-8"
                style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontStyle: 'italic', color: '#e8dcc8' }}
                initial={{ opacity: 0, y: 20 }}
                animate={currentPhrase === index ? { opacity: 1, y: 0 } : currentPhrase > index ? { opacity: 0, y: -20 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}>
                {phrase}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Film Jitter */}
      <motion.div
        className="flex-1 flex flex-col items-center"
        animate={{ x: [0, -0.3, 0.3, 0], y: [0, 0.3, -0.3, 0], opacity: showTrailer ? 0 : 1 }}
        transition={{ x: { duration: 0.4, repeat: Infinity }, opacity: { duration: 0.6 } }}
      >
        {/* ACT Header */}
        <motion.div className="text-center mb-4" initial={{ y: 20, opacity: 0 }} animate={{ y: showTrailer ? 20 : 0, opacity: showTrailer ? 0 : 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
            <span style={{ color: 'hsl(30, 20%, 40%)', fontSize: '0.9rem', fontFamily: '"Playfair Display", serif', letterSpacing: '0.2em' }}>✦ ACT I ✦</span>
            <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, fontStyle: 'italic', color: 'hsl(25, 25%, 15%)', textShadow: '2px 2px 0 hsl(35, 20%, 70%)' }}>
            The Protagonist
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.9rem', fontStyle: 'italic', color: 'hsl(30, 15%, 30%)' }}>
            Meet the Developer
          </p>
        </motion.div>

        {/* Photo - Fixed size, no overflow */}
        <motion.div className="flex justify-center mb-4" initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: showTrailer ? 0.8 : 1, opacity: showTrailer ? 0 : 1 }} transition={{ delay: 0.5, duration: 0.7 }}>
          <div className="relative w-36 h-36 rounded-full flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)', padding: '5px',
              boxShadow: '0 10px 35px rgba(245, 158, 11, 0.5)'
            }}>
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-300 to-yellow-500">
              <img src="/yash.png" alt="Yash Gupta" className="w-full h-full object-cover" style={{ objectPosition: 'center 15%', transform: 'scale(1.15)' }} />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h2 className="mb-1 text-center" style={{
          fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700, fontStyle: 'italic', color: 'hsl(25, 25%, 15%)', textShadow: '2px 2px 0 hsl(35, 20%, 70%)'
        }}
          initial={{ y: 20, opacity: 0 }} animate={{ y: showTrailer ? 20 : 0, opacity: showTrailer ? 0 : 1 }} transition={{ delay: 0.7, duration: 0.7 }}>
          Yash Gupta
        </motion.h2>

        {/* Title */}
        <motion.p className="uppercase tracking-[0.15em] mb-4 text-center" style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '0.7rem', color: 'hsl(28, 20%, 30%)', fontWeight: 600
        }}
          initial={{ opacity: 0 }} animate={{ opacity: showTrailer ? 0 : 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
          Full-Stack Developer | AI/ML Enthusiast | Cloud Architecture
        </motion.p>

        {/* Contact Links */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-4"
          initial={{ opacity: 0 }} animate={{ opacity: showTrailer ? 0 : 1 }} transition={{ delay: 0.5 }}>
          {[
            { icon: '✉', label: 'Email', href: 'mailto:yashgupta.work.2005@gmail.com' },
            { icon: '📞', label: '+91 7603004950', href: 'tel:+917603004950' },
            { icon: '⌥', label: 'GitHub', href: 'https://github.com/YashGupta404' },
            { icon: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/yash-gupta-420a6228a/' },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="px-2 py-1 text-xs flex items-center gap-1 hover:scale-105 transition-transform"
              style={{ background: 'hsla(40, 25%, 92%, 0.8)', border: '1px solid hsl(35, 20%, 65%)', color: 'hsl(28, 18%, 28%)' }}>
              <span>{link.icon}</span> {link.label}
            </a>
          ))}
        </motion.div>

        {/* Brief Summary - Torn Paper Effect */}
        <motion.div className="max-w-lg mx-auto relative px-4 py-5"
          style={{ background: 'hsla(40, 25%, 92%, 0.9)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          initial={{ y: 20, opacity: 0 }} animate={{ y: showTrailer ? 20 : 0, opacity: showTrailer ? 0 : 1 }} transition={{ delay: 0.6 }}>
          <TornEdgeTop />
          <TornEdgeBottom />
          {/* Left torn edge */}
          <div className="absolute left-0 top-0 bottom-0 w-2" style={{
            background: 'linear-gradient(90deg, transparent 0%, hsla(40, 25%, 92%, 0.9) 100%)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 95%, 30% 85%, 10% 75%, 40% 65%, 20% 55%, 50% 45%, 15% 35%, 35% 25%, 5% 15%, 25% 5%)'
          }} />
          {/* Right torn edge */}
          <div className="absolute right-0 top-0 bottom-0 w-2" style={{
            background: 'linear-gradient(270deg, transparent 0%, hsla(40, 25%, 92%, 0.9) 100%)',
            clipPath: 'polygon(0 0, 0 100%, 100% 90%, 70% 80%, 90% 70%, 60% 60%, 80% 50%, 50% 40%, 85% 30%, 65% 20%, 95% 10%, 75% 0)'
          }} />
          <p className="text-center" style={{
            fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic',
            color: 'hsl(28, 18%, 28%)', lineHeight: 1.6
          }}>
            "B.Tech CSE student at IEM Kolkata with expertise in full-stack development,
            AI/ML, and cloud architecture. AWS Certified Cloud Practitioner with 4+ internships in web development and AI research."
          </p>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: showTrailer ? 0 : 1 }} transition={{ delay: 0.8 }}>
          <span style={{ color: 'hsl(30, 20%, 45%)', fontSize: '1.2rem' }}>❧</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutScene;
