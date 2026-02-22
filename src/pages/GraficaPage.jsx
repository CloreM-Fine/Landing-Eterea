import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function GraficaPage() {
  return (
    <div className="min-h-full" style={{ backgroundColor: COLORS.secondary }}>
      {/* HERO */}
      <div 
        className="p-8 md:p-16"
        style={{ backgroundColor: COLORS.primary }}
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl md:text-8xl font-black uppercase leading-none"
          style={{ color: COLORS.secondary }}
        >
          GRAFICA
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-3xl font-bold mt-4"
          style={{ color: COLORS.accent }}
        >
          Brand Identity & Visual Design
        </motion.p>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4"
          style={{ backgroundColor: COLORS.accent, borderColor: COLORS.primary }}
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase" style={{ color: COLORS.primary }}>BRAND</h2>
          <ul className="mt-6 space-y-2 text-lg font-bold" style={{ color: COLORS.primary }}>
            <li>Logo Design</li>
            <li>Brand Identity</li>
            <li>Guidelines</li>
            <li>Brand Strategy</li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          className="p-8 md:p-12"
          style={{ backgroundColor: COLORS.primary }}
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase" style={{ color: COLORS.secondary }}>PRINT</h2>
          <ul className="mt-6 space-y-2 text-lg font-bold" style={{ color: COLORS.secondary }}>
            <li>Brochure</li>
            <li>Flyer</li>
            <li>Packaging</li>
            <li>Editorial</li>
          </ul>
        </motion.div>
      </div>

      {/* COLOR PALETTE */}
      <div 
        className="p-8 md:p-16"
        style={{ backgroundColor: `${COLORS.primary}10` }}
      >
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8" style={{ color: COLORS.primary }}>PALETTE</h2>
        <div className="flex flex-wrap gap-4">
          {[COLORS.primary, COLORS.secondary, COLORS.accent, `${COLORS.primary}dd`, `${COLORS.secondary}dd`, `${COLORS.accent}dd`].map((color, i) => (
            <motion.div
              key={color}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="w-24 h-24 md:w-32 md:h-32 border-4"
              style={{ backgroundColor: color, borderColor: COLORS.primary }}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        className="p-8 md:p-16 text-center"
        style={{ backgroundColor: COLORS.primary }}
      >
        <h2 className="text-3xl md:text-6xl font-black uppercase" style={{ color: COLORS.secondary }}>PRONTI A INIZIARE?</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 text-xl font-black uppercase border-4 transition-colors"
          style={{ 
            backgroundColor: COLORS.accent, 
            color: COLORS.primary,
            borderColor: COLORS.accent
          }}
        >
          Contattaci
        </motion.button>
      </motion.div>
    </div>
  );
}
