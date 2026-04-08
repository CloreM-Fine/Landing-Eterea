import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Works } from './components/sections/Works';
import { Apps } from './components/sections/Apps';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { FAQ } from './components/sections/FAQ';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { CookiePolicy } from './components/pages/CookiePolicy';
import { TermsOfService } from './components/pages/TermsOfService';
import { ServiceConditions } from './components/pages/ServiceConditions';
import { ThankYou } from './components/pages/ThankYou';
import { NotFound } from './components/pages/NotFound';
import { ErrorPage } from './components/pages/ErrorPage';
import { CookieBanner } from './components/ui/CookieBanner';


type LegalPage = 'privacy' | 'cookies' | 'terms' | 'service-conditions' | null;
type CurrentPage = 'home' | 'thank-you' | 'not-found' | 'error';

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const letters = ['E', 'T', 'E', 'R', 'E', 'A'];
  const colors = ['#A8D0E6', '#B5C7A6', '#FAF8F3', '#C5B9CD', '#E8E4A0', '#F4C2A1'];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-eterea-cream flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-serif font-bold"
            style={{ 
              backgroundColor: colors[index],
              color: '#2D3142',
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            {letter}
          </motion.div>
        ))}
      </div>
      
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-1 bg-gray-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-eterea-dark rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeLegalPage, setActiveLegalPage] = useState<LegalPage>(null);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  // Check URL for special pages and hash for legal modals
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    if (path === '/thank-you') {
      setCurrentPage('thank-you');
    } else if (path === '/404') {
      setCurrentPage('not-found');
    } else if (path === '/error') {
      setCurrentPage('error');
    } else if (path !== '/' && !path.startsWith('/#')) {
      // Any other path shows 404
      setCurrentPage('not-found');
    }
    
    // Check hash for legal pages (from external links like app.etereastudio.it)
    if (hash) {
      const hashValue = hash.replace('#', '');
      switch (hashValue) {
        case 'privacy-policy':
          setActiveLegalPage('privacy');
          break;
        case 'cookie-policy':
          setActiveLegalPage('cookies');
          break;
        case 'termini-servizio':
          setActiveLegalPage('terms');
          break;
        case 'condizioni-app':
          setActiveLegalPage('service-conditions');
          break;
      }
    }
  }, []);

  // Prevent scrolling when legal page is open
  useEffect(() => {
    if (activeLegalPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeLegalPage]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >

          
          {currentPage === 'thank-you' ? (
            <ThankYou />
          ) : currentPage === 'not-found' ? (
            <NotFound onBackToHome={() => {
              setCurrentPage('home');
              window.history.pushState({}, '', '/');
            }} />
          ) : currentPage === 'error' ? (
            <ErrorPage onBackToHome={() => {
              setCurrentPage('home');
              window.history.pushState({}, '', '/');
            }} />
          ) : (
            <>
              <Header />
              
              <main>
                <Hero />
                <Services />
                <Works />
                <Apps />
                <About />
                <FAQ />
                <Contact onOpenPrivacy={() => setActiveLegalPage('privacy')} />
              </main>
              
              <Footer 
                onOpenPrivacy={() => setActiveLegalPage('privacy')}
                onOpenCookies={() => setActiveLegalPage('cookies')}
                onOpenTerms={() => setActiveLegalPage('terms')}
                onOpenServiceConditions={() => setActiveLegalPage('service-conditions')}
              />

              {/* Legal Pages */}
              <AnimatePresence>
                {activeLegalPage === 'privacy' && (
                  <PrivacyPolicy onClose={() => setActiveLegalPage(null)} />
                )}
                {activeLegalPage === 'cookies' && (
                  <CookiePolicy onClose={() => setActiveLegalPage(null)} />
                )}
                {activeLegalPage === 'terms' && (
                  <TermsOfService onClose={() => setActiveLegalPage(null)} />
                )}
                {activeLegalPage === 'service-conditions' && (
                  <ServiceConditions onClose={() => setActiveLegalPage(null)} />
                )}
              </AnimatePresence>

              {/* Cookie Banner */}
              <CookieBanner />
            </>
          )}
        </motion.div>
      )}
    </>
  );
}

export default App;
