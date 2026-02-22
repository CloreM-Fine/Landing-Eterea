import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, Github } from 'lucide-react';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

export function ContattiPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.primary }}>
      {/* HERO */}
      <section 
        className="min-h-[70vh] relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${COLORS.primary}f0, ${COLORS.primary}c0)` }}
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-24 h-24 rounded-2xl opacity-20"
          style={{ backgroundColor: COLORS.accent }}
        />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
          <div className="flex flex-col justify-center p-8 md:p-16">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <span 
                className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full inline-block mb-6"
                style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
              >
                Contatti
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] mb-6 text-white">
                Parliamo del <span style={{ color: COLORS.accent }}>tuo progetto</span>
              </h1>
              <p className="text-base mt-6 max-w-md leading-relaxed" style={{ color: COLORS.secondary }}>
                Sempre interessati a nuove sfide. Siamo a Lucca ma lavoriamo ovunque.
              </p>
            </motion.div>
          </div>
          
          <div className="flex items-center justify-center p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.secondary})` }}
            >
              <Mail size={64} style={{ color: COLORS.primary }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b-2" style={{ borderColor: `${COLORS.secondary}20` }}>
        {[
          { 
            icon: Mail, 
            label: 'Email', 
            value: 'info@etereastudio.com',
            href: 'mailto:info@etereastudio.com',
            bgColor: COLORS.accent,
            textColor: COLORS.primary
          },
          { 
            icon: Phone, 
            label: 'Telefono', 
            value: '+39 333 1234567',
            href: 'tel:+393331234567',
            bgColor: COLORS.secondary,
            textColor: COLORS.primary
          },
          { 
            icon: MapPin, 
            label: 'Dove siamo', 
            value: 'Lucca, Toscana',
            bgColor: COLORS.primary,
            textColor: COLORS.secondary,
            border: `2px solid ${COLORS.accent}`
          },
        ].map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href || '#'}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`p-8 md:p-12 ${i < 2 ? 'border-r-2' : ''} transition-all`}
            style={{ 
              backgroundColor: item.bgColor, 
              color: item.textColor,
              borderColor: i < 2 ? `${COLORS.secondary}20` : 'transparent'
            }}
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
        <div className="p-8 md:p-16 border-r-2" style={{ borderColor: `${COLORS.secondary}20`, backgroundColor: COLORS.secondary }}>
          <h2 className="text-3xl font-black uppercase mb-2" style={{ color: COLORS.primary }}>Scrivici</h2>
          <p className="text-sm mb-8" style={{ color: `${COLORS.primary}80` }}>Rispondiamo entro 24 ore</p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold tracking-widest uppercase block mb-2" style={{ color: COLORS.primary }}>Nome</label>
                <input 
                  type="text" 
                  className="w-full border-b-2 bg-transparent py-3 text-base focus:outline-none transition-colors" 
                  style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                  placeholder="Mario Rossi" 
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase block mb-2" style={{ color: COLORS.primary }}>Email</label>
                <input 
                  type="email" 
                  className="w-full border-b-2 bg-transparent py-3 text-base focus:outline-none transition-colors" 
                  style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                  placeholder="mario@example.com" 
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest uppercase block mb-2" style={{ color: COLORS.primary }}>Oggetto</label>
              <input 
                type="text" 
                className="w-full border-b-2 bg-transparent py-3 text-base focus:outline-none transition-colors" 
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                placeholder="Nuovo progetto web" 
              />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest uppercase block mb-2" style={{ color: COLORS.primary }}>Messaggio</label>
              <textarea 
                rows="4" 
                className="w-full border-b-2 bg-transparent py-3 text-base focus:outline-none transition-colors resize-none" 
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                placeholder="Raccontaci il tuo progetto..." 
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-sm font-black uppercase tracking-widest rounded-full"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              Invia →
            </motion.button>
          </form>
        </div>
        
        <div className="p-8 md:p-16 flex flex-col justify-between" style={{ backgroundColor: COLORS.primary }}>
          <div>
            <h3 className="text-xl font-black uppercase mb-6" style={{ color: COLORS.secondary }}>Social</h3>
            <div className="space-y-4">
              {[
                { icon: Instagram, name: 'Instagram', handle: '@etereastudio', bgColor: COLORS.accent, iconColor: COLORS.primary },
                { icon: Linkedin, name: 'LinkedIn', handle: 'Eterea Studio', bgColor: COLORS.secondary, iconColor: COLORS.primary },
                { icon: Github, name: 'GitHub', handle: 'etereastudio', bgColor: `${COLORS.secondary}20`, iconColor: COLORS.secondary },
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-colors group"
                  style={{ backgroundColor: `${COLORS.secondary}10` }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: social.bgColor, color: social.iconColor }}
                  >
                    <social.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: COLORS.secondary }}>{social.name}</p>
                    <p className="text-sm" style={{ color: `${COLORS.secondary}80` }}>{social.handle}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
