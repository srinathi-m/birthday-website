import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import Button from './Shared/Button';

interface FavoriteSongProps {
  onNext: () => void;
  setIsGlobalMusicPlaying: (playing: boolean) => void;
}

const FavoriteSong: React.FC<FavoriteSongProps> = ({ onNext, setIsGlobalMusicPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/thanthana-thanthana-thaimasam_IhcJXVMH.mp3');
      audioRef.current.volume = 0.8;
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsGlobalMusicPlaying(false); // Pause background global music
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-dark py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-dark to-dark"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full flex flex-col items-center text-center z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-6">
          I Know You Well
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 handwritten">
          Especially when it comes to your favorite things...
        </p>

        <div
          className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center mb-16 relative group cursor-pointer shadow-2xl transition-all hover:bg-white/10"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full border border-primary/50"
            />
          ) : null}

          <div className="p-6 rounded-full bg-primary/20 text-primary mb-4 transition-transform group-hover:scale-110">
            {isPlaying ? <Pause size={48} /> : <Play size={48} className="ml-2" />}
          </div>

          <p className="text-sm tracking-widest uppercase text-gray-400 font-semibold">
            {isPlaying ? 'Playing...' : 'Play Your Favorite'}
          </p>
        </div>

        <Button onClick={() => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          setIsGlobalMusicPlaying(true); // Resume background global music
          onNext();
        }}>
          CONTINUE →
        </Button>
      </motion.div>
    </div>
  );
};

export default FavoriteSong;
