import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';

// Logo Mobile Animato - lettere in sequenza (una alla volta)
const logoLetters = [
  { letter: 'E', color: '#A8D0E6' },
  { letter: 'T', color: '#B5C7A6' },
  { letter: 'E', color: '#FAF8F3' },
  { letter: 'R', color: '#C5B9CD' },
  { letter: 'E', color: '#E8E4A0' },
  { letter: 'A', color: '#F4C2A1' },
];

function LogoMobileAnimated() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logoLetters.length);
    }, 800); // Cambia lettera ogni 0.8 secondi

    return () => clearInterval(interval);
  }, []);

  const currentLetter = logoLetters[currentIndex];

  return (
    <div className="w-8 h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="w-8 h-8 rounded-full flex items-center justify-center text-base font-serif font-bold"
          style={{
            backgroundColor: currentLetter.color,
            color: '#2D3142',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          {currentLetter.letter}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Colori delle lettere del logo (escluso il crema #FAF8F3)
// E: #A8D0E6, T: #B5C7A6, R: #C5B9CD, E: #E8E4A0, A: #F4C2A1
const navItems = [
  { label: 'Home', href: '#home', color: '#A8D0E6' },
  { label: 'Servizi', href: '#servizi', color: '#B5C7A6' },
  { label: 'Lavori', href: '#lavori', color: '#C5B9CD' },
  { label: 'Chi Siamo', href: '#chi-siamo', color: '#E8E4A0' },
  { label: 'Contatti', href: '#contatti', color: '#F4C2A1' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a 
              href="#home"
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
            >
              {/* Logo mobile - Animazione lettere */}
              <div className="md:hidden">
                <LogoMobileAnimated />
              </div>
              {/* Logo desktop - componente Logo */}
              <div className="hidden md:block">
                <Logo size="sm" animated={false} />
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-eterea-dark'
                      : 'text-eterea-gray hover:text-eterea-dark'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === item.href.replace('#', '') && (
                    <motion.span
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ backgroundColor: item.color }}
                      layoutId="activeNav"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <motion.a
                href="#contatti"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contatti');
                }}
                className="px-6 py-2.5 bg-eterea-dark text-white text-sm font-medium rounded-full hover:bg-eterea-dark/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Iniziamo
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-full hover:bg-white/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-eterea-dark" />
              ) : (
                <Menu className="w-6 h-6 text-eterea-dark" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-eterea-dark/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.nav
              className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                      activeSection === item.href.replace('#', '')
                        ? 'text-eterea-dark'
                        : 'text-eterea-gray hover:bg-eterea-light'
                    }`}
                    style={activeSection === item.href.replace('#', '') ? { backgroundColor: item.color } : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.a
                  href="#contatti"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contatti');
                  }}
                  className="mt-4 text-center px-6 py-3 bg-eterea-dark text-white rounded-xl font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Iniziamo insieme
                </motion.a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
