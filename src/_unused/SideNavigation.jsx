import React from 'react';
import { motion } from 'framer-motion';


export function SideNavigation({ onNavigate, currentPage, onRestoreDesktop, showRestore, isFinderLight }) {
  const navItems = [
    { id: 'chi-siamo', label: 'CHI SIAMO' },
    { id: 'contatti', label: 'CONTATTI' },
    { id: 'servizi', label: 'SERVIZI' },
    { id: 'work', label: 'WORK' },
  ];

  return (
    <>
      {/* Barra navigazione in alto - stessa riga della TopBar */}
      <div className="fixed left-6 top-6 z-[100] flex items-center gap-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 rounded-full border-2 text-xs font-black uppercase tracking-wider
              transition-all duration-300
              ${isFinderLight
                ? // Tema chiaro: pulsanti scuri
                  (currentPage === item.id
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent text-black border-black hover:bg-black hover:text-white'
                  )
                : // Tema scuro: pulsanti chiari
                  (currentPage === item.id
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                  )
              }
            `}
          >
            {item.label}
          </motion.button>
        ))}
      </div>

      {/* Pulsante Ripristina Scrivania in alto a destra */}
      {showRestore && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-6 top-6 z-[100]"
        >
          <button
            onClick={onRestoreDesktop}
            className={`
              px-4 py-2 text-xs font-black uppercase tracking-wider border-2 transition-colors
              ${isFinderLight
                ? 'bg-black text-white border-black hover:bg-white hover:text-black'
                : 'bg-white text-black border-white hover:bg-black hover:text-white'
              }
            `}
          >
            ← Ripristina Scrivania
          </button>
        </motion.div>
      )}
    </>
  );
}
