import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function EtereaPage() {
  const projects = [
    { name: 'colombinilelio.it', type: 'Sito Web', bgColor: COLORS.primary, textColor: COLORS.secondary },
    { name: 'dandawinebar.it', type: 'Sito Web', bgColor: COLORS.secondary, textColor: COLORS.primary },
    { name: 'welln.it', type: 'Sito Web', bgColor: COLORS.accent, textColor: COLORS.primary },
    { name: 'Gestionale Progetti', type: 'Web App', bgColor: `${COLORS.primary}dd`, textColor: COLORS.secondary, border: `2px solid ${COLORS.accent}` },
    { name: 'Gestionale CRM', type: 'Web App', bgColor: COLORS.accent, textColor: COLORS.primary },
  ];

  return (
    <div style={{ backgroundColor: COLORS.primary }}>
      {/* HERO */}
      <section 
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-8"
        style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primary}dd)` }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter" style={{ color: COLORS.secondary }}>
            ETEREA
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-bold" style={{ color: COLORS.accent }}>
            WEB AGENCY — LUCCA
          </p>
        </motion.div>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-32 h-32 border-4 rounded-full"
          style={{ borderColor: `${COLORS.accent}40` }}
        />
      </section>

      {/* CHI SIAMO */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: COLORS.secondary }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black uppercase mb-8"
            style={{ color: COLORS.primary }}
          >
            Chi Siamo
          </motion.h2>
          
          <p className="text-xl md:text-2xl font-bold leading-relaxed mb-8" style={{ color: COLORS.primary }}>
            TRE RAGAZZI UNITI DALLA PASSIONE PER IL WEB DESIGN.
          </p>
          
          <p className="text-base max-w-2xl mx-auto" style={{ color: `${COLORS.primary}cc` }}>
            Esperienza nel mondo della moda e del design, ora canalizzata nella 
            creazione di esperienze digitali. Siti web e gestionali fatti con cura.
          </p>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: `${COLORS.primary}f0` }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 text-center" style={{ color: COLORS.secondary }}>
            Servizi
          </h2>
          
          <div className="space-y-4">
            {['SITI WEB', 'GESTIONALI', 'BRAND IDENTITY', 'FOTOGRAFIA', 'SOCIAL MEDIA'].map((service, i) => (
              <motion.div
                key={service}
                initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center"
                style={{ backgroundColor: i === 0 ? COLORS.accent : COLORS.secondary }}
              >
                <span className="text-2xl md:text-4xl font-black uppercase" style={{ color: COLORS.primary }}>{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGETTI */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: COLORS.secondary }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 text-center" style={{ color: COLORS.primary }}>
            Progetti <span style={{ color: COLORS.accent }}>Recenti</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.a
                key={project.name}
                href={`https://${project.name}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl text-center"
                style={{ 
                  backgroundColor: project.bgColor, 
                  color: project.textColor,
                  border: project.border || 'none'
                }}
              >
                <span className="text-xs font-bold tracking-widest uppercase opacity-60 block mb-2">
                  {project.type}
                </span>
                <h3 className="text-xl font-black">{project.name}</h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTO */}
      <section 
        className="min-h-[60vh] flex flex-col justify-center items-center p-8"
        style={{ backgroundColor: COLORS.primary }}
      >
        <h2 className="text-5xl md:text-7xl font-black uppercase text-center mb-8" style={{ color: COLORS.secondary }}>
          Parliamo?
        </h2>
        
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          className="px-8 py-4 text-lg font-black uppercase rounded-full"
          style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
        >
          info@etereastudio.com
        </motion.a>
      </section>
    </div>
  );
}
