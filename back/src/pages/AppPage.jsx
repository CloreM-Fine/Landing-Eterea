import React from 'react';
import { motion } from 'framer-motion';

export function AppPage() {
  return (
    <div className="min-h-full bg-white">
      {/* HERO */}
      <div className="bg-purple-600 text-white p-8 md:p-16">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
          className="text-5xl md:text-9xl font-black uppercase"
        >
          APP
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-3xl font-bold mt-4"
        >
          Sviluppo Mobile iOS & Android
        </motion.p>
      </div>

      {/* PLATFORMS */}
      <div className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.02, rotate: -1 }}
          className="bg-black text-white p-8 border-4 border-black"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase flex items-center gap-4">
            <span>🍎</span> iOS
          </h2>
          <ul className="mt-6 space-y-2 text-lg font-bold">
            <li>Swift & SwiftUI</li>
            <li>Native Performance</li>
            <li>App Store Optimization</li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.02, rotate: 1 }}
          className="bg-green-500 text-white p-8 border-4 border-black"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase flex items-center gap-4">
            <span>🤖</span> Android
          </h2>
          <ul className="mt-6 space-y-2 text-lg font-bold">
            <li>Kotlin & Jetpack Compose</li>
            <li>Material Design</li>
            <li>Play Store Publishing</li>
          </ul>
        </motion.div>
      </div>

      {/* CROSS PLATFORM */}
      <div className="p-8 md:p-16 bg-gray-100">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 text-center">CROSS PLATFORM</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: 'React Native', color: 'bg-blue-500' },
            { name: 'Flutter', color: 'bg-cyan-500' },
            { name: 'Ionic', color: 'bg-blue-700' },
            { name: 'PWA', color: 'bg-purple-500' },
          ].map((tech, i) => (
            <motion.span
              key={tech.name}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className={`${tech.color} text-white px-8 py-4 text-xl font-black border-4 border-black`}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div className="p-8 md:p-16 bg-yellow-300 border-t-4 border-black">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">PROCESSO</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: '01', title: 'Discovery' },
            { num: '02', title: 'Design' },
            { num: '03', title: 'Develop' },
            { num: '04', title: 'Deploy' },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white p-6 border-4 border-black text-center"
            >
              <div className="text-4xl font-black text-gray-300">{step.num}</div>
              <div className="text-xl font-black mt-2">{step.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
