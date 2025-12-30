import { motion } from 'framer-motion';
import { useState } from 'react';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'email' | 'linkedin' | 'github' | 'phone' | 'form' | 'reserved';
  label: string;
  link?: string;
}

const theaterSeats: Seat[] = [
  // Front row - Main contact options
  { id: 'A1', row: 'A', number: 1, type: 'email', label: 'yashgupta.work.2005@gmail.com', link: 'mailto:yashgupta.work.2005@gmail.com' },
  { id: 'A2', row: 'A', number: 2, type: 'linkedin', label: 'LinkedIn', link: 'https://www.linkedin.com/in/yash-gupta-420a6228a/' },
  { id: 'A3', row: 'A', number: 3, type: 'github', label: 'GitHub', link: 'https://github.com/YashGupta404' },
  { id: 'A4', row: 'A', number: 4, type: 'phone', label: 'Call: +91 7603004950', link: 'tel:+917603004950' },
  // Back row - Reserved/Coming soon
  { id: 'B1', row: 'B', number: 1, type: 'reserved', label: 'Resume (PDF)' },
  { id: 'B2', row: 'B', number: 2, type: 'reserved', label: 'Portfolio V2 (Soon)' },
  { id: 'B3', row: 'B', number: 3, type: 'reserved', label: 'Blog (Soon)' },
  { id: 'B4', row: 'B', number: 4, type: 'reserved', label: 'Discord (Soon)' },
];

const seatIcons: Record<string, string> = {
  email: '✉',
  linkedin: 'in',
  github: '⌥',
  phone: '📞',
  form: '📝',
  reserved: '⏳',
};

const seatColors: Record<string, string> = {
  email: '#ea4335',
  linkedin: '#0077b5',
  github: '#333',
  phone: '#22c55e',
  form: '#c9a54d',
  reserved: '#555',
};

// Theater Seat Component
const TheaterSeat = ({ seat, onSelect, isSelected }: {
  seat: Seat;
  onSelect: (seat: Seat) => void;
  isSelected: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isReserved = seat.type === 'reserved';

  return (
    <motion.button
      className="relative"
      onClick={() => !isReserved && onSelect(seat)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={isReserved ? {} : { scale: 1.1, y: -5 }}
      whileTap={isReserved ? {} : { scale: 0.95 }}
      style={{ cursor: isReserved ? 'not-allowed' : 'pointer' }}
    >
      {/* Seat back */}
      <div
        style={{
          width: '50px',
          height: '40px',
          background: isReserved
            ? 'linear-gradient(180deg, #3a3530 0%, #2a2520 100%)'
            : isSelected || isHovered
              ? `linear-gradient(180deg, ${seatColors[seat.type]} 0%, ${seatColors[seat.type]}cc 100%)`
              : 'linear-gradient(180deg, hsl(0, 60%, 25%) 0%, hsl(0, 55%, 18%) 100%)',
          borderRadius: '8px 8px 2px 2px',
          boxShadow: isHovered && !isReserved
            ? `0 0 20px ${seatColors[seat.type]}80, 0 -5px 15px rgba(0,0,0,0.3)`
            : 'inset 0 -3px 6px rgba(0,0,0,0.3), 0 -2px 4px rgba(0,0,0,0.4)',
          border: isReserved ? '1px dashed #555' : '1px solid hsl(0, 40%, 30%)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: seat.type === 'linkedin' ? '0.7rem' : '1rem',
            color: isReserved ? '#666' : '#fff',
            fontWeight: 700,
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          {seatIcons[seat.type]}
        </span>
      </div>

      {/* Seat cushion */}
      <div
        style={{
          width: '46px',
          height: '12px',
          marginLeft: '2px',
          marginTop: '-2px',
          background: isReserved
            ? 'linear-gradient(180deg, #2a2520 0%, #1a1510 100%)'
            : 'linear-gradient(180deg, hsl(0, 50%, 18%) 0%, hsl(0, 45%, 12%) 100%)',
          borderRadius: '0 0 4px 4px',
          boxShadow: 'inset 0 3px 5px rgba(0,0,0,0.4)',
        }}
      />

      {/* Armrests */}
      <div
        style={{
          position: 'absolute',
          left: '-3px',
          top: '20px',
          width: '4px',
          height: '25px',
          background: '#3a3530',
          borderRadius: '2px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-3px',
          top: '20px',
          width: '4px',
          height: '25px',
          background: '#3a3530',
          borderRadius: '2px',
        }}
      />

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 z-10"
          style={{
            background: 'rgba(0,0,0,0.9)',
            border: `1px solid ${isReserved ? '#555' : seatColors[seat.type]}`,
            borderRadius: '4px',
          }}
        >
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.7rem',
              color: isReserved ? '#888' : '#fff',
            }}
          >
            {seat.label}
          </p>
        </motion.div>
      )}

      {/* Seat number */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2"
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '0.5rem',
          color: '#6a6560',
        }}
      >
        {seat.id}
      </div>
    </motion.button>
  );
};

// Contact Form Modal
const ContactForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto with form data
    const mailtoLink = `mailto:yashgupta.work.2005@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink, '_blank');
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.8)' }}
        onClick={onClose}
      />

      {/* Form */}
      <motion.div
        className="relative z-10 w-full max-w-md p-6"
        style={{
          background: 'linear-gradient(180deg, #2a2520 0%, #1a1510 100%)',
          border: '2px solid #c9a54d',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201, 165, 77, 0.2)',
        }}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
          style={{ color: '#8b7355', fontSize: '1.5rem' }}
        >
          ×
        </button>

        <h3
          className="text-center mb-6"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.5rem',
            color: '#c9a54d',
          }}
        >
          Send a Message
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2"
              style={{
                background: '#1a1510',
                border: '1px solid #3a3530',
                color: '#e8dcc8',
                fontFamily: '"Cormorant Garamond", serif',
              }}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2"
              style={{
                background: '#1a1510',
                border: '1px solid #3a3530',
                color: '#e8dcc8',
                fontFamily: '"Cormorant Garamond", serif',
              }}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 resize-none"
              style={{
                background: '#1a1510',
                border: '1px solid #3a3530',
                color: '#e8dcc8',
                fontFamily: '"Cormorant Garamond", serif',
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3"
            style={{
              background: 'linear-gradient(180deg, #c9a54d 0%, #8b6528 100%)',
              border: 'none',
              fontFamily: '"Playfair Display", serif',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#1a1510',
              letterSpacing: '0.1em',
            }}
          >
            SEND MESSAGE
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const ContactScene = () => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const handleSeatSelect = async (seat: Seat) => {
    setSelectedSeat(seat);

    // For email and phone, copy to clipboard
    if (seat.type === 'email') {
      try {
        await navigator.clipboard.writeText('yashgupta.work.2005@gmail.com');
        setCopiedNotification('Email copied!');
        setTimeout(() => setCopiedNotification(null), 2000);
      } catch (err) {
        // Fallback: open mailto
        window.open(seat.link, '_blank');
      }
    } else if (seat.type === 'phone') {
      try {
        await navigator.clipboard.writeText('+91 7603004950');
        setCopiedNotification('Phone number copied!');
        setTimeout(() => setCopiedNotification(null), 2000);
      } catch (err) {
        // Fallback: open tel
        window.open(seat.link, '_blank');
      }
    } else if (seat.link) {
      window.open(seat.link, '_blank');
    }
  };

  const frontRow = theaterSeats.filter(s => s.row === 'A');
  const backRow = theaterSeats.filter(s => s.row === 'B');

  return (
    <motion.div
      className="w-full h-full p-6 overflow-auto relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'radial-gradient(ellipse at center top, hsl(30, 15%, 15%) 0%, hsl(25, 12%, 8%) 100%)',
      }}
    >
      {/* Copied Notification - Cinema Style */}
      {copiedNotification && (
        <motion.div
          className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-8 py-4"
          initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            background: 'linear-gradient(180deg, hsl(40, 30%, 92%) 0%, hsl(38, 25%, 85%) 100%)',
            border: '3px solid hsl(35, 40%, 70%)',
            borderRadius: '4px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(139, 101, 40, 0.1)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Film sprocket holes */}
          <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: 'hsl(35, 20%, 70%)' }} />
            ))}
          </div>
          <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-around">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: 'hsl(35, 20%, 70%)' }} />
            ))}
          </div>
          <div className="px-4">
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.7rem',
              fontWeight: 400,
              color: 'hsl(30, 20%, 50%)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              ★ NOTIFICATION ★
            </p>
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'hsl(25, 25%, 20%)',
              textShadow: '1px 1px 0 hsl(35, 20%, 80%)',
            }}>
              {copiedNotification}
            </p>
          </div>
        </motion.div>
      )}
      {/* Subtle film jitter effect */}
      <motion.div
        className="max-w-3xl mx-auto"
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
          transition={{ delay: 0 }}
        >
          {/* Decorative header */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-16 h-px" style={{ background: '#8b7355' }} />
            <span style={{ color: '#c9a54d', fontSize: '0.9rem', fontFamily: '"Playfair Display", serif', letterSpacing: '0.2em' }}>✦ ACT VII ✦</span>
            <div className="w-16 h-px" style={{ background: '#8b7355' }} />
          </div>

          <h1
            className="mb-2"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#e8dcc8',
              textShadow: '2px 2px 0 #3a3530',
              letterSpacing: '0.1em',
            }}
          >
            Select Your Seat
          </h1>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: '#a09080',
            }}
          >
            Choose a seat to connect with me
          </p>
        </motion.div>

        {/* Screen representation */}
        <motion.div
          className="mb-12 text-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div
            className="mx-auto mb-2"
            style={{
              width: '80%',
              height: '8px',
              background: 'linear-gradient(180deg, #c9a54d 0%, #8b6528 100%)',
              borderRadius: '4px',
              boxShadow: '0 0 30px rgba(201, 165, 77, 0.3), 0 10px 30px rgba(0,0,0,0.5)',
            }}
          />
          <p
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: '#6a6560',
            }}
          >
            SCREEN
          </p>
        </motion.div>

        {/* Theater Seats */}
        <div className="space-y-8">
          {/* Front Row */}
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {frontRow.map((seat, index) => (
              <motion.div
                key={seat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <TheaterSeat
                  seat={seat}
                  onSelect={handleSeatSelect}
                  isSelected={selectedSeat?.id === seat.id}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Row label */}
          <div className="text-center" style={{ marginTop: '-20px' }}>
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '0.6rem',
                color: '#5a5550',
              }}
            >
              ROW A - MAIN CONTACTS
            </span>
          </div>

          {/* Back Row */}
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {backRow.map((seat, index) => (
              <motion.div
                key={seat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
              >
                <TheaterSeat
                  seat={seat}
                  onSelect={handleSeatSelect}
                  isSelected={selectedSeat?.id === seat.id}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Row label */}
          <div className="text-center" style={{ marginTop: '-20px' }}>
            <span
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '0.6rem',
                color: '#5a5550',
              }}
            >
              ROW B - COMING SOON
            </span>
          </div>
        </div>

        {/* Quick Contact Info */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="inline-block px-6 py-4"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid #3a3530',
              borderRadius: '4px',
            }}
          >
            <p style={{ fontFamily: '"Playfair Display", serif', color: '#c9a54d', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '8px' }}>
              QUICK CONTACT
            </p>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', color: '#e8dcc8', fontSize: '0.9rem' }}>
              📧 yashgupta.work.2005@gmail.com
            </p>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', color: '#e8dcc8', fontSize: '0.9rem' }}>
              📞 +91 7603004950
            </p>
          </div>
        </motion.div>

        {/* Floor indicator */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div
            className="mx-auto"
            style={{
              width: '90%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #3a3530, transparent)',
            }}
          />
          <p
            className="mt-4"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.85rem',
              fontStyle: 'italic',
              color: '#8b7355',
            }}
          >
            "Let's build something amazing together!"
          </p>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              color: '#4a4540',
            }}
          >
            © 2025 YASH GUPTA | PORTFOLIO
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactScene;
