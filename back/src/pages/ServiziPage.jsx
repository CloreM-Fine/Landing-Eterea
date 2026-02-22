import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = {
  web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
  app: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
  brand: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop',
  motion: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
  photo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=1000&fit=crop',
  video: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
  social: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop',
  three: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop',
};

const ServiceCard = ({ number, title, description, features, image, reverse = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`grid grid-cols-1 lg:grid-cols-2 border-b-2 border-black ${reverse ? 'lg:flex-row-reverse' : ''}`}
  >
    <div className={`p-8 md:p-16 flex flex-col justify-center ${reverse ? 'lg:order-2 border-l-2 border-black' : 'border-r-2 border-black'}`}>
      <span className="text-6xl md:text-8xl font-black text-gray-200">{number}</span>
      <h3 className="text-3xl md:text-5xl font-black uppercase mt-4">{title}</h3>
      <p className="text-sm md:text-base mt-6 leading-relaxed">{description}</p>
      <ul className="mt-8 space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <span className="w-1.5 h-1.5 bg-black" />
            {f}
          </li>
        ))}
      </ul>
    </div>
    <div className={`relative overflow-hidden min-h-[400px] ${reverse ? 'lg:order-1' : ''}`}>
      <motion.img
        src={image}
        alt={title}
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        whileHover={{ scale: 1.05 }}
      />
      <div className="absolute inset-0 border-4 border-black pointer-events-none" />
    </div>
  </motion.div>
);

export function ServiziPage() {
  const services = [
    {
      number: '01',
      title: 'Siti Web',
      description: 'Progettiamo e sviluppiamo siti web che combinano estetica e funzionalità. Ogni progetto è unico, pensato per convertire visitatori in clienti. Performance ottimali, SEO integrata, esperienza utente impeccabile.',
      features: ['Design Responsive', 'SEO Optimization', 'CMS Integration', 'Analytics Setup', 'Performance Tuning'],
      image: IMAGES.web,
    },
    {
      number: '02',
      title: 'App Mobile',
      description: 'Applicazioni native per iOS e Android che offrono esperienze fluide e coinvolgenti. Dalle app consumer alle soluzioni enterprise, sviluppiamo prodotti scalabili e performanti.',
      features: ['iOS & Android Native', 'React Native', 'Flutter', 'PWA Development', 'App Store Optimization'],
      image: IMAGES.app,
    },
    {
      number: '03',
      title: 'Brand Identity',
      description: 'Creiamo identità visive che comunicano valori e distinguono dal competitors. Dal logo al brandbook, ogni elemento è pensato per costruire una presenza memorabile.',
      features: ['Logo Design', 'Visual Identity', 'Brand Guidelines', 'Typography System', 'Color Palette'],
      image: IMAGES.brand,
    },
    {
      number: '04',
      title: 'Motion & 3D',
      description: 'Animazioni, video e contenuti 3D che danno vita al tuo brand. Motion graphics, video commerciali, rendering fotorealistici per ogni esigenza comunicativa.',
      features: ['Motion Graphics', '3D Modeling', 'Video Production', 'Animation', 'VFX'],
      image: IMAGES.motion,
    },
    {
      number: '05',
      title: 'Fotografia',
      description: 'Servizi fotografici professionali per prodotti, corporate e eventi. Immagini di alta qualità che raccontano la tua storia e valorizzano i tuoi prodotti.',
      features: ['Product Photography', 'Corporate Portrait', 'Event Coverage', 'Editorial', 'Post Production'],
      image: IMAGES.photo,
    },
    {
      number: '06',
      title: 'Video',
      description: 'Produzione video completa: dalla ideazione alla post-produzione. Spot, documentari, corporate video, contenuti per social media. Qualità cinematografica.',
      features: ['Commercial', 'Documentary', 'Corporate Video', 'Social Content', 'Color Grading'],
      image: IMAGES.video,
    },
    {
      number: '07',
      title: 'Social Media',
      description: 'Strategia, creazione contenuti e gestione completa dei social media. Costruiamo community autentiche e aumentiamo la visibilità del tuo brand.',
      features: ['Content Strategy', 'Community Management', 'Paid Advertising', 'Analytics', 'Influencer Marketing'],
      image: IMAGES.social,
    },
    {
      number: '08',
      title: '3D & Render',
      description: 'Modellazione 3D, rendering fotorealistici e animazioni per prodotti, architettura e visualizzazioni. Portiamo le tue idee in una nuova dimensione.',
      features: ['3D Modeling', 'Photorealistic Rendering', 'Product Visualization', 'Architectural Viz', 'Animation'],
      image: IMAGES.three,
    },
  ];

  return (
    <div className="bg-white text-black min-h-screen">
      {/* HERO */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center p-8 md:p-16 border-b-2 border-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <span className="font-mono text-xs border border-black px-4 py-2 inline-block mb-8">
            WHAT WE DO
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-none tracking-tighter">
            Servizi
          </h1>
          <p className="max-w-2xl text-sm md:text-base mt-8 leading-relaxed">
            Offriamo soluzioni digitali complete, dal concept allo sviluppo. 
            Ogni servizio è pensato per creare valore reale per il tuo business.
          </p>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-black rotate-45 opacity-20" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-black rounded-full opacity-10" />
      </section>

      {/* SERVICES LIST */}
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
      <section className="min-h-[60vh] bg-black text-white flex flex-col justify-center items-center p-8 relative">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-center leading-tight">
          Pronto a<br />iniziare?
        </h2>
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-white text-black px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
        >
          Contattaci
        </motion.a>
      </section>
    </div>
  );
}
