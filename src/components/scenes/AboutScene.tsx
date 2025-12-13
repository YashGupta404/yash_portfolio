import { motion } from 'framer-motion';

const AboutScene = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-8 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl w-full">
        {/* Scene title */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="font-film text-muted-foreground text-lg italic mb-4">Scene I</p>
          <h1 className="font-cinema text-5xl md:text-7xl text-theater-gold text-shadow-gold tracking-wide mb-4">
            THE PROTAGONIST
          </h1>
          <div className="w-32 h-0.5 bg-theater-gold mx-auto opacity-60" />
        </motion.div>

        {/* Content in film frame style */}
        <motion.div
          className="relative mx-auto max-w-3xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="film-frame p-8 md:p-12">
            <div className="relative z-10 text-center">
              <motion.div
                className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden"
                style={{
                  border: '3px solid hsl(45, 60%, 45%)',
                  boxShadow: '0 0 30px hsl(45, 80%, 50% / 0.3)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <span className="font-cinema text-4xl text-theater-gold">JD</span>
                </div>
              </motion.div>

              <h2 className="font-cinema text-3xl text-film-cream mb-4">
                John Developer
              </h2>
              <p className="font-film text-xl text-muted-foreground italic mb-8">
                Creative Technologist & Digital Craftsman
              </p>

              <div className="space-y-4 text-film-sepia font-film text-lg leading-relaxed">
                <p>
                  In the grand theater of technology, I am both the director and the performer. 
                  With a passion for crafting immersive digital experiences, I blend creativity 
                  with technical precision to bring visions to life.
                </p>
                <p>
                  My journey through the digital realm spans over a decade, during which I have 
                  mastered the art of transforming complex ideas into elegant, user-centric solutions.
                </p>
              </div>

              {/* Stats as film frames */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                {[
                  { label: 'Years Experience', value: '10+' },
                  { label: 'Projects Delivered', value: '150+' },
                  { label: 'Happy Clients', value: '50+' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="p-4 rounded bg-muted/50"
                    style={{
                      border: '1px solid hsl(40, 25%, 20%)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <p className="font-cinema text-2xl text-theater-gold mb-1">{stat.value}</p>
                    <p className="font-film text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutScene;
