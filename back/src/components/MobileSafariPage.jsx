import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, X, Home, Phone, Users, Smartphone, Palette, Box, Camera, Globe, Share, Clapperboard, MapPin } from 'lucide-react';
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

export function MobileSafariPage({ data, colors, isFinderLight, onClose, onNavigate }) {
  const [currentView, setCurrentView] = useState(data);
  const [historyStack, setHistoryStack] = useState([data]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const isDark = !isFinderLight;
  
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
    setCurrentView({ ...currentView });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="rounded-xl overflow-hidden shadow-2xl bg-white"
    >
      {/* Header Mobile Safari */}
      <div 
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ 
          backgroundColor: isDark ? colors.finderHeaderBg : '#f5f5f7',
          borderColor: colors.finderBorder
        }}
      >
        <div className="flex items-center gap-2">
          <button 
            onClick={goBack}
            disabled={historyIndex === 0}
            className="p-2 rounded-full disabled:opacity-30"
            style={{ color: isDark ? colors.finderText : '#4b5563' }}
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={goForward}
            disabled={historyIndex >= historyStack.length - 1}
            className="p-2 rounded-full disabled:opacity-30"
            style={{ color: isDark ? colors.finderText : '#4b5563' }}
          >
            <ArrowRight size={20} />
          </button>
        </div>
        
        <div 
          className="flex-1 mx-2 px-3 py-1.5 rounded-lg text-center text-sm truncate"
          style={{ 
            backgroundColor: isDark ? '#2c2c2e' : '#e4e4e7',
            color: colors.finderText
          }}
        >
          {currentView.url || 'etereastudio.com'}
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={handleReload}
            className="p-2 rounded-full"
            style={{ color: isDark ? colors.finderText : '#4b5563' }}
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-full"
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
            className="p-2 rounded-full"
            style={{ color: isDark ? colors.finderText : '#4b5563' }}
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Sidebar Overlay */}
      {showSidebar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-20 bg-black/30"
          onClick={() => setShowSidebar(false)}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
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
                return (
                  <button
                    key={name}
                    onClick={() => handleNavigate(name)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
                    style={{ color: currentView.title === name ? '#3b82f6' : (isDark ? colors.sidebarText : '#1f2937') }}
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
                return (
                  <button
                    key={name}
                    onClick={() => handleNavigate(name)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
                    style={{ color: currentView.title === name ? '#3b82f6' : (isDark ? colors.sidebarText : '#1f2937') }}
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
      
      {/* Content */}
      <div className="relative bg-white" style={{ maxHeight: '60vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <CurrentPageComponent />
      </div>
    </motion.div>
  );
}
