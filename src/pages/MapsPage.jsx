import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function MapsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.primary }}>
      {/* HERO */}
      <section 
        className="min-h-[60vh] flex items-center justify-center p-8"
        style={{ backgroundColor: `${COLORS.primary}ee` }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-9xl font-black uppercase" style={{ color: COLORS.secondary }}>DOVE SIAMO</h1>
          <p className="text-2xl md:text-4xl font-bold mt-4" style={{ color: COLORS.accent }}>VIENI A TROVARCI</p>
        </motion.div>
      </section>

      {/* INFO CARDS */}
      <section className="p-8 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="p-8 border-4"
            style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.primary }}
          >
            <h3 className="text-3xl font-black uppercase mb-4" style={{ color: COLORS.primary }}>INDIRIZZO</h3>
            <p className="text-xl font-bold" style={{ color: COLORS.primary }}>Via Example, 123</p>
            <p className="text-xl font-bold" style={{ color: COLORS.primary }}>00100 Roma RM</p>
          </motion.div>
          
          <motion.div
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="p-8 border-4"
            style={{ backgroundColor: COLORS.accent, borderColor: COLORS.primary }}
          >
            <h3 className="text-3xl font-black uppercase mb-4" style={{ color: COLORS.primary }}>ORARI</h3>
            <p className="text-xl font-bold" style={{ color: COLORS.primary }}>Lun-Ven: 9:00-18:00</p>
            <p className="text-xl font-bold" style={{ color: COLORS.primary }}>Sab-Dom: Chiuso</p>
          </motion.div>
          
          <motion.div
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="p-8 border-4"
            style={{ backgroundColor: COLORS.primary, borderColor: COLORS.accent }}
          >
            <h3 className="text-3xl font-black uppercase mb-4" style={{ color: COLORS.secondary }}>CONTATTO</h3>
            <p className="text-xl font-bold" style={{ color: COLORS.secondary }}>info@eterea.studio</p>
            <p className="text-xl font-bold" style={{ color: COLORS.secondary }}>+39 123 456 789</p>
          </motion.div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="p-8 md:p-16">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="aspect-video border-4 flex items-center justify-center"
          style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.primary }}
        >
          <span className="text-6xl">🗺️</span>
        </motion.div>
      </section>
    </div>
  );
}
