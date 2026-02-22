import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, Mail, Phone, MapPin, Instagram, Plus, Minus } from 'lucide-react';

const COLORS = {
  black: '#0a0a0a',
  white: '#ffffff',
  gray: '#1a1a1a',
  lightGray: '#f0f0f0',
  accent: '#ccff00', // Lime neon
  accent2: '#ff3d00', // Orange
};

const projects = [
  { id: 1, name: 'DANDA', type: 'SITO WEB', year: '2024', image: '/work/danda.png', clickable: true, url: 'https://dandawinebar.it' },
  { id: 2, name: 'COLOMBINI', type: 'SITO WEB', year: '2024', image: '/work/colombini.png', clickable: true, url: 'https://colombinilelio.it' },
  { id: 3, name: 'WELLN', type: 'SITO WEB', year: '2024', image: '/work/welln.png', clickable: true, url: 'https://welln.it' },
  { id: 4, name: 'NELLE TUe MANI', type: 'IN CORSO', year: '2024', image: '/work/nelletuemani.png', clickable: false },
  { id: 5, name: 'ETEREA CRM', type: 'WEB APP', year: '2024', image: '/work/gestionale-interno-eterea.png', clickable: false },
  { id: 6, name: 'WELLN TASK', type: 'WEB APP', year: '2024', image: '/work/welln-task.png', clickable: false },
  { id: 7, name: 'COLOMBINI ERP', type: 'WEB APP', year: '2024', image: '/work/gestionale-colombini.png', clickable: false },
];

const services = [
  { num: '01', title: 'WEB DESIGN', desc: 'Interfacce che convertono' },
  { num: '02', title: 'SITI WEB', desc: 'Vetrine digitali performanti' },
  { num: '03', title: 'E-COMMERCE', desc: 'Negozi che vendono' },
  { num: '04', title: 'WEB APP', desc: 'Gestionali su misura' },
  { num: '05', title: 'BRANDING', desc: 'Identità che si ricorda' },
  { num: '06', title: 'FOTO & VIDEO', desc: 'Contenuti professionali' },
  { num: '07', title: 'SOCIAL', desc: 'Presenza che cresce' },
  { num: '08', title: '3D', desc: 'Render e animazioni' },
];

// ===== MARQUEE COMPONENT =====
function Marquee({ text, speed = 20, reverse = false }) {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4 border-y-2 border-black" style={{ backgroundColor: COLORS.accent }}>
      <motion.div 
        className="flex gap-8"
        animate={{ x: reverse ? [0, -1000] : [-1000, 0] }}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-2xl font-black uppercase tracking-tighter" style={{ color: COLORS.black }}>
            {text} ★ {text} ★ {text} ★
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ===== HOME PAGE =====
function HomePage({ onNavigate }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{ backgroundColor: COLORS.black }}
    >
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-4 border-b-2 border-white/20" style={{ backgroundColor: COLORS.black }}>
        <div className="text-white font-black text-xl tracking-tighter">ETEREA</div>
        <div className="text-white/60 text-xs uppercase tracking-widest">Lucca</div>
      </header>

      {/* HERO */}
      <section className="pt-24 pb-8 px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[15vw] font-black leading-[0.8] tracking-tighter text-white mb-4">
            WEB<br />
            <span style={{ color: COLORS.accent }}>AGENCY</span>
          </h1>
          
          <p className="text-white/60 text-lg mb-8 max-w-xs leading-relaxed">
            Design brutale. Codice pulito. Risultati concreti.
          </p>

          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('work')}
              className="px-6 py-3 font-black text-sm uppercase tracking-wider transition-all active:scale-95"
              style={{ backgroundColor: COLORS.accent, color: COLORS.black }}
            >
              Portfolio
            </button>
            <button 
              onClick={() => onNavigate('contatti')}
              className="px-6 py-3 font-black text-sm uppercase tracking-wider border-2 border-white text-white transition-all active:scale-95"
            >
              Contatti
            </button>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <Marquee text="DESIGN ★ CODE ★ GROW ★ REPEAT" speed={15} />

      {/* ABOUT TEASER */}
      <section className="py-16 px-4 border-b-2 border-white/10">
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl font-black" style={{ color: COLORS.accent2 }}>*</span>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Chi Siamo</p>
            <p className="text-white text-2xl font-medium leading-tight">
              Tre professionisti.<br />
              Una visione.<br />
              Zero compromessi.
            </p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('chi-siamo')}
          className="flex items-center gap-2 text-white/60 text-sm uppercase tracking-wider hover:text-white transition-colors"
        >
          Scopri di più <ArrowUpRight size={16} />
        </button>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 px-4">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-8">Servizi</p>
        <div className="grid grid-cols-2 gap-px bg-white/10">
          {services.slice(0, 4).map((s, i) => (
            <motion.div 
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onNavigate('servizi')}
              className="p-6 cursor-pointer transition-all active:scale-95"
              style={{ backgroundColor: COLORS.black }}
            >
              <span className="text-xs font-mono text-white/30 mb-2 block">{s.num}</span>
              <h3 className="text-white font-black text-lg uppercase tracking-tight mb-1">{s.title}</h3>
              <p className="text-white/40 text-xs">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="py-16 px-4 border-t-2 border-white/10">
        <div className="flex justify-between items-end mb-8">
          <p className="text-white/40 text-xs uppercase tracking-widest">Selected Work</p>
          <span className="text-6xl font-black" style={{ color: COLORS.accent }}>7</span>
        </div>
        
        <div className="space-y-1">
          {projects.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              onClick={() => p.clickable && window.open(p.url, '_blank')}
              className={`group flex items-center justify-between py-4 border-b border-white/10 ${p.clickable ? 'cursor-pointer' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-white/20 font-mono text-xs">0{p.id}</span>
                <h3 className="text-white font-black text-xl uppercase tracking-tight group-hover:translate-x-2 transition-transform">
                  {p.name}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-xs uppercase hidden sm:block">{p.type}</span>
                {p.clickable && <ArrowUpRight size={20} className="text-white/40 group-hover:text-white transition-colors" />}
              </div>
            </motion.div>
          ))}
        </div>
        
        <button 
          onClick={() => onNavigate('work')}
          className="mt-8 w-full py-4 border-2 border-white/20 text-white font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all"
        >
          Vedi tutti i progetti
        </button>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4" style={{ backgroundColor: COLORS.accent }}>
        <p className="text-black/60 text-xs uppercase tracking-widest mb-4">Hai un progetto?</p>
        <h2 className="text-5xl font-black leading-none tracking-tighter text-black mb-6">
          PARLIAMO<br />NE
        </h2>
        <button 
          onClick={() => onNavigate('contatti')}
          className="px-8 py-4 bg-black text-white font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black border-2 border-black transition-all"
        >
          Iniziamo →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t-2 border-white/10">
        <div className="flex justify-between items-center">
          <p className="text-white/40 text-xs">ETEREA STUDIO © 2024</p>
          <div className="flex gap-4">
            <span className="text-white/40 text-xs uppercase">IG</span>
            <span className="text-white/40 text-xs uppercase">LI</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

// ===== WORK PAGE =====
function WorkPage({ onBack }) {
  return (
    <PageContainer onBack={onBack} title="WORK">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* HEADER */}
        <div className="mb-12">
          <span className="text-8xl font-black" style={{ color: COLORS.accent }}>7</span>
          <p className="text-white/40 text-sm uppercase tracking-widest mt-2">Progetti selezionati</p>
        </div>

        {/* PROJECTS LIST */}
        <div className="space-y-px">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`group ${p.clickable ? 'cursor-pointer' : ''}`}
              onClick={() => p.clickable && window.open(p.url, '_blank')}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-4">
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-mono text-white/60">0{p.id}</span>
                </div>
                {p.clickable && (
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
                    <ArrowUpRight size={20} className="text-black" />
                  </div>
                )}
              </div>
              
              <div className="pb-8 border-b border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-black text-2xl uppercase tracking-tight">{p.name}</h3>
                  <span className="text-white/40 text-xs font-mono">{p.year}</span>
                </div>
                <p className="text-white/40 text-sm uppercase tracking-wider">{p.type}</p>
                {!p.clickable && (
                  <p className="text-white/20 text-xs mt-2">Progetto privato / in corso</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 py-12 border-y border-white/10 mt-12">
          <div className="text-center">
            <span className="text-3xl font-black text-white block">7</span>
            <span className="text-white/40 text-xs uppercase">Progetti</span>
          </div>
          <div className="text-center">
            <span className="text-3xl font-black text-white block">3</span>
            <span className="text-white/40 text-xs uppercase">Siti Live</span>
          </div>
          <div className="text-center">
            <span className="text-3xl font-black text-white block">4</span>
            <span className="text-white/40 text-xs uppercase">Web App</span>
          </div>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== SERVIZI PAGE =====
function ServiziPage({ onBack }) {
  const [openService, setOpenService] = useState(null);

  return (
    <PageContainer onBack={onBack} title="SERVIZI">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-white/40 text-sm uppercase tracking-widest mb-8">
          Tutto ciò che serve per il tuo business digitale
        </p>

        <div className="space-y-px border-t-2 border-white/10">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="border-b border-white/10"
            >
              <button 
                onClick={() => setOpenService(openService === i ? null : i)}
                className="w-full py-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-white/20 font-mono text-sm">{s.num}</span>
                  <h3 className="text-white font-black text-2xl uppercase tracking-tight group-hover:translate-x-2 transition-transform">
                    {s.title}
                  </h3>
                </div>
                <div className="w-8 h-8 flex items-center justify-center border border-white/20">
                  {openService === i ? (
                    <Minus size={16} className="text-white" />
                  ) : (
                    <Plus size={16} className="text-white" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openService === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-12">
                      <p className="text-white/60 text-base mb-4">{s.desc}</p>
                      <button 
                        onClick={() => onNavigate('contatti')}
                        className="text-sm uppercase tracking-wider font-black"
                        style={{ color: COLORS.accent }}
                      >
                        Richiedi info →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* PACKAGES */}
        <div className="mt-16 space-y-4">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Pacchetti</p>
          
          <div className="p-6 border-2 border-white/20">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-white font-black text-xl uppercase">STARTER</h4>
              <span className="text-xs font-mono text-white/40">Sito Vetrina</span>
            </div>
            <ul className="space-y-2 text-white/60 text-sm mb-6">
              <li>• Home + 3 pagine</li>
              <li>• Design responsive</li>
              <li>• SEO base</li>
              <li>• Form contatti</li>
            </ul>
          </div>

          <div className="p-6 border-2" style={{ borderColor: COLORS.accent }}>
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-black text-xl uppercase" style={{ color: COLORS.accent }}>BUSINESS</h4>
              <span className="text-xs font-mono text-white/40">E-commerce</span>
            </div>
            <ul className="space-y-2 text-white/60 text-sm mb-6">
              <li>• Shop completo</li>
              <li>• Gestione prodotti</li>
              <li>• Pagamenti integrati</li>
              <li>• Dashboard admin</li>
            </ul>
          </div>

          <div className="p-6 border-2 border-white/20">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-white font-black text-xl uppercase">CUSTOM</h4>
              <span className="text-xs font-mono text-white/40">Web App</span>
            </div>
            <ul className="space-y-2 text-white/60 text-sm mb-6">
              <li>• Su misura</li>
              <li>• Gestionali</li>
              <li>• Integrazioni API</li>
              <li>• Supporto dedicato</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== CHI SIAMO PAGE =====
function ChiSiamoPage({ onBack }) {
  return (
    <PageContainer onBack={onBack} title="ABOUT">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* BIG TEXT */}
        <div className="mb-12">
          <h2 className="text-6xl font-black leading-[0.85] tracking-tighter text-white mb-4">
            TRE<br />
            <span style={{ color: COLORS.accent }}>MENTI</span><br />
            CREATIVI
          </h2>
          <p className="text-white/40 text-lg max-w-xs">
            Design × Code × Strategy
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-6 text-white/60 text-base leading-relaxed mb-12">
          <p>
            Siamo un collettivo di designer e sviluppatori con sede a Lucca. 
            Creiamo esperienze digitali che uniscono estetica e funzionalità.
          </p>
          <p>
            Non crediamo nei template. Ogni progetto è una sfida unica che affrontiamo 
            con metodo e creatività.
          </p>
          <p className="text-white font-medium border-l-2 pl-4" style={{ borderColor: COLORS.accent }}>
            "Design pulito, codice pulito, risultati concreti."
          </p>
        </div>

        {/* TEAM */}
        <div className="border-t-2 border-white/10 pt-8 mb-12">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Team</p>
          <div className="space-y-4">
            {[
              { role: 'Creative Director', focus: 'Design & UX' },
              { role: 'Lead Developer', focus: 'Frontend & Backend' },
              { role: 'Strategist', focus: 'Content & Social' },
            ].map((m, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-white/10">
                <div>
                  <p className="text-white font-medium">{m.role}</p>
                  <p className="text-white/40 text-sm">{m.focus}</p>
                </div>
                <span className="text-2xl font-black text-white/10">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PROCESS */}
        <div className="border-t-2 border-white/10 pt-8 mb-12">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Process</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '01', step: 'Discovery' },
              { num: '02', step: 'Design' },
              { num: '03', step: 'Develop' },
              { num: '04', step: 'Deploy' },
            ].map((s) => (
              <div key={s.num} className="p-4 border border-white/10">
                <span className="text-xs font-mono text-white/30 block mb-1">{s.num}</span>
                <span className="text-white font-black uppercase">{s.step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LOCATION */}
        <div className="p-6 border-2" style={{ borderColor: COLORS.accent, backgroundColor: COLORS.accent }}>
          <p className="text-black/60 text-xs uppercase tracking-widest mb-2">Location</p>
          <p className="text-black font-black text-2xl uppercase">Lucca, Toscana</p>
          <p className="text-black/60 text-sm mt-1">Italia</p>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== CONTATTI PAGE =====
function ContattiPage({ onBack }) {
  return (
    <PageContainer onBack={onBack} title="CONTATTI">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* BIG CTA */}
        <div className="mb-12">
          <h2 className="text-5xl font-black leading-[0.9] tracking-tighter text-white mb-6">
            PARLIAMO<br />
            DEL TUO<br />
            <span style={{ color: COLORS.accent }}>PROGETTO</span>
          </h2>
          <p className="text-white/60 text-base">
            Rispondiamo entro 24 ore.
          </p>
        </div>

        {/* CONTACT METHODS */}
        <div className="space-y-px border-t-2 border-white/10 mb-12">
          <a href="mailto:info@etereastudio.com" className="flex items-center justify-between py-6 border-b border-white/10 group">
            <div className="flex items-center gap-4">
              <Mail size={24} className="text-white/40" />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                <p className="text-white font-medium">info@etereastudio.com</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="text-white/40 group-hover:text-white transition-colors" />
          </a>

          <a href="tel:+393331234567" className="flex items-center justify-between py-6 border-b border-white/10 group">
            <div className="flex items-center gap-4">
              <Phone size={24} className="text-white/40" />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Telefono</p>
                <p className="text-white font-medium">+39 333 123 4567</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="text-white/40 group-hover:text-white transition-colors" />
          </a>

          <div className="flex items-center justify-between py-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <MapPin size={24} className="text-white/40" />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Sede</p>
                <p className="text-white font-medium">Lucca, Toscana</p>
              </div>
            </div>
          </div>

          <a href="https://instagram.com/etereastudio" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-6 border-b border-white/10 group">
            <div className="flex items-center gap-4">
              <Instagram size={24} className="text-white/40" />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Instagram</p>
                <p className="text-white font-medium">@etereastudio</p>
              </div>
            </div>
            <ArrowUpRight size={20} className="text-white/40 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* FORM */}
        <div className="p-6 border-2 border-white/20 mb-12">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">O scrivi qui</p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input 
                type="text" 
                placeholder="NOME"
                className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors uppercase text-sm tracking-wider"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="EMAIL"
                className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors uppercase text-sm tracking-wider"
              />
            </div>
            <div>
              <textarea 
                placeholder="MESSAGGIO"
                rows="4"
                className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors uppercase text-sm tracking-wider resize-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 font-black text-sm uppercase tracking-wider transition-all hover:opacity-80"
              style={{ backgroundColor: COLORS.accent, color: COLORS.black }}
            >
              Invia →
            </button>
          </form>
        </div>

        {/* AVAILABILITY */}
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#00ff00' }} />
          <span className="text-white/60 text-sm">Disponibili per nuovi progetti</span>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== PAGE CONTAINER =====
function PageContainer({ children, onBack, title }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  if (!mounted) return <div className="min-h-screen" style={{ backgroundColor: COLORS.black }} />;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{ backgroundColor: COLORS.black }}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 py-4 border-b-2 border-white/10" style={{ backgroundColor: COLORS.black }}>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm uppercase tracking-wider font-medium">Back</span>
        </button>
        <span className="text-white font-black text-sm tracking-wider">{title}</span>
        <div className="w-12" />
      </header>

      {/* CONTENT */}
      <main className="px-4 py-8">
        {children}
      </main>
    </motion.div>
  );
}

// ===== MAIN LAYOUT =====
export function MobileLayout({ onNavigate }) {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.black }}>
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <HomePage key="home" onNavigate={handleNavigate} />
        )}
        {currentPage === 'chi-siamo' && (
          <ChiSiamoPage key="chi-siamo" onBack={handleBack} />
        )}
        {currentPage === 'servizi' && (
          <ServiziPage key="servizi" onBack={handleBack} />
        )}
        {currentPage === 'work' && (
          <WorkPage key="work" onBack={handleBack} />
        )}
        {currentPage === 'contatti' && (
          <ContattiPage key="contatti" onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}
