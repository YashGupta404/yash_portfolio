import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  genre: string;
  rating: string;
  tags: string[];
  director: string;
  liveUrl: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "PharmaLens",
    subtitle: "AI-Powered Prescription Scanner & Price Comparison",
    year: "2025",
    genre: "AI • HEALTHCARE",
    rating: "★★★★★",
    tags: ["React", "FastAPI", "LangChain", "Groq", "Google Vision"],
    director: "Yash Gupta",
    liveUrl: "https://pharma-lens-yash.vercel.app",
    githubUrl: "https://github.com/YashGupta404/PharmaLens"
  },
  {
    id: 2,
    title: "FaceRecog",
    subtitle: "Facial Recognition Attendance System",
    year: "2025",
    genre: "AI • COMPUTER VISION",
    rating: "★★★★★",
    tags: ["React", "FastAPI", "face-api.js", "Supabase"],
    director: "Yash Gupta",
    liveUrl: "https://facial-recognition-project-six.vercel.app",
    githubUrl: "https://github.com/YashGupta404/Facial_Recognition_Project"
  },
  {
    id: 3,
    title: "Medicare+",
    subtitle: "Comprehensive Healthcare Platform",
    year: "2025",
    genre: "HEALTHCARE • AI",
    rating: "★★★★★",
    tags: ["React", "Flask", "Gemini AI", "Scikit-Learn", "GCP"],
    director: "Yash Gupta",
    liveUrl: "https://pharma-synergy-suite.vercel.app",
    githubUrl: "https://github.com/YashGupta404/pharma-synergy-suite"
  },
  {
    id: 4,
    title: "MBA Portal",
    subtitle: "Comprehensive MBA Program Management Portal",
    year: "2025",
    genre: "EDUCATION • WEB",
    rating: "★★★★★",
    tags: ["Next.js", "MongoDB", "TypeScript", "Tailwind"],
    director: "Yash Gupta",
    liveUrl: "https://mba-portal-yashh-mtmd.vercel.app",
    githubUrl: "https://github.com/IEMRF/MBA_Portal"
  },
];

// Movie Poster Card Component
const MoviePoster = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Different poster color schemes
  const colorSchemes = [
    { bg: 'linear-gradient(180deg, #0a1a2a 0%, #153d5d 50%, #081a2a 100%)', accent: '#5dc9f0' },
    { bg: 'linear-gradient(180deg, #1a0a2a 0%, #3d155d 50%, #1a082a 100%)', accent: '#c95df0' },
    { bg: 'linear-gradient(180deg, #0a2a1a 0%, #155d3d 50%, #082a1a 100%)', accent: '#5df0c9' },
  ];

  const scheme = colorSchemes[index % colorSchemes.length];

  const handleClick = () => {
    window.open(project.liveUrl, '_blank');
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: 0.4 + index * 0.25, duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, y: -5 }}
      onClick={handleClick}
      style={{ perspective: '1000px' }}
    >
      {/* Poster Container */}
      <div
        className="relative overflow-hidden"
        style={{
          background: scheme.bg,
          border: `3px solid ${scheme.accent}`,
          boxShadow: isHovered
            ? `0 20px 50px rgba(0,0,0,0.7), 0 0 30px ${scheme.accent}40, inset 0 0 60px rgba(0,0,0,0.5)`
            : '0 10px 30px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.4)',
          minHeight: '380px',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Worn paper texture - reduced intensity */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* "LIVE" Badge */}
        <motion.div
          className="absolute -top-1 -right-1 z-10"
          initial={{ rotate: 0 }}
          animate={{ rotate: isHovered ? 5 : 0 }}
        >
          <div
            className="px-3 py-1 text-center"
            style={{
              background: '#22c55e',
              color: '#000',
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.55rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            🔴 LIVE
          </div>
        </motion.div>

        {/* Top decorative border */}
        <div
          className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center"
          style={{
            background: `linear-gradient(180deg, ${scheme.accent}30 0%, transparent 100%)`,
            borderBottom: `1px solid ${scheme.accent}40`,
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: scheme.accent, fontSize: '0.6rem' }}>★</span>
            <span style={{
              color: scheme.accent,
              fontSize: '0.55rem',
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '0.2em'
            }}>
              {project.genre}
            </span>
            <span style={{ color: scheme.accent, fontSize: '0.6rem' }}>★</span>
          </div>
        </div>

        {/* Main Title Area */}
        <div className="px-4 pt-12 pb-4 text-center">
          {/* Year */}
          <div
            className="mb-2"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.75rem',
              color: scheme.accent,
              letterSpacing: '0.3em',
            }}
          >
            — {project.year} —
          </div>

          {/* Main Title */}
          <h3
            className="mb-2"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#fff',
              textShadow: `0 0 20px ${scheme.accent}60, 2px 2px 4px rgba(0,0,0,0.8)`,
              letterSpacing: '0.1em',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 my-3">
            <div className="w-8 h-px" style={{ background: scheme.accent }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: scheme.accent }} />
            <div className="w-8 h-px" style={{ background: scheme.accent }} />
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.4,
            }}
          >
            "{project.subtitle}"
          </p>

          {/* Rating */}
          <div
            className="mt-3"
            style={{
              color: scheme.accent,
              fontSize: '0.9rem',
              letterSpacing: '2px'
            }}
          >
            {project.rating}
          </div>
        </div>

        {/* Marquee light effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: `radial-gradient(ellipse at center, ${scheme.accent}15 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Tech stack / Tags */}
        <div className="px-4 pb-3">
          <div className="flex flex-wrap justify-center gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.65rem',
                  color: scheme.accent,
                  border: `1px solid ${scheme.accent}60`,
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Credits Section */}
        <div
          className="px-4 py-3 mt-2"
          style={{
            background: 'rgba(0,0,0,0.3)',
            borderTop: `1px solid ${scheme.accent}30`,
          }}
        >
          {/* Credits text */}
          <div className="text-center">
            <p
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.15em',
              }}
            >
              A PRODUCTION BY
            </p>
            <p
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: '0.1em',
              }}
            >
              {project.director}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-2 mt-3 relative z-10">
            <span
              className="px-3 py-1 text-xs cursor-pointer"
              style={{
                background: scheme.accent,
                color: '#000',
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(project.liveUrl, '_blank');
              }}
            >
              VIEW LIVE →
            </span>
            {project.githubUrl && (
              <span
                className="px-3 py-1 text-xs cursor-pointer"
                style={{
                  border: `1px solid ${scheme.accent}`,
                  color: scheme.accent,
                  fontFamily: '"Playfair Display", serif',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open(project.githubUrl, '_blank');
                }}
              >
                GITHUB
              </span>
            )}
          </div>

          {/* Film strip decoration at bottom */}
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-2 rounded-sm"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Worn edges effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
          }}
        />
      </div>
    </motion.div>
  );
};

const ProjectsScene = () => {
  return (
    <motion.div
      className="w-full h-full p-6 overflow-auto relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'radial-gradient(ellipse at center, hsl(42, 30%, 88%) 0%, hsl(38, 25%, 82%) 100%)',
      }}
    >
      {/* Subtle film jitter effect */}
      <motion.div
        className="max-w-5xl mx-auto"
        animate={{
          x: [0, -0.2, 0.2, -0.2, 0],
          y: [0, 0.2, -0.2, 0, 0.2],
        }}
        transition={{ duration: 0.35, repeat: Infinity, repeatType: "mirror" }}
      >
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Decorative header */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
            <span style={{ color: 'hsl(30, 20%, 40%)', fontSize: '0.9rem', fontFamily: '"Playfair Display", serif', letterSpacing: '0.2em' }}>✦ ACT V ✦</span>
            <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
          </div>

          <h1
            className="mb-2"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'hsl(25, 25%, 15%)',
              textShadow: '2px 2px 0 hsl(35, 20%, 70%)',
              letterSpacing: '0.1em',
            }}
          >
            The Filmography
          </h1>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: 'hsl(30, 15%, 30%)',
            }}
          >
            Click a poster to view the live production
          </p>
        </motion.div>

        {/* Movie Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {projects.map((project, index) => (
            <MoviePoster key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Theater Marquee style footer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div
            className="inline-block px-6 py-2"
            style={{
              background: 'hsl(30, 25%, 25%)',
              border: '2px solid hsl(45, 60%, 50%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 hsl(45, 60%, 60%)',
            }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                color: 'hsl(45, 60%, 70%)',
              }}
            >
              ★ ALL PRODUCTIONS DEPLOYED & LIVE ★
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsScene;
