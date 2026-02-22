import React from 'react';
import { motion } from 'framer-motion';

export function GoogleMapsPage() {
  return (
    <div className="min-h-full bg-white">
      {/* HEADER */}
      <div className="bg-gray-100 p-4 border-b-4 border-black flex items-center gap-4">
        <div className="flex gap-2">
          <span className="text-blue-500 text-2xl font-bold">G</span>
          <span className="text-red-500 text-2xl font-bold">o</span>
          <span className="text-yellow-500 text-2xl font-bold">o</span>
          <span className="text-blue-500 text-2xl font-bold">g</span>
          <span className="text-green-500 text-2xl font-bold">l</span>
          <span className="text-red-500 text-2xl font-bold">e</span>
        </div>
        <span className="text-2xl font-black">Maps</span>
      </div>

      {/* MAP AREA */}
      <div className="aspect-video bg-gray-200 relative border-b-4 border-black">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="text-6xl">📍</div>
        </motion.div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-gray-300/50" />
          ))}
        </div>
      </div>

      {/* INFO */}
      <div className="p-6 bg-white">
        <motion.h2
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="text-3xl font-black"
        >
          Eterea Studio
        </motion.h2>
        <p className="text-gray-600 font-bold mt-2">Via Example, 123, 00100 Roma RM</p>
        
        <div className="flex gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-blue-500 text-white py-3 font-bold rounded-full"
          >
            Indicazioni
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gray-100 py-3 font-bold rounded-full border-2 border-gray-300"
          >
            Salva
          </motion.button>
        </div>
      </div>
    </div>
  );
}
