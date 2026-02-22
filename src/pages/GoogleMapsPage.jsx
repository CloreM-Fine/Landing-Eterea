import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function GoogleMapsPage() {
  return (
    <div className="min-h-full" style={{ backgroundColor: COLORS.secondary }}>
      {/* HEADER */}
      <div 
        className="p-4 border-b-4 flex items-center gap-4"
        style={{ backgroundColor: COLORS.primary, borderColor: COLORS.accent }}
      >
        <div className="flex gap-2">
          <span className="text-2xl font-bold" style={{ color: COLORS.accent }}>G</span>
          <span className="text-2xl font-bold" style={{ color: COLORS.secondary }}>o</span>
          <span className="text-2xl font-bold" style={{ color: COLORS.accent }}>o</span>
          <span className="text-2xl font-bold" style={{ color: COLORS.secondary }}>g</span>
          <span className="text-2xl font-bold" style={{ color: COLORS.accent }}>l</span>
          <span className="text-2xl font-bold" style={{ color: COLORS.secondary }}>e</span>
        </div>
        <span className="text-2xl font-black" style={{ color: COLORS.secondary }}>Maps</span>
      </div>

      {/* MAP AREA */}
      <div 
        className="aspect-video relative border-b-4"
        style={{ backgroundColor: `${COLORS.primary}80`, borderColor: COLORS.accent }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="text-6xl">📍</div>
        </motion.div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} style={{ border: `1px solid ${COLORS.secondary}30` }} />
          ))}
        </div>
      </div>

      {/* INFO */}
      <div className="p-6" style={{ backgroundColor: COLORS.secondary }}>
        <motion.h2
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="text-3xl font-black"
          style={{ color: COLORS.primary }}
        >
          Eterea Studio
        </motion.h2>
        <p className="font-bold mt-2" style={{ color: `${COLORS.primary}cc` }}>Via Example, 123, 00100 Roma RM</p>
        
        <div className="flex gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 font-bold rounded-full"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
          >
            Indicazioni
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 font-bold rounded-full border-2"
            style={{ backgroundColor: 'transparent', borderColor: COLORS.primary, color: COLORS.primary }}
          >
            Salva
          </motion.button>
        </div>
      </div>
    </div>
  );
}
