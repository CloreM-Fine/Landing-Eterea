import React from 'react';
import { motion } from 'framer-motion';

export function SitiWebPage() {
  const techs = ['React', 'Next.js', 'Vue', 'Tailwind', 'Node.js', 'Three.js'];
  
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-blue-600 text-white min-h-[70vh] flex items-center justify-center p-8 border-b-8 border-black">
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-[10rem] font-black uppercase">SITI WEB</h1>
          <p className="text-3xl md:text-5xl font-bold mt-4">TECNOLOGIE MODERNE</p>
        </motion.div>
      </section>

      {/* TECNOLOGIE */}
      <section className="bg-yellow-300 p-8 md:p-16">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 text-center">STACK</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.3, rotate: Math.random() * 20 - 10, backgroundColor: '#000', color: '#fff' }}
              className="px-8 py-4 bg-white border-4 border-black text-2xl font-black"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </section>

      {/* SERVIZI */}
      <section className="bg-green-400 p-8 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['E-COMMERCE', 'CORPORATE', 'PORTFOLIO'].map((type, i) => (
            <motion.div
              key={type}
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
              className="bg-white p-8 border-4 border-black cursor-pointer"
            >
              <h3 className="text-4xl font-black uppercase">{type}</h3>
              <p className="text-xl font-bold mt-4">Soluzioni su misura</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
