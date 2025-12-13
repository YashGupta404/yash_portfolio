import { motion } from 'framer-motion';

// This component renders content as if projected on a cinema screen
// with retro film aesthetics

const AboutScene = () => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-3xl text-center">
        {/* Silent film style title card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p 
            className="font-film italic text-sm tracking-[0.3em] mb-4"
            style={{ color: 'hsl(35, 25%, 35%)' }}
          >
            ~ Scene I ~
          </p>
          <h1 
            className="font-cinema text-4xl md:text-6xl mb-6 tracking-wide"
            style={{
              color: 'hsl(25, 20%, 15%)',
              textShadow: '2px 2px 4px hsla(25, 20%, 30%, 0.3)',
            }}
          >
            THE PROTAGONIST
          </h1>
          <div 
            className="w-40 h-0.5 mx-auto mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(35, 30%, 40%), transparent)' }}
          />
        </motion.div>

        {/* Portrait frame */}
        <motion.div
          className="mx-auto mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div 
            className="w-32 h-32 mx-auto rounded-full overflow-hidden"
            style={{
              border: '4px solid hsl(35, 30%, 35%)',
              boxShadow: '0 4px 20px hsla(25, 20%, 20%, 0.4)',
            }}
          >
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, hsl(35, 20%, 75%) 0%, hsl(30, 15%, 65%) 100%)' }}
            >
              <span className="font-cinema text-3xl" style={{ color: 'hsl(25, 20%, 25%)' }}>JD</span>
            </div>
          </div>
        </motion.div>

        {/* Info in retro card style */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 
            className="font-cinema text-2xl mb-2"
            style={{ color: 'hsl(25, 20%, 20%)' }}
          >
            John Developer
          </h2>
          <p 
            className="font-film italic text-lg mb-6"
            style={{ color: 'hsl(30, 15%, 40%)' }}
          >
            Creative Technologist & Digital Craftsman
          </p>

          <div 
            className="p-6 rounded mx-auto max-w-xl"
            style={{
              background: 'hsla(35, 20%, 88%, 0.5)',
              border: '2px solid hsl(35, 25%, 75%)',
            }}
          >
            <p 
              className="font-film text-base leading-relaxed mb-4"
              style={{ color: 'hsl(25, 15%, 25%)' }}
            >
              In the grand theater of technology, I am both the director and the performer.
              With a passion for crafting immersive digital experiences, I blend creativity
              with technical precision.
            </p>
            <p 
              className="font-film text-base leading-relaxed"
              style={{ color: 'hsl(25, 15%, 25%)' }}
            >
              My journey spans over a decade, transforming complex ideas into elegant,
              user-centric solutions that leave lasting impressions.
            </p>
          </div>
        </motion.div>

        {/* Stats as vintage labels */}
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { value: '10+', label: 'Years' },
            { value: '150+', label: 'Projects' },
            { value: '50+', label: 'Clients' },
          ].map((stat, i) => (
            <div 
              key={stat.label}
              className="px-4 py-2 text-center"
              style={{
                border: '1px solid hsl(35, 25%, 65%)',
                borderRadius: '2px',
              }}
            >
              <p className="font-cinema text-xl" style={{ color: 'hsl(25, 20%, 20%)' }}>{stat.value}</p>
              <p className="font-film text-xs" style={{ color: 'hsl(30, 15%, 45%)' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutScene;
