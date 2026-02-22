import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const COLORS = {
  coral: '#FF6B6B',
  teal: '#4ECDC4',
  yellow: '#FFE66D',
  purple: '#9B5DE5',
  dark: '#1a1a1a',
};

const Section = ({ children, className = '', bg = 'bg-white' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-screen w-full ${bg} ${className}`}
    >
      {children}
    </motion.section>
  );
};

const Marquee = ({ text, direction = 'left', speed = 20 }) => {
  return (
    <div 
      className="overflow-hidden whitespace-nowrap py-6"
      style={{ backgroundColor: COLORS.dark }}
    >
      <motion.div
        animate={{ x: direction === 'left' ? [0, -1000] : [-1000, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="inline-block text-4xl md:text-6xl font-black uppercase tracking-tighter"
        style={{ color: COLORS.coral }}
      >
        {text} {text} {text} {text} {text}
      </motion.div>
    </div>
  );
};

const HoverBlock = ({ children, color }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        backgroundColor: color,
      }}
      transition={{ duration: 0.2 }}
      className="p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2 border-black"
    >
      {children}
    </motion.div>
  );
};

export function EtereaPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO SECTION - Colorato e minimal */}
      <section 
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.purple})` }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, type: 'spring' }}
          className="text-center z-10 text-white"
        >
          <h1 className="text-[18vw] md:text-[14vw] font-black uppercase leading-none tracking-tighter">
            ETEREA
          </h1>
          <motion.p 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-3xl mt-4 font-bold"
            style={{ color: COLORS.yellow }}
          >
            WEB AGENCY — LUCCA
          </motion.p>
        </motion.div>
        
        {/* Elementi decorativi */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-32 h-32 border-4 rounded-full"
          style={{ borderColor: COLORS.yellow }}
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-24 h-24 rotate-45"
          style={{ backgroundColor: COLORS.teal }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 text-white/60 text-sm"
        >
          Scendi per scoprire
        </motion.div>
      </section>

      {/* MARQUEE */}
      <Marquee text="FRESH × HUNGRY × CREATIVE × " direction="left" speed={15} />

      {/* CHI SIAMO - Colorato */}
      <Section style={{ backgroundColor: COLORS.yellow }}>
        <div className="p-8 md:p-16">
          <motion.h2 
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black uppercase mb-8"
          >
            CHI SIAMO
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HoverBlock color={COLORS.coral}>
              <p className="text-xl md:text-2xl font-bold leading-relaxed">
                TRE RAGAZZI DI LUCCA CON UNA PASSIONE FOLLE PER IL WEB.
              </p>
            </HoverBlock>
            
            <HoverBlock color={COLORS.teal}>
              <p className="text-xl md:text-2xl font-bold leading-relaxed">
                SITI WEB E GESTIONALI FATTI BENE, SENZA COMPLICAZIONI.
              </p>
            </HoverBlock>
          </div>
          
          {/* Stats - Reali */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { num: '5+', label: 'Progetti' },
              { num: '3', label: 'Persone' },
              { num: '0', label: 'Ufficio 🏠' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 text-center rounded-2xl border-2 border-black"
                style={{ backgroundColor: '#fff' }}
              >
                <div className="text-5xl md:text-7xl font-black" style={{ color: COLORS.purple }}>{stat.num}</div>
                <div className="text-sm md:text-base font-bold mt-2 uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* MARQUEE REVERSE */}
      <Marquee text="SITI WEB × GESTIONALI × BRAND × " direction="right" speed={12} />

      {/* SERVIZI - Minimal con accenti */}
      <Section style={{ backgroundColor: COLORS.teal }}>
        <div className="p-8 md:p-16">
          <motion.h2 
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black uppercase mb-8 text-white text-right"
          >
            SERVIZI
          </motion.h2>
          
          <div className="space-y-4">
            {['SITI WEB', 'GESTIONALI', 'BRAND IDENTITY', 'FOTOGRAFIA', 'SOCIAL MEDIA'].map((service, i) => (
              <motion.div
                key={service}
                initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  backgroundColor: '#000', 
                  color: '#fff',
                  x: i % 2 === 0 ? 20 : -20,
                }}
                className="p-6 rounded-2xl cursor-pointer transition-all border-2 border-black bg-white"
              >
                <span className="text-3xl md:text-5xl font-black uppercase">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROGETTI RECENTI */}
      <section className="min-h-screen p-8 md:p-16" style={{ backgroundColor: '#fff' }}>
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-5xl md:text-7xl font-black uppercase mb-12"
        >
          Progetti <span style={{ color: COLORS.coral }}>Recenti</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'colombinilelio.it', type: 'Sito Web', color: COLORS.coral },
            { name: 'dandawinebar.it', type: 'Sito Web', color: COLORS.teal },
            { name: 'welln.it', type: 'Sito Web', color: COLORS.purple },
            { name: 'Gestionale A', type: 'Web App', color: COLORS.yellow },
            { name: 'Gestionale B', type: 'Web App', color: COLORS.coral },
          ].map((project, i) => (
            <motion.a
              key={project.name}
              href={`https://${project.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group p-6 rounded-2xl border-2 border-black transition-all hover:shadow-xl"
              style={{ backgroundColor: project.color }}
            >
              <span className="text-xs font-bold tracking-widest uppercase opacity-60 block mb-2">
                {project.type}
              </span>
              <h3 className="text-2xl font-black uppercase group-hover:underline">
                {project.name}
              </h3>
              <div className="mt-4 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Visita →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CONTATTO */}
      <section 
        className="min-h-screen flex flex-col justify-center items-center p-8"
        style={{ backgroundColor: COLORS.dark }}
      >
        <motion.h2 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-6xl md:text-9xl font-black uppercase text-center mb-8 text-white"
        >
          PARLIAMO?
        </motion.h2>
        
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-xl md:text-3xl font-bold px-8 py-4 rounded-full transition-colors"
          style={{ backgroundColor: COLORS.coral, color: '#fff' }}
        >
          info@etereastudio.com
        </motion.a>
        
        <div className="mt-12 flex gap-4">
          {['Instagram', 'LinkedIn', 'GitHub'].map((social, i) => (
            <motion.button
              key={social}
              whileHover={{ y: -10 }}
              className="px-6 py-3 border-2 rounded-full font-bold text-white hover:text-black transition-colors"
              style={{ 
                borderColor: [COLORS.coral, COLORS.teal, COLORS.purple][i],
                backgroundColor: 'transparent'
              }}
            >
              {social}
            </motion.button>
          ))}
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-white/40 text-sm"
        >
          Eterea Studio — Lucca, Toscana
        </motion.p>
      </section>
    </div>
  );
}
