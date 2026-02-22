import React from 'react';
import { motion } from 'framer-motion';

export function Progettazione3DPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-gray-900 to-black text-white">
      {/* HERO */}
      <div className="p-8 md:p-16">
        <motion.h1
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl md:text-9xl font-black uppercase text-center"
        >
          3D
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-3xl font-bold mt-4 text-center text-gray-400"
        >
          Progettazione & Rendering
        </motion.p>
      </div>

      {/* SERVICES */}
      <div className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'MODELING', icon: '🎨', desc: 'Modellazione 3D' },
          { title: 'RENDER', icon: '📷', desc: 'Rendering fotorealistico' },
          { title: 'ANIMATION', icon: '🎬', desc: 'Animazione 3D' },
        ].map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? -2 : 2 }}
            className="bg-white text-black p-8 border-4 border-white"
          >
            <div className="text-6xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-black uppercase">{service.title}</h3>
            <p className="mt-2 font-bold">{service.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* SHOWCASE */}
      <div className="p-8 md:p-16">
        <h2 className="text-3xl md:text-6xl font-black uppercase mb-8">SHOWCASE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-white"
            >
              <div className="w-full h-full flex items-center justify-center text-4xl">🧊</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SOFTWARE */}
      <div className="p-8 md:p-16 bg-white text-black">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 text-center">SOFTWARE</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Blender', 'Cinema 4D', '3ds Max', 'Maya', 'Houdini'].map((sw, i) => (
            <motion.span
              key={sw}
              initial={{ rotate: -10, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.2, backgroundColor: '#000', color: '#fff' }}
              className="px-6 py-3 border-4 border-black text-xl font-black"
            >
              {sw}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
