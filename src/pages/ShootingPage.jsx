import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function ShootingPage() {
  return (
    <div className="min-h-full" style={{ backgroundColor: COLORS.secondary }}>
      {/* HERO */}
      <div 
        className="p-8 md:p-16 overflow-hidden"
        style={{ backgroundColor: COLORS.primary }}
      >
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="overflow-hidden"
        >
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
            className="flex whitespace-nowrap"
          >
            <span 
              className="text-6xl md:text-9xl font-black uppercase px-8"
              style={{ color: COLORS.secondary }}
            >
              SHOOTING • FOTOGRAFIA • VIDEO • SHOOTING • FOTOGRAFIA • VIDEO •
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* SERVICES */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4"
          style={{ backgroundColor: COLORS.accent, borderColor: COLORS.primary }}
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase" style={{ color: COLORS.primary }}>PRODOTTO</h2>
          <p className="mt-4 text-lg font-bold" style={{ color: COLORS.primary }}>Fotografia professionale per i tuoi prodotti</p>
          <ul className="mt-6 space-y-2 font-bold" style={{ color: COLORS.primary }}>
            <li>• E-commerce</li>
            <li>• Cataloghi</li>
            <li>• Still life</li>
            <li>• 360°</li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 md:p-12"
          style={{ backgroundColor: COLORS.primary }}
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase" style={{ color: COLORS.secondary }}>EVENTI</h2>
          <p className="mt-4 text-lg font-bold" style={{ color: COLORS.secondary }}>Copertura eventi e reportage</p>
          <ul className="mt-6 space-y-2 font-bold" style={{ color: COLORS.secondary }}>
            <li>• Corporate</li>
            <li>• Concerti</li>
            <li>• Matrimoni</li>
            <li>• Conference</li>
          </ul>
        </motion.div>
      </div>

      {/* EQUIPMENT */}
      <div 
        className="p-8 md:p-16 border-t-4"
        style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.primary }}
      >
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8" style={{ color: COLORS.primary }}>ATTREZZATURA</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '📷', label: 'Sony A7IV' },
            { icon: '🎥', label: 'Canon R5' },
            { icon: '💡', label: 'Lighting' },
            { icon: '🎬', label: 'Gimbal' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1 }}
              className="p-6 border-4 text-center"
              style={{ backgroundColor: COLORS.primary, borderColor: COLORS.accent }}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="font-black" style={{ color: COLORS.secondary }}>{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* GALLERY PREVIEW */}
      <div 
        className="p-8 md:p-16"
        style={{ backgroundColor: `${COLORS.primary}10` }}
      >
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8" style={{ color: COLORS.primary }}>GALLERY</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-[3/4] border-4 flex items-center justify-center"
              style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary }}
            >
              <div className="w-full h-full flex items-center justify-center text-4xl">📸</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
