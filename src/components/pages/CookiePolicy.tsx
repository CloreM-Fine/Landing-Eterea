import { motion } from 'framer-motion';
import { ArrowLeft, Cookie } from 'lucide-react';

interface CookiePolicyProps {
  onClose: () => void;
}

export function CookiePolicy({ onClose }: CookiePolicyProps) {
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
              <Cookie className="w-5 h-5 text-eterea-peach" />
              <span className="font-bold text-eterea-dark">Cookie Policy</span>
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
            Cookie Policy
          </h1>
          <p className="text-eterea-gray mb-8">
            Ultimo aggiornamento: 21 Marzo 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">1. Cosa sono i Cookie</h2>
              <p className="text-eterea-gray mb-4">
                I cookie sono piccoli file di testo che i siti web visitati inviano al browser dell'utente, 
                dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. 
                I cookie vengono utilizzati per diverse finalità, hanno caratteristiche diverse e possono essere utilizzati 
                sia dal titolare del sito che da terze parti.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">2. Tipologie di Cookie Utilizzati</h2>
              
              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">2.1 Cookie Tecnici (Necessari)</h3>
              <p className="text-eterea-gray mb-4">
                Questi cookie sono essenziali per il corretto funzionamento del sito e non possono essere disabilitati. 
                Non richiedono il consenso dell'utente.
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Cookie di sessione per la navigazione</li>
                <li>Cookie per il funzionamento dei form</li>
                <li>Cookie per la memorizzazione delle preferenze</li>
              </ul>

              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">2.2 Cookie Analitici</h3>
              <p className="text-eterea-gray mb-4">
                Utilizziamo cookie di analisi per comprendere come i visitatori interagiscono con il sito, 
                raccogliendo informazioni in forma anonima. Questi cookie ci aiutano a migliorare il nostro sito.
              </p>

              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">2.3 Cookie di Profilazione e Marketing</h3>
              <p className="text-eterea-gray mb-4">
                Questi cookie vengono utilizzati per tracciare i visitatori sui siti web. 
                L'intento è quello di visualizzare annunci pertinenti e coinvolgenti per il singolo utente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">3. Cookie di Terze Parti</h2>
              <p className="text-eterea-gray mb-4">
                Il nostro sito può utilizzare cookie di terze parti per i seguenti servizi:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li><strong>Google Analytics:</strong> per l'analisi del traffico del sito</li>
                <li><strong>Social Media:</strong> per l'integrazione con piattaforme social (Facebook, Instagram, LinkedIn)</li>
                <li><strong>Video incorporati:</strong> per contenuti multimediali da piattaforme esterne</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">4. Gestione dei Cookie</h2>
              <p className="text-eterea-gray mb-4">
                Puoi gestire le preferenze relative ai cookie attraverso le impostazioni del tuo browser. 
                La maggior parte dei browser permette di:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Visualizzare i cookie presenti ed eliminarli singolarmente</li>
                <li>Bloccare i cookie di terze parti</li>
                <li>Bloccare i cookie di specifici siti</li>
                <li>Bloccare l'installazione di tutti i cookie</li>
                <li>Eliminare tutti i cookie alla chiusura del browser</li>
              </ul>
              <p className="text-eterea-gray mb-4">
                Ti ricordiamo che la disabilitazione di tutti i cookie, inclusi quelli tecnici, 
                potrebbe compromettere il funzionamento del sito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">5. Come Disabilitare i Cookie</h2>
              <p className="text-eterea-gray mb-4">
                Puoi negare il consenso all'utilizzo dei cookie attraverso le impostazioni del tuo browser:
              </p>
              <div className="bg-eterea-cream p-6 rounded-2xl mb-4">
                <ul className="space-y-3 text-eterea-gray">
                  <li><strong>Google Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti</li>
                  <li><strong>Mozilla Firefox:</strong> Preferenze → Privacy e sicurezza → Cookie e dati dei siti</li>
                  <li><strong>Safari:</strong> Preferenze → Privacy → Cookie e dati dei siti web</li>
                  <li><strong>Microsoft Edge:</strong> Impostazioni → Cookie e autorizzazioni dei siti</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">6. Durata dei Cookie</h2>
              <p className="text-eterea-gray mb-4">
                I cookie hanno diverse durate in base alla loro tipologia:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li><strong>Cookie di sessione:</strong> vengono eliminati automaticamente alla chiusura del browser</li>
                <li><strong>Cookie persistenti:</strong> rimangono memorizzati nel dispositivo per un periodo variabile (da pochi giorni a diversi mesi)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">7. Contatti</h2>
              <p className="text-eterea-gray">
                Per qualsiasi informazione relativa all'utilizzo dei cookie, puoi contattarci all'indirizzo:
                <a href="mailto:info@etereastudio.it" className="text-eterea-blue hover:underline ml-1">info@etereastudio.it</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
