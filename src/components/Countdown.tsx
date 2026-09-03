import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Shared/Button';
import { BIRTHDAY_DATE } from '../config';

interface CountdownProps {
  onNext: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const target = new Date(BIRTHDAY_DATE).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsPast(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-dark to-gray-900">
      {/* Stars/particles background could go here */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center px-4"
      >
        {!isPast ? (
          <>
            <h2 className="text-2xl md:text-4xl font-bold tracking-widest text-primary mb-12 uppercase">
              Get ready for something special
            </h2>
            
            <div className="flex justify-center gap-4 md:gap-8 mb-16">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINUTES', value: timeLeft.minutes },
                { label: 'SECONDS', value: timeLeft.seconds },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-4xl md:text-7xl font-light font-mono mb-2">
                    {formatNumber(item.value)}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 tracking-widest">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-4xl md:text-7xl font-bold tracking-widest text-primary mb-6 uppercase">
              THE DAY IS HERE.
            </h2>
            <p className="text-xl md:text-3xl text-gray-300 font-light mb-16 italic">
              Let's make this one unforgettable.
            </p>
          </>
        )}

        <Button onClick={onNext}>
          LET'S GO →
        </Button>
      </motion.div>
    </div>
  );
};

export default Countdown;
