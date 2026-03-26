import { motion } from 'framer-motion';
import { CheckCircle, Mail, ArrowLeft, Sparkles, Home } from 'lucide-react';


export function ThankYou() {
  return (
    <div className="min-h-screen bg-eterea-cream flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #A8D0E6, #C5B9CD)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, #F4C2A1, #E8E4A0)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <div className="w-24 h-24 rounded-full bg-eterea-sage/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-eterea-sage" />
          </div>
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-eterea-sage"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-serif font-bold text-eterea-dark mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Messaggio inviato con{' '}
          <span className="gradient-text">successo</span>!
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg text-eterea-gray mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e 
          ti risponderemo entro <strong>24 ore lavorative</strong>.
        </motion.p>

        {/* Email confirmation card */}
        <motion.div
          className="bg-white rounded-2xl p-6 mb-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-eterea-blue" />
            <span className="font-medium text-eterea-dark">Conferma inviata alla tua email</span>
          </div>
          <p className="text-sm text-eterea-gray">
            Hai ricevuto una conferma all'indirizzo email che ci hai fornito. 
            Se non la trovi, controlla nella cartella <em>spam</em> o <em>promozioni</em>.
          </p>
        </motion.div>

        {/* Next steps */}
        <motion.div
          className="grid sm:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="p-4 rounded-xl bg-white/50">
            <div className="w-10 h-10 rounded-full bg-eterea-blue/20 flex items-center justify-center mx-auto mb-2">
              <span className="text-eterea-blue font-bold">1</span>
            </div>
            <p className="text-sm text-eterea-gray">Analisi della richiesta</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50">
            <div className="w-10 h-10 rounded-full bg-eterea-lilac/20 flex items-center justify-center mx-auto mb-2">
              <span className="text-eterea-lilac font-bold">2</span>
            </div>
            <p className="text-sm text-eterea-gray">Preparazione proposta</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50">
            <div className="w-10 h-10 rounded-full bg-eterea-sage/20 flex items-center justify-center mx-auto mb-2">
              <span className="text-eterea-sage font-bold">3</span>
            </div>
            <p className="text-sm text-eterea-gray">Risposta entro 24h</p>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-eterea-dark text-white rounded-full font-medium hover:bg-eterea-dark/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Torna alla home
          </a>
          <a
            href="/#lavori"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-eterea-dark rounded-full font-medium border border-eterea-dark/10 hover:bg-eterea-cream transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            Guarda i nostri lavori
          </a>
        </motion.div>

        {/* Back link */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="/#contatti"
            className="inline-flex items-center gap-2 text-eterea-gray hover:text-eterea-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Invia un altro messaggio
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
