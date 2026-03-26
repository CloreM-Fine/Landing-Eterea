import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Quali servizi offre Eterea Studio?',
    answer: 'Offriamo servizi completi di brand identity (logo design, brand design, rebranding), sviluppo web e app (siti web vetrina, e-commerce, applicazioni mobili, CRM personalizzati, sviluppo avanzato), contenuti visivi (fotografia professionale, video, montaggio, post-produzione, progettazione 3D) e marketing digitale (strategie di crescita, social media, SEO/SEM).',
  },
  {
    question: 'Quanto tempo ci vuole per realizzare un sito web?',
    answer: 'Per un sito web vetrina professionale (6-8 pagine) impieghiamo 15 giorni lavorativi dalla ricezione di tutti i materiali. Per un e-commerce completo servono 30-45 giorni lavorativi. Per sviluppi web avanzati e app mobile, ogni progetto viene valutato singolarmente. I tempi includono: fase di progettazione, sviluppo, inserimento contenuti, testing e messa online.',
  },
  {
    question: 'Lavorate solo con aziende di Lucca o operate anche fuori regione?',
    answer: 'Operiamo su tutto il territorio nazionale! Siamo fisicamente situati a Lucca in Toscana, ma lavoriamo regolarmente con clienti da tutta Italia grazie agli strumenti di collaborazione digitale. Per shooting foto/video includiamo spostamenti entro 15km da Lucca Centro, oltre con supplemento.',
  },
  {
    question: 'Come funziona il processo di creazione del brand identity?',
    answer: 'Il processo si sviluppa in più fasi: analisi del mercato e competitor, definizione della brand strategy, design del logo in diverse varianti, definizione della palette colori e tipografia, creazione di mockup e applicazioni del brand, consegna della brand guidelines completa e di tutti i file in formati editabili. Il numero di revisioni viene concordato in fase di preventivo.',
  },
  {
    question: 'Offrite assistenza post-lancio?',
    answer: 'Sì! Offriamo Hosting e Mantenimento Annuo che include: gestione dominio e DNS, certificato SSL, backup automatici giornalieri/settimanali, sicurezza base con firewall e anti-malware, uptime 99%, assistenza tecnica in orario lavorativo e piccole modifiche ai contenuti (fino a 2 ore annue). Per interventi maggiori, la fatturazione è a consumo con minimo 30 minuti.',
  },
  {
    question: 'Come funzionano le modifiche successive al sito?',
    answer: 'Per modifiche al sito web già online, applichiamo una fatturazione minima di 30 minuti. Per ogni richiesta forniamo una stima di tempo e prezzo prima di iniziare l\'intervento, con rendicontazione precisa del tempo impiegato. Nuove sezioni importanti, restyling completi o implementazioni complesse (come e-commerce o aree riservate) richiedono invece un preventivo a progetto.',
  },
  {
    question: 'Come funzionano montaggio video e post-produzione foto?',
    answer: 'Montaggio video e post-produzione fotografica sono servizi che fatturiamo a ore, con un minimo di 1 ora. Il montaggio video include selezione riprese, taglio, transizioni, titoli, sincronizzazione audio e color correction base. La post-produzione foto include ritocco avanzato, correzione colori, rimozione sfondi e ottimizzazione per web/stampa. Disponibili anche per materiale non girato da noi.',
  },
  {
    question: 'Quali sono le condizioni per il marketing digitale?',
    answer: 'Il servizio di Marketing Digitale ha una durata minima contrattuale di 3 mesi. Include analisi mercato e competitor, definizione strategia, gestione campagne pubblicitarie sui principali social media, ottimizzazione SEO on-page e off-page, creazione contenuti per blog/newsletter e report mensili. I costi di advertising (budget speso sulle piattaforme) non sono inclusi e sono a carico del cliente.',
  },
  {
    question: 'Come posso richiedere un preventivo?',
    answer: 'Puoi contattarci compilando il form nella pagina Contatti, scrivendo una email a info@etereastudio.it, chiamandoci al 346 572 8606 o inviandoci un messaggio su WhatsApp. Descrivici il tuo progetto e ti invieremo un preventivo personalizzato entro 24 ore lavorative. Per sviluppo web avanzato e app mobile, il preventivo viene preparato dopo un\'analisi approfondita delle esigenze.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="relative pt-2 pb-24 lg:pt-4 lg:pb-32 bg-white overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #A8D0E6, #C5B9CD)' }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #F4C2A1, #E8E4A0)' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eterea-cream mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HelpCircle className="w-4 h-4 text-eterea-blue" />
            <span className="text-sm font-medium text-eterea-dark">Domande frequenti</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-eterea-dark mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Hai delle <span className="gradient-text">domande?</span>
          </motion.h2>

          <motion.p
            className="text-lg text-eterea-gray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ecco le risposte alle domande più frequenti. Per altre informazioni, contattaci direttamente.
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-eterea-dark pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-eterea-gray flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-eterea-gray leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-eterea-gray mb-4">Non hai trovato la risposta che cercavi?</p>
          <a
            href="#contatti"
            className="inline-flex items-center gap-2 px-8 py-4 bg-eterea-dark text-white rounded-full font-medium hover:bg-eterea-dark/90 transition-colors"
          >
            Contattaci direttamente
          </a>
        </motion.div>
      </div>
    </section>
  );
}
