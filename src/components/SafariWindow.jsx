import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TextQuote, 
  Plus, 
  Copy,
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sidebar,
  ChevronDown,
  Home,
  Phone,
  Users,
  Palette,
  Share
} from 'lucide-react';
import {
  EtereaPage,
  ContattiPage,
  ChiSiamoPage,
  ServiziPage,
  GoogleMapsPage,
  GoogleSearchPage
} from '../pages';

// DIMENSIONI E POSIZIONE INIZIALE ETEREAOS
const INITIAL_WIDTH = 1100;
const INITIAL_HEIGHT = 750;
const SAFARI_X = 180;
const SAFARI_Y = 100;

// MARGINI DI SICUREZZA
const EDGE_LIMIT = 45;
const TOP_EDGE_LIMIT = 80;

// Hook per rilevare se è mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

// Componente per gli item della sidebar
function SidebarItem({ icon: Icon, label, isActive, isDark, colors, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${
        isActive ? 'bg-blue-500/10' : ''
      }`}
      style={{ 
        color: isActive ? '#3b82f6' : (isDark ? colors.sidebarText : '#1f2937'),
        backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = isDark ? colors.sidebarHover : 'rgba(0, 0, 0, 0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <Icon size={18} strokeWidth={1.5} />
      <span className="truncate">{label}</span>
    </div>
  );
}

// Mappa dei componenti pagina
const pageComponents = {
  'Eterea': EtereaPage,
  'Contatti': ContattiPage,
  'Chi siamo': ChiSiamoPage,
  'Servizi': ServiziPage,
  'Maps': GoogleMapsPage,
  'Eterea Search': GoogleSearchPage,
};

export function SafariWindow({ 
  colors, 
  isFinderLight,
  onClose, 
  zIndex = 50, 
  onFocus,
  title,
  content,
  url = 'etereastudio.com',
  onNavigate,
  folderName,
  onNewTab,
  isGoogleSearch = false,
  isGoogleMaps = false
}) {
  const isMobile = useIsMobile();
  
  // Stato finestra
  const [size, setSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [position, setPosition] = useState({ x: SAFARI_X, y: SAFARI_Y });
  const [prevSize, setPrevSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [prevPosition, setPrevPosition] = useState({ x: SAFARI_X, y: SAFARI_Y });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  // Stato browser
  const [addressBarFocused, setAddressBarFocused] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [readerMode, setReaderMode] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  
  // History con stato completo (titolo + tipo pagina)
  const [historyStack, setHistoryStack] = useState([
    { title, isGoogleSearch, isGoogleMaps, content, url }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentView, setCurrentView] = useState({ title, isGoogleSearch, isGoogleMaps, content, url });
  
  // Dark mode: quando isFinderLight è TRUE, lo sfondo è SCURO, quindi EtereaOS è in dark mode
  const isDark = !isFinderLight;
  
  // Simula caricamento pagina
  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 100);
          return 100;
        }
        return prev + Math.random() * 30 + 10;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [title, reloadKey]);
  
  // Funzione ricarica pagina
  const handleReload = () => {
    setReloadKey(prev => prev + 1);
  };
  
  // Chiudi popup quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = () => {
      setShowPrivacyInfo(false);
      setShowShareMenu(false);
    };
    
    if (showPrivacyInfo || showShareMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showPrivacyInfo, showShareMenu]);
  
  // Reader mode toggle
  const toggleReaderMode = () => {
    setReaderMode(!readerMode);
  };
  
  // Privacy info toggle
  const togglePrivacyInfo = () => {
    setShowPrivacyInfo(!showPrivacyInfo);
    setShowShareMenu(false);
  };
  
  // Share menu toggle
  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
    setShowPrivacyInfo(false);
  };
  
  // Copy URL to clipboard
  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${url}`);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };
  
  // New tab
  const openNewTab = () => {
    if (onNewTab) {
      onNewTab();
    }
  };
  
  // Flag per evitare di aggiungere alla history quando usiamo back/forward
  const isNavigatingHistory = useRef(false);
  
  // Aggiorna la history quando cambia il titolo o il tipo di pagina (da esterno - sidebar)
  useEffect(() => {
    if (isNavigatingHistory.current) {
      isNavigatingHistory.current = false;
      return;
    }
    
    const currentEntry = historyStack[historyIndex];
    // Se il titolo o il tipo di pagina è diverso, aggiungi alla history
    if (currentEntry.title !== title || 
        currentEntry.isGoogleMaps !== isGoogleMaps || 
        currentEntry.isGoogleSearch !== isGoogleSearch) {
      // Tronca la history dopo l'indice corrente
      const newStack = historyStack.slice(0, historyIndex + 1);
      const newEntry = { title, isGoogleSearch, isGoogleMaps, content, url };
      newStack.push(newEntry);
      setHistoryStack(newStack);
      setHistoryIndex(newStack.length - 1);
      setCurrentView(newEntry);
    }
  }, [title, isGoogleSearch, isGoogleMaps, content, url]);
  
  // Navigation history - gestita internamente
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
  
  // Massimizza/Ripristina finestra
  const handleMaximize = () => {
    if (isMaximized) {
      setSize(prevSize);
      setPosition(prevPosition);
    } else {
      setPrevSize(size);
      setPrevPosition(position);
      setSize({ 
        width: window.innerWidth - EDGE_LIMIT * 2, 
        height: window.innerHeight - TOP_EDGE_LIMIT - EDGE_LIMIT 
      });
      setPosition({ x: EDGE_LIMIT, y: TOP_EDGE_LIMIT });
    }
    setIsMaximized(!isMaximized);
  };
  
  const handleClose = () => {
    if (onClose) onClose();
  };
  
  const isInteractiveElement = (target) => {
    if (target.classList && target.classList.contains('safari-header')) return false;
    
    const interactiveTags = ['BUTTON', 'INPUT', 'TEXTAREA', 'A', 'SELECT'];
    if (interactiveTags.includes(target.tagName)) return true;
    if (target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('a') || target.closest('[role="button"]')) return true;
    if (target.closest('.resize-handle')) return true;
    return false;
  };
  
  // Drag e resize
  const handleMouseDown = useCallback((e) => {
    if (isMobile) return;
    
    if (onFocus) onFocus();
    
    if (e.target.closest('.resize-handle')) {
      e.preventDefault();
      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height
      });
      return;
    }
    
    if (isInteractiveElement(e.target)) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position, size, isMobile, onFocus]);
  
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = Math.max(EDGE_LIMIT, Math.min(window.innerWidth - size.width - EDGE_LIMIT, e.clientX - dragStart.x));
        const newY = Math.max(TOP_EDGE_LIMIT, Math.min(window.innerHeight - size.height - EDGE_LIMIT, e.clientY - dragStart.y));
        setPosition({ x: newX, y: newY });
      }
      
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(600, Math.min(1400, resizeStart.width + deltaX));
        const newHeight = Math.max(500, Math.min(1000, resizeStart.height + deltaY));
        const maxWidth = window.innerWidth - position.x - EDGE_LIMIT;
        const maxHeight = window.innerHeight - position.y - EDGE_LIMIT;
        
        setSize({
          width: Math.min(newWidth, maxWidth),
          height: Math.min(newHeight, maxHeight)
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, isResizing, dragStart, resizeStart, position, size, isMobile]);
  
  // Ottieni il componente della pagina corrente
  const CurrentPageComponent = currentView.isGoogleMaps 
    ? GoogleMapsPage 
    : currentView.isGoogleSearch 
      ? GoogleSearchPage 
      : pageComponents[currentView.title] || (() => currentView.content || content);
  
  // Gestione click sidebar - naviga e porta in primo piano
  const handleSidebarClick = (folderName) => {
    if (onNavigate) onNavigate(folderName);
    if (onFocus) onFocus();
  };
  
  // Stili responsive
  const windowStyle = isMobile ? {
    position: 'relative',
    width: '100%',
    height: '600px',
    left: 'auto',
    top: 'auto'
  } : {
    position: 'absolute',
    width: size.width,
    height: size.height,
    left: position.x,
    top: position.y,
    cursor: isDragging ? 'grabbing' : 'default'
  };
  
  return (
    <motion.div 
      onMouseDown={handleMouseDown}
      className="flex flex-col rounded-xl overflow-hidden shadow-2xl"
      style={{ ...windowStyle, zIndex }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        width: isMobile ? '100%' : size.width,
        height: isMobile ? '600px' : size.height,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.16, 1, 0.3, 1],
        width: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      {/* Header EtereaOS Style */}
      <div 
        className="safari-header flex flex-col border-b"
        style={{ 
          backgroundColor: colors.finderHeaderBg,
          borderColor: colors.finderBorder
        }}
      >
        {/* Toolbar principale */}
        <div className="flex items-center justify-between px-4 py-3" style={{ height: '50px' }}>
          {/* Sinistra: Traffic lights e navigazione */}
          <div className="flex items-center gap-3 flex-1">
            {/* Traffic Lights */}
            <div className="flex gap-2 select-none">
              <button 
                onClick={handleClose}
                className="traffic-light traffic-light-red hover:brightness-110 transition-all cursor-pointer"
                title="Chiudi"
              />
              <div 
                className="traffic-light traffic-light-yellow"
                title="Minimizza"
              />
              <button 
                onClick={handleMaximize}
                className="traffic-light traffic-light-green hover:brightness-110 transition-all cursor-pointer"
                title="Massimizza"
              />
            </div>
            
            {/* Bottoni navigazione */}
            <div className="flex items-center gap-1 ml-2">
              <button 
                onClick={goBack}
                disabled={historyIndex <= 0}
                className="p-1 rounded hover:bg-black/10 transition-colors disabled:opacity-30" 
                style={{ color: isDark ? colors.finderText : '#4b5563' }}
              >
                <ArrowLeft size={16} />
              </button>
              <button 
                onClick={goForward}
                disabled={historyIndex >= historyStack.length - 1}
                className="p-1 rounded hover:bg-black/10 transition-colors disabled:opacity-30" 
                style={{ color: isDark ? colors.finderText : '#4b5563' }}
              >
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={handleReload}
                className="p-1 rounded hover:bg-black/10 transition-colors" 
                style={{ color: isDark ? colors.finderText : '#4b5563' }}
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
          
          {/* Centro: Barra degli indirizzi */}
          <div className="flex-1 max-w-xl mx-4">
            <div 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                addressBarFocused ? 'ring-2 ring-blue-500/50' : ''
              }`}
              style={{ 
                backgroundColor: isDark ? '#2c2c2e' : '#e4e4e7',
              }}
            >
              <div className="flex items-center gap-1" style={{ color: isDark ? '#34c759' : '#28cd41' }}>
                <Lock size={12} />
              </div>
              <input
                type="text"
                defaultValue={`https://${url}`}
                className="flex-1 bg-transparent text-sm outline-none text-center"
                style={{ color: colors.finderText }}
                onFocus={() => setAddressBarFocused(true)}
                onBlur={() => setAddressBarFocused(false)}
              />
              <button className="p-0.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.finderText, opacity: 0.6 }}>
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
          
          {/* Destra: Azioni */}
          <div className="flex items-center gap-1 flex-1 justify-end relative">
            {copyFeedback && (
              <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Copiato!
              </div>
            )}
            
            <button 
              onClick={toggleReaderMode}
              className={`p-1.5 rounded transition-colors ${readerMode ? 'bg-blue-500/20 text-blue-500' : 'hover:bg-black/10'}`}
              style={{ color: readerMode ? '#3b82f6' : (isDark ? colors.finderText : '#1f2937') }}
              title="Modalità lettura"
            >
              <TextQuote size={16} />
            </button>
            
            <button 
              onClick={togglePrivacyInfo}
              className={`p-1.5 rounded transition-colors ${showPrivacyInfo ? 'bg-green-500/20' : 'hover:bg-black/10'}`}
              style={{ color: isDark ? colors.finderText : '#1f2937' }}
              title="Privacy"
            >
              <Shield size={16} />
            </button>
            
            <button 
              onClick={toggleShareMenu}
              className={`p-1.5 rounded transition-colors ${showShareMenu ? 'bg-blue-500/20' : 'hover:bg-black/10'}`}
              style={{ color: isDark ? colors.finderText : '#1f2937' }}
              title="Condividi"
            >
              <Share size={16} />
            </button>
            
            <button 
              onClick={openNewTab}
              className="p-1.5 rounded hover:bg-black/10 transition-colors"
              style={{ color: isDark ? colors.finderText : '#1f2937' }}
              title="Nuova scheda"
            >
              <Plus size={18} />
            </button>
            
            <button 
              onClick={copyUrl}
              className="p-1.5 rounded hover:bg-black/10 transition-colors"
              style={{ color: isDark ? colors.finderText : '#1f2937' }}
              title="Copia link"
            >
              <Copy size={16} />
            </button>
            
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className={`p-1.5 rounded transition-colors ${showSidebar ? 'bg-blue-500/20' : 'hover:bg-black/10'}`}
              style={{ color: isDark ? colors.finderText : '#1f2937' }}
              title="Sidebar"
            >
              <Sidebar size={16} />
            </button>
            
            {/* Privacy Info Popup */}
            {showPrivacyInfo && (
              <div 
                className="absolute top-10 right-20 w-64 p-4 rounded-xl shadow-xl z-50 border"
                style={{ 
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  borderColor: isDark ? '#374151' : '#e5e7eb'
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Lock size={16} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: isDark ? '#ffffff' : '#1f2937' }}>Connessione sicura</p>
                    <p className="text-xs opacity-60" style={{ color: isDark ? '#ffffff' : '#1f2937' }}>HTTPS</p>
                  </div>
                </div>
                <p className="text-xs opacity-80" style={{ color: isDark ? '#ffffff' : '#1f2937' }}>
                  La connessione a questo sito è sicura. I tuoi dati sono protetti.
                </p>
                <button 
                  onClick={() => setShowPrivacyInfo(false)}
                  className="mt-3 w-full py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Chiudi
                </button>
              </div>
            )}
            
            {/* Share Menu Popup */}
            {showShareMenu && (
              <div 
                className="absolute top-10 right-12 w-48 p-2 rounded-xl shadow-xl z-50 border"
                style={{ 
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  borderColor: isDark ? '#374151' : '#e5e7eb'
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="space-y-1">
                  <button 
                    onClick={() => { copyUrl(); setShowShareMenu(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5 transition-colors text-left"
                    style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                  >
                    <Copy size={16} />
                    <span className="text-sm">Copia link</span>
                  </button>
                  <button 
                    onClick={() => { setShowShareMenu(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5 transition-colors text-left"
                    style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                  >
                    <Share size={16} />
                    <span className="text-sm">Condividi...</span>
                  </button>
                  <button 
                    onClick={() => { setShowShareMenu(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5 transition-colors text-left"
                    style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                  >
                    <Sidebar size={16} />
                    <span className="text-sm">Aggiungi ai preferiti</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div 
        className="flex-1 flex overflow-hidden"
        style={{ backgroundColor: colors.finderBg }}
      >
        {/* Sidebar */}
        {showSidebar && (
          <div 
            className="w-52 border-r p-3 overflow-y-auto hidden md:block"
            style={{ 
              backgroundColor: colors.sidebarBg,
              borderColor: colors.finderBorder
            }}
          >
            {/* Sezione Preferiti */}
            <div className="mb-4">
              <div 
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: colors.sidebarHeader }}
              >
                <span>Preferiti</span>
              </div>
              <div className="space-y-0.5">
                <SidebarItem icon={Home} label="Eterea" isActive={currentView.title === 'Eterea'} isDark={isDark} colors={colors} onClick={() => handleSidebarClick('Eterea')} />
                <SidebarItem icon={Phone} label="Contatti" isActive={currentView.title === 'Contatti'} isDark={isDark} colors={colors} onClick={() => handleSidebarClick('Contatti')} />
                <SidebarItem icon={Users} label="Chi siamo" isActive={currentView.title === 'Chi Siamo'} isDark={isDark} colors={colors} onClick={() => handleSidebarClick('Chi siamo')} />
              </div>
            </div>
            
            {/* Sezione Servizi */}
            <div className="mb-4">
              <div 
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: colors.sidebarHeader }}
              >
                <span>Servizi</span>
              </div>
              <div className="space-y-0.5">
                <SidebarItem icon={Palette} label="Servizi" isActive={currentView.title === 'Servizi'} isDark={isDark} colors={colors} onClick={() => handleSidebarClick('Servizi')} />
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div 
          className="flex-1 overflow-y-auto relative" 
          style={{ backgroundColor: colors.finderBg }}
          onClick={() => {
            setShowPrivacyInfo(false);
            setShowShareMenu(false);
          }}
        >
          {/* Loading Animation */}
          {isLoading && (
            <div 
              className="absolute inset-0 z-10 flex flex-col items-center justify-center"
              style={{ backgroundColor: '#ffffff' }}
            >
              <div className="relative mb-6">
                <motion.div
                  className="w-12 h-12 rounded-full border-4 border-blue-500/20"
                  style={{ borderTopColor: '#3b82f6' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Caricamento {currentView.title}...
              </p>
              <div className="w-48 h-1 rounded-full bg-gray-200 overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          )}
          
          {/* Reader Mode Overlay */}
          {readerMode && !isLoading && (
            <div className="absolute inset-0 z-20 bg-white p-8 overflow-y-auto">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentView.title}</h1>
                <div className="text-gray-600 leading-relaxed space-y-4">
                  <p>Contenuto ottimizzato per una lettura più confortevole.</p>
                  <p>URL: https://{url}</p>
                </div>
              </div>
            </div>
          )}
          
          <motion.div
            key={reloadKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ 
              backgroundColor: '#ffffff', 
              minHeight: currentView.isGoogleMaps ? 'auto' : '100%', 
              color: '#1f2937' 
            }}
            className={readerMode ? 'hidden' : ''}
          >
            <CurrentPageComponent />
          </motion.div>
        </div>
      </div>
      
      {/* Resize handle */}
      {!isMobile && (
        <div
          className="resize-handle absolute bottom-0 right-0 w-5 h-5 z-30"
          style={{ cursor: 'se-resize' }}
          onMouseDown={handleMouseDown}
          title="Ridimensiona"
        />
      )}
    </motion.div>
  );
}
