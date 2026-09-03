import React from 'react';

interface ProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentSection, totalSections }) => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, index) => (
        <div
          key={index}
          className={`w-1.5 rounded-full transition-all duration-500 ${
            index === currentSection ? 'h-8 bg-primary shadow-[0_0_10px_rgba(255,71,126,0.5)]' : 'h-2 bg-white/20'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
