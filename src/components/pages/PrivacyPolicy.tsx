import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
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
              <Shield className="w-5 h-5 text-eterea-blue" />
              <span className="font-bold text-eterea-dark">Privacy Policy</span>
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
            Privacy Policy
          </h1>
          <p className="text-eterea-gray mb-8">
            Ultimo aggiornamento: 21 Marzo 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">1. Introduzione</h2>
              <p className="text-eterea-gray mb-4">
                Eterea Studio (di seguito "noi", "nostro" o "ci") rispetta la tua privacy e si impegna a proteggere i tuoi dati personali. 
                Questa Privacy Policy spiega come raccogliamo, utilizziamo, conserviamo e proteggiamo le tue informazioni quando visiti il nostro sito web 
                etereastudio.it (il "Sito") o utilizzi i nostri servizi.
              </p>
              <p className="text-eterea-gray">
                Ti invitiamo a leggere attentamente questa Privacy Policy per comprendere le nostre pratiche riguardanti i tuoi dati personali.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">2. Titolare del Trattamento</h2>
              <p className="text-eterea-gray mb-4">
                Il Titolare del trattamento dei dati personali è:
              </p>
              <div className="bg-eterea-cream p-6 rounded-2xl mb-4">
                <p className="font-medium text-eterea-dark">Eterea Studio</p>
                <p className="text-eterea-gray">Email: info@etereastudio.it</p>
                <p className="text-eterea-gray">Telefono: 3465728606</p>
                <p className="text-eterea-gray">Sede: Lucca, Toscana</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">3. Dati Personali che Raccogliamo</h2>
              <p className="text-eterea-gray mb-4">
                Possiamo raccogliere i seguenti tipi di dati personali:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li><strong>Dati di contatto:</strong> nome, cognome, indirizzo email, numero di telefono</li>
                <li><strong>Dati aziendali:</strong> nome dell'azienda, ruolo, settore di attività</li>
                <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate</li>
                <li><strong>Dati di comunicazione:</strong> contenuto dei messaggi inviati tramite il form di contatto</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">4. Finalità del Trattamento</h2>
              <p className="text-eterea-gray mb-4">
                Utilizziamo i tuoi dati personali per le seguenti finalità:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Rispondere alle tue richieste e comunicazioni</li>
                <li>Fornire i servizi richiesti</li>
                <li>Gestire la relazione commerciale</li>
                <li>Inviare comunicazioni relative ai nostri servizi (con il tuo consenso)</li>
                <li>Migliorare il nostro sito web e i nostri servizi</li>
                <li>Adempiere agli obblighi legali</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">5. Base Giuridica del Trattamento</h2>
              <p className="text-eterea-gray mb-4">
                Il trattamento dei tuoi dati personali si basa su:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Il tuo consenso (per finalità di marketing e invio di newsletter)</li>
                <li>L'esecuzione di un contratto o di misure precontrattuali</li>
                <li>L'adempimento di obblighi legali</li>
                <li>Il legittimo interesse del titolare (per la sicurezza del sito e l'analisi dei dati)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">6. Conservazione dei Dati</h2>
              <p className="text-eterea-gray mb-4">
                Conserviamo i tuoi dati personali solo per il tempo necessario a raggiungere le finalità per cui sono stati raccolti, 
                o per adempiere agli obblighi legali. In genere:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Dati di contatto: 24 mesi dall'ultima interazione</li>
                <li>Dati relativi a contratti: 10 anni (obbligo fiscale)</li>
                <li>Dati di navigazione: 12 mesi</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">7. I Tuoi Diritti</h2>
              <p className="text-eterea-gray mb-4">
                Hai il diritto di:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Accedere ai tuoi dati personali</li>
                <li>Rettificare i dati inesatti</li>
                <li>Chiedere la cancellazione dei dati ("diritto all'oblio")</li>
                <li>Limitare il trattamento</li>
                <li>Opporsi al trattamento</li>
                <li>Richiedere la portabilità dei dati</li>
                <li>Revocare il consenso in qualsiasi momento</li>
              </ul>
              <p className="text-eterea-gray">
                Per esercitare questi diritti, contattaci all'indirizzo email: info@etereastudio.it
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">8. Sicurezza dei Dati</h2>
              <p className="text-eterea-gray mb-4">
                Adottiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati personali da accessi non autorizzati, 
                perdita, alterazione o distruzione. Tuttavia, nessun sistema di sicurezza è completamente impenetrabile.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">9. Contatti</h2>
              <p className="text-eterea-gray">
                Per qualsiasi domanda o richiesta relativa alla presente Privacy Policy, puoi contattarci all'indirizzo:
                <a href="mailto:info@etereastudio.it" className="text-eterea-blue hover:underline ml-1">info@etereastudio.it</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
