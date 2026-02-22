import React from 'react';
import { motion } from 'framer-motion';

// Genera un colore hex casuale
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function ColorPicker({ bgColor, onColorChange, isLight, size = 'md' }) {
  const sizeClasses = 'w-9 h-9 sm:w-10 sm:h-10';
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const randomColor = getRandomColor();
    console.log('🎨 COLORE CLICK:', randomColor);
    onColorChange(randomColor);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`${sizeClasses} rounded-full border-2 cursor-pointer`}
      style={{
        backgroundColor: bgColor,
        borderColor: isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      aria-label="Cambia colore sfondo"
      type="button"
    />
  );
}
