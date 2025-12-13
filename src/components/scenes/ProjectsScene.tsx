import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
}

const projects: Project[] = [
  { id: 1, title: "MIDNIGHT NOIR", subtitle: "E-Commerce Platform", year: "1924", tags: ["React", "Node.js"] },
  { id: 2, title: "SILVER SCREEN", subtitle: "Media Streaming", year: "1923", tags: ["Vue.js", "Python"] },
  { id: 3, title: "GOLDEN AGE", subtitle: "Finance Dashboard", year: "1923", tags: ["TypeScript", "D3.js"] },
  { id: 4, title: "CRIMSON TALE", subtitle: "Storytelling App", year: "1922", tags: ["Next.js", "WebGL"] },
];

const ProjectsScene = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <motion.div
      className="w-full h-full p-6 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-film italic text-sm tracking-[0.3em] mb-3" style={{ color: 'hsl(35, 25%, 35%)' }}>
            ~ Scene II ~
          </p>
          <h1 className="font-cinema text-4xl md:text-5xl mb-4 tracking-wide" style={{ color: 'hsl(25, 20%, 15%)' }}>
            THE FILMOGRAPHY
          </h1>
          <p className="font-film italic text-base" style={{ color: 'hsl(30, 15%, 40%)' }}>
            A collection of digital masterpieces
          </p>
        </motion.div>

        {/* Film strip layout */}
        <div className="relative py-4">
          {/* Sprocket holes top */}
          <div className="flex justify-around mb-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-3 h-4 rounded-sm" style={{ background: 'hsl(25, 15%, 20%)' }} />
            ))}
          </div>

          {/* Project cards as film frames */}
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div 
                  className="p-4 transition-all duration-300"
                  style={{
                    background: hoveredId === project.id 
                      ? 'hsla(35, 30%, 85%, 0.9)' 
                      : 'hsla(35, 25%, 88%, 0.7)',
                    border: `2px solid ${hoveredId === project.id ? 'hsl(35, 40%, 50%)' : 'hsl(35, 25%, 70%)'}`,
                    boxShadow: hoveredId === project.id 
                      ? '0 4px 20px hsla(25, 20%, 20%, 0.3)' 
                      : '0 2px 10px hsla(25, 20%, 20%, 0.15)',
                  }}
                >
                  {/* Year badge */}
                  <div 
                    className="absolute -top-2 right-3 px-2 py-0.5 font-cinema text-xs"
                    style={{
                      background: 'hsl(35, 35%, 45%)',
                      color: 'hsl(40, 30%, 95%)',
                    }}
                  >
                    {project.year}
                  </div>

                  <h3 className="font-cinema text-lg mb-1" style={{ color: 'hsl(25, 20%, 18%)' }}>
                    {project.title}
                  </h3>
                  <p className="font-film italic text-sm mb-3" style={{ color: 'hsl(30, 15%, 40%)' }}>
                    {project.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 font-film text-xs"
                        style={{
                          border: '1px solid hsl(35, 20%, 60%)',
                          color: 'hsl(30, 15%, 35%)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Frame number */}
                  <div className="absolute bottom-1 right-2 font-cinema text-[10px]" style={{ color: 'hsl(30, 15%, 55%)' }}>
                    FRM-{String(index + 1).padStart(3, '0')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sprocket holes bottom */}
          <div className="flex justify-around mt-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-3 h-4 rounded-sm" style={{ background: 'hsl(25, 15%, 20%)' }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsScene;
