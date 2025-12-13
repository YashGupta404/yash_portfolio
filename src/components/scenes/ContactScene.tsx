import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactScene = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
      className="min-h-screen px-8 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Scene title - styled as movie credits */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="font-film text-muted-foreground text-lg italic mb-4">Final Scene</p>
          <h1 className="font-cinema text-5xl md:text-7xl text-theater-gold text-shadow-gold tracking-wide mb-4">
            THE CREDITS
          </h1>
          <p className="font-film text-xl text-muted-foreground italic">Let's create something extraordinary together</p>
          <div className="w-32 h-0.5 bg-theater-gold mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Contact form styled as vintage telegram */}
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div 
            className="relative p-8 md:p-10"
            style={{
              background: 'linear-gradient(180deg, hsl(40, 25%, 12%) 0%, hsl(35, 20%, 8%) 100%)',
              border: '2px solid hsl(40, 30%, 25%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 hsl(40, 30%, 30% / 0.3)',
            }}
          >
            {/* Decorative header */}
            <div className="text-center mb-8">
              <p className="font-cinema text-sm text-muted-foreground tracking-[0.3em] mb-2">
                ★ TELEGRAM ★
              </p>
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-theater-gold/50 to-transparent" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-cinema text-sm text-film-cream mb-2 tracking-wide">
                  FROM
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 font-film text-film-cream bg-transparent rounded-sm transition-all focus:outline-none"
                  style={{
                    border: '1px solid hsl(40, 20%, 25%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                  }}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block font-cinema text-sm text-film-cream mb-2 tracking-wide">
                  RETURN ADDRESS
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 font-film text-film-cream bg-transparent rounded-sm transition-all focus:outline-none"
                  style={{
                    border: '1px solid hsl(40, 20%, 25%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                  }}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block font-cinema text-sm text-film-cream mb-2 tracking-wide">
                  MESSAGE
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 font-film text-film-cream bg-transparent rounded-sm transition-all focus:outline-none resize-none"
                  style={{
                    border: '1px solid hsl(40, 20%, 25%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                  }}
                  placeholder="Your message..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full cinema-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Telegram
              </motion.button>
            </form>

            {/* Decorative footer */}
            <div className="mt-8 text-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-theater-gold/50 to-transparent mb-4" />
              <p className="font-film text-sm text-muted-foreground italic">
                "The show must go on"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social links as movie credits */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="font-cinema text-sm text-muted-foreground tracking-[0.3em] mb-6">
            ALSO FIND ME AT
          </p>
          <div className="flex justify-center gap-8">
            {[
              { name: 'GitHub', link: '#' },
              { name: 'LinkedIn', link: '#' },
              { name: 'Twitter', link: '#' },
              { name: 'Dribbble', link: '#' },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.link}
                className="font-film text-film-sepia hover:text-theater-gold transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Copyright as final credit */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="font-cinema text-xs text-muted-foreground/50 tracking-widest">
            © 2024 CINEMA PORTFOLIO PRODUCTIONS
          </p>
          <p className="font-film text-xs text-muted-foreground/40 mt-2 italic">
            "Fin"
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactScene;
