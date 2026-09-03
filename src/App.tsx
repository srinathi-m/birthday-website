import { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import Countdown from './components/Countdown';
import MemoriesGallery from './components/MemoriesGallery';
import FunnyFacts from './components/FunnyFacts';
import BirthdayQuiz from './components/BirthdayQuiz';
import PersonalMessage from './components/PersonalMessage';
import FinalSurprise from './components/FinalSurprise';
import MusicPlayer from './components/Shared/MusicPlayer';
import ProgressIndicator from './components/Shared/ProgressIndicator';
import { AnimatePresence, motion } from 'framer-motion';

const Section = {
  OPENING: 0,
  COUNTDOWN: 1,
  MEMORIES: 2,
  FACTS: 3,
  QUIZ: 4,
  MESSAGE: 5,
  SURPRISE: 6,
} as const;

type Section = typeof Section[keyof typeof Section];

function App() {
  const [currentSection, setCurrentSection] = useState<Section>(Section.OPENING);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const nextSection = () => {
    if (currentSection < Section.SURPRISE) {
      setCurrentSection(prev => (prev + 1) as Section);
    }
  };

  const resetToStart = () => {
    setCurrentSection(Section.OPENING);
  };

  // Map section enum to component
  const renderSection = () => {
    switch (currentSection) {
      case Section.OPENING:
        return <OpeningScreen onNext={nextSection} onPlayMusic={() => setIsMusicPlaying(true)} isMusicPlaying={isMusicPlaying} />;
      case Section.COUNTDOWN:
        return <Countdown onNext={nextSection} />;
      case Section.MEMORIES:
        return <MemoriesGallery onNext={nextSection} />;
      case Section.FACTS:
        return <FunnyFacts onNext={nextSection} />;
      case Section.QUIZ:
        return <BirthdayQuiz onNext={nextSection} />;
      case Section.MESSAGE:
        return <PersonalMessage onNext={nextSection} />;
      case Section.SURPRISE:
        return <FinalSurprise onReplay={resetToStart} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-dark text-light">
      <MusicPlayer isPlaying={isMusicPlaying} togglePlay={() => setIsMusicPlaying(!isMusicPlaying)} />

      {currentSection > Section.OPENING && (
        <ProgressIndicator currentSection={currentSection} totalSections={7} />
      )}

      <div className="fixed bottom-4 left-0 w-full text-center z-40 pointer-events-none">
        <p className="text-[10px] md:text-xs text-white/30 tracking-widest uppercase">Crafted by Sri ✦</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full min-h-screen"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
