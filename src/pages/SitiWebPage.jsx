import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function SitiWebPage() {
  const techs = ['React', 'Next.js', 'Vue', 'Tailwind', 'Node.js', 'Three.js'];
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.primary }}>
      {/* HERO */}
      <section 
        className="min-h-[70vh] flex items-center justify-center p-8 border-b-8"
        style={{ backgroundColor: COLORS.primary, borderColor: COLORS.accent }}
      >
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-[10rem] font-black uppercase" style={{ color: COLORS.secondary }}>SITI WEB</h1>
          <p className="text-3xl md:text-5xl font-bold mt-4" style={{ color: COLORS.accent }}>TECNOLOGIE MODERNE</p>
        </motion.div>
      </section>

      {/* TECNOLOGIE */}
      <section 
        className="p-8 md:p-16"
        style={{ backgroundColor: COLORS.secondary }}
      >
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 text-center" style={{ color: COLORS.primary }}>STACK</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.3, rotate: Math.random() * 20 - 10, backgroundColor: COLORS.accent, color: COLORS.primary }}
              className="px-8 py-4 border-4 text-2xl font-black"
              style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary, color: COLORS.secondary }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </section>

      {/* SERVIZI */}
      <section 
        className="p-8 md:p-16"
        style={{ backgroundColor: COLORS.accent }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['E-COMMERCE', 'CORPORATE', 'PORTFOLIO'].map((type, i) => (
            <motion.div
              key={type}
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, backgroundColor: COLORS.primary, color: COLORS.secondary }}
              className="p-8 border-4 cursor-pointer"
              style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.primary, color: COLORS.primary }}
            >
              <h3 className="text-4xl font-black uppercase">{type}</h3>
              <p className="text-xl font-bold mt-4">Soluzioni su misura</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
