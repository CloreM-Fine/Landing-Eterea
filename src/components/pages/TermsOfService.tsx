import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';

interface TermsOfServiceProps {
  onClose: () => void;
}

export function TermsOfService({ onClose }: TermsOfServiceProps) {
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
              <span className="font-bold text-eterea-dark">Termini di Servizio</span>
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
            Termini di Servizio
          </h1>
          <p className="text-eterea-gray mb-8">
            Ultimo aggiornamento: 21 Marzo 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">1. Accettazione dei Termini</h2>
              <p className="text-eterea-gray mb-4">
                Accedendo e utilizzando il sito web di Eterea Studio (etereastudio.it) e i nostri servizi, 
                accetti di essere legalmente vincolato dai presenti Termini di Servizio. Se non accetti questi termini, 
                ti preghiamo di non utilizzare il nostro sito o i nostri servizi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">2. Descrizione dei Servizi</h2>
              <p className="text-eterea-gray mb-4">
                Eterea Studio è uno studio creativo che offre i seguenti servizi:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Brand Identity e Design</li>
                <li>Sviluppo Web e Applicazioni</li>
                <li>Produzione di Contenuti Visivi (foto e video)</li>
                <li>Marketing Digitale e Social Media</li>
                <li>Consulenza creativa e strategica</li>
              </ul>
              <p className="text-eterea-gray">
                Ci riserviamo il diritto di modificare, sospendere o interrompere qualsiasi servizio in qualsiasi momento, 
                con o senza preavviso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">3. Proprietà Intellettuale</h2>
              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">3.1 Nostri Contenuti</h3>
              <p className="text-eterea-gray mb-4">
                Tutti i contenuti presenti sul sito, inclusi ma non limitati a testi, immagini, grafiche, logo, 
                icone, audio, video, software e design, sono di proprietà di Eterea Studio o dei suoi licenzianti 
                e sono protetti dalle leggi italiane e internazionali sulla proprietà intellettuale.
              </p>

              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">3.2 Progetti del Cliente</h3>
              <p className="text-eterea-gray mb-4">
                Una volta completato il progetto e ricevuto il pagamento integrale:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>I diritti di proprietà intellettuale sul progetto finale vengono trasferiti al cliente</li>
                <li>Ci riserviamo il diritto di includere il progetto nel nostro portfolio, salvo diverso accordo scritto</li>
                <li>I file sorgente (sorgenti, file di lavoro) possono essere forniti con un supplemento concordato</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">4. Processo di Lavoro</h2>
              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">4.1 Preventivi e Pagamenti</h3>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Tutti i preventivi sono validi per 30 giorni dalla data di emissione</li>
                <li>È richiesto un acconto del 50% per iniziare il progetto</li>
                <li>Il saldo è dovuto alla consegna del progetto finale</li>
                <li>I pagamenti devono essere effettuati entro 15 giorni dalla fatturazione</li>
              </ul>

              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">4.2 Revisioni</h3>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Ogni progetto include un numero concordato di cicli di revisione</li>
                <li>Revisioni aggiuntive saranno fatturate separatamente</li>
                <li>Modifiche sostanziali allo scope del progetto richiedono un nuovo preventivo</li>
              </ul>

              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">4.3 Tempistiche</h3>
              <p className="text-eterea-gray mb-4">
                Le tempistiche di consegna concordate sono indicative. Eventuali ritardi causati dal mancato 
                ricevimento di materiali, feedback o approvazioni da parte del cliente non sono imputabili a Eterea Studio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">5. Responsabilità</h2>
              <p className="text-eterea-gray mb-4">
                Eterea Studio non sarà responsabile per:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>Danni indiretti, incidentali o consequenziali derivanti dall'uso dei nostri servizi</li>
                <li>Perdita di profitti, dati o opportunità di business</li>
                <li>Problemi tecnici causati da terze parti (hosting, domini, piattaforme esterne)</li>
                <li>Contenuti forniti dal cliente che violino diritti di terzi</li>
              </ul>
              <p className="text-eterea-gray">
                La nostra responsabilità totale in qualsiasi circostanza non supererà l'importo totale pagato dal cliente 
                per il servizio specifico.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">6. Risoluzione del Contratto</h2>
              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">6.1 Disdetta da Parte del Cliente</h3>
              <p className="text-eterea-gray mb-4">
                Il cliente può disdettere il progetto in qualsiasi momento. In caso di disdetta:
              </p>
              <ul className="list-disc list-inside text-eterea-gray space-y-2 mb-4">
                <li>L'acconto non è rimborsabile</li>
                <li>Verrà fatturato il lavoro effettivamente svolto fino alla data di disdetta</li>
                <li>I file e i materiali prodotti rimangono di proprietà di Eterea Studio</li>
              </ul>

              <h3 className="text-lg font-semibold text-eterea-dark mb-3 mt-6">6.2 Sospensione da Parte Nostra</h3>
              <p className="text-eterea-gray">
                Ci riserviamo il diritto di sospendere o interrompere il progetto in caso di mancato pagamento, 
                comportamento scorretto o richieste che violino i termini concordati.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">7. Riservatezza</h2>
              <p className="text-eterea-gray mb-4">
                Entrambe le parti si impegnano a mantenere riservate le informazioni confidenziali scambiate durante 
                il rapporto lavorativo. Questo include dati aziendali, strategie, materiali interni e qualsiasi 
                altra informazione contrassegnata come confidenziale.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">8. Legge Applicabile e Foro Competente</h2>
              <p className="text-eterea-gray mb-4">
                I presenti Termini di Servizio sono regolati dalla legge italiana. Per qualsiasi controversia relativa 
                all'interpretazione, esecuzione o risoluzione dei presenti termini, sarà competente il Foro di Milano, 
                con espressa esclusione di qualsiasi altro foro.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">9. Modifiche ai Termini</h2>
              <p className="text-eterea-gray mb-4">
                Ci riserviamo il diritto di modificare questi Termini di Servizio in qualsiasi momento. 
                Le modifiche entreranno in vigore immediatamente dopo la pubblicazione sul sito. 
                L'uso continuato dei nostri servizi dopo tali modifiche costituirà accettazione dei nuovi termini.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-eterea-dark mb-4">10. Contatti</h2>
              <p className="text-eterea-gray">
                Per qualsiasi domanda relativa a questi Termini di Servizio, puoi contattarci all'indirizzo:
                <a href="mailto:info@etereastudio.it" className="text-eterea-blue hover:underline ml-1">info@etereastudio.it</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
