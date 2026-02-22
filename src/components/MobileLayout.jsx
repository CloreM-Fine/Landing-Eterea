import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, Mail, Phone, MapPin, Instagram, Plus, Minus, Star, Clock, Calendar, Briefcase, Award, Users, Zap, Globe, Code, Palette } from 'lucide-react';

// ===== NEW COLOR SCHEME =====
const COLORS = {
  primary: '#151e26',      // Dark blue-gray
  secondary: '#f5f5dc',    // Beige/cream
  accent: '#ccff00',       // Keeping the lime accent
  white: '#ffffff',
  lightGray: '#f0f0f0',
  accent2: '#ff3d00',      // Orange accent
};

const projects = [
  { 
    id: 1, 
    name: 'DANDA', 
    type: 'SITO WEB', 
    year: '2024', 
    image: '/work/danda.png', 
    clickable: true, 
    url: 'https://dandawinebar.it',
    client: 'Danda Wine Bar',
    description: 'Sito web elegante per un wine bar di Lucca. Design minimal con focus sulla fotografia dei prodotti.',
    results: ['+150% traffico organico', 'Tempo sul sito +40%', 'Prenotazioni online +200%'],
    testimonial: { text: 'Eterea ha capito perfettamente la nostra visione.', author: 'Marco D.' }
  },
  { 
    id: 2, 
    name: 'COLOMBINI', 
    type: 'SITO WEB', 
    year: '2024', 
    image: '/work/colombini.png', 
    clickable: true, 
    url: 'https://colombinilelio.it',
    client: 'Colombini Lelio',
    description: 'Restyling completo del sito aziendale per un\'impresa storica lucchese.',
    results: ['Bounce rate -35%', 'Lead qualificati +80%', 'Brand perception migliorata'],
    testimonial: { text: 'Professionalità impeccabile e risultati concreti.', author: 'Giulia C.' }
  },
  { 
    id: 3, 
    name: 'WELLN', 
    type: 'SITO WEB', 
    year: '2024', 
    image: '/work/welln.png', 
    clickable: true, 
    url: 'https://welln.it',
    client: 'Welln',
    description: 'Piattaforma wellness con booking integrato e area riservata per i membri.',
    results: ['1,200+ utenti registrati', 'Tasso di conversione 4.5%', 'App mobile in sviluppo'],
    testimonial: { text: 'Hanno trasformato la nostra idea in realtà digitale.', author: 'Team Welln' }
  },
  { 
    id: 4, 
    name: 'NELLE TUE MANI', 
    type: 'IN CORSO', 
    year: '2024', 
    image: '/work/nelletuemani.png', 
    clickable: false,
    client: 'Associazione NTM',
    description: 'Piattaforma e-learning per corsi di formazione professionale.',
    results: ['In sviluppo', 'Lancio previsto Q1 2025'],
    testimonial: null
  },
  { 
    id: 5, 
    name: 'ETEREA CRM', 
    type: 'WEB APP', 
    year: '2024', 
    image: '/work/gestionale-interno-eterea.png', 
    clickable: false,
    client: 'Internal',
    description: 'Sistema CRM custom sviluppato per gestire i nostri progetti e clienti.',
    results: ['Efficienza +60%', 'Automazione workflow', 'Integrazione con Slack'],
    testimonial: null
  },
  { 
    id: 6, 
    name: 'WELLN TASK', 
    type: 'WEB APP', 
    year: '2024', 
    image: '/work/welln-task.png', 
    clickable: false,
    client: 'Welln',
    description: 'Sistema di task management per team wellness con notifiche e reporting.',
    results: ['Produttività team +40%', 'Task completati 5,000+', 'Soddisfazione utenti 95%'],
    testimonial: { text: 'Tool indispensabile per la nostra operatività quotidiana.', author: 'Team Welln' }
  },
  { 
    id: 7, 
    name: 'COLOMBINI ERP', 
    type: 'WEB APP', 
    year: '2024', 
    image: '/work/gestionale-colombini.png', 
    clickable: false,
    client: 'Colombini Lelio',
    description: 'Gestionale su misura per la logistica e il magazzino.',
    results: ['Errori logistica -70%', 'Tempi di evasione -50%', 'ROI in 6 mesi'],
    testimonial: { text: 'Soluzione che ha rivoluzionato i nostri processi.', author: 'Direzione Colombini' }
  },
];

// 3D service removed as requested
const services = [
  { num: '01', title: 'WEB DESIGN', desc: 'Interfacce che convertono. Design brutale, minimal e funzionale.', details: ['UI/UX Design', 'Prototipazione', 'Design System', 'User Research'] },
  { num: '02', title: 'SITI WEB', desc: 'Vetrine digitali performanti. Veloci, responsive e ottimizzate SEO.', details: ['Siti Vetrina', 'Landing Page', 'Corporate Website', 'Blog'] },
  { num: '03', title: 'E-COMMERCE', desc: 'Negozi che vendono. Piattaforme WooCommerce e custom.', details: ['WooCommerce', 'Shopify', 'Checkout Ottimizzato', 'Gestione Inventario'] },
  { num: '04', title: 'WEB APP', desc: 'Gestionali su misura. Applicazioni web complesse e scalabili.', details: ['Dashboard Admin', 'CRM Custom', 'Portali Clienti', 'API Integration'] },
  { num: '05', title: 'BRANDING', desc: 'Identità che si ricorda. Logo, palette e brand guidelines.', details: ['Logo Design', 'Brand Identity', 'Style Guide', 'Visual Strategy'] },
  { num: '06', title: 'FOTO & VIDEO', desc: 'Contenuti professionali. Shooting e post-produzione.', details: ['Fotografia Prodotto', 'Video Aziendali', 'Editing', 'Drone'] },
  { num: '07', title: 'SOCIAL', desc: 'Presenza che cresce. Strategia, contenuti e community management.', details: ['Content Strategy', 'Social Media Management', 'Paid Ads', 'Analytics'] },
];

const testimonials = [
  { text: "Eterea ha superato ogni aspettativa. Il nuovo sito ha triplicato le nostre prenotazioni.", author: "Marco D.", company: "Danda Wine Bar", rating: 5 },
  { text: "Professionalità, creatività e attenzione ai dettagli. Consigliatissimi!", author: "Giulia C.", company: "Colombini Lelio", rating: 5 },
  { text: "Finalmente un team che capisce davvero il digitale. Risultati concreti.", author: "Team Welln", company: "Welln", rating: 5 },
  { text: "La nostra identità visiva non è mai stata così forte. Grazie Eterea!", author: "Alessandro R.", company: "Nelle Tue Mani", rating: 5 },
];

const clientLogos = ['DANDA', 'COLOMBINI', 'WELLN', 'NTM', 'STARTUP A', 'STARTUP B'];

const values = [
  { title: 'NO TEMPLATE', desc: 'Ogni progetto è unico, costruito su misura.' },
  { title: 'CODICE PULITO', desc: 'Tecnologie moderne e codice manutenibile.' },
  { title: 'TRASPARENZA', desc: 'Comunicazione chiara, nessuna sorpresa.' },
  { title: 'RISULTATI', desc: 'Design che converte, non solo che decora.' },
];

const timeline = [
  { year: '2022', event: 'Nasce Eterea', desc: 'Tre professionisti, una visione condivisa.' },
  { year: '2023', event: 'Primi Clienti', desc: 'Danda e i primi progetti web.' },
  { year: '2024', event: 'Crescita', desc: 'Espansione team e nuovi servizi.' },
  { year: '2025', event: 'Il Futuro', desc: 'AI integration e mercati esteri.' },
];

const techStack = [
  { category: 'Frontend', tools: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', tools: ['Node.js', 'Python', 'PostgreSQL', 'Supabase'] },
  { category: 'Design', tools: ['Figma', 'Adobe CC', 'Blender', 'After Effects'] },
  { category: 'DevOps', tools: ['Vercel', 'GitHub', 'Docker', 'AWS'] },
];

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'Analisi approfondita del tuo business, obiettivi e competitor.' },
  { num: '02', title: 'Strategy', desc: 'Definiamo la roadmap e le metriche di successo.' },
  { num: '03', title: 'Design', desc: 'Wireframe, mockup e prototipi interattivi.' },
  { num: '04', title: 'Develop', desc: 'Sviluppo agile con sprint settimanali.' },
  { num: '05', title: 'Test', desc: 'QA, ottimizzazione performance e usability testing.' },
  { num: '06', title: 'Launch', desc: 'Deploy, monitoraggio e supporto post-lancio.' },
];

const faqs = [
  { q: 'Quanto tempo serve per un sito web?', a: 'Un sito vetrina richiede 3-4 settimane, un e-commerce 6-8 settimane, una web app 2-3 mesi.' },
  { q: 'Quali sono i costi?', a: 'Partiamo da €2.500 per siti vetrina. Ogni preventivo è personalizzato in base alle esigenze.' },
  { q: 'Fate anche la manutenzione?', a: 'Sì, offriamo pacchetti di manutenzione mensile con hosting, backup e aggiornamenti inclusi.' },
  { q: 'Lavorate solo a Lucca?', a: 'Abbiamo sede a Lucca ma lavoriamo con clienti in tutta Italia e all\'estero.' },
  { q: 'Usate template o è tutto custom?', a: 'Zero template. Ogni progetto è sviluppato su misura per le tue esigenze specifiche.' },
];

const teamDetails = [
  { role: 'Creative Director', name: 'Marco', focus: 'Design & UX', exp: '8+ anni', bio: 'Ex designer freelance, specializzato in UI/UX e brand identity.' },
  { role: 'Lead Developer', name: 'Luca', focus: 'Frontend & Backend', exp: '10+ anni', bio: 'Full-stack developer con passione per performance e clean code.' },
  { role: 'Strategist', name: 'Giulia', focus: 'Content & Social', exp: '6+ anni', bio: 'Esperta di digital marketing e content strategy.' },
];

// ===== MARQUEE COMPONENT =====
function Marquee({ text, speed = 20, reverse = false, bgColor = COLORS.accent, textColor = COLORS.primary }) {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4 border-y-4" style={{ backgroundColor: bgColor, borderColor: COLORS.primary }}>
      <motion.div 
        className="flex gap-8"
        animate={{ x: reverse ? [0, -1000] : [-1000, 0] }}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-2xl font-black uppercase tracking-tighter" style={{ color: textColor }}>
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
      style={{ backgroundColor: COLORS.primary }}
    >
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-4 border-b-4" style={{ backgroundColor: COLORS.primary, borderColor: 'rgba(245,245,220,0.2)' }}>
        <div className="font-black text-xl tracking-tighter" style={{ color: COLORS.secondary }}>ETEREA</div>
        <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(245,245,220,0.6)' }}>Lucca</div>
      </header>

      {/* HERO */}
      <section className="pt-24 pb-8 px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[15vw] font-black leading-[0.8] tracking-tighter mb-4" style={{ color: COLORS.secondary }}>
            WEB<br />
            <span style={{ color: COLORS.accent }}>AGENCY</span>
          </h1>
          
          <p className="text-lg mb-8 max-w-xs leading-relaxed" style={{ color: 'rgba(245,245,220,0.6)' }}>
            Design brutale. Codice pulito. Risultati concreti.
          </p>

          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('work')}
              className="px-6 py-3 font-black text-sm uppercase tracking-wider transition-all active:scale-95 border-4"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary, borderColor: COLORS.primary }}
            >
              Portfolio
            </button>
            <button 
              onClick={() => onNavigate('contatti')}
              className="px-6 py-3 font-black text-sm uppercase tracking-wider border-4 transition-all active:scale-95"
              style={{ borderColor: COLORS.secondary, color: COLORS.secondary }}
            >
              Contatti
            </button>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <Marquee text="DESIGN ★ CODE ★ GROW ★ REPEAT" speed={15} />

      {/* STATS SECTION */}
      <section className="py-12 px-4 border-b-4" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 border-4" 
            style={{ borderColor: COLORS.accent, backgroundColor: COLORS.accent }}
          >
            <span className="text-4xl font-black" style={{ color: COLORS.primary }}>7+</span>
            <p className="text-sm font-bold mt-2" style={{ color: COLORS.primary }}>Progetti Completati</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 border-4" 
            style={{ borderColor: COLORS.secondary }}
          >
            <span className="text-4xl font-black" style={{ color: COLORS.secondary }}>3</span>
            <p className="text-sm font-bold mt-2" style={{ color: 'rgba(245,245,220,0.6)' }}>Professionisti</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 border-4" 
            style={{ borderColor: COLORS.secondary }}
          >
            <span className="text-4xl font-black" style={{ color: COLORS.secondary }}>100%</span>
            <p className="text-sm font-bold mt-2" style={{ color: 'rgba(245,245,220,0.6)' }}>Clienti Soddisfatti</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 border-4" 
            style={{ borderColor: COLORS.accent, backgroundColor: COLORS.accent }}
          >
            <span className="text-4xl font-black" style={{ color: COLORS.primary }}>24h</span>
            <p className="text-sm font-bold mt-2" style={{ color: COLORS.primary }}>Tempo di Risposta</p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-16 px-4 border-b-4" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl font-black" style={{ color: COLORS.accent2 }}>*</span>
          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(245,245,220,0.4)' }}>Chi Siamo</p>
            <p className="text-2xl font-medium leading-tight" style={{ color: COLORS.secondary }}>
              Tre professionisti.<br />
              Una visione.<br />
              Zero compromessi.
            </p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('chi-siamo')}
          className="flex items-center gap-2 text-sm uppercase tracking-wider transition-colors"
          style={{ color: 'rgba(245,245,220,0.6)' }}
        >
          Scopri di più <ArrowUpRight size={16} />
        </button>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 px-4">
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'rgba(245,245,220,0.4)' }}>Servizi</p>
        <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(245,245,220,0.1)' }}>
          {services.slice(0, 4).map((s, i) => (
            <motion.div 
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onNavigate('servizi')}
              className="p-6 cursor-pointer transition-all active:scale-95 border-4"
              style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary }}
            >
              <span className="text-xs font-mono mb-2 block" style={{ color: 'rgba(245,245,220,0.3)' }}>{s.num}</span>
              <h3 className="font-black text-lg uppercase tracking-tight mb-1" style={{ color: COLORS.secondary }}>{s.title}</h3>
              <p className="text-xs" style={{ color: 'rgba(245,245,220,0.4)' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="py-16 px-4 border-t-4" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
        <div className="flex justify-between items-end mb-8">
          <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(245,245,220,0.4)' }}>Selected Work</p>
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
              className={`group flex items-center justify-between py-4 border-b-2 ${p.clickable ? 'cursor-pointer' : ''}`}
              style={{ borderColor: 'rgba(245,245,220,0.1)' }}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs" style={{ color: 'rgba(245,245,220,0.2)' }}>0{p.id}</span>
                <h3 className="font-black text-xl uppercase tracking-tight group-hover:translate-x-2 transition-transform" style={{ color: COLORS.secondary }}>
                  {p.name}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase hidden sm:block" style={{ color: 'rgba(245,245,220,0.4)' }}>{p.type}</span>
                {p.clickable && <ArrowUpRight size={20} style={{ color: 'rgba(245,245,220,0.4)' }} className="group-hover:text-white transition-colors" />}
              </div>
            </motion.div>
          ))}
        </div>
        
        <button 
          onClick={() => onNavigate('work')}
          className="mt-8 w-full py-4 font-black text-sm uppercase tracking-wider border-4 transition-all hover:bg-white hover:text-black"
          style={{ borderColor: COLORS.secondary, color: COLORS.secondary }}
        >
          Vedi tutti i progetti
        </button>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 px-4 border-t-4" style={{ borderColor: 'rgba(245,245,220,0.1)', backgroundColor: COLORS.secondary }}>
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'rgba(21,30,38,0.4)' }}>Testimonials</p>
        <div className="space-y-6">
          {testimonials.slice(0, 2).map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border-4" 
              style={{ borderColor: COLORS.primary, backgroundColor: COLORS.secondary }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} fill={COLORS.accent} style={{ color: COLORS.accent }} />
                ))}
              </div>
              <p className="text-lg font-medium mb-4" style={{ color: COLORS.primary }}>"{t.text}"</p>
              <div>
                <p className="font-black text-sm" style={{ color: COLORS.primary }}>{t.author}</p>
                <p className="text-xs" style={{ color: 'rgba(21,30,38,0.6)' }}>{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CLIENT LOGOS PLACEHOLDER */}
      <section className="py-12 px-4 border-t-4" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
        <p className="text-xs uppercase tracking-widest mb-8 text-center" style={{ color: 'rgba(245,245,220,0.4)' }}>Hanno fiducia in noi</p>
        <div className="grid grid-cols-3 gap-4">
          {clientLogos.map((logo, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 border-2 flex items-center justify-center" 
              style={{ borderColor: 'rgba(245,245,220,0.2)' }}
            >
              <span className="font-black text-sm" style={{ color: 'rgba(245,245,220,0.4)' }}>{logo}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4" style={{ backgroundColor: COLORS.accent }}>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(21,30,38,0.6)' }}>Hai un progetto?</p>
        <h2 className="text-5xl font-black leading-none tracking-tighter mb-6" style={{ color: COLORS.primary }}>
          PARLIAMO<br />NE
        </h2>
        <button 
          onClick={() => onNavigate('contatti')}
          className="px-8 py-4 font-black text-sm uppercase tracking-wider border-4 transition-all"
          style={{ backgroundColor: COLORS.primary, color: COLORS.secondary, borderColor: COLORS.primary }}
        >
          Iniziamo →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t-4" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
        <div className="flex justify-between items-center">
          <p className="text-xs" style={{ color: 'rgba(245,245,220,0.4)' }}>ETEREA STUDIO © 2024</p>
          <div className="flex gap-4">
            <span className="text-xs uppercase" style={{ color: 'rgba(245,245,220,0.4)' }}>IG</span>
            <span className="text-xs uppercase" style={{ color: 'rgba(245,245,220,0.4)' }}>LI</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

// ===== WORK PAGE =====
function WorkPage({ onBack, onNavigate }) {
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
          <p className="text-sm uppercase tracking-widest mt-2" style={{ color: 'rgba(245,245,220,0.4)' }}>Progetti selezionati</p>
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
              <div className="relative overflow-hidden aspect-[4/3] mb-4 border-4" style={{ borderColor: COLORS.primary }}>
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
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center border-4" style={{ backgroundColor: COLORS.accent, borderColor: COLORS.primary }}>
                    <ArrowUpRight size={20} style={{ color: COLORS.primary }} />
                  </div>
                )}
              </div>
              
              <div className="pb-8 border-b-4" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-2xl uppercase tracking-tight" style={{ color: COLORS.secondary }}>{p.name}</h3>
                  <span className="text-xs font-mono" style={{ color: 'rgba(245,245,220,0.4)' }}>{p.year}</span>
                </div>
                <p className="text-sm uppercase tracking-wider mb-3" style={{ color: 'rgba(245,245,220,0.4)' }}>{p.type}</p>
                <p className="text-sm mb-4" style={{ color: 'rgba(245,245,220,0.6)' }}>{p.description}</p>
                
                {/* Results Section per project */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: COLORS.accent }}>Risultati</p>
                  <ul className="space-y-1">
                    {p.results.map((r, j) => (
                      <li key={j} className="text-xs" style={{ color: 'rgba(245,245,220,0.5)' }}>• {r}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Testimonial per project */}
                {p.testimonial && (
                  <div className="p-4 border-2 mt-4" style={{ borderColor: 'rgba(245,245,220,0.2)' }}>
                    <p className="text-sm italic mb-2" style={{ color: 'rgba(245,245,220,0.7)' }}>"{p.testimonial.text}"</p>
                    <p className="text-xs font-bold" style={{ color: COLORS.accent }}>— {p.testimonial.author}</p>
                  </div>
                )}
                
                {!p.clickable && (
                  <p className="text-xs mt-2" style={{ color: 'rgba(245,245,220,0.2)' }}>Progetto privato / in corso</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 py-12 border-y-4 mt-12" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
          <div className="text-center">
            <span className="text-3xl font-black block" style={{ color: COLORS.secondary }}>7</span>
            <span className="text-xs uppercase" style={{ color: 'rgba(245,245,220,0.4)' }}>Progetti</span>
          </div>
          <div className="text-center">
            <span className="text-3xl font-black block" style={{ color: COLORS.secondary }}>3</span>
            <span className="text-xs uppercase" style={{ color: 'rgba(245,245,220,0.4)' }}>Siti Live</span>
          </div>
          <div className="text-center">
            <span className="text-3xl font-black block" style={{ color: COLORS.secondary }}>4</span>
            <span className="text-xs uppercase" style={{ color: 'rgba(245,245,220,0.4)' }}>Web App</span>
          </div>
        </div>

        {/* CASE STUDIES TEASER */}
        <div className="mt-12 p-6 border-4" style={{ borderColor: COLORS.accent, backgroundColor: COLORS.accent }}>
          <h3 className="text-2xl font-black mb-4" style={{ color: COLORS.primary }}>Vuoi vedere i dettagli?</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(21,30,38,0.7)' }}>Scopri come abbiamo aiutato i nostri clienti a crescere.</p>
          <button 
            onClick={() => onNavigate('contatti')}
            className="px-6 py-3 font-black text-sm uppercase border-4"
            style={{ borderColor: COLORS.primary, color: COLORS.primary }}
          >
            Richiedi Case Study
          </button>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== SERVIZI PAGE =====
function ServiziPage({ onBack, onNavigate }) {
  const [openService, setOpenService] = useState(null);

  return (
    <PageContainer onBack={onBack} title="SERVIZI">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm uppercase tracking-widest mb-8" style={{ color: 'rgba(245,245,220,0.4)' }}>
          Tutto ciò che serve per il tuo business digitale
        </p>

        {/* SERVICES LIST - 3D removed (7 services now) */}
        <div className="space-y-px border-t-4" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="border-b-4" 
              style={{ borderColor: 'rgba(245,245,220,0.1)' }}
            >
              <button 
                onClick={() => setOpenService(openService === i ? null : i)}
                className="w-full py-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm" style={{ color: 'rgba(245,245,220,0.2)' }}>{s.num}</span>
                  <h3 className="font-black text-2xl uppercase tracking-tight group-hover:translate-x-2 transition-transform" style={{ color: COLORS.secondary }}>
                    {s.title}
                  </h3>
                </div>
                <div className="w-8 h-8 flex items-center justify-center border-4" style={{ borderColor: 'rgba(245,245,220,0.2)' }}>
                  {openService === i ? (
                    <Minus size={16} style={{ color: COLORS.secondary }} />
                  ) : (
                    <Plus size={16} style={{ color: COLORS.secondary }} />
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
                      <p className="text-base mb-4" style={{ color: 'rgba(245,245,220,0.6)' }}>{s.desc}</p>
                      <div className="mb-4">
                        <p className="text-xs uppercase tracking-wider mb-2" style={{ color: COLORS.accent }}>Cosa includiamo:</p>
                        <ul className="grid grid-cols-2 gap-2">
                          {s.details.map((d, j) => (
                            <li key={j} className="text-xs" style={{ color: 'rgba(245,245,220,0.5)' }}>• {d}</li>
                          ))}
                        </ul>
                      </div>
                      <button 
                        onClick={() => onNavigate && onNavigate('contatti')}
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

        {/* PROCESS SECTION */}
        <div className="mt-16">
          <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'rgba(245,245,220,0.4)' }}>Il Nostro Processo</p>
          <div className="space-y-4">
            {processSteps.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border-4" 
                style={{ borderColor: i % 2 === 0 ? COLORS.accent : COLORS.secondary }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black" style={{ color: COLORS.accent }}>{step.num}</span>
                  <div>
                    <h4 className="font-black text-lg uppercase mb-2" style={{ color: COLORS.secondary }}>{step.title}</h4>
                    <p className="text-sm" style={{ color: 'rgba(245,245,220,0.6)' }}>{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TECH STACK */}
        <div className="mt-16">
          <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'rgba(245,245,220,0.4)' }}>Stack Tecnologico</p>
          <div className="grid grid-cols-2 gap-4">
            {techStack.map((stack, i) => (
              <motion.div 
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 border-4" 
                style={{ borderColor: 'rgba(245,245,220,0.2)' }}
              >
                <p className="text-xs uppercase tracking-wider mb-3" style={{ color: COLORS.accent }}>{stack.category}</p>
                <div className="flex flex-wrap gap-2">
                  {stack.tools.map((tool, j) => (
                    <span key={j} className="text-xs px-2 py-1 border-2" style={{ borderColor: 'rgba(245,245,220,0.2)', color: 'rgba(245,245,220,0.7)' }}>{tool}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PACKAGES */}
        <div className="mt-16 space-y-4">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(245,245,220,0.4)' }}>Pacchetti</p>
          
          <div className="p-6 border-4" style={{ borderColor: 'rgba(245,245,220,0.2)' }}>
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-black text-xl uppercase" style={{ color: COLORS.secondary }}>STARTER</h4>
              <span className="text-xs font-mono" style={{ color: 'rgba(245,245,220,0.4)' }}>Sito Vetrina</span>
            </div>
            <ul className="space-y-2 text-sm mb-6" style={{ color: 'rgba(245,245,220,0.6)' }}>
              <li>• Home + 3 pagine</li>
              <li>• Design responsive</li>
              <li>• SEO base</li>
              <li>• Form contatti</li>
            </ul>
            <p className="text-2xl font-black" style={{ color: COLORS.accent }}>da €2.500</p>
          </div>

          <div className="p-6 border-4" style={{ borderColor: COLORS.accent, backgroundColor: COLORS.accent }}>
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-black text-xl uppercase" style={{ color: COLORS.primary }}>BUSINESS</h4>
              <span className="text-xs font-mono" style={{ color: 'rgba(21,30,38,0.5)' }}>E-commerce</span>
            </div>
            <ul className="space-y-2 text-sm mb-6" style={{ color: 'rgba(21,30,38,0.8)' }}>
              <li>• Shop completo</li>
              <li>• Gestione prodotti</li>
              <li>• Pagamenti integrati</li>
              <li>• Dashboard admin</li>
            </ul>
            <p className="text-2xl font-black" style={{ color: COLORS.primary }}>da €5.000</p>
          </div>

          <div className="p-6 border-4" style={{ borderColor: 'rgba(245,245,220,0.2)' }}>
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-black text-xl uppercase" style={{ color: COLORS.secondary }}>CUSTOM</h4>
              <span className="text-xs font-mono" style={{ color: 'rgba(245,245,220,0.4)' }}>Web App</span>
            </div>
            <ul className="space-y-2 text-sm mb-6" style={{ color: 'rgba(245,245,220,0.6)' }}>
              <li>• Su misura</li>
              <li>• Gestionali</li>
              <li>• Integrazioni API</li>
              <li>• Supporto dedicato</li>
            </ul>
            <p className="text-2xl font-black" style={{ color: COLORS.accent }}>Su preventivo</p>
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
          <h2 className="text-6xl font-black leading-[0.85] tracking-tighter mb-4" style={{ color: COLORS.secondary }}>
            TRE<br />
            <span style={{ color: COLORS.accent }}>MENTI</span><br />
            CREATIVI
          </h2>
          <p className="text-lg max-w-xs" style={{ color: 'rgba(245,245,220,0.4)' }}>
            Design × Code × Strategy
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-6 text-base leading-relaxed mb-12" style={{ color: 'rgba(245,245,220,0.6)' }}>
          <p>
            Siamo un collettivo di designer e sviluppatori con sede a Lucca. 
            Creiamo esperienze digitali che uniscono estetica e funzionalità.
          </p>
          <p>
            Non crediamo nei template. Ogni progetto è una sfida unica che affrontiamo 
            con metodo e creatività.
          </p>
          <p className="font-medium border-l-4 pl-4" style={{ borderColor: COLORS.accent, color: COLORS.secondary }}>
            "Design pulito, codice pulito, risultati concreti."
          </p>
        </div>

        {/* TIMELINE / HISTORY SECTION */}
        <div className="border-t-4 pt-8 mb-12" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(245,245,220,0.4)' }}>La Nostra Storia</p>
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-16 flex-shrink-0">
                  <span className="text-xl font-black" style={{ color: COLORS.accent }}>{item.year}</span>
                </div>
                <div className="pb-6 border-l-4 pl-4" style={{ borderColor: 'rgba(245,245,220,0.2)' }}>
                  <h4 className="font-black uppercase mb-1" style={{ color: COLORS.secondary }}>{item.event}</h4>
                  <p className="text-sm" style={{ color: 'rgba(245,245,220,0.5)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* VALUES SECTION */}
        <div className="border-t-4 pt-8 mb-12" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(245,245,220,0.4)' }}>I Nostri Valori</p>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 border-4" 
                style={{ borderColor: i % 2 === 0 ? COLORS.accent : COLORS.secondary }}
              >
                <h4 className="font-black text-sm uppercase mb-2" style={{ color: COLORS.secondary }}>{v.title}</h4>
                <p className="text-xs" style={{ color: 'rgba(245,245,220,0.5)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div className="border-t-4 pt-8 mb-12" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(245,245,220,0.4)' }}>Team</p>
          <div className="space-y-4">
            {teamDetails.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 border-4" 
                style={{ borderColor: 'rgba(245,245,220,0.1)' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-black text-lg" style={{ color: COLORS.secondary }}>{m.name}</p>
                    <p className="text-sm" style={{ color: COLORS.accent }}>{m.role}</p>
                  </div>
                  <span className="text-2xl font-black" style={{ color: 'rgba(245,245,220,0.1)' }}>0{i + 1}</span>
                </div>
                <p className="text-xs mb-2" style={{ color: 'rgba(245,245,220,0.5)' }}>{m.focus} • {m.exp}</p>
                <p className="text-sm" style={{ color: 'rgba(245,245,220,0.6)' }}>{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PROCESS */}
        <div className="border-t-4 pt-8 mb-12" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(245,245,220,0.4)' }}>Process</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '01', step: 'Discovery' },
              { num: '02', step: 'Design' },
              { num: '03', step: 'Develop' },
              { num: '04', step: 'Deploy' },
            ].map((s) => (
              <div key={s.num} className="p-4 border-4" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
                <span className="text-xs font-mono block mb-1" style={{ color: 'rgba(245,245,220,0.3)' }}>{s.num}</span>
                <span className="font-black uppercase" style={{ color: COLORS.secondary }}>{s.step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LOCATION */}
        <div className="p-6 border-4" style={{ borderColor: COLORS.accent, backgroundColor: COLORS.accent }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(21,30,38,0.6)' }}>Location</p>
          <p className="font-black text-2xl uppercase" style={{ color: COLORS.primary }}>Lucca, Toscana</p>
          <p className="text-sm mt-1" style={{ color: 'rgba(21,30,38,0.6)' }}>Italia</p>
        </div>
      </motion.div>
    </PageContainer>
  );
}

// ===== CONTATTI PAGE =====
function ContattiPage({ onBack }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <PageContainer onBack={onBack} title="CONTATTI">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* BIG CTA */}
        <div className="mb-12">
          <h2 className="text-5xl font-black leading-[0.9] tracking-tighter mb-6" style={{ color: COLORS.secondary }}>
            PARLIAMO<br />
            DEL TUO<br />
            <span style={{ color: COLORS.accent }}>PROGETTO</span>
          </h2>
          <p className="text-base" style={{ color: 'rgba(245,245,220,0.6)' }}>
            Rispondiamo entro 24 ore.
          </p>
        </div>

        {/* CONTACT METHODS */}
        <div className="space-y-px border-t-4 mb-12" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
          <a href="mailto:info@etereastudio.com" className="flex items-center justify-between py-6 border-b-4 group" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
            <div className="flex items-center gap-4">
              <Mail size={24} style={{ color: 'rgba(245,245,220,0.4)' }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(245,245,220,0.4)' }}>Email</p>
                <p className="font-medium" style={{ color: COLORS.secondary }}>info@etereastudio.com</p>
              </div>
            </div>
            <ArrowUpRight size={20} style={{ color: 'rgba(245,245,220,0.4)' }} className="group-hover:text-white transition-colors" />
          </a>

          <a href="tel:+393331234567" className="flex items-center justify-between py-6 border-b-4 group" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
            <div className="flex items-center gap-4">
              <Phone size={24} style={{ color: 'rgba(245,245,220,0.4)' }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(245,245,220,0.4)' }}>Telefono</p>
                <p className="font-medium" style={{ color: COLORS.secondary }}>+39 333 123 4567</p>
              </div>
            </div>
            <ArrowUpRight size={20} style={{ color: 'rgba(245,245,220,0.4)' }} className="group-hover:text-white transition-colors" />
          </a>

          <div className="flex items-center justify-between py-6 border-b-4" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
            <div className="flex items-center gap-4">
              <MapPin size={24} style={{ color: 'rgba(245,245,220,0.4)' }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(245,245,220,0.4)' }}>Sede</p>
                <p className="font-medium" style={{ color: COLORS.secondary }}>Lucca, Toscana</p>
              </div>
            </div>
          </div>

          <a href="https://instagram.com/etereastudio" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-6 border-b-4 group" style={{ borderColor: 'rgba(245,245,220,0.1)' }}>
            <div className="flex items-center gap-4">
              <Instagram size={24} style={{ color: 'rgba(245,245,220,0.4)' }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(245,245,220,0.4)' }}>Instagram</p>
                <p className="font-medium" style={{ color: COLORS.secondary }}>@etereastudio</p>
              </div>
            </div>
            <ArrowUpRight size={20} style={{ color: 'rgba(245,245,220,0.4)' }} className="group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* OFFICE HOURS */}
        <div className="mb-12 p-6 border-4" style={{ borderColor: 'rgba(245,245,220,0.2)' }}>
          <div className="flex items-center gap-3 mb-4">
            <Clock size={20} style={{ color: COLORS.accent }} />
            <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(245,245,220,0.4)' }}>Orari Ufficio</p>
          </div>
          <div className="space-y-2 text-sm" style={{ color: 'rgba(245,245,220,0.6)' }}>
            <div className="flex justify-between">
              <span>Lunedì - Venerdì</span>
              <span>9:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span>Sabato</span>
              <span>Su appuntamento</span>
            </div>
            <div className="flex justify-between">
              <span>Domenica</span>
              <span>Chiuso</span>
            </div>
          </div>
        </div>

        {/* MAP PLACEHOLDER */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(245,245,220,0.4)' }}>Dove Trovarci</p>
          <div className="aspect-video border-4 flex items-center justify-center" style={{ borderColor: 'rgba(245,245,220,0.2)', backgroundColor: 'rgba(245,245,220,0.05)' }}>
            <div className="text-center">
              <MapPin size={48} style={{ color: 'rgba(245,245,220,0.2)' }} className="mx-auto mb-2" />
              <p className="text-sm" style={{ color: 'rgba(245,245,220,0.4)' }}>Lucca, Toscana, Italia</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(245,245,220,0.3)' }}>Map loading...</p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 border-4 mb-12" style={{ borderColor: 'rgba(245,245,220,0.2)' }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(245,245,220,0.4)' }}>O scrivi qui</p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input 
                type="text" 
                placeholder="NOME"
                className="w-full bg-transparent border-b-4 py-3 placeholder:text-white/30 focus:outline-none transition-colors uppercase text-sm tracking-wider"
                style={{ borderColor: 'rgba(245,245,220,0.2)', color: COLORS.secondary }}
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="EMAIL"
                className="w-full bg-transparent border-b-4 py-3 placeholder:text-white/30 focus:outline-none transition-colors uppercase text-sm tracking-wider"
                style={{ borderColor: 'rgba(245,245,220,0.2)', color: COLORS.secondary }}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="AZIENDA (OPZIONALE)"
                className="w-full bg-transparent border-b-4 py-3 placeholder:text-white/30 focus:outline-none transition-colors uppercase text-sm tracking-wider"
                style={{ borderColor: 'rgba(245,245,220,0.2)', color: COLORS.secondary }}
              />
            </div>
            <div>
              <textarea 
                placeholder="MESSAGGIO"
                rows="4"
                className="w-full bg-transparent border-b-4 py-3 placeholder:text-white/30 focus:outline-none transition-colors uppercase text-sm tracking-wider resize-none"
                style={{ borderColor: 'rgba(245,245,220,0.2)', color: COLORS.secondary }}
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 font-black text-sm uppercase tracking-wider transition-all hover:opacity-80 border-4"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary, borderColor: COLORS.accent }}
            >
              Invia →
            </button>
          </form>
        </div>

        {/* FAQ SECTION */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(245,245,220,0.4)' }}>FAQ</p>
          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b-4" 
                style={{ borderColor: 'rgba(245,245,220,0.1)' }}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-4 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-sm pr-4" style={{ color: COLORS.secondary }}>{faq.q}</span>
                  {openFaq === i ? (
                    <Minus size={16} style={{ color: COLORS.accent }} />
                  ) : (
                    <Plus size={16} style={{ color: 'rgba(245,245,220,0.4)' }} />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-sm" style={{ color: 'rgba(245,245,220,0.6)' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#00ff00' }} />
          <span className="text-sm" style={{ color: 'rgba(245,245,220,0.6)' }}>Disponibili per nuovi progetti</span>
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

  if (!mounted) return <div className="min-h-screen" style={{ backgroundColor: COLORS.primary }} />;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{ backgroundColor: COLORS.primary }}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 py-4 border-b-4" style={{ backgroundColor: COLORS.primary, borderColor: 'rgba(245,245,220,0.1)' }}>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ color: 'rgba(245,245,220,0.6)' }}
        >
          <ArrowLeft size={18} />
          <span className="text-sm uppercase tracking-wider font-medium">Back</span>
        </button>
        <span className="font-black text-sm tracking-wider" style={{ color: COLORS.secondary }}>{title}</span>
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
    <div className="min-h-screen" style={{ backgroundColor: COLORS.primary }}>
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <HomePage key="home" onNavigate={handleNavigate} />
        )}
        {currentPage === 'chi-siamo' && (
          <ChiSiamoPage key="chi-siamo" onBack={handleBack} />
        )}
        {currentPage === 'servizi' && (
          <ServiziPage key="servizi" onBack={handleBack} onNavigate={handleNavigate} />
        )}
        {currentPage === 'work' && (
          <WorkPage key="work" onBack={handleBack} onNavigate={handleNavigate} />
        )}
        {currentPage === 'contatti' && (
          <ContattiPage key="contatti" onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}
