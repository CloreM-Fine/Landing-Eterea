import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = {
  office: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=800&fit=crop',
  meeting: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
};

export function ContattiPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* HERO */}
      <section className="min-h-[70vh] border-b-2 border-black relative">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="text-xs font-mono tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
            Get in Touch — Let's Talk
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
          <div className="flex flex-col justify-center p-8 md:p-16">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <span className="font-mono text-xs border border-black px-3 py-1 inline-block mb-6">CONTATTI</span>
              <h1 className="text-4xl md:text-6xl font-black uppercase leading-none">Parliamo del tuo progetto</h1>
              <p className="text-sm mt-6 max-w-lg leading-relaxed">
                Siamo sempre interessati a nuove sfide. Che tu abbia un'idea chiara o solo un'intuizione, contattaci.
              </p>
            </motion.div>
          </div>
          <div className="relative">
            <img src={IMAGES.office} alt="Office" className="w-full h-full object-cover grayscale border-l-2 border-black" />
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
        <div className="p-8 md:p-12 border-r-2 border-black">
          <div className="space-y-8">
            <div>
              <span className="font-mono text-xs uppercase opacity-50">Email</span>
              <motion.a 
                href="mailto:info@etereastudio.com" 
                className="block text-xl font-bold mt-2 hover:underline"
                whileHover={{ x: 10 }}
              >
                info@etereastudio.com
              </motion.a>
            </div>
            <div>
              <span className="font-mono text-xs uppercase opacity-50">Telefono</span>
              <p className="text-xl font-bold mt-2">+39 333 1234567</p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase opacity-50">WhatsApp</span>
              <p className="text-xl font-bold mt-2">+39 333 1234567</p>
            </div>
          </div>
        </div>
        <div className="p-8 md:p-12 bg-gray-50">
          <div className="space-y-8">
            <div>
              <span className="font-mono text-xs uppercase opacity-50">Indirizzo</span>
              <p className="text-lg font-bold mt-2">Via Roma 123, 55100 Lucca</p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase opacity-50">Orari</span>
              <p className="text-sm mt-2">Lun-Ven: 9:00 - 18:00</p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase opacity-50">Social</span>
              <div className="flex gap-3 mt-3">
                {['Instagram', 'LinkedIn', 'GitHub'].map(s => (
                  <span key={s} className="px-3 py-1 border border-black text-xs font-bold cursor-pointer hover:bg-black hover:text-white transition-colors">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + IMAGE */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 md:p-16 border-r-2 border-black">
          <h2 className="text-2xl font-black uppercase mb-8">Scrivici</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-mono text-xs uppercase block mb-2">Nome</label>
                <input type="text" className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none" placeholder="Mario Rossi" />
              </div>
              <div>
                <label className="font-mono text-xs uppercase block mb-2">Email</label>
                <input type="email" className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none" placeholder="mario@example.com" />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs uppercase block mb-2">Oggetto</label>
              <input type="text" className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none" placeholder="Nuovo progetto web" />
            </div>
            <div>
              <label className="font-mono text-xs uppercase block mb-2">Messaggio</label>
              <textarea rows="5" className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none resize-none" placeholder="Raccontaci il tuo progetto..." />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black text-white px-8 py-4 text-sm font-black uppercase tracking-widest"
            >
              Invia →
            </motion.button>
          </form>
        </div>
        <div className="relative min-h-[400px]">
          <img src={IMAGES.meeting} alt="Meeting" className="w-full h-full object-cover grayscale" />
        </div>
      </section>
    </div>
  );
}
