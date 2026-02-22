import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  List, 
  ChevronDown, 
  Share, 
  Tag, 
  MoreHorizontal,
  Search,
  X
} from 'lucide-react';
import { folders } from '../data/folders';
import { Sidebar } from './Sidebar';

// Componente Cartella
function MacOSFolder({ name, color, colors, onClick, isMobile }) {
  const isPurple = color === '#8b5cf6';
  const mainColor = color;
  const tabColor = isPurple ? '#a78bfa' : '#a5e0fd';
  const uniqueId = `${name.replace(/\s+/g, '-').toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      whileHover={!isMobile ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick && onClick(name)}
      style={{ touchAction: 'manipulation' }}
    >
      <div className="relative mb-2 w-16 h-14 md:w-20 md:h-[68px]">
        <svg viewBox="0 0 72 60" preserveAspectRatio="xMidYMid meet" className="w-full h-full" style={{ display: 'block' }}>
          <defs>
            <linearGradient id={`g-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={mainColor} />
              <stop offset="100%" stopColor={mainColor} />
            </linearGradient>
            <linearGradient id={`t-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={tabColor} />
              <stop offset="100%" stopColor={mainColor} />
            </linearGradient>
          </defs>
          <path d="M4 18 L4 12 Q4 6 10 6 L26 6 L32 14 L62 14 Q66 14 66 18 L66 20 L4 20 Z" fill={`url(#t-${uniqueId})`} />
          <path d="M2 18 L70 18 L70 52 Q70 58 64 58 L8 58 Q2 58 2 52 L2 18 Z" fill={`url(#g-${uniqueId})`} rx="4" />
        </svg>
      </div>
      <span className="text-[11px] md:text-xs text-center font-medium px-1 py-0.5 rounded" style={{ color: colors.folderLabel }}>
        {name}
      </span>
    </motion.div>
  );
}

// DIMENSIONI E POSIZIONE INIZIALE FINDER
// Modifica questi valori per cambiare posizione e dimensioni
const INITIAL_WIDTH = 850;      // Larghezza iniziale
const INITIAL_HEIGHT = 650;     // Altezza iniziale
const FINDER_X = 200;           // Posizione X (da sinistra)
const FINDER_Y = 140;           // Posizione Y (dall'alto)

// MARGINI DI SICUREZZA - Modifica questi per controllare i limiti di spostamento
const EDGE_LIMIT = 5;          // Margine laterale e inferiore
const TOP_EDGE_LIMIT = 80;     // Margine SUPERIORE specifico (più spazio per la Top Bar)

const PURPLE_COLOR = '#8b5cf6';
const BLUE_COLOR = '#74d0fb';

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

export function FinderWindow({ colors, isFinderLight, onClose, zIndex = 50, onFocus, isMobileLayout = false, onFolderClick, onOpenMaps }) {
  const isMobileDevice = useIsMobile();
  const isMobile = isMobileLayout || isMobileDevice;
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [colorFilterActive, setColorFilterActive] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const [size, setSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [position, setPosition] = useState({ x: FINDER_X, y: FINDER_Y });
  const [prevSize, setPrevSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [prevPosition, setPrevPosition] = useState({ x: FINDER_X, y: FINDER_Y });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const windowRef = useRef(null);

  const isInteractiveElement = (target) => {
    const interactiveTags = ['BUTTON', 'INPUT', 'TEXTAREA', 'A', 'SELECT'];
    if (interactiveTags.includes(target.tagName)) return true;
    if (target.closest('button') || target.closest('input') || target.closest('a')) return true;
    return false;
  };

  // Organizza cartelle per colore
  const getOrganizedFolders = () => {
    let result = folders.filter(folder => 
      folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (colorFilterActive) {
      const purpleFolders = result.filter(f => f.color === PURPLE_COLOR);
      const blueFolders = result.filter(f => f.color === BLUE_COLOR);
      result = [...purpleFolders, ...blueFolders];
    }
    
    return result;
  };
  
  const organizedFolders = getOrganizedFolders();
  const purpleFolders = organizedFolders.filter(f => f.color === PURPLE_COLOR);
  const blueFolders = organizedFolders.filter(f => f.color === BLUE_COLOR);

  // Solo su desktop abilita drag e resize
  const handleMouseDown = useCallback((e) => {
    if (isMobile) return;
    
    // Porta la finestra in primo piano quando ci clicchi sopra
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
        const newWidth = Math.max(500, Math.min(900, resizeStart.width + deltaX));
        const newHeight = Math.max(400, Math.min(800, resizeStart.height + deltaY));
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

  const handleSearchClick = () => setIsSearchOpen(!isSearchOpen);
  const handleShareClick = () => setIsShareOpen(true);
  const copyToClipboard = (text) => { navigator.clipboard.writeText(text); alert('Copiato!'); };

  // Chiudi finestra
  const handleClose = () => {
    if (onClose) onClose();
  };

  // Massimizza/Ripristina finestra
  const handleMaximize = () => {
    if (isMaximized) {
      // Ripristina dimensioni precedenti
      setSize(prevSize);
      setPosition(prevPosition);
    } else {
      // Salva dimensioni correnti
      setPrevSize(size);
      setPrevPosition(position);
      // Massimizza ai margini con 80px di margine superiore
      setSize({ 
        width: window.innerWidth - EDGE_LIMIT * 2, 
        height: window.innerHeight - TOP_EDGE_LIMIT - EDGE_LIMIT 
      });
      setPosition({ x: EDGE_LIMIT, y: TOP_EDGE_LIMIT });
    }
    setIsMaximized(!isMaximized);
  };

  // Stili responsive
  const windowStyle = isMobile ? {
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '500px',
    left: 'auto',
    top: 'auto',
    marginBottom: '16px'
  } : {
    position: 'absolute',
    width: size.width,
    height: size.height,
    left: position.x,
    top: position.y,
    cursor: isDragging ? 'grabbing' : 'default'
  };

  return (
    <>
      <motion.div 
        ref={windowRef}
        onMouseDown={handleMouseDown}
        className="flex rounded-xl overflow-hidden shadow-2xl"
        style={{ ...windowStyle, zIndex }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          width: isMobile ? '100%' : size.width,
          height: isMobile ? 'auto' : size.height,
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ 
          duration: 0.3, 
          ease: [0.16, 1, 0.3, 1],
          width: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
      >
        {/* Sidebar - nascosta su mobile */}
        {!isMobile && (
          <div className="w-[200px] shrink-0 rounded-l-xl overflow-hidden border-r" style={{ borderColor: colors.finderBorder }}>
            <Sidebar 
              colors={colors} 
              onClose={handleClose}
              onMaximize={handleMaximize}
              onItemClick={onFolderClick}
              onOpenMaps={onOpenMaps}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: colors.finderBg }}>
          {/* Header */}
          <div className="flex items-center justify-between px-2 sm:px-3 md:px-4 py-2 md:py-3 border-b" style={{ backgroundColor: colors.finderHeaderBg, borderColor: colors.finderBorder, height: '50px' }}>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Traffic Lights - solo su mobile */}
              <div className="flex gap-1 sm:gap-1.5 select-none md:hidden">
                <button 
                  onClick={handleClose}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all cursor-pointer border border-[#e0443e]/30"
                  title="Chiudi"
                />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e] border border-[#d89e24]/30" title="Minimizza" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840] border border-[#1fa233]/30" title="Massimizza" />
              </div>
              <span className="font-semibold text-xs sm:text-sm select-none" style={{ color: colors.finderText }}>Eterea</span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button className="p-1 sm:p-1.5 rounded hover:bg-black/10 transition-colors hidden md:block" style={{ color: colors.finderText }}><LayoutGrid size={16} /></button>
              <button className="p-1 sm:p-1.5 rounded hover:bg-black/10 transition-colors hidden md:block" style={{ color: colors.finderText }}><List size={16} /></button>
              <div className="w-px h-4 bg-current opacity-20 mx-0.5 sm:mx-1 hidden md:block" />
              <button className="p-1 sm:p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.finderText }}><ChevronDown size={14} className="sm:w-4 sm:h-4" /></button>
              <button onClick={(e) => { e.stopPropagation(); handleShareClick(); }} className="p-1 sm:p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.finderText }}><Share size={14} className="sm:w-4 sm:h-4" /></button>
              <button 
                onClick={(e) => { e.stopPropagation(); setColorFilterActive(!colorFilterActive); }}
                className={`p-1 sm:p-1.5 rounded transition-colors ${colorFilterActive ? 'bg-blue-500/20' : 'hover:bg-black/10'}`}
                style={{ color: colorFilterActive ? '#3b82f6' : colors.finderText }}
                title={colorFilterActive ? "Filtro attivo" : "Filtro disattivato"}
              >
                <Tag size={14} className="sm:w-4 sm:h-4" />
              </button>
              <button className="p-1 sm:p-1.5 rounded hover:bg-black/10 transition-colors hidden md:block" style={{ color: colors.finderText }}><MoreHorizontal size={16} /></button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 80, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cerca..."
                    className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm outline-none w-16 sm:w-20"
                    style={{ backgroundColor: isFinderLight ? '#e5e7eb' : '#374151', color: colors.finderText }}
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <button onClick={(e) => { e.stopPropagation(); handleSearchClick(); }} className="p-1 sm:p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.finderText }}>
                {isSearchOpen ? <X size={14} className="sm:w-4 sm:h-4" /> : <Search size={14} className="sm:w-4 sm:h-4" />}
              </button>
            </div>
          </div>

          {/* Content - Organizzato per righe di colore quando filtro attivo */}
          <div className="flex-1 p-3 md:p-4 overflow-y-auto">
            {organizedFolders.length > 0 ? (
              colorFilterActive ? (
                // Layout a righe separate: prima viola, poi celesti
                <div className="space-y-6">
                  {/* Riga viola */}
                  {purpleFolders.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                      {purpleFolders.map((folder) => (
                        <MacOSFolder key={folder.id} name={folder.name} color={folder.color} colors={colors} onClick={onFolderClick} isMobile={isMobile} />
                      ))}
                    </div>
                  )}
                  
                  {/* Separatore tra i colori */}
                  {purpleFolders.length > 0 && blueFolders.length > 0 && (
                    <div 
                      className="w-full h-px my-2"
                      style={{ backgroundColor: colors.finderBorder }}
                    />
                  )}
                  
                  {/* Riga celeste */}
                  {blueFolders.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                      {blueFolders.map((folder) => (
                        <MacOSFolder key={folder.id} name={folder.name} color={folder.color} colors={colors} onClick={onFolderClick} isMobile={isMobile} />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Layout normale
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                  {organizedFolders.map((folder) => (
                    <MacOSFolder key={folder.id} name={folder.name} color={folder.color} colors={colors} onClick={onFolderClick} isMobile={isMobile} />
                  ))}
                </div>
              )
            ) : (
              <div className="flex items-center justify-center h-full text-sm" style={{ color: colors.finderText }}>
                Nessuna cartella trovata
              </div>
            )}
            

          </div>
        </div>

        {/* Resize handle invisibile - cursore macOS */}
        {!isMobile && (
          <div
            className="resize-handle absolute bottom-0 right-0 w-5 h-5 z-30"
            style={{ cursor: 'se-resize' }}
            onMouseDown={handleMouseDown}
            title="Ridimensiona"
          />
        )}
      </motion.div>

      {/* Share Popup - Modal Apple Style */}
      <AnimatePresence>
        {isShareOpen && (
          <>
            {/* Backdrop con blur */}
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsShareOpen(false)} 
            />
            
            {/* Modal container */}
            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4">
              <motion.div 
                className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-2xl shadow-2xl pointer-events-auto w-full max-w-[320px] overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white">Condividi</h3>
                  <button 
                    onClick={() => setIsShareOpen(false)} 
                    className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <X size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                
                {/* Grid icone in stile iOS */}
                <div className="p-5 grid grid-cols-3 gap-4">
                  {/* Copia Link */}
                  <button 
                    onClick={() => copyToClipboard(window.location.href)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-200">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-300">Copia link</span>
                  </button>
                  
                  {/* Email */}
                  <button 
                    onClick={() => copyToClipboard('info@etereastudio.com')}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-300">Email</span>
                  </button>
                  
                  {/* Messaggi */}
                  <button 
                    onClick={() => alert('Messaggistica non disponibile')}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
                      </svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-300">Messaggi</span>
                  </button>
                  
                  {/* WhatsApp */}
                  <button 
                    onClick={() => window.open('https://wa.me/?text=' + encodeURIComponent(window.location.href), '_blank')}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-300">WhatsApp</span>
                  </button>
                  
                  {/* Twitter/X */}
                  <button 
                    onClick={() => window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href), '_blank')}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-300">X</span>
                  </button>
                  
                  {/* LinkedIn */}
                  <button 
                    onClick={() => window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href), '_blank')}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-300">LinkedIn</span>
                  </button>
                </div>
                
                {/* Footer con link */}
                <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      E
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">Eterea Studio</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{window.location.href.replace(/^https?:\/\//, '')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
