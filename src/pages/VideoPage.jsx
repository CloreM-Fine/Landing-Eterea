import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function VideoPage() {
  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: COLORS.primary }}
    >
      {/* HERO */}
      <section 
        className="min-h-[70vh] flex items-center justify-center p-8 border-b-8"
        style={{ borderColor: COLORS.accent }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-[10rem] font-black uppercase" style={{ color: COLORS.secondary }}>VIDEO</h1>
          <p className="text-2xl md:text-4xl font-bold mt-4" style={{ color: COLORS.accent }}>PRODUZIONE AUDIOVISIVA</p>
        </motion.div>
      </section>

      {/* CATEGORIE */}
      <section className="p-8 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'SPOT', bgColor: COLORS.accent, textColor: COLORS.primary },
            { title: 'DOCUMENTARI', bgColor: COLORS.secondary, textColor: COLORS.primary },
            { title: 'MOTION GRAPHICS', bgColor: `${COLORS.secondary}dd`, textColor: COLORS.primary },
            { title: 'DRONI', bgColor: COLORS.accent, textColor: COLORS.primary },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-video border-4 flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: item.bgColor, borderColor: COLORS.accent }}
            >
              <span className="text-4xl md:text-6xl font-black" style={{ color: item.textColor }}>{item.title}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section 
        className="p-8 md:p-16 border-t-8"
        style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.accent }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '4K', label: 'Quality' },
            { value: '60', label: 'FPS' },
            { value: '100+', label: 'Projects' },
            { value: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ rotate: -10 }}
              whileInView={{ rotate: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center border-4 p-6"
              style={{ borderColor: COLORS.primary }}
            >
              <div className="text-4xl md:text-6xl font-black" style={{ color: COLORS.primary }}>{stat.value}</div>
              <div className="text-lg font-bold uppercase" style={{ color: COLORS.primary }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
