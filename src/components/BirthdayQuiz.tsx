import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Shared/Button';
import { QUIZ_DATA } from '../config';

interface BirthdayQuizProps {
  onNext: () => void;
}

const BirthdayQuiz: React.FC<BirthdayQuizProps> = ({ onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
  };

  const nextQuestion = () => {
    if (currentQuestion < QUIZ_DATA.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const isCorrect = selectedAnswer === QUIZ_DATA[currentQuestion].correctIndex;
  const question = QUIZ_DATA[currentQuestion];

  return (
    <div className="min-h-screen w-full py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      {!showResult ? (
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-2">
              HOW WELL DO YOU KNOW YOUR OWN LIFE?
            </h2>
            <p className="text-primary handwritten text-2xl">Let's find out.</p>
          </div>

          <div className="mb-8 flex justify-center gap-2">
            {QUIZ_DATA.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === currentQuestion ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md"
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-white">
                {question.question}
              </h3>

              <div className="flex flex-col gap-4">
                {question.options.map((option, index) => {
                  let buttonClass = "w-full text-left p-4 rounded-xl border transition-all text-lg font-medium ";
                  
                  if (selectedAnswer === null) {
                    buttonClass += "border-white/20 hover:border-primary hover:bg-white/5 text-gray-300";
                  } else if (index === question.correctIndex) {
                    buttonClass += "border-green-500 bg-green-500/20 text-white";
                  } else if (index === selectedAnswer) {
                    buttonClass += "border-red-500 bg-red-500/20 text-white";
                  } else {
                    buttonClass += "border-white/10 opacity-50";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={buttonClass}
                    >
                      <span className="mr-4 opacity-50 font-mono">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 text-center"
                  >
                    <p className={`text-xl font-bold mb-6 ${isCorrect ? 'text-green-400' : 'text-primary'}`}>
                      {isCorrect ? question.correctResponse : question.incorrectResponse}
                    </p>
                    <Button onClick={nextQuestion} variant="secondary">
                      {currentQuestion < QUIZ_DATA.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white uppercase tracking-widest">
            QUIZ COMPLETE
          </h2>
          <div className="text-2xl md:text-3xl text-primary font-bold mb-12 p-6 border-2 border-primary rounded-2xl inline-block bg-primary/10">
            Friendship Level: <span className="text-white uppercase tracking-wider">LEGENDARY</span>
          </div>
          <div>
            <Button onClick={onNext}>
              ONE LAST THING →
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BirthdayQuiz;
