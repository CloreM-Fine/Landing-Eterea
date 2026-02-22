import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = {
  lucca: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&h=800&fit=crop',
  workspace: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
  design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
};

const COLORS = {
  coral: '#FF6B6B',
  teal: '#4ECDC4',
  yellow: '#FFE66D',
  purple: '#9B5DE5',
};

export function ChiSiamoPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      {/* HERO */}
      <section className="min-h-screen relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${COLORS.coral}15, ${COLORS.teal}15)` }}
        />
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.teal})` }}
        />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center p-8 md:p-16">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-medium tracking-widest uppercase mb-6"
              style={{ color: COLORS.teal }}
            >
              Chi Siamo
            </motion.span>
            
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9]"
            >
              <span className="block">Tre</span>
              <span className="block" style={{ color: COLORS.coral }}>Menti</span>
              <span className="block text-4xl md:text-5xl mt-4">Creative</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg mt-8 max-w-md leading-relaxed text-gray-600"
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
                className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl"
                style={{ borderColor: COLORS.teal }}
              >
                <img src={IMAGES.lucca} alt="Lucca" className="w-full h-full object-cover" />
              </div>
              <motion.div
                animate={{ rotate: -10 }}
                className="absolute -bottom-4 -right-4 px-6 py-3 text-white font-black text-sm uppercase rounded-full"
                style={{ backgroundColor: COLORS.purple }}
              >
                Lucca
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COSA FACCIAMO */}
      <section className="py-24 px-8 md:px-16 border-t-2 border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span 
                className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full inline-block mb-6 text-white"
                style={{ backgroundColor: COLORS.purple }}
              >
                La Nostra Visione
              </span>
              
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
                Design che <span style={{ color: COLORS.coral }}>parla</span>
              </h2>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                Ci occupiamo di web design con un approccio che unisce la cura per i dettagli 
                tipica del mondo della moda alla funzionalità essenziale del design contemporaneo.
              </p>
              
              <p className="text-base leading-relaxed text-gray-600">
                Ogni progetto è un'opportunità per raccontare una storia attraverso 
                immagini, tipografia e interazioni thoughtful.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden"
                style={{ backgroundColor: COLORS.yellow }}
              >
                <img src={IMAGES.design} alt="Design" className="w-full h-full object-cover mix-blend-multiply" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden mt-8"
                style={{ backgroundColor: COLORS.teal }}
              >
                <img src={IMAGES.workspace} alt="Workspace" className="w-full h-full object-cover mix-blend-multiply" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* COME LAVORIAMO */}
      <section className="py-24 px-8 md:px-16" style={{ backgroundColor: COLORS.dark, color: 'white' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-16 text-center">
            Il Nostro <span style={{ color: COLORS.coral }}>Approccio</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Ascolto', 
                desc: 'Partiamo dalle tue esigenze reali. Ogni progetto inizia con una conversazione.',
                color: COLORS.coral 
              },
              { 
                title: 'Progettazione', 
                desc: 'Disegniamo esperienze che combinano bellezza visiva e funzionalità.',
                color: COLORS.teal 
              },
              { 
                title: 'Sviluppo', 
                desc: 'Costruiamo con tecnologie moderne, codice pulito e performance ottimali.',
                color: COLORS.purple 
              },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: item.color, color: '#fff' }}
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
        style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.purple})` }}
      >
        <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-6">
          Lavoriamo insieme?
        </h2>
        <p className="text-white/80 text-lg max-w-md mb-8">
          Siamo pronti a metterci in gioco sul tuo progetto.
        </p>
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          className="bg-white text-black px-10 py-5 text-sm font-black uppercase tracking-widest rounded-full"
        >
          Scrivici ora →
        </motion.a>
      </section>
    </div>
  );
}
