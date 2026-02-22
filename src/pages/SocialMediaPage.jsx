import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function SocialMediaPage() {
  return (
    <div 
      className="min-h-screen"
      style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primary}ee)` }}
    >
      {/* HERO */}
      <section 
        className="min-h-[70vh] flex items-center justify-center p-8 border-b-8"
        style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.accent }}
      >
        <motion.h1
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-[10rem] font-black uppercase text-center"
          style={{ color: COLORS.primary }}
        >
          SOCIAL
        </motion.h1>
      </section>

      {/* PIATTAFORME */}
      <section className="p-8 md:p-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Instagram', icon: '📷', bgColor: COLORS.accent, textColor: COLORS.primary },
            { name: 'TikTok', icon: '🎵', bgColor: COLORS.primary, textColor: COLORS.secondary, border: `2px solid ${COLORS.accent}` },
            { name: 'Facebook', icon: '👥', bgColor: COLORS.secondary, textColor: COLORS.primary },
            { name: 'LinkedIn', icon: '💼', bgColor: COLORS.accent, textColor: COLORS.primary },
          ].map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-8 border-4 aspect-square flex flex-col items-center justify-center"
              style={{ 
                backgroundColor: platform.bgColor, 
                color: platform.textColor,
                borderColor: COLORS.primary
              }}
            >
              <span className="text-6xl mb-4">{platform.icon}</span>
              <span className="text-xl md:text-2xl font-black">{platform.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVIZI */}
      <section 
        className="p-8 md:p-16 border-t-8"
        style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.accent }}
      >
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-12" style={{ color: COLORS.primary }}>SERVIZI</h2>
        <div className="space-y-4">
          {['Content Creation', 'Social Strategy', 'Community Management', 'Paid Ads'].map((service, i) => (
            <motion.div
              key={service}
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 50, backgroundColor: COLORS.primary, color: COLORS.secondary }}
              className="p-6 border-4 text-2xl md:text-4xl font-black cursor-pointer"
              style={{ backgroundColor: COLORS.accent, borderColor: COLORS.primary, color: COLORS.primary }}
            >
              {service}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
