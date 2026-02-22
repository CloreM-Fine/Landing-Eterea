import React from 'react';
import { motion } from 'framer-motion';

export function GraficaPage() {
  return (
    <div className="min-h-full bg-white">
      {/* HERO */}
      <div className="bg-black text-white p-8 md:p-16">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl md:text-8xl font-black uppercase leading-none"
        >
          GRAFICA
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-3xl font-bold mt-4 text-gray-400"
        >
          Brand Identity & Visual Design
        </motion.p>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          className="bg-yellow-400 p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-black"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase">BRAND</h2>
          <ul className="mt-6 space-y-2 text-lg font-bold">
            <li>Logo Design</li>
            <li>Brand Identity</li>
            <li>Guidelines</li>
            <li>Brand Strategy</li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          className="bg-blue-400 p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase">PRINT</h2>
          <ul className="mt-6 space-y-2 text-lg font-bold">
            <li>Brochure</li>
            <li>Flyer</li>
            <li>Packaging</li>
            <li>Editorial</li>
          </ul>
        </motion.div>
      </div>

      {/* COLOR PALETTE */}
      <div className="p-8 md:p-16 bg-gray-100">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">PALETTE</h2>
        <div className="flex flex-wrap gap-4">
          {['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'].map((color, i) => (
            <motion.div
              key={color}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="w-24 h-24 md:w-32 md:h-32 border-4 border-black"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        className="bg-black text-white p-8 md:p-16 text-center"
      >
        <h2 className="text-3xl md:text-6xl font-black uppercase">PRONTI A INIZIARE?</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 bg-white text-black text-xl font-black uppercase border-4 border-white hover:bg-black hover:text-white transition-colors"
        >
          Contattaci
        </motion.button>
      </motion.div>
    </div>
  );
}
