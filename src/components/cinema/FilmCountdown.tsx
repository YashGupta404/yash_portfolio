import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilmCountdownProps {
  onComplete: () => void;
}

const FilmCountdown = ({ onComplete }: FilmCountdownProps) => {
  const [count, setCount] = useState(3);
  const [showFilmBurn, setShowFilmBurn] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  // Play countdown "tip" sound
  const playCountSound = useCallback((countNum: number) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create a sharp "tick" sound like a metronome or film frame advance
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();

      // Connect nodes
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Higher pitch for higher numbers
      const baseFreq = 800 + (countNum * 100);
      oscillator.frequency.value = baseFreq;
      oscillator.type = 'sine';

      // Low-pass filter for softer sound
      filterNode.type = 'lowpass';
      filterNode.frequency.value = 1500;

      // Quick attack, short decay  
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);

      // Clean up
      setTimeout(() => audioContext.close(), 200);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, []);

  // Play flash/burn effect sound
  const playFlashSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // White noise burst for flash
      const bufferSize = audioContext.sampleRate * 0.3;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
      }

      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = buffer;

      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();

      noiseSource.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);

      filterNode.type = 'lowpass';
      filterNode.frequency.value = 800;

      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

      noiseSource.start(audioContext.currentTime);

      // Clean up
      setTimeout(() => audioContext.close(), 400);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, []);

  useEffect(() => {
    if (count > 0) {
      // Play sound when count changes
      playCountSound(count);
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Trigger flash and burn effect
      setShowFlash(true);
      playFlashSound();

      setTimeout(() => {
        setShowFilmBurn(true);
        setTimeout(() => {
          setShowFlash(false);
          onComplete();
        }, 600);
      }, 200);
    }
  }, [count, onComplete, playCountSound, playFlashSound]);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-50 overflow-hidden"
      style={{
        background: 'hsl(35, 15%, 12%)',
      }}
    >
      {/* Aged film texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Film frame border */}
      <div
        className="absolute"
        style={{
          inset: '5%',
          border: '4px solid hsl(35, 20%, 20%)',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
        }}
      />

      {/* Sprocket holes - left */}
      <div className="absolute left-[2%] top-0 bottom-0 w-10 flex flex-col justify-around py-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={`left-${i}`}
            className="w-5 h-3 rounded-sm mx-auto"
            style={{
              background: 'hsl(0, 0%, 5%)',
              border: '1px solid hsl(35, 15%, 18%)',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
            }}
          />
        ))}
      </div>

      {/* Sprocket holes - right */}
      <div className="absolute right-[2%] top-0 bottom-0 w-10 flex flex-col justify-around py-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={`right-${i}`}
            className="w-5 h-3 rounded-sm mx-auto"
            style={{
              background: 'hsl(0, 0%, 5%)',
              border: '1px solid hsl(35, 15%, 18%)',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
            }}
          />
        ))}
      </div>

      {/* Center countdown area */}
      <div className="relative">
        {/* Rotating outer ring with tick marks */}
        <motion.div
          className="absolute -inset-8 rounded-full"
          style={{
            border: '3px solid hsl(35, 25%, 25%)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 3, ease: "linear" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-3"
              style={{
                background: 'hsl(35, 30%, 35%)',
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 30}deg) translateY(-85px)`,
              }}
            />
          ))}
        </motion.div>

        {/* Main countdown circle */}
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center relative"
          style={{
            background: 'radial-gradient(circle, hsl(35, 12%, 18%) 0%, hsl(25, 10%, 10%) 100%)',
            border: '4px solid hsl(35, 20%, 22%)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Crosshairs */}
          <div className="absolute w-full h-0.5" style={{ background: 'hsl(35, 20%, 30%)' }} />
          <div className="absolute h-full w-0.5" style={{ background: 'hsl(35, 20%, 30%)' }} />

          {/* Center dot */}
          <div className="absolute w-2 h-2 rounded-full" style={{ background: 'hsl(35, 30%, 40%)' }} />

          {/* Number - properly centered */}
          <AnimatePresence mode="wait">
            {count > 0 && (
              <motion.div
                key={count}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: 1,
                }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  scale: { duration: 0.2, times: [0, 0.3, 1] }
                }}
              >
                <span
                  className="font-cinema"
                  style={{
                    fontSize: '5rem',
                    lineHeight: 1,
                    color: 'hsl(40, 50%, 80%)',
                    textShadow: '0 0 20px hsla(40, 60%, 70%, 0.5), 2px 2px 8px rgba(0,0,0,0.8)',
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sweep hand */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 origin-bottom"
          style={{
            height: '70px',
            background: 'linear-gradient(180deg, hsl(45, 80%, 50%) 0%, hsl(40, 70%, 40%) 100%)',
            marginLeft: '-2px',
            marginTop: '-70px',
            boxShadow: '0 0 8px hsla(45, 80%, 50%, 0.5)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Film scratches */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute h-full w-px bg-white/10"
          style={{ left: '23%' }}
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-full w-px bg-white/5"
          style={{ left: '67%' }}
          animate={{ y: ['100%', '-100%'] }}
          transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Vignette flash effect */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1, 0] }}
            transition={{ duration: 0.4, times: [0, 0.1, 0.3, 0.5, 1] }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,248,220,0.7) 40%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Film burn effect on transition */}
      <AnimatePresence>
        {showFilmBurn && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, #fff 0%, #ffeedd 30%, #ff8844 60%, #000 100%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilmCountdown;
