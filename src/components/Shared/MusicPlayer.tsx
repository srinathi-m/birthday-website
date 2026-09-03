import React, { useEffect, useRef } from 'react';
import { Music, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, togglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/birthday-song.mp3');
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying]);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-2 group"
      onClick={togglePlay}
    >
      {isPlaying ? (
        <>
          <Music2 size={20} className="animate-pulse text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest hidden group-hover:block transition-all">Music On</span>
        </>
      ) : (
        <>
          <Music size={20} />
          <span className="text-xs font-semibold uppercase tracking-widest hidden group-hover:block transition-all">Play Music ♫</span>
        </>
      )}
    </motion.button>
  );
};

export default MusicPlayer;
