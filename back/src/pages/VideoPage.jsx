import React from 'react';
import { motion } from 'framer-motion';

export function VideoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="min-h-[70vh] flex items-center justify-center p-8 border-b-8 border-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-[10rem] font-black uppercase">VIDEO</h1>
          <p className="text-2xl md:text-4xl font-bold text-gray-400 mt-4">PRODUZIONE AUDIOVISIVA</p>
        </motion.div>
      </section>

      {/* CATEGORIE */}
      <section className="p-8 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'SPOT', color: 'bg-red-600' },
            { title: 'DOCUMENTARI', color: 'bg-blue-600' },
            { title: 'MOTION GRAPHICS', color: 'bg-purple-600' },
            { title: 'DRONI', color: 'bg-green-600' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className={`${item.color} aspect-video border-4 border-white flex items-center justify-center cursor-pointer`}
            >
              <span className="text-4xl md:text-6xl font-black">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white text-black p-8 md:p-16 border-t-8 border-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '4K', label: 'Quality' },
            { value: '60', label: 'FPS' },
            { value: '100+', label: 'Projects' },
            { value: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ rotate: -10 }}
              whileInView={{ rotate: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center border-4 border-black p-6"
            >
              <div className="text-4xl md:text-6xl font-black">{stat.value}</div>
              <div className="text-lg font-bold uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
