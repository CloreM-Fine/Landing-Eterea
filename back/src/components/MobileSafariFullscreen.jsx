import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, X, Home, Phone, Users, Smartphone, Palette, Box, Camera, Globe, Share, Clapperboard, MapPin, Lock, ChevronDown } from 'lucide-react';
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
  GoogleMapsPage,
  GoogleSearchPage
} from '../pages';

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
  'Eterea Search': GoogleSearchPage,
};

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

const preferitiItems = ['Eterea', 'Contatti', 'Chi siamo'];
const serviziItems = ['App', 'Grafica', 'Progettazione 3D', 'Shooting', 'Siti Web', 'Social Media', 'Video'];

export function MobileSafariFullscreen({ data, colors, isFinderLight, onClose, onNavigate }) {
  const [currentView, setCurrentView] = useState(data);
  const [historyStack, setHistoryStack] = useState([data]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const isDark = !isFinderLight;
  
  // Aggiorna quando cambiano i dati dall'esterno
  useEffect(() => {
    setCurrentView(data);
    setHistoryStack([data]);
    setHistoryIndex(0);
  }, [data]);
  
  // Simula caricamento
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [currentView.title]);
  
  const CurrentPageComponent = currentView.isGoogleMaps 
    ? GoogleMapsPage 
    : currentView.isGoogleSearch 
      ? GoogleSearchPage 
      : pageComponents[currentView.title] || (() => currentView.content);
  
  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentView(historyStack[newIndex]);
    }
  };
  
  const goForward = () => {
    if (historyIndex < historyStack.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentView(historyStack[newIndex]);
    }
  };
  
  const handleNavigate = (pageName) => {
    const newEntry = { title: pageName, isGoogleSearch: false, isGoogleMaps: false };
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push(newEntry);
    setHistoryStack(newStack);
    setHistoryIndex(newStack.length - 1);
    setCurrentView(newEntry);
    setShowSidebar(false);
  };
  
  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ 
        backgroundColor: isDark ? colors.finderHeaderBg : '#f5f5f7',
        top: '60px' // Lascio spazio per la TopBar
      }}
    >
      {/* Header Safari */}
      <div 
        className="flex items-center justify-between px-3 py-2 border-b shrink-0"
        style={{ 
          backgroundColor: isDark ? colors.finderHeaderBg : '#f5f5f7',
          borderColor: colors.finderBorder
        }}
      >
        <div className="flex items-center gap-1">
          <button 
            onClick={goBack}
            disabled={historyIndex === 0}
            className="p-2 rounded-full disabled:opacity-30 active:scale-95 transition-transform"
            style={{ color: isDark ? colors.finderText : '#4b5563' }}
          >
            <ArrowLeft size={22} />
          </button>
          <button 
            onClick={goForward}
            disabled={historyIndex >= historyStack.length - 1}
            className="p-2 rounded-full disabled:opacity-30 active:scale-95 transition-transform"
            style={{ color: isDark ? colors.finderText : '#4b5563' }}
          >
            <ArrowRight size={22} />
          </button>
        </div>
        
        <div 
          className="flex-1 mx-2 px-3 py-1.5 rounded-lg text-center text-sm truncate flex items-center justify-center gap-1"
          style={{ 
            backgroundColor: isDark ? '#2c2c2e' : '#e4e4e7',
            color: colors.finderText
          }}
        >
          <Lock size={12} style={{ color: isDark ? '#34c759' : '#28cd41' }} />
          <span>{currentView.url || 'etereastudio.com'}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={handleReload}
            className="p-2 rounded-full active:scale-95 transition-transform"
            style={{ color: isDark ? colors.finderText : '#4b5563' }}
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-full active:scale-95 transition-transform"
            style={{ color: isDark ? colors.finderText : '#4b5563' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-full active:scale-95 transition-transform"
            style={{ color: isDark ? colors.finderText : '#4b5563' }}
          >
            <X size={22} />
          </button>
        </div>
      </div>
      
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/30"
            style={{ top: '50px' }}
            onClick={() => setShowSidebar(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-64 h-full p-4 overflow-y-auto"
              style={{ 
                backgroundColor: isDark ? colors.sidebarBg : '#f5f5f7'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xs font-semibold uppercase mb-3 px-2" style={{ color: colors.sidebarHeader || '#71717a' }}>
                Preferiti
              </h3>
              <div className="space-y-1 mb-4">
                {preferitiItems.map((name) => {
                  const Icon = sectionIcons[name];
                  const isActive = currentView.title === name;
                  return (
                    <button
                      key={name}
                      onClick={() => handleNavigate(name)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm active:scale-95 transition-transform"
                      style={{ color: isActive ? '#3b82f6' : (isDark ? colors.sidebarText : '#1f2937') }}
                    >
                      <Icon size={18} />
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>
              
              <h3 className="text-xs font-semibold uppercase mb-3 px-2" style={{ color: colors.sidebarHeader || '#71717a' }}>
                Servizi
              </h3>
              <div className="space-y-1">
                {serviziItems.map((name) => {
                  const Icon = sectionIcons[name];
                  const isActive = currentView.title === name;
                  return (
                    <button
                      key={name}
                      onClick={() => handleNavigate(name)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm active:scale-95 transition-transform"
                      style={{ color: isActive ? '#3b82f6' : (isDark ? colors.sidebarText : '#1f2937') }}
                    >
                      <Icon size={18} />
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content - Occupa tutto lo spazio rimanente */}
      <div className="flex-1 relative overflow-y-auto bg-white" style={{ WebkitOverflowScrolling: 'touch' }}>
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
            <motion.div
              className="w-10 h-10 rounded-full border-4 border-blue-500/20"
              style={{ borderTopColor: '#3b82f6' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}
        <div className="min-h-full">
          <CurrentPageComponent />
        </div>
      </div>
    </motion.div>
  );
}
