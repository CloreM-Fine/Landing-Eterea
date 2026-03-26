import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface NotFoundProps {
  onBackToHome: () => void;
}

export function NotFound({ onBackToHome }: NotFoundProps) {
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

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative mb-8"
        >
          <h1 className="text-8xl sm:text-9xl font-serif font-bold text-eterea-dark/10">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-7xl font-serif font-bold gradient-text">
              404
            </span>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-lg mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-eterea-dark mb-4">
            Pagina non trovata
          </h2>
          <p className="text-eterea-gray text-lg leading-relaxed">
            La pagina che stai cercando potrebbe essere stata rimossa, 
            rinominata o temporaneamente non disponibile.
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
            onClick={onBackToHome}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-eterea-dark text-white rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Torna alla home
          </motion.button>

          <motion.button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-eterea-dark border-2 border-eterea-dark rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Pagina precedente
          </motion.button>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-eterea-gray mb-6 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Stavi cercando qualcosa di specifico?
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['Servizi', 'Portfolio', 'Chi Siamo', 'Contatti'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                onClick={(e) => {
                  e.preventDefault();
                  onBackToHome();
                  setTimeout(() => {
                    const element = document.getElementById(link.toLowerCase().replace(' ', '-'));
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-4 py-2 rounded-full bg-white text-eterea-dark text-sm font-medium hover:bg-eterea-blue/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-eterea-blue/10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-eterea-peach/10"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
