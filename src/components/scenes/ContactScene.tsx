import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactScene = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
      className="w-full h-full p-6 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Title styled as movie credits */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-film italic text-sm tracking-[0.3em] mb-3" style={{ color: 'hsl(35, 25%, 35%)' }}>
            ~ Final Scene ~
          </p>
          <h1 className="font-cinema text-4xl md:text-5xl mb-4 tracking-wide" style={{ color: 'hsl(25, 20%, 15%)' }}>
            THE CREDITS
          </h1>
          <p className="font-film italic text-base" style={{ color: 'hsl(30, 15%, 40%)' }}>
            Let's create something extraordinary
          </p>
        </motion.div>

        {/* Telegram-style form */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div 
            className="p-6"
            style={{
              background: 'hsla(35, 25%, 88%, 0.8)',
              border: '2px solid hsl(35, 30%, 65%)',
            }}
          >
            <div className="text-center mb-6">
              <p className="font-cinema text-xs tracking-[0.25em]" style={{ color: 'hsl(30, 15%, 45%)' }}>
                ★ TELEGRAM ★
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-cinema text-xs mb-1.5 tracking-wide" style={{ color: 'hsl(25, 15%, 30%)' }}>
                  FROM
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 font-film text-sm focus:outline-none"
                  style={{
                    background: 'hsla(40, 30%, 95%, 0.8)',
                    border: '1px solid hsl(35, 20%, 60%)',
                    color: 'hsl(25, 15%, 20%)',
                  }}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block font-cinema text-xs mb-1.5 tracking-wide" style={{ color: 'hsl(25, 15%, 30%)' }}>
                  RETURN ADDRESS
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 font-film text-sm focus:outline-none"
                  style={{
                    background: 'hsla(40, 30%, 95%, 0.8)',
                    border: '1px solid hsl(35, 20%, 60%)',
                    color: 'hsl(25, 15%, 20%)',
                  }}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block font-cinema text-xs mb-1.5 tracking-wide" style={{ color: 'hsl(25, 15%, 30%)' }}>
                  MESSAGE
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 font-film text-sm focus:outline-none resize-none"
                  style={{
                    background: 'hsla(40, 30%, 95%, 0.8)',
                    border: '1px solid hsl(35, 20%, 60%)',
                    color: 'hsl(25, 15%, 20%)',
                  }}
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 font-cinema text-sm uppercase tracking-[0.15em] transition-all"
                style={{
                  background: 'linear-gradient(180deg, hsl(35, 45%, 45%) 0%, hsl(30, 40%, 35%) 100%)',
                  color: 'hsl(40, 40%, 95%)',
                  border: 'none',
                  boxShadow: '0 2px 8px hsla(30, 30%, 20%, 0.3)',
                }}
              >
                Send Telegram
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-film text-xs italic" style={{ color: 'hsl(30, 15%, 50%)' }}>
                "The show must go on"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-cinema text-xs tracking-[0.25em] mb-4" style={{ color: 'hsl(30, 15%, 45%)' }}>
            ALSO FIND ME AT
          </p>
          <div className="flex justify-center gap-6">
            {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-film text-sm transition-opacity hover:opacity-70"
                style={{ color: 'hsl(25, 20%, 30%)' }}
              >
                {social}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Final credit */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="font-cinema text-[10px] tracking-[0.2em]" style={{ color: 'hsl(30, 10%, 55%)' }}>
            © MCMXXIV CINEMA PORTFOLIO PRODUCTIONS
          </p>
          <p className="font-film text-xs italic mt-1" style={{ color: 'hsl(30, 10%, 60%)' }}>
            ~ Fin ~
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactScene;
