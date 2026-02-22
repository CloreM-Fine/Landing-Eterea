import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function GoogleSearchPage() {
  return (
    <div className="min-h-full" style={{ backgroundColor: COLORS.secondary }}>
      {/* HEADER */}
      <div 
        className="p-4 border-b-4"
        style={{ backgroundColor: COLORS.primary, borderColor: COLORS.accent }}
      >
        <div className="flex items-center gap-4">
          <div className="flex gap-0.5">
            <span className="text-3xl font-bold" style={{ color: COLORS.accent }}>G</span>
            <span className="text-3xl font-bold" style={{ color: COLORS.secondary }}>o</span>
            <span className="text-3xl font-bold" style={{ color: COLORS.accent }}>o</span>
            <span className="text-3xl font-bold" style={{ color: COLORS.secondary }}>g</span>
            <span className="text-3xl font-bold" style={{ color: COLORS.accent }}>l</span>
            <span className="text-3xl font-bold" style={{ color: COLORS.secondary }}>e</span>
          </div>
          <div 
            className="flex-1 rounded-full px-4 py-2 border-2 flex items-center shadow-sm"
            style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.accent }}
          >
            <span style={{ color: COLORS.primary }}>eterea studio</span>
            <span className="ml-auto">🔍</span>
          </div>
        </div>
      </div>

      {/* SEARCH RESULTS */}
      <div className="p-4">
        <p className="text-sm mb-4" style={{ color: `${COLORS.primary}80` }}>Circa 42.000 risultati (0.32 secondi)</p>
        
        {/* Result 1 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 p-4 border-2 rounded-lg transition-colors"
          style={{ borderColor: `${COLORS.primary}20` }}
        >
          <div className="text-sm" style={{ color: `${COLORS.primary}aa` }}>https://eterea.studio</div>
          <h3 
            className="text-xl font-medium hover:underline cursor-pointer"
            style={{ color: COLORS.accent }}
          >
            Eterea Studio - Design & Development
          </h3>
          <p className="mt-1" style={{ color: COLORS.primary }}>
            Eterea Studio è un'agenzia creativa specializzata in web design, sviluppo e branding.
          </p>
        </motion.div>

        {/* Result 2 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 border-2 rounded-lg transition-colors"
          style={{ borderColor: `${COLORS.primary}20` }}
        >
          <div className="text-sm" style={{ color: `${COLORS.primary}aa` }}>https://instagram.com/eterea.studio</div>
          <h3 
            className="text-xl font-medium hover:underline cursor-pointer"
            style={{ color: COLORS.accent }}
          >
            Eterea Studio (@eterea.studio) • Instagram
          </h3>
          <p className="mt-1" style={{ color: COLORS.primary }}>
            Segui i nostri progetti più recenti su Instagram.
          </p>
        </motion.div>

        {/* Result 3 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-4 border-2 rounded-lg transition-colors"
          style={{ borderColor: `${COLORS.primary}20` }}
        >
          <div className="text-sm" style={{ color: `${COLORS.primary}aa` }}>https://linkedin.com/company/eterea-studio</div>
          <h3 
            className="text-xl font-medium hover:underline cursor-pointer"
            style={{ color: COLORS.accent }}
          >
            Eterea Studio | LinkedIn
          </h3>
          <p className="mt-1" style={{ color: COLORS.primary }}>
            Scopri di più sulla nostra azienda e i nostri servizi.
          </p>
        </motion.div>

        {/* Related searches */}
        <div 
          className="mt-8 p-4 rounded-lg"
          style={{ backgroundColor: `${COLORS.primary}10` }}
        >
          <h4 className="font-bold mb-3" style={{ color: COLORS.primary }}>Ricerche correlate</h4>
          <div className="flex flex-wrap gap-2">
            {['web design roma', 'agenzia creativa', 'branding', 'sviluppo app'].map((term) => (
              <span 
                key={term} 
                className="px-3 py-1 border rounded-full text-sm cursor-pointer transition-colors"
                style={{ 
                  backgroundColor: COLORS.secondary, 
                  borderColor: COLORS.primary,
                  color: COLORS.primary 
                }}
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
