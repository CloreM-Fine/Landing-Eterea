import { motion } from 'framer-motion';
import { QrCode, ImageDown, Download, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

const apps = [
  {
    id: 1,
    title: 'QR Code Generator',
    description: 'Genera QR code personalizzati in pochi click. Supporta URL, testo, WiFi, contatti vCard e molto altro. Scarica in alta qualità per stampa o web.',
    icon: QrCode,
    color: '#A8D0E6',
    url: 'https://app.etereastudio.it/apps/qrcode',
    features: ['URL, testo, WiFi', 'Personalizzazione colori', 'Download PNG/SVG'],
  },
  {
    id: 2,
    title: 'WebP Converter',
    description: 'Converti JPG, PNG e GIF in formato WebP. Compressione ottimale per il web con qualità regolabile. Nessun upload su server, tutto nel tuo browser.',
    icon: ImageDown,
    color: '#B5C7A6',
    url: 'https://app.etereastudio.it/webp',
    features: ['Batch processing', 'Qualità regolabile', '100% locale'],
  },
  {
    id: 3,
    title: 'Web Downloader',
    description: 'Scarica immagini, video e contenuti da qualsiasi pagina web. Estrai risorse con un semplice click. Tool essenziale per designer e sviluppatori.',
    icon: Download,
    color: '#C5B9CD',
    url: 'https://app.etereastudio.it/downloader',
    features: ['Immagini & video', 'Batch download', 'Formati multipli'],
  },
];

export function Apps() {
  return (
    <section id="apps" className="relative py-24 lg:py-32 bg-eterea-cream overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #A8D0E6, #C5B9CD)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-eterea-peach" />
            <span className="text-sm font-medium text-eterea-dark">Strumenti gratuiti</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-eterea-dark mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Le nostre <span className="gradient-text">app</span>
          </motion.h2>

          <motion.p
            className="text-lg text-eterea-gray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Applicazioni web gratuite per semplificare il tuo lavoro quotidiano.
            Nessuna installazione, funzionano direttamente nel browser.
          </motion.p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full p-8 rounded-3xl bg-white border border-gray-100 overflow-hidden relative"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${app.color}15, ${app.color}05)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${app.color}30` }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <app.icon 
                    className="w-8 h-8" 
                    style={{ color: app.color }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-eterea-dark mb-3 group-hover:text-eterea-gray transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-eterea-gray text-sm leading-relaxed mb-5">
                    {app.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {app.features.map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 text-sm text-eterea-dark"
                      >
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${app.color}40` }}
                        >
                          <div 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: app.color }}
                          />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: app.color === '#E8E4A0' ? '#2D3142' : app.color }}
                  >
                    Prova ora
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Animated decorative circles */}
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20"
                  style={{ backgroundColor: app.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-15"
                  style={{ backgroundColor: app.color }}
                  animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -15, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </motion.a>
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
            Scopri tutte le nostre applicazioni gratuite
          </p>
          <motion.a
            href="https://app.etereastudio.it"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-eterea-dark text-white rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Vedi tutte le app
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
