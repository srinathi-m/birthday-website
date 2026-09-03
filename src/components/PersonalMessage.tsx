import React from 'react';
import { motion } from 'framer-motion';
import Button from './Shared/Button';
import { BIRTHDAY_MESSAGE } from '../config';

interface PersonalMessageProps {
  onNext: () => void;
}

const PersonalMessage: React.FC<PersonalMessageProps> = ({ onNext }) => {
  // Split message by double newlines for paragraphs
  const paragraphs = BIRTHDAY_MESSAGE.split('\n\n');

  return (
    <div className="min-h-screen w-full py-20 px-4 flex flex-col items-center bg-gradient-to-br from-[#1a1515] to-dark">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-sm md:text-base font-bold tracking-[0.3em] text-gray-500 uppercase">
            OKAY... JOKES ASIDE.
          </h2>
        </motion.div>

        <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm relative mb-16">
          {/* Subtle decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/20" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/20" />
          
          <div className="space-y-6 text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={text.includes('Happy Birthday') ? 'text-primary font-semibold text-2xl md:text-3xl pt-4' : ''}
              >
                {text.split('\n').map((line, j) => (
                  <React.Fragment key={j}>
                    {line}
                    {j < text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex justify-center"
        >
          <Button onClick={onNext}>
            ALMOST THERE →
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalMessage;
