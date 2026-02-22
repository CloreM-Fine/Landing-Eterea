import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Mail, Phone, MapPin, Instagram } from 'lucide-react';

const COLORS = {
  coral: '#E85A4F',
  teal: '#4A90A4',
  cream: '#F7F5F0',
  charcoal: '#2D3436',
  lightGray: '#F5F5F5',
  white: '#ffffff',
};

const projects = [
  { 
    name: 'dandawinebar.it', 
    type: 'Sito Web', 
    color: COLORS.teal, 
    url: 'https://dandawinebar.it',
    image: '/work/danda.png',
    clickable: true
  },
  { 
    name: 'colombinilelio.it', 
    type: 'Sito Web', 
    color: COLORS.coral, 
    url: 'https://colombinilelio.it',
    image: '/work/colombini.png',
    clickable: true
  },
  { 
    name: 'welln.it', 
    type: 'Sito Web', 
    color: '#6B5B95', 
    url: 'https://welln.it',
    image: '/work/welln.png',
    clickable: true
  },
  { 
    name: 'Nelle Tue Mani', 
    type: 'Progetto in Corso', 
    color: '#8B7355',
    image: '/work/nelletuemani.png',
    clickable: false
  },
  { 
    name: 'Gestionale Eterea', 
    type: 'Web App', 
    color: COLORS.charcoal,
    image: '/work/gestionale-interno-eterea.png',
    clickable: false
  },
  { 
    name: 'Gestionale Welln', 
    type: 'Web App', 
    color: '#5D4E6D',
    image: '/work/welln-task.png',
    clickable: false
  },
  { 
    name: 'Gestionale Colombini', 
    type: 'Web App', 
    color: '#7D6B5D',
    image: '/work/gestionale-colombini.png',
    clickable: false
  },
];

const services = [
  { 
    title: 'Web Design', 
    desc: 'Design moderno, pulito e su misura per il tuo brand. Interfacce studiate per convertire.',
    icon: '◆', 
    color: COLORS.coral 
  },
  { 
    title: 'Siti Web & App', 
    desc: 'Siti vetrina, portfolio e web app progressive. Tecnologie moderne e performance ottimali.',
    icon: '◇', 
    color: COLORS.teal 
  },
  { 
    title: 'E-commerce', 
    desc: 'Negozi online completi con pagamenti, gestione ordini e integrazioni.',
    icon: '◆', 
    color: '#6B5B95' 
  },
  { 
    title: 'Grafica', 
    desc: 'Materiali pubblicitari, flyer, brochure, packaging. Comunicazione visiva efficace.',
    icon: '◇', 
    color: '#8B7355' 
  },
  { 
    title: 'Branding', 
    desc: 'Logo, visual identity, brand guidelines. Un\'identità che ti rappresenta.',
    icon: '◆', 
    color: COLORS.charcoal 
  },
  { 
    title: 'Fotografia', 
    desc: 'Product, food, locali, corporate. Immagini professionali per il tuo business.',
    icon: '◇', 
    color: '#5D4E6D' 
  },
  { 
    title: 'Video', 
    desc: 'Spot, video aziendali, contenuti social. Storie che coinvolgono.',
    icon: '◆', 
    color: '#7D6B5D' 
  },
  { 
    title: 'Social Media', 
    desc: 'Strategia, contenuti, gestione e paid ads. Crescita misurabile.',
    icon: '◇', 
    color: COLORS.coral 
  },
  { 
    title: 'Progettazione 3D', 
    desc: 'Render, modellazione, animazioni. Visualizzazioni realistiche per prodotti e spazi.',
    icon: '◆', 
    color: COLORS.teal 
  },
];

// ===== HOME PAGE =====
function HomePage({ onNavigate }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{ backgroundColor: COLORS.cream }}
    >
      {/* HERO */}
      <div className="px-6 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: COLORS.teal }}>Web Agency — Lucca</p>
          <h1 className="text-6xl font-light mb-6" style={{ color: COLORS.charcoal }}>
            Eterea<br />
            <span className="font-medium">Studio</span>
          </h1>
          
          <p className="text-lg leading-relaxed mb-8 max-w-md" style={{ color: COLORS.charcoal, opacity: 0.8 }}>
            Design digitale su misura. Uniamo estetica e funzionalità per creare esperienze web che funzionano.
          </p>

          <div className="flex gap-4 mb-12">
            <button 
              onClick={() => onNavigate('chi-siamo')}
              className="px-6 py-3 text-sm uppercase tracking-wider font-medium transition-all active:scale-95"
              style={{ backgroundColor: COLORS.charcoal, color: COLORS.white }}
            >
              Chi Siamo
            </button>
            <button 
              onClick={() => onNavigate('work')}
              className="px-6 py-3 text-sm uppercase tracking-wider font-medium border-2 transition-all active:scale-95"
              style={{ borderColor: COLORS.charcoal, color: COLORS.charcoal }}
            >
              Portfolio
            </button>
          </div>
        </motion.div>
      </div>

      {/* SERVIZI PREVIEW */}
      <div className="px-6 py-12" style={{ backgroundColor: COLORS.white }}>
        <p className="text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>Servizi</p>
        <div className="space-y-4">
          {services.slice(0, 4).map((service, i) => (
            <div key={service.title} className="flex items-start gap-4 py-4 border-b" style={{ borderColor: '#eee' }}>
              <span className="text-2xl" style={{ color: service.color }}>{service.icon}</span>
              <div>
                <h3 className="font-medium text-lg" style={{ color: COLORS.charcoal }}>{service.title}</h3>
                <p className="text-sm mt-1" style={{ color: COLORS.charcoal, opacity: 0.7 }}>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => onNavigate('servizi')}
          className="mt-6 text-sm uppercase tracking-wider font-medium flex items-center gap-2"
          style={{ color: COLORS.teal }}
        >
          Tutti i servizi <ArrowRight size={16} />
        </button>
      </div>

      {/* WORK PREVIEW */}
      <div className="px-6 py-12" style={{ backgroundColor: COLORS.lightGray }}>
        <p className="text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>Portfolio</p>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div key={project.name} className="flex items-center gap-4 p-4 bg-white">
              <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: project.color }}>{project.type}</p>
                <h3 className="font-medium" style={{ color: COLORS.charcoal }}>{project.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => onNavigate('work')}
          className="mt-6 text-sm uppercase tracking-wider font-medium flex items-center gap-2"
          style={{ color: COLORS.teal }}
        >
          Vedi tutti <ArrowRight size={16} />
        </button>
      </div>

      {/* CTA */}
      <div className="px-6 py-16" style={{ backgroundColor: COLORS.charcoal }}>
        <h2 className="text-3xl font-light mb-4" style={{ color: COLORS.white }}>
          Hai un progetto<br />in mente?
        </h2>
        <p className="mb-8" style={{ color: COLORS.white, opacity: 0.8 }}>
          Parliamone. La prima consulenza è gratuita.
        </p>
        <button 
          onClick={() => onNavigate('contatti')}
          className="px-8 py-4 text-sm uppercase tracking-wider font-medium"
          style={{ backgroundColor: COLORS.white, color: COLORS.charcoal }}
        >
          Contattaci
        </button>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-8 text-center" style={{ backgroundColor: COLORS.cream }}>
        <p className="text-sm" style={{ color: COLORS.charcoal, opacity: 0.6 }}>
          Eterea Studio © 2024 — Lucca
        </p>
      </div>
    </motion.div>
  );
}

// ===== CHI SIAMO PAGE =====
function ChiSiamoPage({ onBack }) {
  return (
    <PageContainer color={COLORS.white} onBack={onBack} title="Chi Siamo">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>About</p>
        
        <h2 className="text-4xl font-light mb-6 leading-tight" style={{ color: COLORS.charcoal }}>
          Tre professionisti<br />
          <span className="font-medium">una visione</span>
        </h2>
        
        <p className="text-base leading-relaxed mb-6" style={{ color: COLORS.charcoal, opacity: 0.8 }}>
          Siamo un team di designer e sviluppatori con base a Lucca. Uniamo competenze tecniche 
          e sensibilità estetica per creare progetti digitali che funzionano.
        </p>
        
        <p className="text-base leading-relaxed mb-8" style={{ color: COLORS.charcoal, opacity: 0.8 }}>
          Crediamo nel design come strumento di risoluzione problemi. Ogni scelta visiva 
          serve un obiettivo: comunicare meglio, vendere di più, semplificare processi.
        </p>

        <div className="p-6 mb-8" style={{ backgroundColor: COLORS.lightGray }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>Approccio</p>
          <p className="text-lg font-medium mb-2" style={{ color: COLORS.charcoal }}>
            "Design pulito, codice pulito, risultati concreti."
          </p>
          <p className="text-sm" style={{ color: COLORS.charcoal, opacity: 0.7 }}>
            Non inseguiamo trend. Costruiamo soluzioni durature.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4" style={{ backgroundColor: COLORS.cream }}>
            <p className="text-3xl font-light mb-1" style={{ color: COLORS.charcoal }}>7+</p>
            <p className="text-xs uppercase tracking-wider" style={{ color: COLORS.charcoal, opacity: 0.6 }}>Progetti</p>
          </div>
          <div className="text-center p-4" style={{ backgroundColor: COLORS.cream }}>
            <p className="text-3xl font-light mb-1" style={{ color: COLORS.charcoal }}>3</p>
            <p className="text-xs uppercase tracking-wider" style={{ color: COLORS.charcoal, opacity: 0.6 }}>Persone</p>
          </div>
          <div className="text-center p-4" style={{ backgroundColor: COLORS.cream }}>
            <p className="text-3xl font-light mb-1" style={{ color: COLORS.charcoal }}>100%</p>
            <p className="text-xs uppercase tracking-wider" style={{ color: COLORS.charcoal, opacity: 0.6 }}>Passione</p>
          </div>
        </div>

        <div className="p-6" style={{ backgroundColor: COLORS.charcoal }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>Sede</p>
          <p className="text-white mb-1">Lucca, Toscana</p>
          <p className="text-sm" style={{ color: COLORS.white, opacity: 0.7 }}>
            Operiamo in tutta Italia
          </p>
        </div>

        {/* TEAM SECTION */}
        <div className="mt-12">
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>Team</p>
          <div className="space-y-4">
            {['Design & UX', 'Sviluppo & Tech', 'Strategy & Content'].map((role, i) => (
              <div key={role} className="flex items-center gap-4 py-4 border-b" style={{ borderColor: '#eee' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: [COLORS.coral, COLORS.teal, COLORS.charcoal][i] }}>
                  {['D', 'T', 'S'][i]}
                </div>
                <p className="font-medium" style={{ color: COLORS.charcoal }}>{role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PROCESS */}
        <div className="mt-12">
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>Processo</p>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Discovery', desc: 'Analisi del brief, ricerca e definizione obiettivi.' },
              { step: '02', title: 'Design', desc: 'Wireframe, prototipi, UI design iterativo.' },
              { step: '03', title: 'Sviluppo', desc: 'Codice pulito, test, ottimizzazione performance.' },
              { step: '04', title: 'Launch', desc: 'Deploy, formazione, supporto post-lancio.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-2xl font-light" style={{ color: COLORS.teal }}>{item.step}</span>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: COLORS.charcoal }}>{item.title}</h4>
                  <p className="text-sm" style={{ color: COLORS.charcoal, opacity: 0.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== SERVIZI PAGE =====
function ServiziPage({ onBack }) {
  return (
    <PageContainer color={COLORS.white} onBack={onBack} title="Servizi">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>What We Do</p>
        
        <h2 className="text-4xl font-light mb-6" style={{ color: COLORS.charcoal }}>
          Servizi<br />
          <span className="font-medium">completi</span>
        </h2>
        
        <p className="text-base leading-relaxed mb-8" style={{ color: COLORS.charcoal, opacity: 0.8 }}>
          Dalla strategia allo sviluppo, copriamo tutto il ciclo di vita di un progetto digitale.
        </p>

        <div className="space-y-1 mb-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="p-5 border-b"
              style={{ borderColor: '#eee', backgroundColor: i % 2 === 0 ? COLORS.white : COLORS.lightGray }}
            >
              <div className="flex items-start gap-4">
                <span className="text-xl" style={{ color: service.color }}>{service.icon}</span>
                <div>
                  <h3 className="font-medium text-lg mb-1" style={{ color: COLORS.charcoal }}>{service.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: COLORS.charcoal, opacity: 0.7 }}>{service.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PACKAGES */}
        <div className="p-6 mb-8" style={{ backgroundColor: COLORS.charcoal }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: COLORS.teal }}>Soluzioni</p>
          <div className="space-y-4">
            <div className="pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <h4 className="text-white font-medium mb-1">Sito Vetrina</h4>
              <p className="text-sm" style={{ color: COLORS.white, opacity: 0.7 }}>Home, About, Servizi, Contatti</p>
            </div>
            <div className="pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <h4 className="text-white font-medium mb-1">E-commerce</h4>
              <p className="text-sm" style={{ color: COLORS.white, opacity: 0.7 }}>Shop completo con gestione prodotti</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Web App</h4>
              <p className="text-sm" style={{ color: COLORS.white, opacity: 0.7 }}>Gestionali su misura</p>
            </div>
          </div>
        </div>

        {/* WHY US */}
        <div className="p-6" style={{ backgroundColor: COLORS.cream }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: COLORS.teal }}>Perché noi</p>
          <ul className="space-y-3">
            {[
              'Codice pulito e manutenibile',
              'Design responsive su tutti i device',
              'SEO e performance ottimizzate',
              'Supporto post-lancio',
              'Formazione per l\'uso autonomo'
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm" style={{ color: COLORS.charcoal }}>
                <span style={{ color: COLORS.teal }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== WORK PAGE =====
function WorkPage({ onBack }) {
  return (
    <PageContainer color={COLORS.white} onBack={onBack} title="Portfolio">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>Selected Work</p>
        
        <h2 className="text-4xl font-light mb-6" style={{ color: COLORS.charcoal }}>
          Progetti<br />
          <span className="font-medium">realizzati</span>
        </h2>
        
        <p className="text-base leading-relaxed mb-8" style={{ color: COLORS.charcoal, opacity: 0.8 }}>
          Una selezione dei nostri lavori più recenti. Siti web e applicazioni sviluppati con cura.
        </p>

        <div className="space-y-6 mb-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              {project.clickable ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border active:scale-[0.99] transition-transform"
                  style={{ borderColor: '#ddd', backgroundColor: COLORS.white }}
                >
                  <div className="w-full h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: project.color }}>{project.type}</p>
                      <h3 className="font-medium text-lg" style={{ color: COLORS.charcoal }}>{project.name}</h3>
                    </div>
                    <ArrowRight size={20} style={{ color: COLORS.charcoal, opacity: 0.5 }} />
                  </div>
                </a>
              ) : (
                <div
                  className="block border"
                  style={{ borderColor: '#eee', backgroundColor: COLORS.lightGray }}
                >
                  <div className="w-full h-48 overflow-hidden bg-gray-200">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover opacity-80"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: project.color }}>{project.type}</p>
                    <h3 className="font-medium text-lg" style={{ color: COLORS.charcoal, opacity: 0.7 }}>{project.name}</h3>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* TESTIMONIALS */}
        <div className="p-6 mb-8" style={{ backgroundColor: COLORS.cream }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>Feedback</p>
          <div className="space-y-6">
            {[
              { text: 'Professionalità e attenzione ai dettagli. Ottimo lavoro.', client: 'Cliente Danda' },
              { text: 'Hanno capito esattamente cosa cercavamo.', client: 'Cliente Welln' },
            ].map((t, i) => (
              <div key={i} className="pb-4 border-b last:border-0" style={{ borderColor: '#ddd' }}>
                <p className="text-base italic mb-2" style={{ color: COLORS.charcoal, opacity: 0.8 }}>"{t.text}"</p>
                <p className="text-xs uppercase tracking-wider" style={{ color: COLORS.teal }}>— {t.client}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 text-center" style={{ backgroundColor: COLORS.charcoal }}>
          <p className="text-white mb-4">Vuoi vedere di più?</p>
          <p className="text-sm mb-6" style={{ color: COLORS.white, opacity: 0.7 }}>
            Contattaci per un portfolio completo
          </p>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== CONTATTI PAGE =====
function ContattiPage({ onBack }) {
  return (
    <PageContainer color={COLORS.white} onBack={onBack} title="Contatti">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>Get in Touch</p>
        
        <h2 className="text-4xl font-light mb-6" style={{ color: COLORS.charcoal }}>
          Parliamo del<br />
          <span className="font-medium">tuo progetto</span>
        </h2>
        
        <p className="text-base leading-relaxed mb-8" style={{ color: COLORS.charcoal, opacity: 0.8 }}>
          Siamo sempre interessati a nuove sfide. Scrivici e ti rispondiamo entro 24 ore.
        </p>

        <div className="space-y-4 mb-12">
          <a 
            href="mailto:info@etereastudio.com" 
            className="flex items-center gap-4 p-5 border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#ddd', backgroundColor: COLORS.white }}
          >
            <Mail size={24} style={{ color: COLORS.teal }} />
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: COLORS.charcoal, opacity: 0.5 }}>Email</p>
              <p className="font-medium" style={{ color: COLORS.charcoal }}>info@etereastudio.com</p>
            </div>
          </a>

          <a 
            href="tel:+393331234567" 
            className="flex items-center gap-4 p-5 border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#ddd', backgroundColor: COLORS.white }}
          >
            <Phone size={24} style={{ color: COLORS.coral }} />
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: COLORS.charcoal, opacity: 0.5 }}>Telefono</p>
              <p className="font-medium" style={{ color: COLORS.charcoal }}>+39 333 123 4567</p>
            </div>
          </a>

          <div 
            className="flex items-center gap-4 p-5 border"
            style={{ borderColor: '#ddd', backgroundColor: COLORS.lightGray }}
          >
            <MapPin size={24} style={{ color: COLORS.charcoal }} />
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: COLORS.charcoal, opacity: 0.5 }}>Sede</p>
              <p className="font-medium" style={{ color: COLORS.charcoal }}>Lucca, Toscana</p>
            </div>
          </div>

          <a 
            href="https://instagram.com/etereastudio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#ddd', backgroundColor: COLORS.white }}
          >
            <Instagram size={24} style={{ color: '#E4405F' }} />
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: COLORS.charcoal, opacity: 0.5 }}>Instagram</p>
              <p className="font-medium" style={{ color: COLORS.charcoal }}>@etereastudio</p>
            </div>
          </a>
        </div>

        {/* FORM */}
        <div className="p-6 mb-8" style={{ backgroundColor: COLORS.lightGray }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>O scrivici qui</p>
          <form className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider block mb-2" style={{ color: COLORS.charcoal, opacity: 0.6 }}>Nome</label>
              <input 
                type="text" 
                className="w-full p-3 border bg-white focus:outline-none focus:border-teal-500 transition-colors"
                style={{ borderColor: '#ddd' }}
                placeholder="Mario Rossi"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider block mb-2" style={{ color: COLORS.charcoal, opacity: 0.6 }}>Email</label>
              <input 
                type="email" 
                className="w-full p-3 border bg-white focus:outline-none focus:border-teal-500 transition-colors"
                style={{ borderColor: '#ddd' }}
                placeholder="mario@example.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider block mb-2" style={{ color: COLORS.charcoal, opacity: 0.6 }}>Messaggio</label>
              <textarea 
                rows="4"
                className="w-full p-3 border bg-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
                style={{ borderColor: '#ddd' }}
                placeholder="Raccontaci il tuo progetto..."
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 text-sm uppercase tracking-wider font-medium transition-colors"
              style={{ backgroundColor: COLORS.charcoal, color: COLORS.white }}
            >
              Invia messaggio
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="p-6 mb-8" style={{ backgroundColor: COLORS.cream }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.teal }}>FAQ</p>
          <div className="space-y-4">
            {[
              { q: 'Quanto tempo serve per un sito?', a: 'Dipende dalla complessità. Una vetrina in 2-3 settimane.' },
              { q: 'Fate solo design o anche sviluppo?', a: 'Entrambi. Dalla A alla Z.' },
              { q: 'Lavorate solo a Lucca?', a: 'Operiamo in tutta Italia, anche da remoto.' },
            ].map((item, i) => (
              <div key={i} className="pb-4 border-b last:border-0" style={{ borderColor: '#ddd' }}>
                <p className="font-medium mb-1" style={{ color: COLORS.charcoal }}>{item.q}</p>
                <p className="text-sm" style={{ color: COLORS.charcoal, opacity: 0.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-8">
          <p className="text-sm mb-2" style={{ color: COLORS.charcoal, opacity: 0.6 }}>Eterea Studio © 2024</p>
          <p className="text-xs" style={{ color: COLORS.charcoal, opacity: 0.4 }}>P.IVA 12345678901</p>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== COMPONENTS =====
function PageContainer({ children, color, onBack, title }) {
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
      style={{ backgroundColor: color }}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 px-4 py-4 flex items-center justify-between border-b" 
        style={{ backgroundColor: color, borderColor: '#eee' }}>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: COLORS.charcoal }}
        >
          <ArrowLeft size={18} />
          Indietro
        </button>
        <h1 className="text-sm uppercase tracking-wider font-medium" style={{ color: COLORS.charcoal }}>{title}</h1>
        <div className="w-16" />
      </header>

      {/* CONTENT */}
      <main className="px-4 py-6">
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
    <div className="min-h-screen">
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
