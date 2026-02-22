import React from 'react';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';

export function ImageBackgroundPicker({ previewImage, bgImage, onImageChange, isLight, size = 'md' }) {
  const sizeClasses = 'w-9 h-9 sm:w-10 sm:h-10';
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🖼️ IMMAGINE CLICK');
    onImageChange();
  };

  // Mostra sempre l'anteprima della prossima immagine
  const imageToShow = previewImage;

  return (
    <motion.button
      onClick={handleClick}
      className={`${sizeClasses} rounded-full border-2 cursor-pointer overflow-hidden relative`}
      style={{
        backgroundColor: 'transparent',
        borderColor: isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      title={bgImage ? "Cambia sfondo" : "Sfondo natura/mac"}
      type="button"
    >
      {imageToShow ? (
        <img 
          src={imageToShow} 
          alt="Prossimo sfondo" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Image size={size === 'sm' ? 14 : 18} style={{ color: isLight ? '#1e293b' : '#ffffff' }} />
        </div>
      )}
    </motion.button>
  );
}
