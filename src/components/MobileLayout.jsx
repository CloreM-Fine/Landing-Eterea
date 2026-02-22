import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const COLORS = {
  coral: '#FF6B6B',
  teal: '#4ECDC4',
  yellow: '#FFE66D',
  purple: '#9B5DE5',
  dark: '#1a1a1a',
  white: '#ffffff',
};

const projects = [
  { name: 'colombinilelio.it', type: 'Sito Web', color: COLORS.coral },
  { name: 'dandawinebar.it', type: 'Sito Web', color: COLORS.teal },
  { name: 'welln.it', type: 'Sito Web', color: COLORS.purple },
  { name: 'Gestionale Progetti', type: 'Web App', color: COLORS.yellow, dark: true },
  { name: 'Gestionale CRM', type: 'Web App', color: COLORS.coral },
];

const services = [
  { title: 'Siti Web', desc: 'Design moderno e responsive', color: COLORS.coral },
  { title: 'Gestionali', desc: 'Web app su misura', color: COLORS.teal },
  { title: 'Brand', desc: 'Identità visiva', color: COLORS.purple },
  { title: 'Foto', desc: 'Servizi fotografici', color: COLORS.yellow, dark: true },
  { title: 'Social', desc: 'Gestione social media', color: COLORS.coral },
];

export function MobileLayout({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  // Previeni hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-black tracking-tighter">ETEREA</h1>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-12 h-12 flex items-center justify-center border-2 border-black bg-black text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-40 bg-black pt-20"
          >
            <nav className="flex flex-col p-4 gap-4">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'Chi Siamo' },
                { id: 'services', label: 'Servizi' },
                { id: 'work', label: 'Work' },
                { id: 'contact', label: 'Contatti' },
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-4xl font-black uppercase text-white py-4 border-b-2 border-white/20"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-4 pt-20" style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.purple})` }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl font-black uppercase text-white leading-none mb-4">
            Web<br />Agency
          </h2>
          <p className="text-white text-lg font-bold mb-8">Lucca, Toscana</p>
          <button 
            onClick={() => scrollToSection('about')}
            className="bg-white text-black px-8 py-4 font-black uppercase tracking-wider flex items-center gap-2"
          >
            Scopri <ArrowRight size={20} />
          </button>
        </motion.div>
        
        {/* Forme decorative */}
        <div className="absolute bottom-10 right-4 w-24 h-24 bg-yellow-400 rotate-12" />
        <div className="absolute top-40 right-10 w-16 h-16 border-4 border-white rounded-full" />
      </section>

      {/* CHI SIAMO */}
      <section id="about" className="py-20 px-4" style={{ backgroundColor: COLORS.yellow }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-5xl font-black uppercase mb-6">Chi<br />Siamo</h3>
          <p className="text-lg font-bold leading-relaxed mb-4">
            Tre ragazzi di Lucca con la passione per il web design.
          </p>
          <p className="text-base leading-relaxed">
            Esperienza nel mondo della moda e del design, ora canalizzata nella creazione 
            di esperienze digitali uniche. Siti web e gestionali fatti con cura.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-black text-white p-6 text-center">
            <div className="text-4xl font-black">5+</div>
            <div className="text-xs uppercase tracking-wider">Progetti</div>
          </div>
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black">3</div>
            <div className="text-xs uppercase tracking-wider">Persone</div>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section id="services" className="py-20 px-4" style={{ backgroundColor: COLORS.dark }}>
        <h3 className="text-5xl font-black uppercase mb-10 text-white">Servizi</h3>
        
        <div className="space-y-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6"
              style={{ backgroundColor: service.color, color: service.dark ? '#000' : '#fff' }}
            >
              <h4 className="text-2xl font-black uppercase">{service.title}</h4>
              <p className="text-sm font-bold opacity-80">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-20 px-4" style={{ backgroundColor: COLORS.teal }}>
        <h3 className="text-5xl font-black uppercase mb-10 text-white">Work</h3>
        
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={`https://${project.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="block p-6 border-4 border-black"
              style={{ backgroundColor: project.color, color: project.dark ? '#000' : '#fff' }}
            >
              <div className="text-xs font-bold uppercase opacity-60 mb-1">{project.type}</div>
              <div className="text-xl font-black">{project.name}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contact" className="py-20 px-4" style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.coral})` }}>
        <h3 className="text-5xl font-black uppercase mb-10 text-white">Contatti</h3>
        
        <div className="space-y-6">
          <a href="mailto:info@etereastudio.com" className="block bg-white text-black p-6 text-center font-black text-xl">
            info@etereastudio.com
          </a>
          
          <a href="tel:+393331234567" className="block bg-black text-white p-6 text-center font-black text-xl">
            +39 333 1234567
          </a>
          
          <div className="bg-yellow-400 text-black p-6 text-center font-black">
            Lucca, Toscana
            <div className="text-xs mt-2">Lavoriamo in remoto 🌍</div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-white/60 text-sm">
            Eterea Studio © 2024
          </p>
        </div>
      </section>
    </div>
  );
}
