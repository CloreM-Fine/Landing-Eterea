import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function EmailPopup({ isOpen, onClose, noteContent }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate sending
    console.log('Email inviata a:', email);
    console.log('Contenuto nota:', noteContent);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setEmail('');
      
      setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Centrato */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Salva Nota
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <p className="text-sm text-gray-600 mb-4">
                Inserisci la tua email per ricevere il contenuto della nota
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@esempio.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:border-transparent mb-4"
                  required
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#007aff] rounded-lg hover:bg-[#0051d5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Invio...' : 'Invia'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-[60]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                Email inviata!
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
