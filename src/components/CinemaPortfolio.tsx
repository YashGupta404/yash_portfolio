import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CurtainOpening from './cinema/CurtainOpening';
import AboutScene from './scenes/AboutScene';
import EducationScene from './scenes/EducationScene';
import AchievementsScene from './scenes/AchievementsScene';
import CertificationsScene from './scenes/CertificationsScene';
import ProjectsScene from './scenes/ProjectsScene';
import SkillsScene from './scenes/SkillsScene';
import ContactScene from './scenes/ContactScene';

const scenes = ['About', 'Education', 'Achievements', 'Certifications', 'Projects', 'Skills', 'Contact', 'The End'];

// Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Hook to detect Konami code
const useKonamiCode = (callback: () => void) => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInputSequence(prev => {
        const newSeq = [...prev, e.code].slice(-10);
        if (newSeq.join(',') === KONAMI_CODE.join(',')) {
          callback();
          return [];
        }
        return newSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};

// ============================================================================
// MOUSE POSITION TRACKING HOOK
// ============================================================================

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

// ============================================================================
// PARALLAX 3D THEATER ENVIRONMENT
// ============================================================================

const ParallaxTheater = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const offsetX = (mousePosition.x - 0.5) * 40;
  const offsetY = (mousePosition.y - 0.5) * 20;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Back wall - slowest movement */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: offsetX * 0.1,
          y: offsetY * 0.1,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        style={{
          background: 'radial-gradient(ellipse at center, #1a1510 0%, #0a0805 100%)',
        }}
      >
        {/* Art deco pattern on back wall */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #c9a54d 0px,
              #c9a54d 1px,
              transparent 1px,
              transparent 20px
            )`,
          }}
        />
      </motion.div>

      {/* Side walls - medium movement */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-32"
        animate={{
          x: offsetX * 0.3,
          y: offsetY * 0.2,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 25 }}
        style={{
          background: 'linear-gradient(90deg, #2a2015 0%, transparent 100%)',
          boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.5)',
        }}
      />
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-32"
        animate={{
          x: offsetX * 0.3,
          y: offsetY * 0.2,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 25 }}
        style={{
          background: 'linear-gradient(270deg, #2a2015 0%, transparent 100%)',
          boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.5)',
        }}
      />

      {/* Ceiling with ornate molding - medium-fast movement */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-20"
        animate={{
          x: offsetX * 0.4,
          y: offsetY * 0.3,
        }}
        transition={{ type: 'spring', stiffness: 70, damping: 20 }}
        style={{
          background: 'linear-gradient(180deg, #1a1510 0%, transparent 100%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Crown molding detail */}
        <div
          className="absolute bottom-0 left-0 right-0 h-3"
          style={{
            background: 'linear-gradient(180deg, #c9a54d20 0%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Theater floor - fast movement */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24"
        animate={{
          x: offsetX * 0.5,
          y: offsetY * 0.4,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          background: 'linear-gradient(0deg, #0a0805 0%, transparent 100%)',
        }}
      >
        {/* Carpet pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #8b0000 0%, transparent 50%)`,
            backgroundSize: '30px 30px',
          }}
        />
      </motion.div>
    </div>
  );
};

// ============================================================================
// MOTION-TRACKED PROJECTOR SPOTLIGHT
// ============================================================================

const MotionSpotlight = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      animate={{
        left: `${mousePosition.x * 100}%`,
        top: `${mousePosition.y * 100}%`,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      style={{
        width: '400px',
        height: '400px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse at center, rgba(255,248,220,0.08) 0%, rgba(255,240,200,0.03) 30%, transparent 60%)',
        filter: 'blur(20px)',
      }}
    />
  );
};

// ============================================================================
// DIRECTOR'S COMMENTARY MODE
// ============================================================================

const DirectorCommentary = ({ scene, isActive }: { scene: number; isActive: boolean }) => {
  const commentaries = [
    {
      title: "The Opening Act",
      text: "Welcome! This scene introduces who I am. I chose a vintage silent film aesthetic to stand out from typical portfolios. The jittery animation mimics old film projectors.",
    },
    {
      title: "The Filmography",
      text: "Each project is presented as a movie poster. I wanted to showcase my work like premiering films at a festival. Hover effects simulate marquee lighting.",
    },
    {
      title: "The Craft",
      text: "Skills are displayed on a film strip timeline. The horizontal scroll mimics film threading through a projector. Each 'frame' contains a skill category.",
    },
    {
      title: "The Finale",
      text: "The contact section uses theater seats as an interactive metaphor. Each seat represents a way to connect. Reserved seats hint at future platforms.",
    },
  ];

  if (!isActive || scene >= commentaries.length) return null;

  const commentary = commentaries[scene];

  return (
    <motion.div
      className="absolute top-4 right-4 w-72 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      style={{
        background: 'rgba(0,0,0,0.9)',
        border: '2px solid #c9a54d',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="px-3 py-2"
        style={{
          background: 'linear-gradient(180deg, #c9a54d 0%, #8b6528 100%)',
        }}
      >
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#1a1510',
            letterSpacing: '0.15em',
          }}
        >
          🎬 DIRECTOR'S COMMENTARY
        </p>
      </div>
      <div className="p-4">
        <h4
          className="mb-2"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1rem',
            color: '#c9a54d',
          }}
        >
          {commentary.title}
        </h4>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '0.85rem',
            color: '#a09080',
            lineHeight: 1.6,
          }}
        >
          {commentary.text}
        </p>
      </div>
    </motion.div>
  );
};

// ============================================================================
// PERSONALIZED TICKET GENERATOR
// ============================================================================

const TicketGenerator = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const generateTicket = () => {
    if (name.trim()) {
      setTicketGenerated(true);
    }
  };

  const downloadTicket = () => {
    // Create a downloadable version
    const ticketData = `
═══════════════════════════════════════
           YASH GUPTA'S PORTFOLIO
              ADMIT ONE
═══════════════════════════════════════
  
  Name: ${name}
  Date: ${new Date().toLocaleDateString()}
  Seat: A1 - VIP
  
  ★★★★★ RATED EXCELLENT ★★★★★
  
  Visit: yourportfolio.com
  
═══════════════════════════════════════
    `;

    const blob = new Blob([ticketData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinema-ticket-${name.replace(/\s/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.85)' }}
        onClick={onClose}
      />

      {/* Ticket Box Office */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
      >
        {!ticketGenerated ? (
          <div
            className="p-8 text-center"
            style={{
              background: 'linear-gradient(180deg, #2a2520 0%, #1a1510 100%)',
              border: '3px solid #c9a54d',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201, 165, 77, 0.2)',
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4"
              style={{ color: '#8b7355', fontSize: '1.5rem' }}
            >
              ×
            </button>

            <h3
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.5rem',
                color: '#c9a54d',
                marginBottom: '0.5rem',
              }}
            >
              🎫 BOX OFFICE
            </h3>
            <p
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '0.9rem',
                color: '#a09080',
                marginBottom: '2rem',
              }}
            >
              Get your personalized cinema ticket!
            </p>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 mb-4 text-center"
              style={{
                background: '#1a1510',
                border: '2px solid #3a3530',
                color: '#e8dcc8',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.1rem',
              }}
            />

            <button
              onClick={generateTicket}
              className="w-full py-3"
              style={{
                background: 'linear-gradient(180deg, #c9a54d 0%, #8b6528 100%)',
                border: 'none',
                fontFamily: '"Playfair Display", serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#1a1510',
                letterSpacing: '0.1em',
                cursor: 'pointer',
              }}
            >
              GENERATE TICKET
            </button>
          </div>
        ) : (
          <div ref={ticketRef} className="text-center">
            {/* Ticket Design */}
            <div
              className="relative p-6"
              style={{
                background: 'linear-gradient(180deg, #f5e6c8 0%, #e8d4a8 100%)',
                border: '3px dashed #8b6528',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Perforated edge */}
              <div
                className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ background: '#2a2520' }}
                  />
                ))}
              </div>

              <div className="ml-6">
                <p
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.3em',
                    color: '#5a4a30',
                  }}
                >
                  YASH GUPTA PRODUCTIONS
                </p>

                <h4
                  className="my-4"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#2a1810',
                  }}
                >
                  ADMIT ONE
                </h4>

                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.2rem',
                    fontStyle: 'italic',
                    color: '#4a3a20',
                    marginBottom: '1rem',
                  }}
                >
                  {name}
                </p>

                <div className="flex justify-center gap-8 mb-4">
                  <div>
                    <p style={{ fontSize: '0.6rem', color: '#6a5a40' }}>DATE</p>
                    <p style={{ fontFamily: '"Playfair Display", serif', color: '#2a1810' }}>
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.6rem', color: '#6a5a40' }}>SEAT</p>
                    <p style={{ fontFamily: '"Playfair Display", serif', color: '#2a1810' }}>
                      A1 VIP
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#8b6528' }}>
                  ★★★★★
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-4 justify-center">
              <button
                onClick={downloadTicket}
                className="px-6 py-2"
                style={{
                  background: 'linear-gradient(180deg, #c9a54d 0%, #8b6528 100%)',
                  border: 'none',
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '0.85rem',
                  color: '#1a1510',
                  cursor: 'pointer',
                }}
              >
                📥 Download Ticket
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2"
                style={{
                  background: 'transparent',
                  border: '1px solid #5a5550',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.85rem',
                  color: '#a09080',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// FLOATING DUST PARTICLES IN PROJECTOR LIGHT
// ============================================================================

const ProjectorDustParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 3,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 5,
    opacity: 0.2 + Math.random() * 0.4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: `rgba(255, 248, 220, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(255, 240, 200, 0.3)`,
          }}
          animate={{
            y: ['0%', '100%'],
            x: [0, Math.sin(p.id) * 30, 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// SECRET EASTER EGG MODE - Classic Hollywood (Grayscale)
// ============================================================================

const ClassicHollywoodOverlay = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        mixBlendMode: 'saturation',
        background: 'gray',
      }}
    >
      {/* Notification */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 px-6 py-3"
        style={{
          background: 'rgba(0,0,0,0.8)',
          border: '2px solid #c9a54d',
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '0.8rem',
            color: '#c9a54d',
            letterSpacing: '0.2em',
          }}
        >
          ★ CLASSIC HOLLYWOOD MODE ACTIVATED ★
        </p>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// 3D FILM REEL SPINNING TRANSITION
// ============================================================================

const FilmReelTransition = ({
  isActive,
  direction,
  onComplete
}: {
  isActive: boolean;
  direction: 'next' | 'prev';
  onComplete: () => void;
}) => {
  const [frame, setFrame] = useState(5);

  useEffect(() => {
    if (!isActive) {
      setFrame(5);
      return;
    }

    // Countdown frames: 5, 4, 3, 2, 1
    const interval = setInterval(() => {
      setFrame(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return 0;
        }
        return prev - 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'radial-gradient(ellipse at center, #1a1510 0%, #0a0805 100%)',
      }}
    >
      {/* Projector light flicker */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.8, 1, 0.9, 1, 0.85],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,248,220,0.1) 0%, transparent 50%)',
        }}
      />

      {/* 3D Film Reel Container */}
      <div
        className="relative"
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center center',
        }}
      >
        {/* Spinning Reel */}
        <motion.div
          className="relative"
          style={{
            width: '350px',
            height: '350px',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateZ: direction === 'next' ? [0, 720] : [0, -720],
            rotateY: [0, 15, 0, -15, 0],
          }}
          transition={{
            rotateZ: { duration: 0.8, ease: 'easeInOut' },
            rotateY: { duration: 0.4, repeat: 2, ease: 'linear' },
          }}
        >
          {/* Reel outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #2a2520, #3a3530, #2a2520, #3a3530, #2a2520, #3a3530, #2a2520, #3a3530, #2a2520)',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 0 50px rgba(0,0,0,0.5)',
              border: '8px solid #1a1510',
            }}
          />

          {/* Reel spokes */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: '8px',
                height: '140px',
                background: 'linear-gradient(180deg, #3a3530 0%, #2a2520 50%, #3a3530 100%)',
                left: '50%',
                top: '50%',
                marginLeft: '-4px',
                marginTop: '-70px',
                transformOrigin: 'center 70px',
                transform: `rotate(${i * 60}deg)`,
                boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
              }}
            />
          ))}

          {/* Center hub */}
          <div
            className="absolute rounded-full"
            style={{
              width: '100px',
              height: '100px',
              left: '50%',
              top: '50%',
              marginLeft: '-50px',
              marginTop: '-50px',
              background: 'radial-gradient(circle at 30% 30%, #5a4a40 0%, #2a2520 50%, #1a1510 100%)',
              border: '4px solid #3a3530',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)',
            }}
          >
            {/* Center hole */}
            <div
              className="absolute rounded-full"
              style={{
                width: '30px',
                height: '30px',
                left: '50%',
                top: '50%',
                marginLeft: '-15px',
                marginTop: '-15px',
                background: '#0a0805',
                border: '2px solid #3a3530',
              }}
            />
          </div>

          {/* Sprocket holes around the edge */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15) * (Math.PI / 180);
            const radius = 155;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={`sprocket-${i}`}
                className="absolute rounded-full"
                style={{
                  width: '12px',
                  height: '12px',
                  left: '50%',
                  top: '50%',
                  marginLeft: x - 6,
                  marginTop: y - 6,
                  background: '#0a0805',
                  border: '1px solid #3a3530',
                  boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)',
                }}
              />
            );
          })}

          {/* Film strip section visible on reel */}
          <div
            className="absolute"
            style={{
              width: '60px',
              height: '280px',
              right: '-20px',
              top: '50%',
              marginTop: '-140px',
              background: 'linear-gradient(90deg, #1a1510 0%, #2a2520 50%, #1a1510 100%)',
              boxShadow: '-5px 0 15px rgba(0,0,0,0.5)',
            }}
          >
            {/* Film frames */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`frame-${i}`}
                className="absolute"
                style={{
                  width: '50px',
                  height: '40px',
                  left: '5px',
                  top: 20 + i * 50,
                  background: 'linear-gradient(180deg, rgba(255,248,220,0.1) 0%, rgba(200,180,140,0.05) 100%)',
                  border: '1px solid #3a3530',
                }}
              />
            ))}
            {/* Sprocket holes */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`hole-${i}`}
                className="absolute rounded-sm"
                style={{
                  width: '4px',
                  height: '6px',
                  left: '0px',
                  top: 10 + i * 22,
                  background: '#0a0805',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Frame counter in center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            key={frame}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '4rem',
              fontWeight: 700,
              color: '#c9a54d',
              textShadow: '0 0 30px rgba(201, 165, 77, 0.5), 2px 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            {frame > 0 ? frame : ''}
          </motion.span>
        </motion.div>
      </div>

      {/* "Changing Reel" text */}
      <motion.p
        className="absolute bottom-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '1rem',
          fontStyle: 'italic',
          color: '#8b7355',
          letterSpacing: '0.2em',
        }}
      >
        {direction === 'next' ? '— NEXT REEL —' : '— PREVIOUS REEL —'}
      </motion.p>

      {/* Film burn effect at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(139, 69, 19, 0.1) 70%, rgba(139, 69, 19, 0.3) 100%)',
        }}
      />
    </motion.div>
  );
};

// ============================================================================
// RETRO FILM OVERLAY - Scratches, dust, flicker, lines
// ============================================================================

const RetroFilmOverlay = () => {
  const [flickerOpacity, setFlickerOpacity] = useState(1);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      // Random flicker effect
      setFlickerOpacity(0.92 + Math.random() * 0.08);
    }, 100);

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-30" style={{ opacity: flickerOpacity }}>
      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Vertical scratches */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full animate-scratch"
            style={{
              left: `${10 + Math.random() * 80}%`,
              width: '1px',
              background: `rgba(0,0,0,${0.05 + Math.random() * 0.1})`,
              animation: `scratch ${1 + Math.random()}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Random dust particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              opacity: 0.1 + Math.random() * 0.2,
              animation: `dust ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Film burn/vignette edges - subtle darkening */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.25), inset 0 0 150px 40px rgba(0,0,0,0.15)',
        }}
      />

      {/* Corner darkening - vintage projector look */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 0% 0%, rgba(0,0,0,0.35) 0%, transparent 35%),
            radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.35) 0%, transparent 35%),
            radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.35) 0%, transparent 35%),
            radial-gradient(ellipse at 100% 100%, rgba(0,0,0,0.35) 0%, transparent 35%)
          `,
        }}
      />

      {/* Aged paper/dusty edge effect - brownish staining */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 50%, rgba(139, 115, 85, 0.15) 70%, rgba(120, 95, 65, 0.25) 85%, rgba(100, 75, 50, 0.35) 100%)
          `,
        }}
      />

      {/* Top edge aging/dust */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(180deg, rgba(120, 100, 70, 0.3) 0%, rgba(100, 80, 55, 0.15) 40%, transparent 100%)',
        }}
      />

      {/* Bottom edge aging/dust */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(0deg, rgba(120, 100, 70, 0.3) 0%, rgba(100, 80, 55, 0.15) 40%, transparent 100%)',
        }}
      />

      {/* Left edge aging/dust */}
      <div
        className="absolute top-0 bottom-0 left-0 w-20"
        style={{
          background: 'linear-gradient(90deg, rgba(120, 100, 70, 0.35) 0%, rgba(100, 80, 55, 0.15) 50%, transparent 100%)',
        }}
      />

      {/* Right edge aging/dust */}
      <div
        className="absolute top-0 bottom-0 right-0 w-20"
        style={{
          background: 'linear-gradient(270deg, rgba(120, 100, 70, 0.35) 0%, rgba(100, 80, 55, 0.15) 50%, transparent 100%)',
        }}
      />

      {/* Noise/grain texture for dusty look */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Worn film border */}
      <div
        className="absolute inset-0"
        style={{
          border: '8px solid transparent',
          borderImage: 'linear-gradient(45deg, rgba(0,0,0,0.3), transparent, rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.25)) 1',
        }}
      />

      {/* Occasional light leak */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32"
        style={{
          background: 'radial-gradient(circle, rgba(255,240,200,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
      />

      {/* CSS animations */}
      <style>{`
        @keyframes scratch {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes dust {
          0%, 100% { opacity: 0; transform: translate(0, 0); }
          50% { opacity: 0.3; transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// 3D VISIBLE PROJECTOR (Left side) - With depth, metallic look, and volumetric light
// ============================================================================

const Projector3D = () => {
  const [reelRotation, setReelRotation] = useState(0);
  const [lightFlicker, setLightFlicker] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setReelRotation(prev => prev + 5);
      // Authentic projector flicker
      setLightFlicker(0.9 + Math.random() * 0.15);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-20"
      style={{
        width: '200px',
        perspective: '1000px',
        perspectiveOrigin: '70% 50%',
      }}
    >
      {/* Shadow cast on wall/floor */}
      <div
        style={{
          position: 'absolute',
          left: '-30px',
          top: '60%',
          width: '180px',
          height: '120px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.6) 0%, transparent 70%)',
          transform: 'rotateX(75deg) translateZ(-50px)',
          filter: 'blur(15px)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient glow from projector lamp */}
      <div
        style={{
          position: 'absolute',
          left: '60px',
          top: '40%',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(ellipse at center, rgba(255,200,100,0.2) 0%, transparent 60%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      {/* Projector stand/table for depth */}
      <div
        style={{
          position: 'absolute',
          left: '10px',
          bottom: '-80px',
          width: '160px',
          height: '20px',
          background: 'linear-gradient(180deg, #3a3530 0%, #2a2520 50%, #1a1510 100%)',
          borderRadius: '4px',
          transform: 'perspective(500px) rotateX(-20deg)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.7)',
        }}
      >
        {/* Table legs shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '20%',
            right: '20%',
            height: '30px',
            background: 'linear-gradient(180deg, #2a2520 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Projector body with stronger 3D transforms */}
      <div
        className="relative"
        style={{
          width: '160px',
          height: '220px',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-20deg) rotateX(8deg) rotateZ(-2deg)',
          filter: 'drop-shadow(15px 25px 20px rgba(0,0,0,0.7))',
        }}
      >
        {/* Main body - front face */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(160deg, #4a4540 0%, #3a3530 20%, #2a2520 60%, #1a1510 100%)',
            borderRadius: '10px',
            boxShadow: `
              0 20px 50px rgba(0,0,0,0.8),
              0 10px 20px rgba(0,0,0,0.6),
              inset 0 2px 4px rgba(255,255,255,0.15),
              inset 0 -2px 4px rgba(0,0,0,0.3)
            `,
            border: '1px solid #5a5550',
          }}
        >
          {/* Metallic top plate */}
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              left: '-5px',
              right: '-5px',
              height: '25px',
              background: 'linear-gradient(180deg, #5a5550 0%, #4a4540 30%, #3a3530 100%)',
              borderRadius: '12px 12px 0 0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          />

          {/* Side depth panel - left */}
          <div
            style={{
              position: 'absolute',
              left: '-15px',
              top: '10px',
              bottom: '10px',
              width: '15px',
              background: 'linear-gradient(90deg, #1a1510 0%, #2a2520 100%)',
              borderRadius: '8px 0 0 8px',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
            }}
          />

          {/* Bottom depth plate */}
          <div
            style={{
              position: 'absolute',
              bottom: '-12px',
              left: '-10px',
              right: '-10px',
              height: '20px',
              background: 'linear-gradient(180deg, #2a2520 0%, #1a1510 100%)',
              borderRadius: '0 0 12px 12px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
            }}
          />

          {/* Ventilation grilles */}
          <div style={{ position: 'absolute', left: '10px', top: '40px' }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: '30px',
                  height: '3px',
                  marginBottom: '4px',
                  background: 'linear-gradient(90deg, #0a0805 0%, #1a1510 50%, #0a0805 100%)',
                  borderRadius: '1px',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
                }}
              />
            ))}
          </div>

          {/* Control knobs */}
          {[60, 90, 120].map((top, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                right: '12px',
                top: `${top}px`,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, #5a5550 0%, #3a3530 50%, #1a1510 100%)`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                border: '1px solid #4a4540',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '2px',
                  height: '6px',
                  background: '#6a6560',
                  borderRadius: '1px',
                }}
              />
            </div>
          ))}

          {/* Manufacturer plate */}
          <div
            style={{
              position: 'absolute',
              bottom: '25px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '20px',
              background: 'linear-gradient(180deg, #c9a54d 0%, #a67c32 50%, #8b6528 100%)',
              borderRadius: '2px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '6px',
              fontWeight: 'bold',
              color: '#1a1510',
              letterSpacing: '1px',
            }}
          >
            CINE-PRO
          </div>
        </div>

        {/* TOP FILM REEL - with 3D depth */}
        <div
          className="absolute"
          style={{
            top: '-50px',
            left: '20px',
            width: '100px',
            height: '100px',
            transformStyle: 'preserve-3d',
            transform: `rotate(${reelRotation}deg)`,
          }}
        >
          {/* Reel disc - back */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: `radial-gradient(circle at 40% 40%, #3a3530 0%, #2a2520 40%, #1a1510 100%)`,
              boxShadow: '0 0 0 4px #4a4540, 0 8px 25px rgba(0,0,0,0.7)',
              transform: 'translateZ(-10px)',
            }}
          />
          {/* Reel disc - front */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: `conic-gradient(from 0deg, #2a2520, #3a3530, #2a2520, #1a1510, #2a2520, #3a3530, #2a2520, #1a1510, #2a2520)`,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 0 3px #5a5550',
            }}
          />
          {/* Film wound on reel */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              width: '70%',
              height: '70%',
              borderRadius: '50%',
              background: `radial-gradient(circle, #3a2a1a 0%, #2a1a0a 70%, #1a0a00 100%)`,
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
            }}
          />
          {/* Reel spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <div
              key={angle}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '4px',
                height: '40px',
                background: 'linear-gradient(180deg, #5a5550 0%, #3a3530 100%)',
                transformOrigin: 'center top',
                transform: `translate(-50%, 0) rotate(${angle}deg)`,
                borderRadius: '2px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
          ))}
          {/* Center hub with 3D effect */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, #7a7570 0%, #5a5550 40%, #3a3530 100%)`,
              boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(0,0,0,0.3)',
              border: '2px solid #4a4540',
            }}
          />
        </div>

        {/* BOTTOM FILM REEL - smaller take-up reel */}
        <div
          className="absolute"
          style={{
            bottom: '-35px',
            left: '30px',
            width: '75px',
            height: '75px',
            transformStyle: 'preserve-3d',
            transform: `rotate(${reelRotation * 1.3}deg)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: `conic-gradient(from 0deg, #2a2520, #3a3530, #2a2520, #1a1510, #2a2520)`,
              boxShadow: '0 0 0 3px #4a4540, 0 6px 20px rgba(0,0,0,0.6), inset 0 0 15px rgba(0,0,0,0.4)',
            }}
          />
          {/* Less film wound */}
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: '25%',
              width: '50%',
              height: '50%',
              borderRadius: '50%',
              background: `radial-gradient(circle, #3a2a1a 0%, #2a1a0a 100%)`,
            }}
          />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <div
              key={angle}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '3px',
                height: '30px',
                background: 'linear-gradient(180deg, #5a5550 0%, #3a3530 100%)',
                transformOrigin: 'center top',
                transform: `translate(-50%, 0) rotate(${angle}deg)`,
                borderRadius: '1px',
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, #6a6560 0%, #4a4540 100%)`,
              boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
              border: '2px solid #3a3530',
            }}
          />
        </div>

        {/* LENS ASSEMBLY - 3D barrel */}
        <div
          style={{
            position: 'absolute',
            right: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Lens barrel */}
          <div
            style={{
              width: '70px',
              height: '45px',
              background: 'linear-gradient(180deg, #3a3530 0%, #1a1510 50%, #2a2520 100%)',
              borderRadius: '5px 25px 25px 5px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              position: 'relative',
            }}
          >
            {/* Lens rings */}
            {[10, 30, 50].map((left, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${left}px`,
                  top: '5px',
                  bottom: '5px',
                  width: '3px',
                  background: 'linear-gradient(180deg, #5a5550 0%, #2a2520 50%, #4a4540 100%)',
                  borderRadius: '1px',
                }}
              />
            ))}

            {/* Lens glass - glowing front element */}
            <div
              style={{
                position: 'absolute',
                right: '-12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, #fff8e0 0%, #ffee99 30%, #ffcc44 60%, #cc8800 100%)`,
                boxShadow: `
                  0 0 30px rgba(255, 221, 136, ${lightFlicker * 0.8}),
                  0 0 60px rgba(255, 170, 68, ${lightFlicker * 0.5}),
                  0 0 100px rgba(255, 136, 0, ${lightFlicker * 0.3}),
                  inset 0 0 10px rgba(255,255,255,0.5)
                `,
                border: '3px solid #2a2520',
              }}
            />

            {/* Lens flare */}
            <div
              style={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(255,248,220,${lightFlicker * 0.6}) 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Power indicator light */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '35px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, #ff6666 0%, #ff0000 50%, #aa0000 100%)`,
            boxShadow: '0 0 8px #ff0000, 0 0 15px #ff0000',
            animation: 'pulse 1s ease-in-out infinite',
          }}
        />
      </div>

      {/* VOLUMETRIC LIGHT BEAM - Projects to entire screen */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '130px',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      >
        {/* Outer light cone - covers screen */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '-280px',
            width: '0',
            height: '0',
            borderLeft: `calc(100vw - 200px) solid rgba(255,248,220,${0.03 * lightFlicker})`,
            borderTop: '330px solid transparent',
            borderBottom: '330px solid transparent',
            transform: 'rotate(-2deg)',
            filter: 'blur(8px)',
          }}
        />

        {/* Middle light cone */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '-200px',
            width: '0',
            height: '0',
            borderLeft: `calc(100vw - 280px) solid rgba(255,248,220,${0.05 * lightFlicker})`,
            borderTop: '230px solid transparent',
            borderBottom: '230px solid transparent',
            transform: 'rotate(-1deg)',
            filter: 'blur(5px)',
          }}
        />

        {/* Core light beam - brightest */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '-120px',
            width: '0',
            height: '0',
            borderLeft: `calc(100vw - 350px) solid rgba(255,250,235,${0.08 * lightFlicker})`,
            borderTop: '140px solid transparent',
            borderBottom: '140px solid transparent',
            filter: 'blur(3px)',
          }}
        />

        {/* Light ray streaks for depth */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              top: `${-60 + i * 25}px`,
              height: '2px',
              width: `${300 + Math.random() * 200}px`,
              background: `linear-gradient(90deg, rgba(255,248,220,${0.15 * lightFlicker}) 0%, transparent 100%)`,
              transform: `rotate(${-3 + i * 1.5}deg)`,
              filter: 'blur(1px)',
              opacity: 0.5 + Math.random() * 0.3,
            }}
          />
        ))}

        {/* Dust particles in beam */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${50 + Math.random() * 400}px`,
              top: `${-100 + Math.random() * 200}px`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              borderRadius: '50%',
              background: `rgba(255,248,220,${0.3 + Math.random() * 0.4})`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0); 
            opacity: 0.3;
          }
          50% { 
            transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ARROW NAVIGATION
// ============================================================================

interface ArrowNavProps {
  onPrev: () => void;
  onNext: () => void;
  currentScene: number;
  totalScenes: number;
}

const ArrowNavigation = ({ onPrev, onNext, currentScene, totalScenes }: ArrowNavProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-8">
      {/* Previous arrow */}
      <button
        onClick={onPrev}
        disabled={currentScene === 0}
        className="group transition-all duration-300"
        style={{
          opacity: currentScene === 0 ? 0.3 : 1,
          cursor: currentScene === 0 ? 'not-allowed' : 'pointer',
        }}
      >
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full transition-all group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #2a2520 0%, #1a1510 100%)',
            border: '2px solid #8b7355',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          }}
        >
          <span className="text-3xl" style={{ color: '#d4a84b', fontFamily: 'serif' }}>◀</span>
        </div>
      </button>

      {/* Scene indicator */}
      <div
        className="px-6 py-2 font-cinema text-lg tracking-widest"
        style={{
          color: '#c9a87c',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '4px',
        }}
      >
        REEL {currentScene + 1} / {totalScenes}
      </div>

      {/* Next arrow */}
      <button
        onClick={onNext}
        disabled={currentScene >= totalScenes - 1}
        className="group transition-all duration-300"
        style={{
          opacity: currentScene >= totalScenes - 1 ? 0.3 : 1,
          cursor: currentScene >= totalScenes - 1 ? 'not-allowed' : 'pointer',
        }}
      >
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full transition-all group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #2a2520 0%, #1a1510 100%)',
            border: '2px solid #8b7355',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          }}
        >
          <span className="text-3xl" style={{ color: '#d4a84b', fontFamily: 'serif' }}>▶</span>
        </div>
      </button>
    </div>
  );
};

// ============================================================================
// "THE END" SCREEN WITH CREDITS ROLL
// ============================================================================

const TheEndScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 12000); // Extended for credits
    return () => clearTimeout(timer);
  }, [onFinish]);

  const credits = [
    { role: "WRITTEN, DIRECTED & PRODUCED BY", name: "Yash Gupta" },
    { role: "STARRING", name: "" },
    { role: "• PHARMALENS", name: "AI Prescription Scanner & Price Comparison" },
    { role: "• FACERECOG", name: "Facial Recognition Attendance System" },
    { role: "• MEDICARE+", name: "Comprehensive Healthcare Platform" },
    { role: "", name: "" },
    { role: "CINEMATOGRAPHY", name: "React • Next.js • Three.js" },
    { role: "VISUAL EFFECTS", name: "Framer Motion • GSAP • CSS3" },
    { role: "AI PRODUCTION", name: "LangChain • Groq • Google Gemini" },
    { role: "BACKEND MAGIC", name: "FastAPI • Flask • Node.js • Express" },
    { role: "CLOUD SERVICES", name: "GCP • Vercel • Railway • Supabase" },
    { role: "", name: "" },
    { role: "SPECIAL THANKS TO", name: "" },
    { role: "• IEM Kolkata", name: "For the education" },
    { role: "• IEEE", name: "For the experience" },
    { role: "• You", name: "For watching" },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-start overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background: 'radial-gradient(ellipse at center, #1a1815 0%, #0a0805 50%, #000 100%)',
      }}
    >
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* "The End" Title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center relative z-10 mt-16 mb-8"
      >
        {/* Spotlight effect */}
        <div
          className="absolute -inset-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,248,220,0.08) 0%, transparent 60%)',
            filter: 'blur(20px)',
          }}
        />

        <h1
          className="font-cinema italic relative"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            color: '#f5f0e5',
            textShadow: '3px 3px 0 #3a3530, 6px 6px 20px rgba(0,0,0,0.8)',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
          }}
        >
          The End
        </h1>
        <motion.div
          className="mt-4 mx-auto"
          style={{
            width: '200px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #8b7355, transparent)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
      </motion.div>

      {/* Scrolling Credits */}
      <div className="flex-1 overflow-hidden relative w-full max-w-xl">
        <motion.div
          className="text-center px-4"
          initial={{ y: '100%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 16, ease: 'linear', delay: 0.2 }}
        >
          {credits.map((credit, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.03 }}
            >
              {credit.role && (
                <p
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: credit.name === "" ? '0.9rem' : '0.7rem',
                    letterSpacing: '0.15em',
                    color: credit.name === "" ? '#c9a87c' : '#8b7355',
                    marginBottom: '4px',
                  }}
                >
                  {credit.role}
                </p>
              )}
              {credit.name && (
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: '#e8e0d5',
                  }}
                >
                  {credit.name}
                </p>
              )}
            </motion.div>
          ))}

          {/* Film Rating */}
          <motion.div
            className="mt-12 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4, duration: 0.5 }}
          >
            <div
              className="px-4 py-2 border-2"
              style={{
                borderColor: '#8b7355',
                background: 'rgba(0,0,0,0.5)',
              }}
            >
              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: '#8b7355',
                }}
              >
                THIS PORTFOLIO HAS BEEN RATED
              </p>
              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#c9a87c',
                  lineHeight: 1,
                }}
              >
                A+
              </p>
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.75rem',
                  fontStyle: 'italic',
                  color: '#a09080',
                }}
              >
                "CGPA 9.74 Excellence"
              </p>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="mt-12"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.7rem',
              color: '#5a5550',
              letterSpacing: '0.1em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5 }}
          >
            © 2025 YASH GUPTA | IEM KOLKATA
          </motion.p>

          <motion.p
            className="mt-2"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.8rem',
              fontStyle: 'italic',
              color: '#6a6560',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5 }}
          >
            Built with ❤️ and lots of ☕
          </motion.p>
        </motion.div>

        {/* Gradient fade at top and bottom */}
        <div
          className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #0a0805 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, #0a0805 0%, transparent 100%)',
          }}
        />
      </div>
    </motion.div>
  );
};

// ============================================================================
// CURTAIN CLOSING - Matches the opening with velvet folds and gold fringe
// ============================================================================

// Closing curtain fold component
const ClosingCurtainFold = ({
  index,
  totalFolds,
  isLeft,
}: {
  index: number;
  totalFolds: number;
  isLeft: boolean;
}) => {
  const foldRef = useRef<HTMLDivElement>(null);

  const foldWidth = 100 / totalFolds;
  const foldPosition = index * foldWidth;
  const zIndex = totalFolds - index;

  useEffect(() => {
    const fold = foldRef.current;
    if (!fold) return;

    // Gentle sway animation when closed
    const swayTimeout = setTimeout(() => {
      const swayAnimation = () => {
        if (fold) {
          fold.style.transform = `translateX(${Math.sin(Date.now() / 1000 + index * 0.6) * 2}px)`;
          requestAnimationFrame(swayAnimation);
        }
      };
      swayAnimation();
    }, 2600);

    return () => clearTimeout(swayTimeout);
  }, [index]);

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
        width: `${foldWidth + 1}%`,
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

      {/* Highlight line */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          width: '2px',
          [isLeft ? 'left' : 'right']: '30%',
          background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)`,
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

// Closing gold fringe component
const ClosingGoldFringe = ({ isLeft }: { isLeft: boolean }) => {
  return (
    <div
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
        {Array.from({ length: 35 }, (_, i) => (
          <div
            key={i}
            className="mx-0.5"
            style={{
              width: '2.5px',
              height: `${6 + Math.random() * 4}px`,
              background: `linear-gradient(180deg, #c9a54d 0%, #8b6528 100%)`,
              borderRadius: '0 0 40% 40%',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CurtainClosing = ({ onComplete }: { onComplete: () => void }) => {
  const numFolds = 7;

  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Dark background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #180a06 0%, #0a0402 60%, #000 100%)',
        }}
      />

      {/* Screen glow behind curtains */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[60%] h-[50%] opacity-[0.025]"
          style={{
            background: 'radial-gradient(ellipse, #fff8e0 0%, transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* LEFT CURTAIN CLOSING */}
      <motion.div
        className="absolute left-0 top-0 w-[55%] h-full overflow-hidden"
        style={{ transformOrigin: 'left center' }}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, hsl(0, 68%, 11%) 0%, hsl(0, 72%, 16%) 100%)' }}
        />

        {Array.from({ length: numFolds }, (_, i) => (
          <ClosingCurtainFold
            key={`left-close-${i}`}
            index={i}
            totalFolds={numFolds}
            isLeft={true}
          />
        ))}

        <ClosingGoldFringe isLeft={true} />
      </motion.div>

      {/* RIGHT CURTAIN CLOSING */}
      <motion.div
        className="absolute right-0 top-0 w-[55%] h-full overflow-hidden"
        style={{ transformOrigin: 'right center' }}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(270deg, hsl(0, 68%, 11%) 0%, hsl(0, 72%, 16%) 100%)' }}
        />

        {Array.from({ length: numFolds }, (_, i) => (
          <ClosingCurtainFold
            key={`right-close-${i}`}
            index={i}
            totalFolds={numFolds}
            isLeft={false}
          />
        ))}

        <ClosingGoldFringe isLeft={false} />
      </motion.div>

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

      {/* Closing message */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontStyle: 'italic',
            color: '#a08060',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          ~ Fin ~
        </p>
      </motion.div>
    </div>
  );
};

// ============================================================================
// MAIN CINEMA PORTFOLIO
// ============================================================================

const CinemaPortfolio = () => {
  const [showCurtains, setShowCurtains] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [showTheEnd, setShowTheEnd] = useState(false);
  const [classicMode, setClassicMode] = useState(false);
  const [commentaryMode, setCommentaryMode] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next');
  const [pendingScene, setPendingScene] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [introShown, setIntroShown] = useState(false); // Track if intro was already shown
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Mouse position for parallax and spotlight effects
  const mousePosition = useMousePosition();

  // Easter egg: Konami code activates Classic Hollywood mode
  useKonamiCode(() => {
    setClassicMode(prev => !prev);
    // Play a special sound
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 440;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
      setTimeout(() => ctx.close(), 600);
    } catch (e) { }
  });

  // Play reel change sound effect
  const playReelChangeSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Film reel stopping/starting sound
      const now = audioContext.currentTime;

      // Scratch/woosh sound
      const bufferSize = audioContext.sampleRate * 0.4;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        // Descending noise burst
        data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 8) * (1 - t);
      }

      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = buffer;

      const filter = audioContext.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 600;
      filter.Q.value = 1;

      const gain = audioContext.createGain();
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);

      noiseSource.start(now);

      // Click sound
      const clickOsc = audioContext.createOscillator();
      const clickGain = audioContext.createGain();

      clickOsc.frequency.value = 150;
      clickOsc.type = 'square';

      clickGain.gain.setValueAtTime(0.1, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      clickOsc.connect(clickGain);
      clickGain.connect(audioContext.destination);

      clickOsc.start(now);
      clickOsc.stop(now + 0.08);

      // Cleanup
      setTimeout(() => audioContext.close(), 500);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, []);

  // Play film projector running sound
  useEffect(() => {
    // Don't play during curtains, closing, or The End, or if sound is disabled
    if (!showCurtains && !isClosing && !showTheEnd && soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        let isPlaying = true;

        // ==========================================
        // PROJECTOR CLICKING - Gentle rhythmic sound
        // ==========================================

        const createClick = () => {
          if (!isPlaying || audioContext.state === 'closed') return;

          try {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(audioContext.destination);

            // Soft click characteristics
            osc.frequency.value = 120 + Math.random() * 40;
            osc.type = 'sine';

            filter.type = 'lowpass';
            filter.frequency.value = 300;

            const now = audioContext.currentTime;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.12, now + 0.003);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

            osc.start(now);
            osc.stop(now + 0.025);
          } catch (e) {
            // Ignore errors if context is closed
          }
        };

        // Click at 18fps (slightly slower, more pleasant)
        const clickInterval = setInterval(createClick, 1000 / 18);

        // ==========================================
        // MOTOR HUM - Low frequency ambient
        // ==========================================

        const motorOsc = audioContext.createOscillator();
        const motorGain = audioContext.createGain();
        const motorFilter = audioContext.createBiquadFilter();

        motorOsc.frequency.value = 60; // 60Hz hum
        motorOsc.type = 'sine';

        motorFilter.type = 'lowpass';
        motorFilter.frequency.value = 100;

        motorGain.gain.value = 0.04; // Louder

        motorOsc.connect(motorFilter);
        motorFilter.connect(motorGain);
        motorGain.connect(audioContext.destination);

        motorOsc.start();

        return () => {
          isPlaying = false;
          clearInterval(clickInterval);
          try {
            motorOsc.stop();
            audioContext.close();
          } catch (e) {
            // Ignore if already closed
          }
        };
      } catch (e) {
        console.log('Audio not supported');
      }
    }
  }, [showCurtains, isClosing, showTheEnd, soundEnabled]);

  const handlePrev = useCallback(() => {
    if (currentScene > 0) {
      playReelChangeSound();
      setCurrentScene(prev => prev - 1);
    }
  }, [currentScene, playReelChangeSound]);

  const handleNext = useCallback(() => {
    if (currentScene < scenes.length - 1) {
      playReelChangeSound();
      // If going to "The End"
      if (currentScene === scenes.length - 2) {
        setShowTheEnd(true);
      } else {
        setCurrentScene(prev => prev + 1);
      }
    }
  }, [currentScene, playReelChangeSound]);

  const handleTheEndFinish = useCallback(() => {
    setShowTheEnd(false);
    setIsClosing(true);
  }, []);

  const handleClosingComplete = useCallback(() => {
    // Reset to beginning
    setIsClosing(false);
    setShowCurtains(true);
    setCurrentScene(0);
  }, []);

  const renderScene = () => {
    if (showTheEnd) {
      return <TheEndScreen key="theend" onFinish={handleTheEndFinish} />;
    }

    switch (currentScene) {
      case 0: return <AboutScene key="about" showIntro={!introShown} onIntroComplete={() => setIntroShown(true)} />;
      case 1: return <EducationScene key="education" />;
      case 2: return <AchievementsScene key="achievements" />;
      case 3: return <CertificationsScene key="certifications" />;
      case 4: return <ProjectsScene key="projects" />;
      case 5: return <SkillsScene key="skills" />;
      case 6: return <ContactScene key="contact" />;
      default: return <AboutScene key="about" showIntro={false} />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Curtain Opening */}
      {showCurtains && <CurtainOpening onComplete={() => setShowCurtains(false)} />}

      {/* Curtain Closing */}
      {isClosing && <CurtainClosing onComplete={handleClosingComplete} />}

      {/* Main Cinema Experience */}
      {!showCurtains && !isClosing && (
        <>
          {/* Retro Theater Background - Rich vintage atmosphere */}
          <div className="absolute inset-0">
            {/* Base theater color with warmer vintage tones */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center 40%, #2a1a10 0%, #150a06 50%, #080404 100%)',
              }}
            />

            {/* Aged brick/plaster wall texture */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(139, 101, 40, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(139, 101, 40, 0.2) 0%, transparent 50%),
                  url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")
                `,
              }}
            />

            {/* Art Deco wallpaper pattern overlay - enhanced */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, #c9a54d 0px, #c9a54d 1px, transparent 1px, transparent 12px),
                  repeating-linear-gradient(-45deg, #c9a54d 0px, #c9a54d 1px, transparent 1px, transparent 12px),
                  repeating-linear-gradient(90deg, transparent 0px, transparent 30px, rgba(139, 101, 40, 0.1) 30px, rgba(139, 101, 40, 0.1) 32px)
                `,
              }}
            />

            {/* Vintage film projector light cone from left */}
            <div
              className="absolute"
              style={{
                left: '8%',
                top: '10%',
                width: '80%',
                height: '80%',
                background: 'conic-gradient(from 0deg at 0% 30%, transparent 0deg, rgba(255,230,180,0.03) 15deg, rgba(255,230,180,0.06) 25deg, rgba(255,230,180,0.03) 35deg, transparent 50deg)',
                filter: 'blur(20px)',
              }}
            />

            {/* Wood panel wall texture - Left with ornate detailing */}
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{
                width: '15%',
                background: `
                  linear-gradient(90deg, #1a1008 0%, #2a1a12 40%, #1a1008 100%),
                  repeating-linear-gradient(0deg, transparent 0px, transparent 80px, rgba(0,0,0,0.3) 80px, rgba(0,0,0,0.3) 82px)
                `,
                boxShadow: 'inset -10px 0 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Art deco gold trim with enhanced detail */}
              <div
                className="absolute right-0 top-0 bottom-0"
                style={{
                  width: '10px',
                  background: 'linear-gradient(180deg, #c9a54d 0%, #8b6528 20%, #6a4a1a 50%, #8b6528 80%, #c9a54d 100%)',
                  boxShadow: '0 0 20px rgba(201, 165, 77, 0.4), inset -2px 0 4px rgba(0,0,0,0.3)',
                }}
              />
              {/* Inner decorative molding */}
              <div
                className="absolute right-3 top-[10%] bottom-[10%]"
                style={{
                  width: '2px',
                  background: 'linear-gradient(180deg, transparent, #4a3a28 20%, #4a3a28 80%, transparent)',
                }}
              />
            </div>

            {/* Wood panel wall texture - Right with ornate detailing */}
            <div
              className="absolute right-0 top-0 bottom-0"
              style={{
                width: '5%',
                background: `
                  linear-gradient(270deg, #1a1008 0%, #2a1a12 40%, #1a1008 100%),
                  repeating-linear-gradient(0deg, transparent 0px, transparent 80px, rgba(0,0,0,0.3) 80px, rgba(0,0,0,0.3) 82px)
                `,
                boxShadow: 'inset 10px 0 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Art deco gold trim */}
              <div
                className="absolute left-0 top-0 bottom-0"
                style={{
                  width: '10px',
                  background: 'linear-gradient(180deg, #c9a54d 0%, #8b6528 20%, #6a4a1a 50%, #8b6528 80%, #c9a54d 100%)',
                  boxShadow: '0 0 20px rgba(201, 165, 77, 0.4), inset 2px 0 4px rgba(0,0,0,0.3)',
                }}
              />
            </div>

            {/* Ornate ceiling with decorative molding */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '8%',
                background: 'linear-gradient(180deg, #0a0604 0%, #1a1008 70%, #2a1a12 100%)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.9)',
              }}
            >
              {/* Crown molding with art deco pattern */}
              <div
                className="absolute bottom-0 left-0 right-0 h-4"
                style={{
                  background: 'linear-gradient(180deg, #4a3a28 0%, #3a2a18 50%, #2a1a10 100%)',
                  borderBottom: '2px solid #c9a54d',
                  boxShadow: '0 2px 10px rgba(201, 165, 77, 0.2)',
                }}
              />
              {/* Decorative ceiling rosettes */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-8">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #c9a54d 0%, #8b6528 100%)',
                      boxShadow: '0 0 10px rgba(201, 165, 77, 0.5)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floor - Rich theater carpet with pattern */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '18%',
                background: `
                  linear-gradient(0deg, #0a0504 0%, #180808 40%, #200a0a 100%),
                  repeating-linear-gradient(45deg, transparent 0px, transparent 8px, rgba(120,20,20,0.08) 8px, rgba(120,20,20,0.08) 16px),
                  repeating-linear-gradient(-45deg, transparent 0px, transparent 8px, rgba(100,20,20,0.06) 8px, rgba(100,20,20,0.06) 16px)
                `,
                boxShadow: 'inset 0 15px 50px rgba(0,0,0,0.8)',
              }}
            >
              {/* Carpet runner stripe */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-full"
                style={{
                  width: '60%',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(139,0,0,0.1) 10%, rgba(139,0,0,0.15) 50%, rgba(139,0,0,0.1) 90%, transparent 100%)',
                }}
              />
              {/* Gold carpet border trim */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(90deg, transparent 10%, #8b6528 20%, #c9a54d 50%, #8b6528 80%, transparent 90%)',
                }}
              />
            </div>

            {/* Velvet drapes on sides - Left */}
            <div
              className="absolute left-[12%] top-[5%] bottom-[12%]"
              style={{
                width: '3%',
                background: 'linear-gradient(90deg, hsl(0, 65%, 12%) 0%, hsl(0, 70%, 18%) 50%, hsl(0, 65%, 14%) 100%)',
                borderRadius: '0 8px 8px 0',
                boxShadow: '5px 0 20px rgba(0,0,0,0.5), inset -5px 0 10px rgba(0,0,0,0.3)',
              }}
            />

            {/* Velvet drapes on sides - Right */}
            <div
              className="absolute right-[3%] top-[5%] bottom-[12%]"
              style={{
                width: '3%',
                background: 'linear-gradient(270deg, hsl(0, 65%, 12%) 0%, hsl(0, 70%, 18%) 50%, hsl(0, 65%, 14%) 100%)',
                borderRadius: '8px 0 0 8px',
                boxShadow: '-5px 0 20px rgba(0,0,0,0.5), inset 5px 0 10px rgba(0,0,0,0.3)',
              }}
            />

            {/* Ambient wall sconces glow - Left */}
            <div
              className="absolute"
              style={{
                left: '8%',
                top: '30%',
                width: '60px',
                height: '100px',
                background: 'radial-gradient(ellipse at center, rgba(255, 200, 100, 0.15) 0%, transparent 70%)',
                filter: 'blur(15px)',
              }}
            />
            <div
              className="absolute"
              style={{
                left: '8%',
                top: '60%',
                width: '60px',
                height: '100px',
                background: 'radial-gradient(ellipse at center, rgba(255, 200, 100, 0.15) 0%, transparent 70%)',
                filter: 'blur(15px)',
              }}
            />

            {/* Screen frame/border - Ornate Art deco cinema frame */}
            <div
              className="absolute z-5"
              style={{
                left: '16%',
                right: '6%',
                top: '5%',
                bottom: '15%',
              }}
            >
              {/* Outer ornate frame */}
              <div
                className="absolute inset-[-8px]"
                style={{
                  background: 'linear-gradient(180deg, #3a2a18 0%, #2a1a10 50%, #1a0c06 100%)',
                  borderRadius: '12px',
                  boxShadow: '0 15px 60px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.5)',
                }}
              />

              {/* Gold trim outer */}
              <div
                className="absolute inset-[-4px]"
                style={{
                  background: 'linear-gradient(180deg, #c9a54d 0%, #8b6528 30%, #5a3a15 50%, #8b6528 70%, #c9a54d 100%)',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px rgba(201, 165, 77, 0.3)',
                }}
              />

              {/* Inner dark frame */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, #2a1a10 0%, #1a0c06 100%)',
                  borderRadius: '6px',
                  border: '3px solid #4a3620',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)',
                }}
              />

              {/* Corner decorations - Art deco style */}
              {/* Top left */}
              <div className="absolute -top-3 -left-3 w-8 h-8" style={{
                background: 'radial-gradient(circle, #c9a54d 30%, #8b6528 70%)',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(201, 165, 77, 0.5)',
              }} />
              {/* Top right */}
              <div className="absolute -top-3 -right-3 w-8 h-8" style={{
                background: 'radial-gradient(circle, #c9a54d 30%, #8b6528 70%)',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(201, 165, 77, 0.5)',
              }} />
              {/* Bottom left */}
              <div className="absolute -bottom-3 -left-3 w-8 h-8" style={{
                background: 'radial-gradient(circle, #c9a54d 30%, #8b6528 70%)',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(201, 165, 77, 0.5)',
              }} />
              {/* Bottom right */}
              <div className="absolute -bottom-3 -right-3 w-8 h-8" style={{
                background: 'radial-gradient(circle, #c9a54d 30%, #8b6528 70%)',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(201, 165, 77, 0.5)',
              }} />

              {/* Top mount bracket - makes screen look wall-mounted */}
              <div className="absolute -top-6 left-1/4 w-20 h-4" style={{
                background: 'linear-gradient(180deg, #3a2814 0%, #2a1a10 100%)',
                borderRadius: '4px 4px 0 0',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.6)',
              }} />
              <div className="absolute -top-6 right-1/4 w-20 h-4" style={{
                background: 'linear-gradient(180deg, #3a2814 0%, #2a1a10 100%)',
                borderRadius: '4px 4px 0 0',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.6)',
              }} />

              {/* Bottom mounting base - gives weight and stability */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-3" style={{
                background: 'linear-gradient(180deg, #3a2814 0%, #1a0c06 100%)',
                borderRadius: '0 0 8px 8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
              }} />
            </div>
          </div>

          {/* 3D Projector on left */}
          <Projector3D />

          {/* Screen with content */}
          <div
            className="fixed z-10 overflow-hidden"
            style={{
              left: '18%',
              right: '8%',
              top: '8%',
              bottom: '18%',
              background: 'linear-gradient(175deg, hsl(45, 30%, 90%) 0%, hsl(40, 25%, 85%) 50%, hsl(38, 20%, 82%) 100%)',
              boxShadow: 'inset 0 0 100px hsla(30, 30%, 40%, 0.2), 0 0 80px 20px hsla(40, 50%, 60%, 0.1)',
              borderRadius: '4px',
            }}
          >
            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene + (showTheEnd ? 'end' : '')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                {renderScene()}
              </motion.div>
            </AnimatePresence>

            {/* Dusty aged edges overlay - brownish staining with clean center */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Radial sepia vignette - clean center, dusty edges */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, 
                    transparent 40%, 
                    rgba(120, 100, 75, 0.08) 55%, 
                    rgba(100, 80, 60, 0.18) 70%, 
                    rgba(90, 70, 50, 0.3) 85%, 
                    rgba(70, 55, 40, 0.45) 100%
                  )`,
                }}
              />

              {/* Top edge dust/aging */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: '15%',
                  background: 'linear-gradient(180deg, rgba(100, 85, 60, 0.4) 0%, rgba(90, 75, 55, 0.2) 50%, transparent 100%)',
                }}
              />

              {/* Bottom edge dust/aging */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: '15%',
                  background: 'linear-gradient(0deg, rgba(100, 85, 60, 0.4) 0%, rgba(90, 75, 55, 0.2) 50%, transparent 100%)',
                }}
              />

              {/* Left edge dust/aging */}
              <div
                className="absolute top-0 bottom-0 left-0"
                style={{
                  width: '12%',
                  background: 'linear-gradient(90deg, rgba(100, 85, 60, 0.45) 0%, rgba(90, 75, 55, 0.2) 50%, transparent 100%)',
                }}
              />

              {/* Right edge dust/aging */}
              <div
                className="absolute top-0 bottom-0 right-0"
                style={{
                  width: '12%',
                  background: 'linear-gradient(270deg, rgba(100, 85, 60, 0.45) 0%, rgba(90, 75, 55, 0.2) 50%, transparent 100%)',
                }}
              />

              {/* Corner spots - extra aged look */}
              <div
                className="absolute top-0 left-0"
                style={{
                  width: '20%',
                  height: '20%',
                  background: 'radial-gradient(ellipse at 0% 0%, rgba(80, 65, 45, 0.5) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute top-0 right-0"
                style={{
                  width: '20%',
                  height: '20%',
                  background: 'radial-gradient(ellipse at 100% 0%, rgba(80, 65, 45, 0.5) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute bottom-0 left-0"
                style={{
                  width: '20%',
                  height: '20%',
                  background: 'radial-gradient(ellipse at 0% 100%, rgba(80, 65, 45, 0.5) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute bottom-0 right-0"
                style={{
                  width: '20%',
                  height: '20%',
                  background: 'radial-gradient(ellipse at 100% 100%, rgba(80, 65, 45, 0.5) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* Retro film overlay */}
            <RetroFilmOverlay />
          </div>

          {/* Parallax 3D Theater Environment */}
          <ParallaxTheater mousePosition={mousePosition} />

          {/* Motion-tracked spotlight */}
          <MotionSpotlight mousePosition={mousePosition} />

          {/* Floating dust particles */}
          <ProjectorDustParticles />

          {/* Director's Commentary */}
          <AnimatePresence>
            {commentaryMode && !showTheEnd && (
              <DirectorCommentary scene={currentScene} isActive={commentaryMode} />
            )}
          </AnimatePresence>

          {/* Arrow navigation */}
          {!showTheEnd && (
            <ArrowNavigation
              onPrev={handlePrev}
              onNext={handleNext}
              currentScene={currentScene}
              totalScenes={scenes.length}
            />
          )}

          {/* Feature control buttons */}
          {!showTheEnd && (
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-50">
              {/* Commentary toggle */}
              <motion.button
                onClick={() => setCommentaryMode(prev => !prev)}
                className="px-3 py-2"
                style={{
                  background: commentaryMode
                    ? 'linear-gradient(180deg, #c9a54d 0%, #8b6528 100%)'
                    : 'rgba(0,0,0,0.6)',
                  border: '1px solid #8b7355',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.7rem',
                  color: commentaryMode ? '#1a1510' : '#c9a87c',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎬 {commentaryMode ? 'Commentary ON' : 'Commentary'}
              </motion.button>

              {/* Ticket generator */}
              <motion.button
                onClick={() => setTicketOpen(true)}
                className="px-3 py-2"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid #8b7355',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.7rem',
                  color: '#c9a87c',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎫 Get Ticket
              </motion.button>

              {/* Sound toggle */}
              <motion.button
                onClick={() => setSoundEnabled(prev => !prev)}
                className="px-3 py-2"
                style={{
                  background: soundEnabled
                    ? 'linear-gradient(180deg, #22c55e 0%, #16a34a 100%)'
                    : 'rgba(0,0,0,0.6)',
                  border: '1px solid #8b7355',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.7rem',
                  color: soundEnabled ? '#fff' : '#c9a87c',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
              </motion.button>
            </div>
          )}
        </>
      )}

      {/* Ticket Generator Modal */}
      <AnimatePresence>
        {ticketOpen && (
          <TicketGenerator isOpen={ticketOpen} onClose={() => setTicketOpen(false)} />
        )}
      </AnimatePresence>

      {/* Easter egg: Classic Hollywood mode overlay */}
      <AnimatePresence>
        {classicMode && <ClassicHollywoodOverlay isActive={classicMode} />}
      </AnimatePresence>
    </div>
  );
};

export default CinemaPortfolio;
