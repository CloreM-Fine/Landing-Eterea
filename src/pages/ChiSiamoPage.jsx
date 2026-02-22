import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = {
  lucca: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&h=800&fit=crop',
  workspace: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
  design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
};

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function ChiSiamoPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.primary }}>
      {/* HERO */}
      <section className="min-h-screen relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${COLORS.primary}f0, ${COLORS.primary}c0)` }}
        />
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.secondary})` }}
        />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center p-8 md:p-16">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-medium tracking-widest uppercase mb-6"
              style={{ color: COLORS.accent }}
            >
              Chi Siamo
            </motion.span>
            
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] text-white"
            >
              <span className="block">Tre</span>
              <span className="block" style={{ color: COLORS.accent }}>Menti</span>
              <span className="block text-4xl md:text-5xl mt-4" style={{ color: COLORS.secondary }}>Creative</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg mt-8 max-w-md leading-relaxed"
              style={{ color: COLORS.secondary }}
            >
              Siamo tre ragazzi uniti dalla passione per il web design e la voglia di creare 
              esperienze digitali uniche. Crediamo nell'equilibrio tra estetica e funzionalità.
            </motion.p>
          </div>
          
          <div className="flex items-center justify-center p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div 
                className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 shadow-2xl"
                style={{ borderColor: COLORS.accent }}
              >
                <img src={IMAGES.lucca} alt="Lucca" className="w-full h-full object-cover" />
              </div>
              <motion.div
                animate={{ rotate: -10 }}
                className="absolute -bottom-4 -right-4 px-6 py-3 font-black text-sm uppercase rounded-full"
                style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
              >
                Lucca
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COSA FACCIAMO */}
      <section className="py-24 px-8 md:px-16 border-t-2" style={{ backgroundColor: COLORS.secondary, borderColor: `${COLORS.primary}20` }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span 
                className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full inline-block mb-6"
                style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}
              >
                La Nostra Visione
              </span>
              
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight" style={{ color: COLORS.primary }}>
                Design che <span style={{ color: COLORS.accent }}>parla</span>
              </h2>
              
              <p className="text-lg leading-relaxed mb-4" style={{ color: COLORS.primary }}>
                Ci occupiamo di web design con un approccio che unisce la cura per i dettagli 
                tipica del mondo della moda alla funzionalità essenziale del design contemporaneo.
              </p>
              
              <p className="text-base leading-relaxed" style={{ color: `${COLORS.primary}cc` }}>
                Ogni progetto è un'opportunità per raccontare una storia attraverso 
                immagini, tipografia e interazioni thoughtful.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden"
                style={{ backgroundColor: COLORS.primary }}
              >
                <img src={IMAGES.design} alt="Design" className="w-full h-full object-cover opacity-80" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden mt-8"
                style={{ backgroundColor: COLORS.accent }}
              >
                <img src={IMAGES.workspace} alt="Workspace" className="w-full h-full object-cover opacity-80" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* COME LAVORIAMO */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-16 text-center text-white">
            Il Nostro <span style={{ color: COLORS.accent }}>Approccio</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Ascolto', 
                desc: 'Partiamo dalle tue esigenze reali. Ogni progetto inizia con una conversazione.',
                bgColor: COLORS.accent,
                textColor: COLORS.primary
              },
              { 
                title: 'Progettazione', 
                desc: 'Disegniamo esperienze che combinano bellezza visiva e funzionalità.',
                bgColor: COLORS.secondary,
                textColor: COLORS.primary
              },
              { 
                title: 'Sviluppo', 
                desc: 'Costruiamo con tecnologie moderne, codice pulito e performance ottimali.',
                bgColor: `${COLORS.primary}`,
                textColor: COLORS.secondary,
                border: `2px solid ${COLORS.accent}`
              },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl"
                style={{ 
                  backgroundColor: item.bgColor, 
                  color: item.textColor,
                  border: item.border || 'none'
                }}
              >
                <span className="text-5xl font-black opacity-30">0{i + 1}</span>
                <h3 className="text-2xl font-black uppercase mt-4 mb-4">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
        className="min-h-[60vh] flex flex-col justify-center items-center p-8 text-center"
        style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.secondary})` }}
      >
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-6" style={{ color: COLORS.primary }}>
          Lavoriamo insieme?
        </h2>
        <p className="text-lg max-w-md mb-8" style={{ color: `${COLORS.primary}cc` }}>
          Siamo pronti a metterci in gioco sul tuo progetto.
        </p>
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          className="px-10 py-5 text-sm font-black uppercase tracking-widest rounded-full"
          style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}
        >
          Scrivici ora →
        </motion.a>
      </section>
    </div>
  );
}
