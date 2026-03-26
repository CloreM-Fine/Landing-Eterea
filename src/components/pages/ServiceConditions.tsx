import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Globe, Camera, Video, Box, Palette, Megaphone, ShoppingCart, Code, Smartphone, Scissors, ImageIcon } from 'lucide-react';

interface ServiceConditionsProps {
  onClose: () => void;
}

const services = [
  {
    icon: Globe,
    title: 'Progettazione e Sviluppo Sito Web',
    category: 'Sviluppo Web',
    features: [
      'Brief con il cliente per definire target, obiettivo della landing (lead, vendita, richiesta contatto), punti di forza dell\'offerta',
      'Tempi di consegna: 15 giorni lavorativi dalla ricezione di tutti i materiali (testi, foto, video, etc.)',
      'Struttura indicativa: fino a 6-8 pagine',
      'Layout grafico coerente con nuova identità del cliente',
      'Intero progetto mobile responsive e ottimizzato per i motori di ricerca',
      'Ottimizzazione SEO, Google Analytics, Banner cookies',
      'Blog Post / Newsletter (se richiesto dal cliente)',
      'Multi-lingua (se richiesto)',
    ],
    notes: 'Testi, immagini e materiali da pubblicare sul sito, se presenti, sono forniti dal cliente. Servizi aggiuntivi come copywriting, traduzioni, servizi fotografici dedicati, integrazione di AI e acquisto di immagini stock non sono compresi e potranno essere preventivati a parte.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    category: 'Sviluppo Web',
    features: [
      'Brief con il cliente per definire target, obiettivo (vendita diretta, catalogo, B2B/B2C), prodotti e categorie',
      'Tempi di consegna: 30-45 giorni lavorativi dalla ricezione di tutti i materiali',
      'Struttura indicativa: fino a 10-15 pagine + catalogo prodotti',
      'Layout grafico coerente con l\'identità del brand',
      'Integrazione con gateway di pagamento (PayPal, Stripe, etc.)',
      'Gestione ordini, carrello, wishlist, account utente',
      'Gestione spedizioni, sconti, coupon e tasse',
      'Ottimizzazione SEO prodotto, Google Analytics, Banner cookies',
      'Multi-lingua e multi-valuta (se richiesto)',
    ],
    notes: 'Testi, immagini, descrizioni prodotti e materiali sono forniti dal cliente. Servizi aggiuntivi come inserimento prodotti (oltre i primi 10), copywriting, traduzioni, integrazioni con gestionali esterni, marketplace (Amazon, eBay) e App native sono da preventivare a parte.',
  },
  {
    icon: Code,
    title: 'Sviluppo Web Avanzato',
    category: 'Sviluppo Web',
    features: [
      'Progetti web personalizzati con funzionalità specifiche',
      'Aree riservate, membership, portali B2B',
      'Integrazioni API di terze parti (CRM, ERP, gestionali)',
      'Web app progressive (PWA)',
      'Sistemi di booking, prenotazioni, calendari',
      'Dashboard e pannelli di amministrazione custom',
    ],
    notes: 'Ogni progetto di sviluppo web avanzato viene valutato singolarmente in base alle esigenze specifiche. Richiedere sempre un preventivo personalizzato che includa analisi, sviluppo, testing e deploy.',
  },
  {
    icon: Smartphone,
    title: 'App Mobile',
    category: 'Sviluppo App',
    features: [
      'Sviluppo app native iOS (Swift) e Android (Kotlin)',
      'Sviluppo app cross-platform (React Native, Flutter)',
      'Integrazione con backend e API',
      'Push notification, geolocalizzazione, autenticazione',
      'Pubblicazione su App Store e Google Play',
      'Manutenzione e aggiornamenti post-lancio',
    ],
    notes: 'Ogni progetto di app mobile viene valutato singolarmente in base alla complessità, alle piattaforme target, alle integrazioni richieste e alle funzionalità specifiche. Richiedere sempre un preventivo personalizzato che includa analisi, UI/UX design, sviluppo, testing e pubblicazione.',
  },
  {
    icon: FileText,
    title: 'Successive Modifiche al Sito Web',
    category: 'Sviluppo Web',
    features: [
      'Fatturazione minima di 30 minuti',
      'Stima prima dell\'intervento: per ogni richiesta verrà stimato un tempo e un prezzo di modifica e comunicato al cliente',
      'Rendicontazione: timer con orario preciso del tempo impiegato da mandare al cliente',
    ],
    notes: 'Nuove sezioni importanti, restyling completo, implementazioni complesse (e-commerce, aree riservate, integrazioni particolari) avranno sempre un preventivo a progetto.',
  },
  {
    icon: Box,
    title: 'Hosting e Mantenimento Annuo',
    category: 'Sviluppo Web',
    features: [
      'Dominio e DNS: gestione tecnica del dominio e dei record DNS',
      'Certificato SSL: attivazione e rinnovo SSL',
      'Backup base: backup automatici giornalieri/settimanali del sito',
      'Sicurezza base: firewall, protezione anti-malware e monitoraggio basilare inclusi nel piano hosting',
      'Uptime e prestazioni: hosting ottimizzato per WordPress/siti vetrina, uptime indicativo 99% e server in UE',
      'Assistenza tecnica base: supporto per problemi di server/hosting (non contenuti), in orario lavorativo',
      'Piccole modifiche ai contenuti (con un tetto massimo di 2 ore annue)',
    ],
    notes: '',
  },
  {
    icon: Camera,
    title: 'Shooting Fotografico',
    category: 'Contenuti Visivi',
    features: [
      'Consulenza iniziale (brief telefonico o call/video per definire obiettivi, stile, durata, location)',
      'Sessione fotografica di 2 ore in unica location entro la città di Lucca',
      'Circa 100 scatti realizzati durante la sessione',
      'Selezione e consegna di 15/20/30 immagini finali a seconda del progetto',
      'Post-produzione base: correzione luci/colori, contrasto, ritaglio, nitidezza, file pronti per stampa o web (no consegna RAW)',
      'Modalità di consegna: link online / galleria privata / WeTransfer in formato JPG alta risoluzione',
      'Consegna entro 7/10/14 giorni lavorativi dalla data dello shooting',
      'Spostamenti inclusi entro 15 km da Lucca Centro',
    ],
    notes: '30€ in più ogni ora di macchina extra a/r percorso. Secondo operatore disponibile su richiesta con extra. Eventuali costi di permessi per location, ingressi, parcheggi sono ESCLUSI. Noleggio location, set, studio fotografico ESCLUSO o su richiesta.',
  },
  {
    icon: ImageIcon,
    title: 'Post-produzione Fotografica',
    category: 'Contenuti Visivi',
    features: [
      'Fatturazione a ore con minimo 1 ora',
      'Ritocco avanzato: correzione colori, contrasto, esposizione',
      'Ritocco pelle, rimozione imperfezioni, smoothing',
      'Rimozione/sostituzione sfondi',
      'Photo manipulation e compositing',
      'Ridimensionamento e ottimizzazione per web/stampa',
      'Batch processing per grandi quantità di immagini',
    ],
    notes: 'Servizio disponibile anche per immagini non scattate da Eterea Studio. Preventivo personalizzato in base alla quantità e complessità delle immagini da trattare.',
  },
  {
    icon: Video,
    title: 'Shooting Video',
    category: 'Contenuti Visivi',
    features: [
      'Consulenza iniziale (brief telefonico o call/video per definire obiettivi, stile, durata, location)',
      'Sessione video di 2 ore in unica location entro la città di Lucca',
      'Registrazione video in 4K alta risoluzione',
      'Selezione e consegna di massimo 4 minuti di video finale',
      'Post-produzione base: correzione luci/colori, contrasto, color correction e color grading base (no consegna RAW)',
      'Modalità di consegna: link online / galleria privata / WeTransfer in formato MP4/MOV',
      'Consegna entro 10/14 giorni lavorativi dalla data dello shooting',
      'Spostamenti inclusi entro 15 km da Lucca Centro',
    ],
    notes: '30€ in più ogni ora di macchina extra a/r percorso. Secondo operatore disponibile su richiesta con extra. Eventuali costi di permessi per location, ingressi, parcheggi sono ESCLUSI. Noleggio location, set, studio fotografico ESCLUSO o su richiesta. Eventuali progetti con color correction/color grading avanzata saranno preventivati a parte.',
  },
  {
    icon: Scissors,
    title: 'Montaggio Video',
    category: 'Contenuti Visivi',
    features: [
      'Fatturazione a ore con minimo 1 ora',
      'Montaggio di materiale girato dal cliente o da Eterea Studio',
      'Selezione migliori riprese e taglio',
      'Transizioni, effetti, titoli e sottotitoli',
      'Sincronizzazione audio e musica di sottofondo',
      'Color correction base',
      'Export in diversi formati (social, web, broadcast)',
      'Formati verticali (9:16, 4:5) per Reels/TikTok/Shorts',
    ],
    notes: 'Servizio disponibile anche per footage non girato da Eterea Studio. Per progetti con color grading avanzato, VFX, motion graphics complesse o animazioni sarà necessario un preventivo dedicato.',
  },
  {
    icon: Box,
    title: 'Progettazione 3D',
    category: 'Design e Tecnologie',
    features: [
      'Progettazione 3D di oggetti sia superfici che mesh pronti per la stampa',
      'Briefing iniziale con cliente',
      'Progettazione 3D (superfici matematiche o modello organico a seconda del progetto)',
      'Rendering 3D visibile da smartphone',
      'Consegna finale di STEP / IGES / OBJ / STL',
    ],
    notes: '',
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    category: 'Brand e Marketing',
    features: [
      'Analisi del mercato e della concorrenza',
      'Definizione della brand strategy e dei valori del brand',
      'Design del logo in diverse varianti (primario, secondario, icona, versione monocromatica)',
      'Definizione della palette colori e tipografia',
      'Creazione di mockup e applicazioni del brand',
      'Brand guidelines completa per l\'utilizzo corretto del brand',
      'Consegna di tutti i file in formati editabili e ready-to-use',
    ],
    notes: 'Il numero di revisioni e proposte viene concordato in fase di preventivo. Richieste extra o modifiche sostanziali dopo l\'approvazione potrebbero essere soggette a costi aggiuntivi.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Digitale',
    category: 'Brand e Marketing',
    features: [
      'Analisi iniziale del mercato e dei competitor',
      'Definizione della strategia di marketing in base agli obiettivi aziendali',
      'Gestione campagne pubblicitarie sui principali social media',
      'Ottimizzazione SEO on-page e off-page',
      'Creazione di contenuti per blog e newsletter',
      'Report mensili con analisi delle performance',
      'Consulenza strategica continua',
    ],
    notes: 'I costi di advertising (budget speso sulle piattaforme) non sono inclusi e saranno a carico del cliente. La durata minima del contratto per il marketing è di 3 mesi.',
  },
  {
    icon: Megaphone,
    title: 'Gestione Social',
    category: 'Brand e Marketing',
    features: [
      'Pacchetto BRONZE: Gestione social con 2 post a settimana, programmazione e copy, 3 shooting durante l\'anno, report bimestrale, 1 riunione di allineamento bimestrale, moodboard',
      'Pacchetto SILVER: Gestione social con 3 post a settimana, programmazione e copy, 4 video reel mensili, 2 shooting durante l\'anno, report mensile, moodboard, 1 riunione di allineamento bimestrale',
      'Pacchetto GOLD: Gestione social con 3 post a settimana, programmazione e copy, 8 video reel mensili, 2 shooting durante l\'anno, report mensile, moodboard, 1 riunione di allineamento bimestrale, realizzazione di 2 video spot',
      'Tutti i pacchetti NON comprendono: Budget mensile per le Ads/Adv',
    ],
    notes: 'I pacchetti possono essere personalizzati sulla base delle esigenze specifiche del cliente. Contattaci per un preventivo su misura.',
  },
];

export function ServiceConditions({ onClose }: ServiceConditionsProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-eterea-gray hover:text-eterea-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Torna al sito</span>
            </button>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-eterea-sage" />
              <span className="font-bold text-eterea-dark">Condizioni dei Servizi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-eterea-dark mb-4">
            Condizioni dei Servizi
          </h1>
          <p className="text-eterea-gray mb-8">
            Di seguito i dettagli delle condizioni per ogni servizio offerto da Eterea Studio.
            Per informazioni sui prezzi, contattaci per un preventivo personalizzato.
          </p>

          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.section
                key={service.title}
                className="bg-eterea-cream/30 rounded-3xl p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <service.icon className="w-6 h-6 text-eterea-blue" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-eterea-gray uppercase tracking-wider">
                      {service.category}
                    </span>
                    <h2 className="text-xl font-bold text-eterea-dark">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <ul className="space-y-3 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-eterea-gray">
                      <span className="w-1.5 h-1.5 rounded-full bg-eterea-blue mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {service.notes && (
                  <p className="text-sm text-eterea-gray/80 italic bg-white/50 rounded-xl p-4">
                    {service.notes}
                  </p>
                )}
              </motion.section>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            className="mt-12 p-8 bg-gradient-to-br from-eterea-blue/10 to-eterea-lilac/10 rounded-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-eterea-dark mb-2">
              Hai bisogno di un preventivo?
            </h3>
            <p className="text-eterea-gray mb-4">
              Contattaci per ricevere un preventivo personalizzato sui nostri servizi.
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-3 bg-eterea-dark text-white rounded-full font-medium hover:bg-eterea-dark/90 transition-colors"
            >
              Richiedi preventivo
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
