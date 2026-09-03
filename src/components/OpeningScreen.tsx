import React from 'react';
import { motion } from 'framer-motion';
import Button from './Shared/Button';
import { FRIEND_NAME, PHOTO_DATA } from '../config';

interface OpeningScreenProps {
  onNext: () => void;
  onPlayMusic: () => void;
  isMusicPlaying: boolean;
}

const OpeningScreen: React.FC<OpeningScreenProps> = ({ onNext, onPlayMusic, isMusicPlaying }) => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background collage */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {PHOTO_DATA.slice(0, 5).map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 20 - 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: Math.random() * 20 - 10,
              y: [0, -15, 0]
            }}
            transition={{ 
              duration: 1, 
              delay: i * 0.2,
              y: { duration: 5 + Math.random() * 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute rounded-lg shadow-2xl bg-white p-2"
            style={{
              left: `${10 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 70}%`,
              width: '150px',
              height: '180px',
            }}
          >
            <div className="w-full h-full bg-gray-300 rounded overflow-hidden">
               {/* Use actual images if they exist, else fallback to grey box is handled by bg-gray-300 */}
               <img src={photo.image} alt="Memory" className="w-full h-full object-cover grayscale opacity-50" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg uppercase"
        >
          HEY <br />
          <span className="text-primary">{FRIEND_NAME}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-xl text-gray-300 mb-12 font-light"
        >
          Someone has prepared something special for you...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <Button onClick={() => {
            if (!isMusicPlaying) onPlayMusic();
            onNext();
          }}>
            ENTER THE CHAOS →
          </Button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-8 text-xs text-gray-500 uppercase tracking-widest"
        >
          P.S. Don't cheat. Experience everything.
        </motion.p>
      </div>
    </div>
  );
};

export default OpeningScreen;
