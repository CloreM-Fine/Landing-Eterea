import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = {
  webdesign: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
  webapp: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
  ecommerce: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
  grafica: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=800&fit=crop',
  branding: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&h=800&fit=crop',
  foto: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=1000&fit=crop',
  video: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop',
  social: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop',
  '3d': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop',
};

const COLORS = {
  primary: '#151e26',
  secondary: '#f5f5dc',
  accent: '#ccff00',
};

const ServiceCard = ({ number, title, description, features, subServices, image, bgColor, textColor, reverse = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="grid grid-cols-1 lg:grid-cols-2"
  >
    <div 
      className={`p-8 md:p-16 flex flex-col justify-center ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
      style={{ backgroundColor: reverse ? COLORS.secondary : bgColor, color: textColor }}
    >
      <span className="text-6xl md:text-8xl font-black opacity-30">{number}</span>
      <h3 className="text-3xl md:text-5xl font-black uppercase mt-2 leading-tight">{title}</h3>
      <p className="text-sm md:text-base mt-6 leading-relaxed opacity-90">{description}</p>
      
      {features && (
        <ul className="mt-6 space-y-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-current opacity-60" />
              {f}
            </li>
          ))}
        </ul>
      )}
      
      {subServices && (
        <div className="mt-6 space-y-4">
          {subServices.map((sub, i) => (
            <div key={i} className="border-l-2 border-current/30 pl-4">
              <h4 className="font-bold text-sm uppercase">{sub.name}</h4>
              <p className="text-xs opacity-80 mt-1">{sub.desc}</p>
            </div>
          ))}
        </div>
      )}
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
      title: 'Web Design',
      description: 'Progettiamo interfacce moderne, pulite e su misura per il tuo brand. Ogni pixel è pensato per comunicare e convertire.',
      features: ['UI/UX Design', 'Wireframing', 'Prototipi interattivi', 'Design System'],
      image: IMAGES.webdesign,
      bgColor: COLORS.primary,
      textColor: COLORS.secondary,
    },
    {
      number: '02',
      title: 'Siti Web & App',
      description: 'Sviluppiamo siti vetrina, portfolio e web app progressive con tecnologie moderne e performance ottimali.',
      features: ['Siti Vetrina', 'Portfolio', 'Web App PWA', 'CMS su misura'],
      image: IMAGES.webapp,
      bgColor: COLORS.secondary,
      textColor: COLORS.primary,
    },
    {
      number: '03',
      title: 'E-commerce',
      description: 'Negozi online completi con gestione prodotti, pagamenti sicuri e integrazioni con i principali servizi di spedizione.',
      features: ['Shopify', 'WooCommerce', 'Pagamenti integrati', 'Gestione inventario'],
      image: IMAGES.ecommerce,
      bgColor: COLORS.accent,
      textColor: COLORS.primary,
    },
    {
      number: '04',
      title: 'Grafica & Branding',
      description: 'Creiamo identità visive che comunicano i valori del tuo brand, dal logo ai materiali di comunicazione.',
      subServices: [
        { name: 'Grafica', desc: 'Materiali pubblicitari, flyer, brochure, packaging' },
        { name: 'Branding', desc: 'Logo, visual identity, brand guidelines, color palette' },
      ],
      image: IMAGES.grafica,
      bgColor: COLORS.primary,
      textColor: COLORS.secondary,
    },
    {
      number: '05',
      title: 'Foto & Video',
      description: 'Servizi fotografici professionali e produzione video per valorizzare prodotti, locali e aziende.',
      subServices: [
        { name: 'Fotografia', desc: 'Product, food, locali, corporate, eventi' },
        { name: 'Video', desc: 'Spot, video aziendali, reel social, editing' },
      ],
      image: IMAGES.foto,
      bgColor: COLORS.secondary,
      textColor: COLORS.primary,
    },
    {
      number: '06',
      title: 'Social Media',
      description: 'Gestione completa dei social media: strategia, contenuti e community management per far crescere il tuo brand.',
      features: ['Content Strategy', 'Creazione contenuti', 'Gestione pagine', 'Paid Ads'],
      image: IMAGES.social,
      bgColor: COLORS.accent,
      textColor: COLORS.primary,
    },
    {
      number: '07',
      title: 'Progettazione 3D',
      description: 'Render, modellazione e animazioni 3D per prodotti, architetture e presentazioni immersive.',
      features: ['Modellazione 3D', 'Render fotorealistici', 'Animazioni', 'Visualizzazioni architettoniche'],
      image: IMAGES['3d'],
      bgColor: COLORS.primary,
      textColor: COLORS.secondary,
    },
  ];

  return (
    <div style={{ backgroundColor: COLORS.primary }}>
      {/* HERO */}
      <section 
        className="min-h-[80vh] flex flex-col justify-center items-center p-8 md:p-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primary}dd)` }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <span 
            className="text-sm font-bold tracking-widest uppercase px-4 py-2 rounded-full inline-block mb-8"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
          >
            What We Do
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-none tracking-tighter" style={{ color: COLORS.secondary }}>
            Servizi
          </h1>
          <p className="max-w-2xl text-base md:text-lg mt-8 leading-relaxed" style={{ color: `${COLORS.secondary}cc` }}>
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
        style={{ backgroundColor: COLORS.primary }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-center" style={{ color: COLORS.secondary }}>
          Pronto a<br />
          <span style={{ color: COLORS.accent }}>iniziare?</span>
        </h2>
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-10 py-5 text-sm font-black uppercase tracking-widest rounded-full"
          style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
        >
          Contattaci
        </motion.a>
      </section>
    </div>
  );
}
