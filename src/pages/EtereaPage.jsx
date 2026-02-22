import React from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  coral: '#FF6B6B',
  teal: '#4ECDC4',
  yellow: '#FFE66D',
  purple: '#9B5DE5',
  dark: '#1a1a1a',
};

export function EtereaPage() {
  const projects = [
    { name: 'colombinilelio.it', type: 'Sito Web', color: COLORS.coral },
    { name: 'dandawinebar.it', type: 'Sito Web', color: COLORS.teal },
    { name: 'welln.it', type: 'Sito Web', color: COLORS.purple },
    { name: 'Gestionale Progetti', type: 'Web App', color: COLORS.yellow, dark: true },
    { name: 'Gestionale CRM', type: 'Web App', color: COLORS.coral },
  ];

  return (
    <div style={{ backgroundColor: '#fafafa' }}>
      {/* HERO */}
      <section 
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-8"
        style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.purple})` }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 text-white"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter">
            ETEREA
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-bold" style={{ color: COLORS.yellow }}>
            WEB AGENCY — LUCCA
          </p>
        </motion.div>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-32 h-32 border-4 border-white/30 rounded-full"
        />
      </section>

      {/* CHI SIAMO */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: COLORS.yellow }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black uppercase mb-8"
          >
            Chi Siamo
          </motion.h2>
          
          <p className="text-xl md:text-2xl font-bold leading-relaxed mb-8">
            TRE RAGAZZI UNITI DALLA PASSIONE PER IL WEB DESIGN.
          </p>
          
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Esperienza nel mondo della moda e del design, ora canalizzata nella 
            creazione di esperienze digitali. Siti web e gestionali fatti con cura.
          </p>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: COLORS.teal }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 text-white text-center">
            Servizi
          </h2>
          
          <div className="space-y-4">
            {['SITI WEB', 'GESTIONALI', 'BRAND IDENTITY', 'FOTOGRAFIA', 'SOCIAL MEDIA'].map((service, i) => (
              <motion.div
                key={service}
                initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white text-center"
              >
                <span className="text-2xl md:text-4xl font-black uppercase">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGETTI */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 text-center">
            Progetti <span style={{ color: COLORS.coral }}>Recenti</span>
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
                  backgroundColor: project.color, 
                  color: project.dark ? '#000' : '#fff' 
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
        style={{ backgroundColor: COLORS.dark }}
      >
        <h2 className="text-5xl md:text-7xl font-black uppercase text-center mb-8 text-white">
          Parliamo?
        </h2>
        
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          className="px-8 py-4 text-lg font-black uppercase rounded-full text-white"
          style={{ backgroundColor: COLORS.coral }}
        >
          info@etereastudio.com
        </motion.a>
      </section>
    </div>
  );
}
