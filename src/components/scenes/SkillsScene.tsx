import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Three.js", level: 85 },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 82 },
      { name: "PostgreSQL", level: 85 },
    ]
  }
];

const SkillsScene = () => {
  return (
    <motion.div
      className="w-full h-full p-6 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-film italic text-sm tracking-[0.3em] mb-3" style={{ color: 'hsl(35, 25%, 35%)' }}>
            ~ Scene III ~
          </p>
          <h1 className="font-cinema text-4xl md:text-5xl mb-4 tracking-wide" style={{ color: 'hsl(25, 20%, 15%)' }}>
            THE CRAFT
          </h1>
          <p className="font-film italic text-base" style={{ color: 'hsl(30, 15%, 40%)' }}>
            Tools of the trade, mastered through time
          </p>
        </motion.div>

        {/* Skills as vintage meter gauges */}
        <div className="space-y-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + groupIndex * 0.15 }}
            >
              <h2 className="font-cinema text-xl mb-4 tracking-wide" style={{ color: 'hsl(25, 20%, 22%)' }}>
                {group.category}
              </h2>

              <div className="space-y-4">
                {group.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + groupIndex * 0.15 + skillIndex * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-film text-sm" style={{ color: 'hsl(25, 15%, 30%)' }}>
                        {skill.name}
                      </span>
                      <span className="font-cinema text-xs" style={{ color: 'hsl(30, 20%, 40%)' }}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Vintage progress bar */}
                    <div 
                      className="relative h-4 rounded-sm overflow-hidden"
                      style={{
                        background: 'hsl(35, 15%, 80%)',
                        border: '1px solid hsl(35, 20%, 65%)',
                      }}
                    >
                      <motion.div
                        className="h-full"
                        style={{
                          background: 'linear-gradient(90deg, hsl(35, 40%, 45%) 0%, hsl(40, 50%, 55%) 100%)',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.6 + groupIndex * 0.15 + skillIndex * 0.1, duration: 0.8 }}
                      />
                      {/* Tick marks */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 9%, hsla(30, 10%, 20%, 0.15) 9%, hsla(30, 10%, 20%, 0.15) 10%)',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills as film credits */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="font-cinema text-sm tracking-[0.2em] mb-4" style={{ color: 'hsl(30, 15%, 45%)' }}>
            ALSO FEATURING
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Git', 'CI/CD', 'Figma', 'REST APIs', 'GraphQL', 'MongoDB', 'Redis', 'Docker'].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 font-film text-xs"
                style={{
                  border: '1px solid hsl(35, 20%, 65%)',
                  color: 'hsl(25, 15%, 35%)',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillsScene;
