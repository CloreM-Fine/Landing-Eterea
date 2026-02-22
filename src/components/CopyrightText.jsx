import React from 'react';

export function CopyrightText({ colors, isMobile = false }) {
  if (isMobile) {
    // Versione mobile - orizzontale in fondo alla pagina
    return (
      <div className="text-center py-4">
        <p 
          className="text-[10px] tracking-wider uppercase"
          style={{ color: colors.copyright }}
        >
          © Eterea Studio • Di Lorenzo Puccetti • P.IVA 12345678901 • 2026 
        </p>
      </div>
    );
  }

  // Versione desktop - verticale a sinistra
  return (
    <div 
      className="fixed left-8 bottom-8 z-40"
      style={{
        transform: 'rotate(-90deg)',
        transformOrigin: 'bottom left',
      }}
    >
      <p 
        className="text-[10px] tracking-widest uppercase whitespace-nowrap"
        style={{ color: colors.copyright }}
      >
       © Eterea Studio • Di Lorenzo Puccetti • P.IVA 12345678901 • 2026
      </p>
    </div>
  );
}
