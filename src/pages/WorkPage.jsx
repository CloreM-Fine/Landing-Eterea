import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const COLORS = {
  coral: '#FF6B6B',
  teal: '#4ECDC4',
  yellow: '#FFE66D',
  purple: '#9B5DE5',
};

// Progetti reali della web agency
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Colombini Lelio',
    client: 'Colombini Lelio',
    category: 'Sito Web',
    year: '2024',
    description: 'Sito web vetrina per azienda locale di Lucca. Design pulito e minimal che valorizza i prodotti e la storia del brand.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
    link: 'https://colombinilelio.it',
    color: COLORS.coral,
  },
  {
    id: 2,
    title: 'Danda Wine Bar',
    client: 'Danda Wine Bar',
    category: 'Sito Web',
    year: '2024',
    description: 'Sito web per wine bar di Lucca. Atmosfera elegante, galleria fotografica e integrazione con social media.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop',
    link: 'https://dandawinebar.it',
    color: COLORS.teal,
  },
  {
    id: 3,
    title: 'Welln',
    client: 'Welln',
    category: 'Sito Web',
    year: '2024',
    description: 'Sito web aziendale con focus su benessere e lifestyle. Design moderno e ottimizzazione SEO.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=800&fit=crop',
    link: 'https://welln.it',
    color: COLORS.purple,
  },
  {
    id: 4,
    title: 'Gestionale Progetti Alpha',
    client: 'Cliente Privato',
    category: 'Web App / Gestionale',
    year: '2024',
    description: 'Applicazione web personalizzata per la gestione progetti. Dashboard intuitiva, tracciamento task e reportistica.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    link: '#',
    color: COLORS.yellow,
    private: true,
  },
  {
    id: 5,
    title: 'Gestionale CRM Beta',
    client: 'Cliente Privato',
    category: 'Web App / CRM',
    year: '2024',
    description: 'Sistema CRM su misura per gestione clienti e lead. Interfaccia semplice e accesso multi-utente.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    link: '#',
    color: COLORS.coral,
    private: true,
  },
];

const PortfolioItem = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: index * 0.1 }}
    className="group border-b-2 border-gray-200 last:border-b-0"
  >
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Image */}
        <div className="lg:col-span-7 relative overflow-hidden">
          <div className="aspect-[16/9] overflow-hidden">
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.05 }}
            />
          </div>
          {/* Colored bar on hover */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            style={{ backgroundColor: item.color }}
          />
        </div>
        
        {/* Info */}
        <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between border-l-2 border-gray-200 group-hover:border-black transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="text-xs font-bold uppercase px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.category}
              </span>
              <span className="text-xs text-gray-400">{item.year}</span>
              {item.private && (
                <span className="text-xs text-gray-400">• Privato</span>
              )}
            </div>
            <h3 className="text-2xl md:text-4xl font-black uppercase leading-tight group-hover:underline decoration-4 underline-offset-4">
              {item.title}
            </h3>
            <p className="text-sm font-medium mt-2" style={{ color: item.color }}>
              {item.client}
            </p>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {item.description}
            </p>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            <span>{item.private ? 'Dettagli' : 'Visita il sito'}</span>
            <ExternalLink size={16} />
          </div>
        </div>
      </div>
    </a>
  </motion.div>
);

export function WorkPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* HERO */}
      <section className="min-h-[60vh] flex flex-col justify-center p-8 md:p-16 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl relative z-10"
        >
          <span 
            className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full inline-block mb-8 text-white"
            style={{ backgroundColor: COLORS.purple }}
          >
            Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter mb-6">
            I Nostri <span style={{ color: COLORS.coral }}>Lavori</span>
          </h1>
          <p className="max-w-xl text-base md:text-lg leading-relaxed text-gray-600">
            Ogni progetto racconta una storia. Questi sono i primi lavori che hanno 
            dato vita a Eterea: siti web e gestionali fatti con cura per clienti reali.
          </p>
        </motion.div>
        
        {/* Decorative */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute right-20 top-20 w-32 h-32 rounded-full opacity-20"
          style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.teal})` }}
        />
      </section>

      {/* Counter */}
      <section className="border-y-2 border-black py-6 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Progetti completati
          </span>
          <span className="text-6xl font-black" style={{ color: COLORS.teal }}>
            {PORTFOLIO_ITEMS.length.toString().padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* PORTFOLIO LIST */}
      <section className="max-w-6xl mx-auto">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <PortfolioItem key={item.id} item={item} index={index} />
        ))}
      </section>

      {/* CTA */}
      <section 
        className="min-h-[50vh] flex flex-col justify-center items-center p-8 relative overflow-hidden"
        style={{ backgroundColor: COLORS.dark }}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.purple})` }}
        />
        
        <h2 className="text-3xl md:text-5xl font-black uppercase text-center text-white z-10">
          Hai un progetto in mente?
        </h2>
        <p className="text-white/60 text-center max-w-md mt-4 mb-8 z-10">
          Siamo pronti a metterci in gioco sul tuo prossimo progetto.
        </p>
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          className="px-10 py-5 text-sm font-black uppercase tracking-widest rounded-full z-10"
          style={{ backgroundColor: COLORS.coral, color: '#fff' }}
        >
          Iniziamo →
        </motion.a>
      </section>
    </div>
  );
}
