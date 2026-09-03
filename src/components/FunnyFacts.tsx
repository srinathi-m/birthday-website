import React from 'react';
import { motion } from 'framer-motion';
import Button from './Shared/Button';
import { FUNNY_FACTS_DATA } from '../config';

interface FunnyFactsProps {
  onNext: () => void;
}

const FunnyFacts: React.FC<FunnyFactsProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen w-full py-20 px-4 md:px-10 flex flex-col items-center bg-dark">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-white max-w-4xl mx-auto leading-tight">
          THINGS YOU SHOULD KNOW ABOUT YOURSELF
        </h2>
      </motion.div>

      <div className="max-w-4xl w-full mx-auto flex flex-col gap-8 mb-20">
        {FUNNY_FACTS_DATA.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className={`flex flex-col md:flex-row gap-6 items-start md:items-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${
              index % 2 !== 0 ? 'md:flex-row-reverse text-right md:text-left' : ''
            }`}
          >
            <div className="text-6xl font-black text-primary/30 select-none">
              {fact.number}
            </div>
            <div className={`flex-1 ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">
                {fact.title}
              </h3>
              <p className="text-lg text-gray-400 font-light italic">
                "{fact.description}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Button onClick={onNext}>
          LET'S CONTINUE →
        </Button>
      </motion.div>
    </div>
  );
};

export default FunnyFacts;
