import React from 'react';
import { motion } from 'framer-motion';

export function MapsPage() {
  return (
    <div className="min-h-screen bg-[#AED9E0]">
      {/* HERO */}
      <section className="min-h-[60vh] flex items-center justify-center p-8 bg-[#5E6472] text-white">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-9xl font-black uppercase">DOVE SIAMO</h1>
          <p className="text-2xl md:text-4xl font-bold mt-4">VIENI A TROVARCI</p>
        </motion.div>
      </section>

      {/* INFO CARDS */}
      <section className="p-8 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="bg-[#FAF3DD] p-8 border-4 border-black"
          >
            <h3 className="text-3xl font-black uppercase mb-4">INDIRIZZO</h3>
            <p className="text-xl font-bold">Via Example, 123</p>
            <p className="text-xl font-bold">00100 Roma RM</p>
          </motion.div>
          
          <motion.div
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#B8F2E6] p-8 border-4 border-black"
          >
            <h3 className="text-3xl font-black uppercase mb-4">ORARI</h3>
            <p className="text-xl font-bold">Lun-Ven: 9:00-18:00</p>
            <p className="text-xl font-bold">Sab-Dom: Chiuso</p>
          </motion.div>
          
          <motion.div
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="bg-[#FFA69E] p-8 border-4 border-black"
          >
            <h3 className="text-3xl font-black uppercase mb-4">CONTATTO</h3>
            <p className="text-xl font-bold">info@eterea.studio</p>
            <p className="text-xl font-bold">+39 123 456 789</p>
          </motion.div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="p-8 md:p-16">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="aspect-video bg-[#5E6472] border-4 border-black flex items-center justify-center"
        >
          <span className="text-6xl">🗺️</span>
        </motion.div>
      </section>
    </div>
  );
}
