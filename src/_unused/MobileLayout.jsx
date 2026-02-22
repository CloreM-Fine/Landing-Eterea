import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Phone, Users, Smartphone, Palette, Box, Camera, Globe, Share, Clapperboard, MapPin } from 'lucide-react';
import {
  EtereaPage,
  ContattiPage,
  ChiSiamoPage,
  AppPage,
  GraficaPage,
  Progettazione3DPage,
  ShootingPage,
  SitiWebPage,
  SocialMediaPage,
  VideoPage,
  GoogleMapsPage
} from '../pages';

// Mappa dei componenti pagina
const pageComponents = {
  'Eterea': EtereaPage,
  'Contatti': ContattiPage,
  'Chi siamo': ChiSiamoPage,
  'App': AppPage,
  'Grafica': GraficaPage,
  'Progettazione 3D': Progettazione3DPage,
  'Shooting': ShootingPage,
  'Siti Web': SitiWebPage,
  'Social Media': SocialMediaPage,
  'Video': VideoPage,
  'Maps': GoogleMapsPage,
};

// Icone per le sezioni
const sectionIcons = {
  'Eterea': Home,
  'Contatti': Phone,
  'Chi siamo': Users,
  'App': Smartphone,
  'Grafica': Palette,
  'Progettazione 3D': Box,
  'Shooting': Camera,
  'Siti Web': Globe,
  'Social Media': Share,
  'Video': Clapperboard,
  'Maps': MapPin,
};

const menuItems = [
  { name: 'Eterea', section: 'Preferiti' },
  { name: 'Contatti', section: 'Preferiti' },
  { name: 'Chi siamo', section: 'Preferiti' },
  { name: 'App', section: 'Servizi' },
  { name: 'Grafica', section: 'Servizi' },
  { name: 'Progettazione 3D', section: 'Servizi' },
  { name: 'Shooting', section: 'Servizi' },
  { name: 'Siti Web', section: 'Servizi' },
  { name: 'Social Media', section: 'Servizi' },
  { name: 'Video', section: 'Servizi' },
  { name: 'Maps', section: 'Posizioni' },
];

export function MobileLayout({ colors }) {
  const [currentPage, setCurrentPage] = useState('Eterea');
  const [menuOpen, setMenuOpen] = useState(false);

  const CurrentPageComponent = pageComponents[currentPage] || EtereaPage;

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Raggruppa menu items per sezione
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.finderBg }}>
      {/* Header Mobile */}
      <header 
        className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
        style={{ 
          backgroundColor: colors.finderHeaderBg,
          borderBottom: `1px solid ${colors.finderBorder}`
        }}
      >
        <h1 
          className="text-xl font-bold tracking-wider"
          style={{ color: colors.finderText }}
        >
          ETEREA
        </h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg transition-colors"
          style={{ color: colors.finderText }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-16"
            style={{ 
              backgroundColor: colors.finderHeaderBg,
              top: '60px'
            }}
          >
            <nav className="p-4 space-y-6 overflow-y-auto h-full pb-20">
              {Object.entries(groupedItems).map(([section, items]) => (
                <div key={section}>
                  <h2 
                    className="text-xs font-semibold uppercase tracking-wider mb-3 px-2"
                    style={{ color: colors.sidebarHeader || '#71717a' }}
                  >
                    {section}
                  </h2>
                  <div className="space-y-1">
                    {items.map((item) => {
                      const Icon = sectionIcons[item.name] || Home;
                      const isActive = currentPage === item.name;
                      return (
                        <button
                          key={item.name}
                          onClick={() => handlePageChange(item.name)}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
                          style={{
                            backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            color: isActive ? '#3b82f6' : colors.finderText
                          }}
                        >
                          <Icon size={20} strokeWidth={1.5} />
                          <span className="font-medium">{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="ml-auto w-2 h-2 rounded-full bg-blue-500"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-full"
          style={{ backgroundColor: '#ffffff' }}
        >
          <CurrentPageComponent />
        </motion.div>
      </main>

      {/* Footer Mobile */}
      <footer 
        className="py-4 px-4 text-center text-xs"
        style={{ 
          backgroundColor: colors.finderHeaderBg,
          borderTop: `1px solid ${colors.finderBorder}`,
          color: colors.email
        }}
      >
        <p>© 2026 Eterea Studio — Design & Development</p>
        <p className="mt-1 opacity-60">Tutti i diritti riservati</p>
      </footer>
    </div>
  );
}
