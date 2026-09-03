import React from 'react';
import { Music, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { YOUTUBE_MUSIC_LINK } from '../../config';

interface MusicPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, togglePlay }) => {
  return (
    <>
      <div className="hidden">
        {/* @ts-ignore - react-player types are currently incompatible with this TS setup */}
        <ReactPlayer url={YOUTUBE_MUSIC_LINK} playing={isPlaying} loop={true} volume={1} width="0" height="0" />
      </div>
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
    </>
  );
};

export default MusicPlayer;
