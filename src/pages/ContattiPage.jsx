import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, Github } from 'lucide-react';

const COLORS = {
  coral: '#FF6B6B',
  teal: '#4ECDC4',
  yellow: '#FFE66D',
  purple: '#9B5DE5',
};

export function ContattiPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* HERO - Colorato */}
      <section 
        className="min-h-[70vh] relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${COLORS.teal}20, ${COLORS.coral}20)` }}
      >
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="text-xs font-mono tracking-widest uppercase opacity-50" style={{ writingMode: 'vertical-rl' }}>
            Get in Touch — Lucca
          </div>
        </div>
        
        {/* Forme decorative */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-24 h-24 rounded-2xl opacity-30"
          style={{ backgroundColor: COLORS.yellow }}
        />
        <motion.div 
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-20 right-40 w-16 h-16 rounded-full opacity-40"
          style={{ backgroundColor: COLORS.coral }}
        />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
          <div className="flex flex-col justify-center p-8 md:p-16">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <span 
                className="text-xs font-bold tracking-widest uppercase px-3 py-1 inline-block mb-6 text-white"
                style={{ backgroundColor: COLORS.purple }}
              >
                Contatti
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] mb-6">
                Parliamo del <span style={{ color: COLORS.coral }}>tuo progetto</span>
              </h1>
              <p className="text-base mt-6 max-w-md leading-relaxed text-gray-600">
                Siamo sempre interessati a nuove sfide. Siamo a Lucca ma lavoriamo 
                con clienti ovunque. Scrivici, rispondiamo velocemente.
              </p>
            </motion.div>
          </div>
          
          <div className="flex items-center justify-center p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.purple})` }}
              >
                <Mail size={80} className="text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-4 border-dashed border-black/20 rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO - Card colorate */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-black">
        {[
          { 
            icon: Mail, 
            label: 'Email', 
            value: 'info@etereastudio.com',
            href: 'mailto:info@etereastudio.com',
            color: COLORS.coral 
          },
          { 
            icon: Phone, 
            label: 'Telefono', 
            value: '+39 333 1234567',
            href: 'tel:+393331234567',
            color: COLORS.teal 
          },
          { 
            icon: MapPin, 
            label: 'Dove siamo', 
            value: 'Lucca, Toscana',
            subtext: 'Lavoriamo in remoto 🌍',
            color: COLORS.yellow,
            darkText: true
          },
        ].map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href || '#'}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`p-8 md:p-12 ${i < 2 ? 'border-r-2 border-black' : ''} transition-all`}
            style={{ backgroundColor: item.color, color: item.darkText ? '#000' : '#fff' }}
          >
            <item.icon size={32} className="mb-4 opacity-80" />
            <span className="text-xs font-bold tracking-widest uppercase opacity-70 block mb-2">
              {item.label}
            </span>
            <p className="text-xl font-black">{item.value}</p>
            {item.subtext && (
              <p className="text-sm mt-2 opacity-70">{item.subtext}</p>
            )}
          </motion.a>
        ))}
      </section>

      {/* FORM + SOCIAL */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 md:p-16 border-r-2 border-black">
          <h2 className="text-3xl font-black uppercase mb-2">Scrivici</h2>
          <p className="text-gray-500 text-sm mb-8">Rispondiamo entro 24 ore</p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold tracking-widest uppercase block mb-2">Nome</label>
                <input 
                  type="text" 
                  className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none focus:border-teal-500 transition-colors" 
                  placeholder="Mario Rossi" 
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase block mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none focus:border-teal-500 transition-colors" 
                  placeholder="mario@example.com" 
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest uppercase block mb-2">Oggetto</label>
              <input 
                type="text" 
                className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none focus:border-teal-500 transition-colors" 
                placeholder="Nuovo progetto web" 
              />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest uppercase block mb-2">Messaggio</label>
              <textarea 
                rows="4" 
                className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none focus:border-teal-500 transition-colors resize-none" 
                placeholder="Raccontaci il tuo progetto..." 
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-full"
              style={{ backgroundColor: COLORS.purple }}
            >
              Invia →
            </motion.button>
          </form>
        </div>
        
        <div className="p-8 md:p-16 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black uppercase mb-6">Social</h3>
            <div className="space-y-4">
              {[
                { icon: Instagram, name: 'Instagram', handle: '@etereastudio' },
                { icon: Linkedin, name: 'LinkedIn', handle: 'Eterea Studio' },
                { icon: Github, name: 'GitHub', handle: 'etereastudio' },
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: [COLORS.coral, COLORS.teal, COLORS.purple][i] }}
                  >
                    <social.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold">{social.name}</p>
                    <p className="text-sm text-gray-500">{social.handle}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="mt-12 p-6 rounded-2xl bg-black text-white">
            <p className="text-sm leading-relaxed">
              <span className="font-bold" style={{ color: COLORS.teal }}>Nota:</span> Non abbiamo una sede fisica. 
              Lavoriamo in remoto, ma siamo sempre disponibili per chiamate video 
              o un caffè a Lucca se passi di qui ☕️
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
