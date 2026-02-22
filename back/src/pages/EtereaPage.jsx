import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const GlitchText = ({ text, className = '' }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-red-500 opacity-70 animate-pulse" style={{ clipPath: 'inset(0 0 50% 0)', transform: 'translateX(2px)' }}>{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-blue-500 opacity-70 animate-pulse" style={{ clipPath: 'inset(50% 0 0 0)', transform: 'translateX(-2px)' }}>{text}</span>
    </span>
  );
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
      className={`min-h-screen w-full ${bg} ${className} border-b-4 border-black`}
    >
      {children}
    </motion.section>
  );
};

const Marquee = ({ text, direction = 'left', speed = 20 }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-black text-white py-4">
      <motion.div
        animate={{ x: direction === 'left' ? [0, -1000] : [-1000, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="inline-block text-6xl md:text-8xl font-black uppercase tracking-tighter"
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
        rotate: Math.random() * 4 - 2,
        backgroundColor: color,
      }}
      transition={{ duration: 0.2 }}
      className="p-8 border-4 border-black cursor-pointer transition-colors duration-300"
    >
      {children}
    </motion.div>
  );
};

export function EtereaPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden border-b-8 border-red-500">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, type: 'spring' }}
          className="text-center z-10"
        >
          <h1 className="text-[15vw] md:text-[12vw] font-black uppercase leading-none tracking-tighter">
            <GlitchText text="ETEREA" />
          </h1>
          <motion.p 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-4xl mt-4 font-mono text-green-400"
          >
            DESIGN & DEVELOPMENT
          </motion.p>
        </motion.div>
        
        {/* Elementi decorativi */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-32 h-32 border-4 border-yellow-400 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-24 h-24 bg-purple-500 rotate-45"
        />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500" />
        <div className="absolute top-0 left-1/2 w-1 h-full bg-blue-500" />
      </section>

      {/* MARQUEE */}
      <Marquee text="CREATIVITÀ × INNOVAZIONE × DESIGN × " direction="left" speed={15} />

      {/* CHI SIAMO */}
      <Section bg="bg-yellow-300">
        <div className="p-8 md:p-16">
          <motion.h2 
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black uppercase mb-8 text-black"
          >
            CHI SIAMO
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HoverBlock color="#ff006e">
              <p className="text-xl md:text-2xl font-bold leading-relaxed">
                ETEREA STUDIO È UN'AGENZIA CREATIVA CHE ROMPE LE REGOLE. 
                NON CREDIAMO NEI LIMITI. NON CREDIAMO NEL "COME SI FA".
              </p>
            </HoverBlock>
            
            <HoverBlock color="#00f5ff">
              <p className="text-xl md:text-2xl font-bold leading-relaxed">
                CREIAMO ESPERIENZE DIGITALI CHE COLPISCONO. 
                DESIGN CHE PARLA. CODICE CHE BALLA.
              </p>
            </HoverBlock>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { num: '50+', label: 'PROGETTI' },
              { num: '30+', label: 'CLIENTI' },
              { num: '5+', label: 'ANNI' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ backgroundColor: '#000', color: '#fff', scale: 1.1 }}
                className="border-4 border-black p-6 text-center bg-white"
              >
                <div className="text-5xl md:text-7xl font-black">{stat.num}</div>
                <div className="text-sm md:text-lg font-bold mt-2 uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* SERVIZI */}
      <Section bg="bg-red-500">
        <div className="p-8 md:p-16">
          <motion.h2 
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black uppercase mb-8 text-white text-right"
          >
            SERVIZI
          </motion.h2>
          
          <div className="space-y-4">
            {['WEB DESIGN', 'SVILUPPO APP', 'BRAND IDENTITY', 'UI/UX DESIGN', 'MOTION GRAPHICS'].map((service, i) => (
              <motion.div
                key={service}
                initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  backgroundColor: '#000', 
                  color: '#fff',
                  x: i % 2 === 0 ? 20 : -20,
                  rotate: Math.random() * 2 - 1
                }}
                className="border-4 border-black bg-white p-6 cursor-pointer transition-all"
              >
                <span className="text-3xl md:text-5xl font-black uppercase">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* MARQUEE REVERSE */}
      <Marquee text="CONTATTACI × ORA × SUBITO × " direction="right" speed={10} />

      {/* CONTATTO */}
      <section className="min-h-screen bg-green-400 flex flex-col justify-center items-center border-t-8 border-black">
        <motion.h2 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-6xl md:text-9xl font-black uppercase text-center mb-8"
        >
          PARLIAMO?
        </motion.h2>
        
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="text-2xl md:text-4xl font-bold bg-black text-white px-8 py-4 border-4 border-white hover:bg-white hover:text-black transition-colors"
        >
          info@etereastudio.com
        </motion.a>
        
        <div className="mt-12 flex gap-4">
          {['Instagram', 'LinkedIn', 'GitHub'].map((social) => (
            <motion.button
              key={social}
              whileHover={{ y: -10, backgroundColor: '#ff006e' }}
              className="px-6 py-3 border-4 border-black bg-white font-bold"
            >
              {social}
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
