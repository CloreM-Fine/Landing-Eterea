import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Settings } from 'lucide-react';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const COOKIE_CONSENT_KEY = 'eterea_cookie_consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Sempre attivo
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Verifica se l'utente ha già dato il consenso
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // Mostra il banner dopo 1 secondo
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Carica il consenso salvato
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed);
      // Se analytics è accettato, carica GTM
      if (parsed.analytics) {
        loadGTM();
      }
    }
  }, []);

  const loadGTM = () => {
    // Carica Google Tag Manager
    if (typeof window !== 'undefined' && !(window as any).gtmLoaded) {
      (window as any).gtmLoaded = true;
      
      // Pusha evento di consenso a dataLayer
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'cookie_consent_given',
        analytics_consent: 'granted',
      });
      
      // Carica lo script GTM
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PVFPDKCP';
      document.head.appendChild(script);
    }
  };

  const handleAcceptAll = () => {
    const fullConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveConsent(fullConsent);
  };

  const handleAcceptSelected = () => {
    saveConsent(consent);
  };

  const handleRejectAll = () => {
    const minimalConsent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveConsent(minimalConsent);
  };

  const saveConsent = (newConsent: CookieConsent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    setIsVisible(false);
    
    // Carica GTM se analytics è accettato
    if (newConsent.analytics) {
      loadGTM();
    }
  };

  const toggleConsent = (key: keyof CookieConsent) => {
    if (key === 'necessary') return; // Non si può disattivare
    setConsent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay scuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9990]"
            onClick={() => {}} // Blocca click fuori dal banner
          />
          
          {/* Banner Cookie */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9991] p-4 md:p-6"
          >
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
              {!showDetails ? (
                // Vista compatta
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-eterea-blue/20 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-eterea-blue" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-eterea-dark mb-2">
                        Utilizziamo i cookie
                      </h3>
                      <p className="text-sm text-eterea-gray mb-4">
                        Questo sito utilizza cookie tecnici necessari al funzionamento e, con il tuo consenso, 
                        cookie di analisi per migliorare l'esperienza. Cliccando su "Accetta tutti" acconsenti 
                        all'uso dei cookie. Puoi gestire le preferenze o rifiutare i cookie opzionali.
                      </p>
                      
                      <div className="flex flex-row gap-2 sm:gap-3">
                        <button
                          onClick={handleAcceptAll}
                          className="flex-1 px-3 sm:px-6 py-2 sm:py-3 bg-eterea-dark text-white rounded-full text-xs sm:text-sm font-medium hover:bg-eterea-dark/90 transition-colors whitespace-nowrap"
                        >
                          Accetta tutti
                        </button>
                        <button
                          onClick={() => setShowDetails(true)}
                          className="flex-1 px-3 sm:px-6 py-2 sm:py-3 bg-eterea-cream text-eterea-dark rounded-full text-xs sm:text-sm font-medium hover:bg-eterea-cream/80 transition-colors flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap"
                        >
                          <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Personalizza</span>
                          <span className="sm:hidden">Impostazioni</span>
                        </button>
                        <button
                          onClick={handleRejectAll}
                          className="flex-1 px-3 sm:px-6 py-2 sm:py-3 border border-gray-200 text-eterea-gray rounded-full text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >
                          <span className="hidden sm:inline">Rifiuta opzionali</span>
                          <span className="sm:hidden">Rifiuta</span>
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleRejectAll}
                      className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                      aria-label="Chiudi"
                    >
                      <X className="w-5 h-5 text-eterea-gray" />
                    </button>
                  </div>
                </div>
              ) : (
                // Vista dettagliata
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-eterea-blue/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-eterea-blue" />
                      </div>
                      <h3 className="text-lg font-bold text-eterea-dark">
                        Gestisci preferenze cookie
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-eterea-gray" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Cookie necessari */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                      <div>
                        <h4 className="font-medium text-eterea-dark">Cookie necessari</h4>
                        <p className="text-sm text-eterea-gray">Essenziali per il funzionamento del sito</p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={consent.necessary}
                          disabled
                          className="w-12 h-6 rounded-full bg-eterea-dark appearance-none cursor-not-allowed"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full pointer-events-none" />
                      </div>
                    </div>

                    {/* Cookie analitici */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                      <div>
                        <h4 className="font-medium text-eterea-dark">Cookie analitici</h4>
                        <p className="text-sm text-eterea-gray">Ci aiutano a migliorare il sito (Google Analytics)</p>
                      </div>
                      <button
                        onClick={() => toggleConsent('analytics')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          consent.analytics ? 'bg-eterea-dark' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            consent.analytics ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Cookie marketing */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                      <div>
                        <h4 className="font-medium text-eterea-dark">Cookie marketing</h4>
                        <p className="text-sm text-eterea-gray">Per pubblicità personalizzata</p>
                      </div>
                      <button
                        onClick={() => toggleConsent('marketing')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          consent.marketing ? 'bg-eterea-dark' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            consent.marketing ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Cookie preferenze */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                      <div>
                        <h4 className="font-medium text-eterea-dark">Cookie preferenze</h4>
                        <p className="text-sm text-eterea-gray">Salvano le tue impostazioni</p>
                      </div>
                      <button
                        onClick={() => toggleConsent('preferences')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          consent.preferences ? 'bg-eterea-dark' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            consent.preferences ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={handleAcceptSelected}
                      className="flex-1 px-3 sm:px-6 py-2 sm:py-3 bg-eterea-dark text-white rounded-full text-xs sm:text-sm font-medium hover:bg-eterea-dark/90 transition-colors"
                    >
                      Salva preferenze
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 px-3 sm:px-6 py-2 sm:py-3 bg-eterea-cream text-eterea-dark rounded-full text-xs sm:text-sm font-medium hover:bg-eterea-cream/80 transition-colors"
                    >
                      Accetta tutti
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 px-3 sm:px-6 py-2 sm:py-3 border border-gray-200 text-eterea-gray rounded-full text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Rifiuta tutti
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook per verificare il consenso cookie
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (saved) {
      setConsent(JSON.parse(saved));
    }
  }, []);

  const hasConsent = (type: keyof CookieConsent) => {
    return consent?.[type] ?? false;
  };

  return { consent, hasConsent };
}
