import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Three.js / WebGL", level: 85, category: "Frontend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Python", level: 82, category: "Backend" },
  { name: "PostgreSQL", level: 85, category: "Backend" },
  { name: "AWS / Cloud", level: 80, category: "DevOps" },
  { name: "Docker", level: 78, category: "DevOps" },
];

const SkillsScene = () => {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <motion.div
      className="min-h-screen px-8 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Scene title */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="font-film text-muted-foreground text-lg italic mb-4">Scene III</p>
          <h1 className="font-cinema text-5xl md:text-7xl text-theater-gold text-shadow-gold tracking-wide mb-4">
            THE CRAFT
          </h1>
          <p className="font-film text-xl text-muted-foreground italic">Tools of the trade, mastered through time</p>
          <div className="w-32 h-0.5 bg-theater-gold mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Skills by category */}
        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + catIndex * 0.15, duration: 0.5 }}
            >
              <h2 className="font-cinema text-2xl text-film-cream mb-6 tracking-wide">
                {category}
              </h2>

              <div className="space-y-4">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + catIndex * 0.15 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-film text-lg text-film-sepia group-hover:text-theater-gold transition-colors">
                          {skill.name}
                        </span>
                        <span className="font-cinema text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress bar as film reel */}
                      <div 
                        className="relative h-4 rounded-sm overflow-hidden"
                        style={{
                          background: 'hsl(0, 0%, 10%)',
                          border: '1px solid hsl(40, 20%, 20%)',
                        }}
                      >
                        <motion.div
                          className="h-full rounded-sm"
                          style={{
                            background: 'linear-gradient(90deg, hsl(40, 60%, 35%) 0%, hsl(45, 80%, 50%) 100%)',
                            boxShadow: 'inset 0 1px 0 hsl(45, 90%, 70% / 0.3)',
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.6 + catIndex * 0.15 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                        />

                        {/* Film reel texture on progress */}
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 20px, hsl(0, 0%, 0% / 0.1) 20px, hsl(0, 0%, 0% / 0.1) 22px)',
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional expertise as movie credits */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3 className="font-cinema text-xl text-muted-foreground mb-6 tracking-wide">
            ALSO FEATURING
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Git', 'CI/CD', 'Figma', 'REST APIs', 'GraphQL', 'MongoDB', 'Redis', 'WebSockets'].map((tool, index) => (
              <motion.span
                key={tool}
                className="px-4 py-2 font-film text-film-sepia rounded-sm"
                style={{
                  background: 'hsl(0, 0%, 8%)',
                  border: '1px solid hsl(40, 20%, 22%)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.05, duration: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'hsl(45, 60%, 45%)',
                }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillsScene;
