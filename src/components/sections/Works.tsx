import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight, X, Globe, Camera, Video, Database, Palette, ShoppingBag, Share2, Construction } from 'lucide-react';

const categories = ['Tutti', 'Sito Web', 'App', 'E-commerce', 'Foto', 'Video', 'CRM', 'Branding', 'Social'];

const works = [
  {
    id: 1,
    title: 'Colombini Lelio',
    category: 'Sito Web',
    description: 'Azienda fondata nel 1926 a Lucca, tre generazioni di esperienza nel settore agricolo. Vendita e assistenza macchine agricole, attrezzature per giardinaggio, auto officina e ricambi originali. Partner ufficiale dei migliori marchi come Shindaiwa, Echo, Makita, Gardena e Bosch.',
    color: '#A8D0E6',
    image: '/images/portfolio/colombini-lelio.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    year: '2024',
    client: 'Colombini Lelio',
    services: ['Sito Web', 'Branding', 'Logo', 'Foto', 'CRM'],
    url: 'https://colombinilelio.it',
    duration: '2 settimane',
  },
  {
    id: 2,
    title: 'Danda Wine Bar',
    category: 'Sito Web',
    description: 'Enoteca a Lucca, punto di riferimento per gli amanti del buon vino. Offre vino sfuso di qualità selezionato, bottiglie pregiate, aperitivi con taglieri di formaggi e salumi, pranzi e cene in un ambiente accogliente e professionale.',
    color: '#B5C7A6',
    image: '/images/portfolio/danda-wine-bar.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    year: '2024',
    client: 'Danda Wine Bar',
    services: ['Sito Web', 'Foto', 'Social'],
    url: 'https://dandawinebar.it',
    duration: '2 settimane',
  },
  {
    id: 3,
    title: 'Nelle Tue Mani',
    category: 'Sito Web',
    description: 'Studio onicotecnico a Lucca gestito da Maria Rosaria, onicotecnica professionista con anni di esperienza. Specializzato in ricostruzione unghie in gel e acrilico, nail art personalizzata, manicure e pedicure. Lo studio include un tour virtuale a 360° e sistema di prenotazione online.',
    color: '#C5B9CD',
    image: '/images/portfolio/nelle-tue-mani.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    year: '2024',
    client: 'Nelle Tue Mani',
    services: ['Sito Web', 'CRM', 'Foto', 'Video', 'Social'],
    url: 'https://nelle-tue-mani.it',
    duration: '2 settimane',
  },
  {
    id: 4,
    title: 'BikeFit Galli',
    category: 'Sito Web',
    description: 'Centro specializzato in biomeccanica del ciclismo e preparazione atletica a Lucca, fondato da Filippo Galli, laureato in Scienze Motorie. Offre valutazione biomeccanica con sensori di pressione, personal trainer per ciclisti e programmazione allenamenti personalizzata.',
    color: '#E8E4A0',
    image: '/images/portfolio/bikefit.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',
    year: '2023',
    client: 'BikeFit Galli',
    services: ['Sito Web', 'Foto', 'Video'],
    url: 'https://bikefitgalli.it',
    duration: '2 settimane',
  },
  {
    id: 5,
    title: 'Welln Studio',
    category: 'Sito Web',
    description: 'Ecosistema completo per la nutrizione moderna. Piattaforma professionale per nutrizionisti che include gestione pazienti, piani alimentari AI con database di 10.000+ alimenti, ricette intelligenti e agenda. I pazienti utilizzano l\'app Welln gratuitamente.',
    color: '#F4C2A1',
    image: '/images/portfolio/well-studio.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    year: '2024',
    client: 'Welln Studio',
    services: ['Sito Web', 'Gestionale'],
    url: 'https://welln.it',
    duration: '2 settimane',
  },
  {
    id: 8,
    title: 'Welln',
    category: 'App',
    description: 'Applicazione mobile completa in stile social network per il centro benessere Welln Studio. Piattaforma dedicata a clienti e professionisti del benessere.',
    color: '#C5B9CD',
    image: '/images/portfolio/app-welln.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    year: '2025',
    client: 'Welln Studio',
    services: ['App', 'Social'],
    url: '#',
    inProgress: true,
    duration: 'In sviluppo',
  },
  {
    id: 6,
    title: 'Eterea Studio CRM',
    category: 'CRM',
    description: 'CRM interno personalizzato sviluppato per la gestione dei nostri progetti, clienti e flussi di lavoro quotidiani.',
    color: '#A8D0E6',
    image: '/images/portfolio/etereastudio-crm.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    year: '2024',
    client: 'Eterea Studio',
    services: ['CRM', 'Sito Web'],
    url: '#',
    duration: '3 settimane',
  },
  {
    id: 7,
    title: 'Pelletteria Allegrini',
    category: 'E-commerce',
    description: 'E-commerce di pelletteria artigianale fondata nel 1920 a Lucca, con oltre 100 anni di storia. Vendita online di borse, scarpe, cinture, giacche e accessori in vera pelle toscana di qualità. Marchi esclusivi: Visonà, Campomaggi, Boldrini Selleria, Mandarina Duck.',
    color: '#F4C2A1',
    image: '/images/portfolio/allegrini-filippo.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    year: '2024',
    client: 'Pelletteria Allegrini',
    services: ['E-commerce', 'Social', 'Branding', 'Marketing'],
    url: 'https://pelletteriaallegrini.it',
    duration: '3 settimane',
  },
  {
    id: 9,
    title: 'Media Converter',
    category: 'App',
    description: 'Applicazione nativa per Mac che converte immagini (JPG, PNG, TIFF) e video in formati moderni e ottimizzati come WebP e WebM. Strumento essenziale per designer e sviluppatori.',
    color: '#E8E4A0',
    image: '/images/portfolio/media-converter.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    year: '2025',
    client: 'Eterea Studio',
    services: ['App', 'Video'],
    url: '#',
    inProgress: true,
    duration: 'In sviluppo',
  },
];

const serviceIcons: Record<string, React.ElementType> = {
  'Sito Web': Globe,
  'App': Globe,
  'E-commerce': ShoppingBag,
  'Foto': Camera,
  'Video': Video,
  'CRM': Database,
  'Gestionale': Database,
  'Branding': Palette,
  'Logo': Palette,
  'Social': Share2,
};

export function Works() {
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredWorks = activeCategory === 'Tutti' 
    ? works 
    : works.filter(work => work.services.some(s => s.toLowerCase().includes(activeCategory.toLowerCase())));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Helper to handle image load errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const work = works.find(w => w.image === target.src);
    if (work && target.src !== work.fallbackImage) {
      target.src = work.fallbackImage;
    }
  };

  return (
    <section id="lavori" ref={containerRef} className="relative py-24 lg:py-32 bg-eterea-cream overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #2D3142 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium text-eterea-dark">Portfolio</span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-eterea-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              I nostri <span className="gradient-text">lavori</span>
            </motion.h2>
          </div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-eterea-dark text-white'
                    : 'bg-white text-eterea-gray hover:text-eterea-dark'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Works Grid - Carosello su mobile, Grid su desktop */}
        {/* Mobile: Carosello orizzontale con altezza uniforme e zoom */}
        <div className="md:hidden">
          <motion.div 
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4"
            layout
          >
            {filteredWorks.map((work, index) => (
              <motion.article
                key={work.id}
                className="group cursor-pointer flex-shrink-0 w-[85vw] max-w-[320px] snap-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileInView={{ scale: 1.02 }}
                viewport={{ amount: 0.6 }}
                onClick={() => setSelectedWork(work)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={work.image}
                      alt={`Progetto ${work.title} - ${work.category} realizzato da Eterea Studio`}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-eterea-dark/80 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Hover Content */}
                    <motion.div
                      className="absolute inset-0 flex items-end p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-sm font-medium">Vedi progetto</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${work.color}E6`,
                          color: '#2D3142',
                        }}
                      >
                        {work.category}
                      </span>
                    </div>

                    {/* In Progress Badge */}
                    {(work as any).inProgress && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-400 text-amber-900 flex items-center gap-1">
                          <Construction className="w-3 h-3" />
                          In costruzione
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4 flex-1">
                      <div className="flex flex-col h-full">
                        <h3 className="text-lg font-bold text-eterea-dark mb-1 group-hover:text-eterea-gray transition-colors">
                          {work.title}
                        </h3>
                        <p className="text-sm text-eterea-gray line-clamp-3 flex-1">
                          {work.description}
                        </p>
                      </div>
                      <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: work.color }}
                        whileHover={{ rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink className="w-4 h-4 text-eterea-dark" />
                      </motion.div>
                    </div>
                    
                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {work.services.slice(0, 3).map((service, i) => {
                        const Icon = serviceIcons[service] || Globe;
                        return (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-eterea-cream text-eterea-dark flex items-center gap-1"
                          >
                            <Icon className="w-3 h-3" />
                            {service}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Desktop: Grid layout */}
        <motion.div 
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, index) => (
              <motion.article
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedWork(work)}
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={work.image}
                      alt={`Progetto ${work.title} - ${work.category} realizzato da Eterea Studio`}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-eterea-dark/80 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Hover Content */}
                    <motion.div
                      className="absolute inset-0 flex items-end p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-sm font-medium">Vedi progetto</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${work.color}E6`,
                          color: '#2D3142',
                        }}
                      >
                        {work.category}
                      </span>
                    </div>

                    {/* In Progress Badge */}
                    {(work as any).inProgress && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-400 text-amber-900 flex items-center gap-1">
                          <Construction className="w-3 h-3" />
                          In costruzione
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-eterea-dark mb-1">
                          {work.title}
                        </h3>
                        <p className="text-sm text-eterea-gray line-clamp-2">
                          {work.description}
                        </p>
                      </div>
                      <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-2"
                        style={{ backgroundColor: work.color }}
                        whileHover={{ rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink className="w-4 h-4 text-eterea-dark" />
                      </motion.div>
                    </div>
                    
                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {work.services.slice(0, 3).map((service, i) => {
                        const Icon = serviceIcons[service] || Globe;
                        return (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-eterea-cream text-eterea-dark flex items-center gap-1"
                          >
                            <Icon className="w-3 h-3" />
                            {service}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Work Detail Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              className="absolute inset-0 bg-eterea-dark/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWork(null)}
            />
            
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto max-h-[90vh]">
                {/* Image */}
                <div className="relative aspect-video">
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span 
                      className="px-4 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: selectedWork.color }}
                    >
                      {selectedWork.category}
                    </span>
                    <span className="px-4 py-1 rounded-full text-sm font-medium bg-eterea-cream">
                      {selectedWork.year}
                    </span>
                    {(selectedWork as any).inProgress && (
                      <span className="px-4 py-1 rounded-full text-sm font-medium bg-amber-400 text-amber-900 flex items-center gap-1">
                        <Construction className="w-4 h-4" />
                        In costruzione
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-eterea-dark mb-4">
                    {selectedWork.title}
                  </h2>

                  <p className="text-lg text-eterea-gray mb-8">
                    {selectedWork.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-sm font-medium text-eterea-gray uppercase tracking-wider mb-2">
                        Cliente
                      </h4>
                      <p className="text-lg font-medium text-eterea-dark">
                        {selectedWork.client}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-eterea-gray uppercase tracking-wider mb-2">
                        Servizi
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedWork.services.map((service, i) => {
                          const Icon = serviceIcons[service] || Globe;
                          return (
                            <span
                              key={i}
                              className="text-sm px-3 py-1 rounded-full bg-eterea-cream flex items-center gap-1"
                            >
                              <Icon className="w-3 h-3" />
                              {service}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {selectedWork.url && selectedWork.url !== '#' && (
                    <motion.a
                      href={selectedWork.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-eterea-dark text-white rounded-full font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visita il sito
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
