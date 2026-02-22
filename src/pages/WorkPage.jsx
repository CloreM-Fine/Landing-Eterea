import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Danda Wine Bar',
    client: 'Danda Wine Bar',
    category: 'Sito Web',
    year: '2024',
    description: 'Sito web per wine bar di Lucca. Atmosfera elegante e galleria fotografica.',
    image: '/work/danda.png',
    link: 'https://dandawinebar.it',
    color: COLORS.accent,
  },
  {
    id: 2,
    title: 'Colombini Lelio',
    client: 'Colombini Lelio',
    category: 'Sito Web',
    year: '2024',
    description: 'Sito web vetrina per azienda locale di Lucca. Design pulito che valorizza i prodotti.',
    image: '/work/colombini.png',
    link: 'https://colombinilelio.it',
    color: COLORS.secondary,
  },
  {
    id: 3,
    title: 'Welln',
    client: 'Welln',
    category: 'Sito Web',
    year: '2024',
    description: 'Sito web aziendale con focus su benessere. Design moderno e SEO ottimizzata.',
    image: '/work/welln.png',
    link: 'https://welln.it',
    color: COLORS.accent,
  },
  {
    id: 4,
    title: 'Nelle Tue Mani',
    client: 'Progetto in Corso',
    category: 'Sito Web',
    year: '2024',
    description: 'Progetto in fase di sviluppo per nuovo cliente. Design in arrivo.',
    image: '/work/nelletuemani.png',
    link: '#',
    color: COLORS.secondary,
    private: true,
  },
  {
    id: 5,
    title: 'Gestionale Eterea',
    client: 'Eterea Studio',
    category: 'Web App',
    year: '2024',
    description: 'Sistema interno per gestione progetti e clienti. Dashboard completa.',
    image: '/work/gestionale-interno-eterea.png',
    link: '#',
    color: COLORS.accent,
    private: true,
  },
  {
    id: 6,
    title: 'Gestionale Welln',
    client: 'Welln',
    category: 'Web App',
    year: '2024',
    description: 'Gestionale su misura per gestione task e progetti interni.',
    image: '/work/welln-task.png',
    link: '#',
    color: COLORS.secondary,
    private: true,
  },
  {
    id: 7,
    title: 'Gestionale Colombini',
    client: 'Colombini Lelio',
    category: 'Web App',
    year: '2024',
    description: 'Sistema interno per gestione ordini e clienti.',
    image: '/work/gestionale-colombini.png',
    link: '#',
    color: COLORS.accent,
    private: true,
  },
];

const PortfolioItem = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: index * 0.1 }}
    className="group border-b-2 last:border-b-0"
    style={{ borderColor: `${COLORS.secondary}20` }}
  >
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 relative overflow-hidden">
          <div 
            className="aspect-[16/9] overflow-hidden"
            style={{ backgroundColor: `${COLORS.secondary}10` }}
          >
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
            />
          </div>
          <motion.div 
            className="absolute bottom-0 left-0 h-1"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            style={{ backgroundColor: item.color }}
          />
        </div>
        
        <div 
          className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between border-l-2"
          style={{ borderColor: `${COLORS.secondary}20` }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="text-xs font-bold uppercase px-3 py-1 rounded-full"
                style={{ backgroundColor: item.color, color: COLORS.primary }}
              >
                {item.category}
              </span>
              <span style={{ color: `${COLORS.secondary}60` }}>{item.year}</span>
              {item.private && <span style={{ color: `${COLORS.secondary}60` }}>• Privato</span>}
            </div>
            <h3 
              className="text-2xl md:text-3xl font-black uppercase leading-tight group-hover:underline"
              style={{ color: COLORS.secondary }}
            >
              {item.title}
            </h3>
            <p className="text-sm mt-2" style={{ color: `${COLORS.secondary}80` }}>{item.description}</p>
          </div>
          
          <div 
            className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: COLORS.accent }}
          >
            <span>{item.private ? 'Dettagli' : 'Visita'}</span>
            <ExternalLink size={16} />
          </div>
        </div>
      </div>
    </a>
  </motion.div>
);

export function WorkPage() {
  return (
    <div style={{ backgroundColor: COLORS.primary }}>
      {/* HERO */}
      <section className="min-h-[60vh] flex flex-col justify-center p-8 md:p-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span 
            className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full inline-block mb-8"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
          >
            Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter mb-6" style={{ color: COLORS.secondary }}>
            I Nostri <span style={{ color: COLORS.accent }}>Lavori</span>
          </h1>
          <p className="max-w-xl text-base md:text-lg leading-relaxed" style={{ color: `${COLORS.secondary}80` }}>
            Una selezione dei progetti realizzati per i nostri clienti. 
            Siti web e web app sviluppati con cura e attenzione ai dettagli.
          </p>
        </motion.div>
        
        <div 
          className="absolute right-8 bottom-8 text-6xl font-black hidden lg:block"
          style={{ color: `${COLORS.secondary}20` }}
        >
          {PORTFOLIO_ITEMS.length.toString().padStart(2, '0')}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="max-w-6xl mx-auto">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <PortfolioItem key={item.id} item={item} index={index} />
        ))}
      </section>

      {/* CTA */}
      <section 
        className="min-h-[50vh] flex flex-col justify-center items-center p-8"
        style={{ backgroundColor: COLORS.primary }}
      >
        <h2 className="text-3xl md:text-5xl font-black uppercase text-center mb-8" style={{ color: COLORS.secondary }}>
          Hai un progetto in mente?
        </h2>
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          className="px-10 py-5 text-sm font-black uppercase tracking-widest rounded-full"
          style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
        >
          Iniziamo →
        </motion.a>
      </section>
    </div>
  );
}
