import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = {
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
  workspace: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
  lucca: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&h=800&fit=crop',
  coding: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
  abstract1: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&h=800&fit=crop',
  abstract2: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
};

const COLORS = {
  coral: '#FF6B6B',
  teal: '#4ECDC4',
  yellow: '#FFE66D',
  purple: '#9B5DE5',
  dark: '#1a1a1a',
};

export function ChiSiamoPage() {
  const team = [
    { name: 'Lorenzo', role: 'Creative & Code', color: COLORS.coral },
    { name: 'Marco', role: 'Development', color: COLORS.teal },
    { name: 'Giulia', role: 'Design & UX', color: COLORS.purple },
  ];

  return (
    <div className="bg-white text-black min-h-screen">
      {/* HERO - Colorato e minimal */}
      <section className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />
        
        {/* Forme colorate decorative */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.teal})` }}
        />
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-40 left-10 w-32 h-32 rounded-2xl opacity-30"
          style={{ backgroundColor: COLORS.yellow }}
        />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center p-8 md:p-16">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-medium tracking-widest uppercase mb-6"
              style={{ color: COLORS.teal }}
            >
              Tre menti, un'unica visione
            </motion.span>
            
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9]"
            >
              <span className="block">Chi</span>
              <span className="block" style={{ color: COLORS.coral }}>Siamo</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg mt-8 max-w-md leading-relaxed text-gray-600"
            >
              Siamo tre ragazzi di Lucca con una passione folle per il web. 
              Eterea nasce ora, in questo momento, con l'obiettivo di creare 
              esperienze digitali che non passano inosservate.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 mt-8"
            >
              <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: COLORS.yellow }}>
                #fresh
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: COLORS.teal, color: 'white' }}>
                #hungry
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: COLORS.coral, color: 'white' }}>
                #creative
              </span>
            </motion.div>
          </div>
          
          <div className="relative flex items-center justify-center p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div 
                className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl"
                style={{ borderColor: COLORS.teal }}
              >
                <img src={IMAGES.lucca} alt="Lucca" className="w-full h-full object-cover" />
              </div>
              <motion.div
                animate={{ rotate: -10 }}
                className="absolute -bottom-4 -right-4 bg-black text-white px-6 py-3 font-black text-sm uppercase"
              >
                Made in Lucca
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY - Minimal con accenti colorati */}
      <section className="py-24 px-8 md:px-16 border-t-2 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span 
                className="text-xs font-bold tracking-widest uppercase px-3 py-1 inline-block mb-6 text-white"
                style={{ backgroundColor: COLORS.purple }}
              >
                La Nascita
              </span>
              
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
                Non abbiamo <span style={{ color: COLORS.coral }}>20 anni</span> di storia
              </h2>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                E non lo nascondiamo. Eterea è nuova, fresca, con la voglia di 
                dimostrare quello che vale. Tre persone, tre competenze complementari, 
                un'unica visione: fare web fatto bene.
              </p>
              
              <p className="text-base leading-relaxed text-gray-600">
                Siamo nati a Lucca, tra le mura rinascimentali e il caffè della 
                piazza. Lavoriamo in remoto, senza ufficio fisico, ma con una 
                connessione quotidiana che ci tiene uniti più di qualsiasi sala riunioni.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden"
                style={{ backgroundColor: COLORS.yellow }}
              >
                <img src={IMAGES.workspace} alt="Workspace" className="w-full h-full object-cover mix-blend-multiply" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden mt-8"
                style={{ backgroundColor: COLORS.teal }}
              >
                <img src={IMAGES.coding} alt="Coding" className="w-full h-full object-cover mix-blend-multiply" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES - Card colorate minimal */}
      <section className="py-24 px-8 md:px-16 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-16 text-center">
            I Nostri <span style={{ color: COLORS.coral }}>Valori</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Onestà', 
                desc: 'Niente fronzoli, niente promesse impossibili. Quello che diciamo è quello che facciamo.',
                color: COLORS.coral 
              },
              { 
                title: 'Cura', 
                desc: 'Ogni progetto è il nostro progetto. Ci mettiamo la faccia, sempre.',
                color: COLORS.teal 
              },
              { 
                title: 'Innovazione', 
                desc: 'Siamo nuovi nel mercato, ma abbiamo idee fresche e voglia di sperimentare.',
                color: COLORS.yellow,
                textDark: true
              },
            ].map((val, i) => (
              <motion.div 
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: val.color, color: val.textDark ? '#000' : '#fff' }}
              >
                <span className="text-5xl font-black opacity-30">0{i + 1}</span>
                <h3 className="text-2xl font-black uppercase mt-4 mb-4">{val.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM - 3 persone reali */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
            Il <span style={{ color: COLORS.teal }}>Team</span>
          </h2>
          <p className="text-gray-600 mb-12 max-w-md">
            Tre persone, tre ruoli, una squadra. Ognuno porta il proprio 
            pezzo di competenza per creare progetti completi.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="group text-center"
              >
                <div 
                  className="aspect-square rounded-full overflow-hidden mb-6 mx-auto max-w-[250px] border-4 transition-all"
                  style={{ borderColor: member.color }}
                >
                  <div 
                    className="w-full h-full flex items-center justify-center text-6xl font-black"
                    style={{ backgroundColor: member.color, color: 'white' }}
                  >
                    {member.name[0]}
                  </div>
                </div>
                <h4 className="text-xl font-black uppercase">{member.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Colorato */}
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
