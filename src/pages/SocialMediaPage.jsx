import React from 'react';
import { motion } from 'framer-motion';

export function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500">
      {/* HERO */}
      <section className="min-h-[70vh] flex items-center justify-center p-8 border-b-8 border-black bg-white">
        <motion.h1
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-[10rem] font-black uppercase text-center"
        >
          SOCIAL
        </motion.h1>
      </section>

      {/* PIATTAFORME */}
      <section className="p-8 md:p-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
            { name: 'TikTok', icon: '🎵', color: 'bg-black text-white' },
            { name: 'Facebook', icon: '👥', color: 'bg-blue-600' },
            { name: 'LinkedIn', icon: '💼', color: 'bg-blue-800' },
          ].map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`${platform.color} p-8 border-4 border-black aspect-square flex flex-col items-center justify-center`}
            >
              <span className="text-6xl mb-4">{platform.icon}</span>
              <span className="text-xl md:text-2xl font-black">{platform.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVIZI */}
      <section className="bg-yellow-300 p-8 md:p-16 border-t-8 border-black">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-12">SERVIZI</h2>
        <div className="space-y-4">
          {['Content Creation', 'Social Strategy', 'Community Management', 'Paid Ads'].map((service, i) => (
            <motion.div
              key={service}
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 50, backgroundColor: '#000', color: '#fff' }}
              className="bg-white p-6 border-4 border-black text-2xl md:text-4xl font-black cursor-pointer"
            >
              {service}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
