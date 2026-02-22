import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = {
  web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
  gestionali: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
  brand: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop',
  photo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=1000&fit=crop',
  social: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop',
};

const COLORS = {
  coral: '#FF6B6B',
  teal: '#4ECDC4',
  yellow: '#FFE66D',
  purple: '#9B5DE5',
};

const ServiceCard = ({ number, title, description, features, image, color, reverse = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="grid grid-cols-1 lg:grid-cols-2"
  >
    <div 
      className={`p-8 md:p-16 flex flex-col justify-center ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
      style={{ backgroundColor: reverse ? '#fafafa' : color, color: reverse ? '#000' : '#fff' }}
    >
      <span className="text-6xl md:text-8xl font-black opacity-30">{number}</span>
      <h3 className="text-3xl md:text-5xl font-black uppercase mt-2 leading-tight">{title}</h3>
      <p className="text-sm md:text-base mt-6 leading-relaxed opacity-90">{description}</p>
      <ul className="mt-8 space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 rounded-full bg-current opacity-60" />
            {f}
          </li>
        ))}
      </ul>
    </div>
    <div className={`relative overflow-hidden min-h-[400px] ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
      <motion.img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
      />
    </div>
  </motion.div>
);

export function ServiziPage() {
  const services = [
    {
      number: '01',
      title: 'Siti Web',
      description: 'Progettiamo e sviluppiamo siti web moderni, veloci e responsive. Dalle semplici vetrine agli e-commerce complessi.',
      features: ['Design Responsive', 'SEO-friendly', 'CMS facile', 'Performance ottimizzate'],
      image: IMAGES.web,
      color: COLORS.coral,
    },
    {
      number: '02',
      title: 'Gestionali',
      description: 'Applicazioni web personalizzate per gestire il tuo business. Dashboard, gestione progetti e CRM su misura.',
      features: ['Dashboard intuitive', 'Gestione progetti', 'CRM', 'Report & Analytics'],
      image: IMAGES.gestionali,
      color: COLORS.teal,
    },
    {
      number: '03',
      title: 'Brand Identity',
      description: 'Creiamo identità visive che comunicano i valori del tuo brand. Logo, palette colori e linee guida.',
      features: ['Logo Design', 'Visual Identity', 'Color Palette', 'Brand Guidelines'],
      image: IMAGES.brand,
      color: COLORS.purple,
    },
    {
      number: '04',
      title: 'Fotografia',
      description: 'Servizi fotografici professionali per prodotti, locali e corporate. Immagini che valorizzano il tuo business.',
      features: ['Product Photography', 'Foto Locali', 'Corporate', 'Post-produzione'],
      image: IMAGES.photo,
      color: COLORS.yellow,
    },
    {
      number: '05',
      title: 'Social Media',
      description: 'Gestione completa dei social media: strategia, contenuti e community management.',
      features: ['Content Strategy', 'Creazione contenuti', 'Gestione pagine', 'Paid Ads'],
      image: IMAGES.social,
      color: COLORS.coral,
    },
  ];

  return (
    <div style={{ backgroundColor: '#fafafa' }}>
      {/* HERO */}
      <section 
        className="min-h-[80vh] flex flex-col justify-center items-center p-8 md:p-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.purple})` }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 text-white"
        >
          <span className="text-sm font-bold tracking-widest uppercase px-4 py-2 bg-white/20 rounded-full inline-block mb-8">
            What We Do
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-none tracking-tighter">
            Servizi
          </h1>
          <p className="max-w-2xl text-base md:text-lg mt-8 leading-relaxed text-white/80">
            Soluzioni digitali complete, dal concept allo sviluppo.
          </p>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section>
        {services.map((service, index) => (
          <ServiceCard
            key={service.number}
            {...service}
            reverse={index % 2 === 1}
          />
        ))}
      </section>

      {/* CTA */}
      <section 
        className="min-h-[60vh] flex flex-col justify-center items-center p-8"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-center text-white">
          Pronto a<br />
          <span style={{ color: COLORS.teal }}>iniziare?</span>
        </h2>
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-10 py-5 text-sm font-black uppercase tracking-widest rounded-full text-white"
          style={{ backgroundColor: COLORS.coral }}
        >
          Contattaci
        </motion.a>
      </section>
    </div>
  );
}
