import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Code2, 
  Camera, 
  Megaphone,
  ArrowRight,
  Sparkles,
  Check,
  X,
  ArrowUpRight
} from 'lucide-react';

const serviceCategories = [
  {
    id: 'brand',
    icon: Palette,
    title: 'Brand Identity',
    subtitle: 'Identità visiva',
    description: 'Creiamo identità di marca uniche e memorabili che raccontano la tua storia e distinguono il tuo business.',
    color: '#A8D0E6',
    subcategories: [
      'Logo design',
      'Brand design',
      'Rebranding',
      'Brand guidelines',
      'Progettazione 3D',
    ],
    details: {
      fullDescription: 'Il brand identity è il cuore della tua azienda. Creiamo identità visive complete che comunicano i tuoi valori e distinguono il tuo business dalla concorrenza.',
      features: [
        { title: 'Logo Design', desc: 'Creazione di logotipi unici, memorabili e versatili che rappresentano l\'essenza del tuo brand.' },
        { title: 'Brand Design', desc: 'Sviluppo completo dell\'identità visiva con colori, tipografie e elementi grafici coerenti.' },
        { title: 'Rebranding', desc: 'Rinnovamento dell\'identità esistente per adattarla ai nuovi mercati e obiettivi aziendali.' },
        { title: 'Brand Guidelines', desc: 'Manuale completo che definisce l\'uso corretto di tutti gli elementi del brand.' },
      ],
      benefits: ['Riconoscibilità immediata', 'Coerenza su tutti i canali', 'Valore aggiunto per il business', 'Connessione emotiva con i clienti'],
      process: ['Analisi e ricerca', 'Concept e ideazione', 'Design e sviluppo', 'Presentazione e revisione', 'Consegna file'],
    },
  },
  {
    id: 'web',
    icon: Code2,
    title: 'Sviluppo Web & App',
    subtitle: 'Digital solutions',
    description: 'Sviluppiamo soluzioni digitali su misura, dai siti web alle applicazioni complesse e CRM personalizzati.',
    color: '#B5C7A6',
    subcategories: [
      'Siti web',
      'Applicazioni',
      'CRM personalizzati',
      'E-commerce',
    ],
    details: {
      fullDescription: 'Realizziamo soluzioni digitali innovative e performanti. Dai siti web vetrina alle applicazioni complesse, ogni progetto è sviluppato con tecnologie moderne e best practice del settore.',
      features: [
        { title: 'Siti Web', desc: 'Siti web responsive, veloci e ottimizzati per SEO che convertono visitatori in clienti.' },
        { title: 'Applicazioni', desc: 'App mobile e desktop native o cross-platform con esperienza utente impeccabile.' },
        { title: 'CRM Personalizzati', desc: 'Sistemi di gestione clienti su misura per ottimizzare i processi aziendali.' },
        { title: 'E-commerce', desc: 'Negozi online completi con gestione prodotti, pagamenti e spedizioni integrati.' },
      ],
      benefits: ['Tecnologie moderne', 'Performance ottimizzate', 'Scalabilità garantita', 'Supporto continuo'],
      process: ['Analisi requisiti', 'Prototipazione UX/UI', 'Sviluppo e testing', 'Deploy e ottimizzazione', 'Formazione e supporto'],
    },
  },
  {
    id: 'content',
    icon: Camera,
    title: 'Contenuti Visivi',
    subtitle: 'Foto e video',
    description: 'Produciamo contenuti visivi di alta qualità che catturano l\'attenzione e comunicano il tuo messaggio.',
    color: '#C5B9CD',
    subcategories: [
      'Fotografia',
      'Video',
      'Foto a 360°',
      'Post-produzione',
    ],
    details: {
      fullDescription: 'I contenuti visivi sono fondamentali per comunicare efficacemente. Produciamo foto e video professionali che raccontano la tua storia e valorizzano i tuoi prodotti.',
      features: [
        { title: 'Fotografia', desc: 'Servizi fotografici professionali per prodotti, locali, team e eventi aziendali.' },
        { title: 'Video', desc: 'Spot pubblicitari, video corporate, tutorial e contenuti per social media.' },
        { title: 'Foto a 360°', desc: 'Tour virtuali interattivi e fotografie sferiche per immobili, locali e showroom.' },
        { title: 'Post-produzione', desc: 'Editing, color grading, motion graphics e effetti speciali di alta qualità.' },
      ],
      benefits: ['Alta qualità professionale', 'Coerenza visiva', 'Versatilità di utilizzo', 'Coinvolgimento del pubblico'],
      process: ['Brief e concept', 'Produzione sul set', 'Selezione materiale', 'Post-produzione', 'Consegna file'],
    },
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing Digitale',
    subtitle: 'Crescita online',
    description: 'Strategie di marketing digitale per aumentare la visibilità, coinvolgere il pubblico e far crescere il business.',
    color: '#F4C2A1',
    subcategories: [
      'Marketing',
      'Social media',
      'SEO/SEM',
      'Content strategy',
    ],
    details: {
      fullDescription: 'Strategie di marketing digitale data-driven per far crescere il tuo business online. Dalla visibilità organica alle campagne pubblicitarie, copriamo tutto il funnel di vendita.',
      features: [
        { title: 'Marketing Strategico', desc: 'Piani di marketing completi con obiettivi chiari, KPI e analisi della concorrenza.' },
        { title: 'Social Media', desc: 'Gestione professionale dei canali social con contenuti pianificati e community management.' },
        { title: 'SEO/SEM', desc: 'Ottimizzazione per i motori di ricerca e campagne Google Ads per massimizzare la visibilità.' },
        { title: 'Content Strategy', desc: 'Pianificazione e creazione di contenuti che attraggono, informano e convertono.' },
      ],
      benefits: ['Maggiore visibilità', 'Lead qualificati', 'ROI misurabile', 'Crescita sostenibile'],
      process: ['Analisi e audit', 'Definizione strategia', 'Pianificazione contenuti', 'Esecuzione e monitoraggio', 'Ottimizzazione continua'],
    },
  },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<typeof serviceCategories[0] | null>(null);

  return (
    <section id="servizi" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-30"
          style={{ background: 'linear-gradient(135deg, #A8D0E6, #C5B9CD)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #F4C2A1, #E8E4A0)' }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eterea-cream mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-eterea-peach" />
            <span className="text-sm font-medium text-eterea-dark">Cosa facciamo</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-eterea-dark mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
Dal concept al
            <span className="gradient-text"> risultato</span>
          </motion.h2>

          <motion.p
            className="text-lg text-eterea-gray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Offriamo soluzioni complete per la crescita del tuo business, 
            dalla strategia alla realizzazione.
          </motion.p>
        </div>

        {/* Services Grid - 2x2 Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {serviceCategories.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative h-full p-8 lg:p-10 rounded-3xl bg-white border border-gray-100 overflow-hidden cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => setSelectedService(service)}
              >
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${service.color}30` }}
                  animate={{
                    rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon 
                    className="w-7 h-7" 
                    style={{ color: service.color }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <span className="text-xs font-medium text-eterea-gray uppercase tracking-wider">
                    {service.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-eterea-dark mt-1 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-eterea-gray text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Subcategories */}
                  <div className="space-y-2 mb-5">
                    {service.subcategories.map((sub, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 text-sm text-eterea-dark"
                      >
                        <div 
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${service.color}40` }}
                        >
                          <Check className="w-2.5 h-2.5" style={{ color: service.color === '#E8E4A0' ? '#2D3142' : service.color }} />
                        </div>
                        {sub}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="flex items-center gap-2 text-sm font-medium pointer-events-none"
                    style={{ color: service.color === '#E8E4A0' ? '#2D3142' : service.color }}
                    animate={{
                      x: hoveredIndex === index ? 5 : 0,
                    }}
                  >
                    Scopri di più
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Animated decorative circles */}
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30"
                  style={{ backgroundColor: service.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-1/2 -right-16 w-24 h-24 rounded-full opacity-20"
                  style={{ backgroundColor: service.color }}
                  animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -15, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                  className="absolute -bottom-12 left-1/4 w-32 h-32 rounded-full opacity-25"
                  style={{ backgroundColor: service.color }}
                  animate={{
                    scale: [1, 1.15, 1],
                    y: [0, 15, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                {/* Corner decoration on hover */}
                <motion.div
                  className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-20"
                  style={{ backgroundColor: service.color }}
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-eterea-gray mb-6">
            Hai bisogno di un servizio personalizzato?
          </p>
          <motion.a
            href="#contatti"
            className="inline-flex items-center gap-2 px-8 py-4 bg-eterea-dark text-white rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Parliamone insieme
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              className="absolute inset-0 bg-eterea-dark/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
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
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div 
                  className="p-8 lg:p-12"
                  style={{ backgroundColor: `${selectedService.color}20` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: selectedService.color }}
                    >
                      <selectedService.icon className="w-8 h-8 text-eterea-dark" />
                    </div>
                    <div>
                      <span className="text-sm text-eterea-gray uppercase tracking-wider">
                        {selectedService.subtitle}
                      </span>
                      <h2 className="text-3xl lg:text-4xl font-serif font-bold text-eterea-dark">
                        {selectedService.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <p className="text-lg text-eterea-gray mb-8">
                    {selectedService.details?.fullDescription}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-eterea-dark mb-4">Cosa includiamo</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedService.details?.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className="p-4 rounded-2xl bg-eterea-cream"
                        >
                          <h4 className="font-bold text-eterea-dark mb-1">{feature.title}</h4>
                          <p className="text-sm text-eterea-gray">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits & Process */}
                  <div className="grid sm:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-eterea-dark mb-4">Benefici</h3>
                      <ul className="space-y-3">
                        {selectedService.details?.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${selectedService.color}40` }}
                            >
                              <Check className="w-3.5 h-3.5" style={{ color: selectedService.color === '#E8E4A0' ? '#2D3142' : selectedService.color }} />
                            </div>
                            <span className="text-eterea-dark">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-eterea-dark mb-4">Il nostro processo</h3>
                      <div className="space-y-3">
                        {selectedService.details?.process.map((step, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                              style={{ backgroundColor: selectedService.color, color: '#2D3142' }}
                            >
                              {i + 1}
                            </div>
                            <span className="text-eterea-dark">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="#contatti"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white"
                    style={{ backgroundColor: selectedService.color === '#E8E4A0' ? '#2D3142' : selectedService.color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedService(null);
                      setTimeout(() => {
                        document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                  >
                    Richiedi un preventivo
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
