import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Shared/Button';
import { PHOTO_DATA } from '../config';

interface MemoriesGalleryProps {
  onNext: () => void;
}

const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({ onNext }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full py-20 px-4 md:px-10 flex flex-col items-center bg-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-wider">OUR RANDOM MOMENTS</h2>
        <p className="text-xl text-primary handwritten italic">"Some people come and go. The crazy ones stay."</p>
      </motion.div>

      <div className="max-w-6xl w-full mx-auto flex flex-wrap justify-center gap-8 md:gap-12 mb-20 relative">
        {PHOTO_DATA.map((photo, index) => {
          // Generate a somewhat random but deterministic rotation for that scrapbook feel
          const rotation = (index % 2 === 0 ? 1 : -1) * (3 + (index % 5));
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-3 md:p-4 pb-10 md:pb-12 rounded shadow-xl cursor-pointer relative"
              style={{ width: '250px' }}
              onClick={() => setSelectedImage(photo.image)}
            >
              {/* Tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/40 backdrop-blur-sm transform -rotate-2 border border-gray-100 shadow-sm z-10" />
              
              <div className="w-full h-48 bg-gray-200 mb-4 overflow-hidden relative">
                <img 
                  src={photo.image} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    // Fallback visual if image not found
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'text-gray-400');
                    if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerHTML = 'Image Placeholder';
                  }}
                />
              </div>
              <p className="text-black text-center text-xl handwritten font-bold leading-tight">
                {photo.caption}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Button onClick={onNext}>
          NEXT →
        </Button>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Enlarged memory"
              className="max-w-full max-h-[90vh] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <button 
              className="absolute top-6 right-6 text-white text-4xl"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoriesGallery;
