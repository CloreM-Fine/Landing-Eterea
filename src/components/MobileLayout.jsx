import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Mail, Phone, MapPin, Instagram, ExternalLink } from 'lucide-react';

const COLORS = {
  coral: '#FF6B6B',
  teal: '#4ECDC4',
  yellow: '#FFE66D',
  purple: '#9B5DE5',
  dark: '#1a1a1a',
  white: '#ffffff',
};

const projects = [
  { 
    name: 'dandawinebar.it', 
    type: 'Sito Web', 
    color: COLORS.teal, 
    url: 'https://dandawinebar.it',
    image: '/work/danda.png'
  },
  { 
    name: 'colombinilelio.it', 
    type: 'Sito Web', 
    color: COLORS.coral, 
    url: 'https://colombinilelio.it',
    image: '/work/colombini.png'
  },
  { 
    name: 'welln.it', 
    type: 'Sito Web', 
    color: COLORS.purple, 
    url: 'https://welln.it',
    image: '/work/welln.png'
  },
  { 
    name: 'Nelle Tue Mani', 
    type: 'Progetto in Corso', 
    color: COLORS.yellow, 
    dark: true,
    image: '/work/nelletuemani.png'
  },
  { 
    name: 'Gestionale Eterea', 
    type: 'Web App', 
    color: COLORS.dark,
    dark: false,
    image: '/work/gestionale-interno-eterea.png'
  },
  { 
    name: 'Gestionale Welln', 
    type: 'Web App', 
    color: COLORS.teal,
    image: '/work/welln-task.png'
  },
  { 
    name: 'Gestionale Colombini', 
    type: 'Web App', 
    color: COLORS.coral,
    image: '/work/gestionale-colombini.png'
  },
];

const services = [
  { 
    title: 'Web Design', 
    desc: 'Design moderno, responsive e su misura per il tuo brand. Interfacce pulite ed efficaci.',
    icon: '🎨', 
    color: COLORS.coral 
  },
  { 
    title: 'Siti Web & App', 
    desc: 'Siti vetrina, portfolio, web app progressive. Tecnologie moderne e performanti.',
    icon: '💻', 
    color: COLORS.teal 
  },
  { 
    title: 'E-commerce', 
    desc: 'Negozi online completi con pagamenti, gestione ordini e integrazioni.',
    icon: '🛒', 
    color: COLORS.purple 
  },
  { 
    title: 'Grafica & Branding', 
    desc: 'Logo, identità visiva, brand guidelines, materiali di comunicazione.',
    icon: '✨', 
    color: COLORS.yellow, 
    dark: true 
  },
  { 
    title: 'Foto & Video', 
    desc: 'Servizi fotografici professionali e produzione video per il tuo business.',
    icon: '📸', 
    color: COLORS.coral 
  },
  { 
    title: 'Social Media', 
    desc: 'Gestione completa dei social, content creation, piani editoriali e ADV.',
    icon: '📱', 
    color: COLORS.teal 
  },
  { 
    title: 'Progettazione 3D', 
    desc: 'Render, modellazione, animazioni 3D per prodotti e ambienti.',
    icon: '🎲', 
    color: COLORS.purple 
  },
];

// ===== HOME PAGE =====
function HomePage({ onNavigate }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
      style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.purple})` }}
    >
      {/* HERO CONTENT */}
      <div className="flex-1 flex flex-col justify-center px-6 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-7xl font-black uppercase text-white leading-[0.85] mb-4">
            Eterea<br />Studio
          </h1>
          <p className="text-white/90 text-xl font-bold mb-2">Web Agency</p>
          <p className="text-white/70 text-base mb-8">Lucca, Toscana</p>
          
          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-sm">
            Design digitale su misura. Dalla strategia al lancio, accompagniamo il tuo business verso il successo online.
          </p>

          <button 
            onClick={() => onNavigate('chi-siamo')}
            className="bg-white text-black px-8 py-4 font-black uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-transform"
          >
            Scopri <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>

      {/* NAV GRID */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <NavCard color={COLORS.yellow} label="Chi Siamo" onClick={() => onNavigate('chi-siamo')} />
          <NavCard color={COLORS.teal} label="Servizi" onClick={() => onNavigate('servizi')} dark />
          <NavCard color={COLORS.purple} label="Work" onClick={() => onNavigate('work')} dark />
          <NavCard color={COLORS.coral} label="Contatti" onClick={() => onNavigate('contatti')} />
        </div>
      </div>
    </motion.div>
  );
}

// ===== CHI SIAMO PAGE =====
function ChiSiamoPage({ onBack }) {
  return (
    <PageContainer color={COLORS.yellow} onBack={onBack} title="Chi Siamo">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl font-black uppercase mb-6 leading-tight">
          Tre ragazzi<br />di Lucca
        </h2>
        
        <p className="text-lg font-bold leading-relaxed mb-4">
          Con la passione per il design digitale e anni di esperienza nel mondo creativo.
        </p>
        
        <p className="text-base leading-relaxed mb-6 opacity-80">
          Uniamo competenze tecniche e visione estetica per creare progetti che funzionano e comunicano. 
          Ogni cliente è un partner, ogni progetto è una storia da raccontare al meglio.
        </p>

        <div className="bg-black text-white p-6 mb-6">
          <p className="text-sm uppercase tracking-wider opacity-60 mb-2">La nostra filosofia</p>
          <p className="text-lg font-bold">Design pulito, codice pulito, risultati concreti.</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatBox number="7+" label="Progetti" bg="white" />
          <StatBox number="3" label="Persone" bg="white" />
          <StatBox number="∞" label="Caffè" bg="white" />
        </div>

        <div className="mt-8 p-6 border-4 border-black bg-white">
          <p className="text-sm uppercase tracking-wider opacity-60 mb-2">Sede</p>
          <p className="text-lg font-black">Lucca, Toscana</p>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== SERVIZI PAGE =====
function ServiziPage({ onBack }) {
  return (
    <PageContainer color={COLORS.dark} onBack={onBack} title="Servizi" textColor="white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-white/70 text-lg mb-8">
          Tutto ciò che serve per la tua presenza digitale.
        </p>

        <div className="space-y-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="p-6 border-l-4"
              style={{ 
                backgroundColor: service.color, 
                color: service.dark ? '#000' : '#fff',
                borderColor: service.dark ? '#000' : '#fff'
              }}
            >
              <div className="text-3xl mb-2">{service.icon}</div>
              <h3 className="text-2xl font-black uppercase">{service.title}</h3>
              <p className="text-sm font-bold opacity-80 mt-1">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-white text-black">
          <p className="text-sm uppercase tracking-wider opacity-60 mb-2">Hai un progetto in mente?</p>
          <p className="text-lg font-bold">Parliamone! La prima consulenza è gratuita.</p>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== WORK PAGE =====
function WorkPage({ onBack }) {
  return (
    <PageContainer color={COLORS.teal} onBack={onBack} title="Work" textColor="white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-white/80 text-lg mb-8">
          Alcuni dei nostri progetti. Ognuno racconta una storia diversa.
        </p>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <a
                href={project.url || '#'}
                target={project.url ? "_blank" : undefined}
                rel={project.url ? "noopener noreferrer" : undefined}
                className="block border-4 border-black overflow-hidden active:scale-[0.98] transition-transform"
                style={{ backgroundColor: project.color, color: project.dark ? '#000' : '#fff' }}
                onClick={(e) => !project.url && e.preventDefault()}
              >
                {/* PROJECT IMAGE */}
                <div className="w-full h-48 overflow-hidden bg-black/20">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* PROJECT INFO */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold uppercase opacity-60">{project.type}</span>
                    {project.url && <ExternalLink size={14} className="opacity-60" />}
                  </div>
                  <h3 className="text-xl font-black">{project.name}</h3>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-black text-white">
          <p className="text-sm uppercase tracking-wider opacity-60 mb-2">Vuoi vedere di più?</p>
          <p className="text-lg font-bold">Contattaci per un portfolio completo.</p>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== CONTATTI PAGE =====
function ContattiPage({ onBack }) {
  return (
    <PageContainer color={COLORS.purple} onBack={onBack} title="Contatti" textColor="white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-white/80 text-lg mb-8">
          Pronto a partire? Scrivici o chiamaci.
        </p>

        <div className="space-y-4">
          <a 
            href="mailto:info@etereastudio.com" 
            className="block bg-white text-black p-6 active:scale-[0.98] transition-transform"
          >
            <Mail size={24} className="mb-2" />
            <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Email</p>
            <p className="text-lg font-black">info@etereastudio.com</p>
          </a>

          <a 
            href="tel:+393331234567" 
            className="block bg-black text-white p-6 border-4 border-white active:scale-[0.98] transition-transform"
          >
            <Phone size={24} className="mb-2" />
            <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Telefono</p>
            <p className="text-lg font-black">+39 333 123 4567</p>
          </a>

          <div className="bg-yellow-400 text-black p-6">
            <MapPin size={24} className="mb-2" />
            <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Sede</p>
            <p className="text-lg font-black">Lucca, Toscana</p>
          </div>

          <a 
            href="https://instagram.com/etereastudio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block bg-white text-black p-6 active:scale-[0.98] transition-transform"
          >
            <Instagram size={24} className="mb-2" />
            <p className="text-xs uppercase tracking-wider opacity-60 mb-1">Instagram</p>
            <p className="text-lg font-black">@etereastudio</p>
          </a>
        </div>

        <div className="mt-8 text-center text-white/60 text-sm">
          <p>Eterea Studio © 2024</p>
          <p className="mt-1">P.IVA 12345678901</p>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== COMPONENTS =====
function PageContainer({ children, color, onBack, title, textColor = 'black' }) {
  const [mounted, setMounted] = useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  if (!mounted) return <div className="min-h-screen" style={{ backgroundColor: color }} />;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{ backgroundColor: color, color: textColor }}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 px-4 py-4 flex items-center justify-between" style={{ backgroundColor: color }}>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-black uppercase text-sm"
          style={{ color: textColor }}
        >
          <ArrowLeft size={20} />
          Indietro
        </button>
        <h1 className="text-xl font-black uppercase">{title}</h1>
        <div className="w-8" />
      </header>

      {/* CONTENT */}
      <main className="px-4 pb-8">
        {children}
      </main>
    </motion.div>
  );
}

function NavCard({ color, label, onClick, dark }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-6 text-left border-4 border-black aspect-square flex flex-col justify-between active:scale-95 transition-transform"
      style={{ backgroundColor: color, color: dark ? '#fff' : '#000' }}
    >
      <span className="text-3xl font-black">→</span>
      <span className="text-lg font-black uppercase">{label}</span>
    </motion.button>
  );
}

function StatBox({ number, label, bg }) {
  return (
    <div className="p-4 text-center border-4 border-black" style={{ backgroundColor: bg }}>
      <div className="text-3xl font-black">{number}</div>
      <div className="text-xs uppercase tracking-wider opacity-70">{label}</div>
    </div>
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
    <div className="min-h-screen overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
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
