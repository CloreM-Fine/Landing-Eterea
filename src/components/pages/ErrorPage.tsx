import { motion } from 'framer-motion';
import { Home, RefreshCw, AlertTriangle, Mail } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface ErrorPageProps {
  onBackToHome: () => void;
  errorCode?: number;
  errorMessage?: string;
}

export function ErrorPage({ 
  onBackToHome, 
  errorCode = 500, 
  errorMessage = 'Si è verificato un errore imprevisto.' 
}: ErrorPageProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-eterea-cream overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Logo size="lg" animated={false} />
        </motion.div>

        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-8"
        >
          <AlertTriangle className="w-12 h-12 text-amber-600" />
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-4"
        >
          <span className="text-6xl sm:text-7xl font-serif font-bold text-eterea-dark/20">
            {errorCode}
          </span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-lg mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-eterea-dark mb-4">
            Oops! Qualcosa è andato storto
          </h2>
          <p className="text-eterea-gray text-lg leading-relaxed">
            {errorMessage}
          </p>
          <p className="text-eterea-gray/70 mt-4 text-sm">
            Il nostro team è stato automaticamente notificato del problema.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-eterea-dark text-white rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5" />
            Ricarica pagina
          </motion.button>

          <motion.button
            onClick={onBackToHome}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-eterea-dark border-2 border-eterea-dark rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Torna alla home
          </motion.button>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl bg-white/50 border border-gray-100 max-w-md"
        >
          <p className="text-eterea-gray text-sm mb-4">
            Il problema persiste? Contattaci direttamente
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:info@etereastudio.it"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-eterea-blue/10 text-eterea-dark text-sm font-medium hover:bg-eterea-blue/20 transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@etereastudio.it
            </a>
            <a
              href="tel:3465728606"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-eterea-sage/10 text-eterea-dark text-sm font-medium hover:bg-eterea-sage/20 transition-colors"
            >
              346 572 8606
            </a>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full bg-eterea-peach/10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-eterea-lilac/10"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
