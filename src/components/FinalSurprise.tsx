import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Button from './Shared/Button';
import { FRIEND_NAME } from '../config';

interface FinalSurpriseProps {
  onReplay: () => void;
}

const FinalSurprise: React.FC<FinalSurpriseProps> = ({ onReplay }) => {
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSurprise(true);
      triggerConfetti();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff477e', '#ff99ac', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff477e', '#ff99ac', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!showSurprise ? (
          <motion.div
            key="pre-reveal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-[0.2em] text-white">
              ONE LAST THING...
            </h2>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full flex flex-col items-center z-10 px-4"
          >
            {/* Flash effect */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-white z-50 pointer-events-none"
            />

            {/* Hero Image Container */}
            <motion.div
              initial={{ scale: 0.8, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, type: 'spring' }}
              className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white/10 shadow-[0_0_50px_rgba(255,71,126,0.3)] mb-12 z-20"
            >

              <img
                src="/images/photo3.jpeg"
                alt="Happy Birthday Hero"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.style.background = 'linear-gradient(45deg, #ff477e, #0a0a0a)';
                  }
                }}
              />
            </motion.div>

            {/* Main Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-center z-20"
            >
              <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary mb-4 drop-shadow-2xl">
                HAPPY BIRTHDAY
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-widest uppercase">
                {FRIEND_NAME}!
              </h2>

              <p className="text-xl md:text-2xl text-gray-300 font-light italic mb-16 max-w-2xl mx-auto handwritten">
                "Here's to another year of questionable decisions and unforgettable memories."
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button onClick={triggerConfetti} className="text-lg px-12 py-5 shadow-[0_0_20px_rgba(255,71,126,0.5)] hover:shadow-[0_0_40px_rgba(255,71,126,0.8)]">
                  LET'S CELEBRATE 🎉
                </Button>

                <button
                  onClick={onReplay}
                  className="text-sm font-semibold tracking-widest uppercase text-gray-400 hover:text-white transition-colors py-4 px-8 border border-white/10 rounded-full hover:bg-white/5"
                >
                  REPLAY THE CHAOS ↻
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalSurprise;
