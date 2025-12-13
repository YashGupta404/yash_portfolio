import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "MIDNIGHT NOIR",
    subtitle: "E-Commerce Platform",
    description: "A sophisticated online shopping experience with real-time inventory and seamless checkout.",
    year: "2024",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: 2,
    title: "SILVER SCREEN",
    subtitle: "Media Streaming App",
    description: "A cinematic streaming platform with personalized recommendations and social features.",
    year: "2023",
    tags: ["Vue.js", "Python", "AWS"],
  },
  {
    id: 3,
    title: "GOLDEN AGE",
    subtitle: "Finance Dashboard",
    description: "An elegant financial tracking dashboard with real-time analytics and beautiful visualizations.",
    year: "2023",
    tags: ["TypeScript", "D3.js", "Supabase"],
  },
  {
    id: 4,
    title: "CRIMSON TALE",
    subtitle: "Storytelling Platform",
    description: "An immersive platform for interactive storytelling with branching narratives.",
    year: "2022",
    tags: ["Next.js", "MongoDB", "WebGL"],
  },
];

const ProjectsScene = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <motion.div
      className="min-h-screen px-8 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Scene title */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="font-film text-muted-foreground text-lg italic mb-4">Scene II</p>
          <h1 className="font-cinema text-5xl md:text-7xl text-theater-gold text-shadow-gold tracking-wide mb-4">
            THE FILMOGRAPHY
          </h1>
          <p className="font-film text-xl text-muted-foreground italic">A collection of digital masterpieces</p>
          <div className="w-32 h-0.5 bg-theater-gold mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Projects as film strip */}
        <div className="relative">
          {/* Film strip holes - top */}
          <div className="flex justify-around mb-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`top-${i}`}
                className="w-4 h-6 rounded-sm"
                style={{
                  background: 'hsl(0, 0%, 8%)',
                  border: '1px solid hsl(40, 20%, 20%)',
                }}
              />
            ))}
          </div>

          {/* Project cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div 
                  className="relative p-6 rounded transition-all duration-300 cursor-pointer"
                  style={{
                    background: hoveredProject === project.id 
                      ? 'linear-gradient(135deg, hsl(0, 0%, 12%) 0%, hsl(0, 0%, 8%) 100%)'
                      : 'linear-gradient(135deg, hsl(0, 0%, 10%) 0%, hsl(0, 0%, 6%) 100%)',
                    border: '2px solid',
                    borderColor: hoveredProject === project.id 
                      ? 'hsl(45, 60%, 40%)'
                      : 'hsl(40, 20%, 20%)',
                    boxShadow: hoveredProject === project.id 
                      ? '0 10px 40px rgba(0,0,0,0.5), 0 0 30px hsl(45, 80%, 50% / 0.1)'
                      : '0 5px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Year badge */}
                  <div 
                    className="absolute -top-3 right-6 px-3 py-1 font-cinema text-sm"
                    style={{
                      background: 'linear-gradient(180deg, hsl(45, 70%, 45%) 0%, hsl(40, 60%, 35%) 100%)',
                      color: 'hsl(0, 0%, 5%)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  >
                    {project.year}
                  </div>

                  {/* Project content */}
                  <div className="relative z-10">
                    <h3 className="font-cinema text-2xl text-theater-gold mb-1 tracking-wide">
                      {project.title}
                    </h3>
                    <p className="font-film text-lg text-film-cream italic mb-4">
                      {project.subtitle}
                    </p>
                    <p className="font-film text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 font-film text-sm text-film-sepia rounded-sm"
                          style={{
                            background: 'hsl(0, 0%, 15%)',
                            border: '1px solid hsl(40, 20%, 25%)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Film frame number */}
                  <div className="absolute bottom-2 right-3 font-cinema text-xs text-muted-foreground/50">
                    FRM-{String(index + 1).padStart(3, '0')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Film strip holes - bottom */}
          <div className="flex justify-around mt-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`bottom-${i}`}
                className="w-4 h-6 rounded-sm"
                style={{
                  background: 'hsl(0, 0%, 8%)',
                  border: '1px solid hsl(40, 20%, 20%)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsScene;
