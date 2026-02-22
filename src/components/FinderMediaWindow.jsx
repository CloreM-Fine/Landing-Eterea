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
  X,
  Image as ImageIcon,
  Film
} from 'lucide-react';

// Placeholder images (usando picsum per immagini random)
const PLACEHOLDER_IMAGES = [
  'https://picsum.photos/300/200?random=1',
  'https://picsum.photos/300/200?random=2',
  'https://picsum.photos/300/200?random=3',
  'https://picsum.photos/300/200?random=4',
  'https://picsum.photos/300/200?random=5',
  'https://picsum.photos/300/200?random=6',
  'https://picsum.photos/300/200?random=7',
  'https://picsum.photos/300/200?random=8',
  'https://picsum.photos/300/200?random=9',
  'https://picsum.photos/300/200?random=10',
  'https://picsum.photos/300/200?random=11',
  'https://picsum.photos/300/200?random=12',
];

// Placeholder video thumbnails
const PLACEHOLDER_VIDEOS = [
  { id: 1, title: 'Progetto Alpha - Teaser', duration: '0:45' },
  { id: 2, title: 'Brand XYZ - Spot', duration: '1:30' },
  { id: 3, title: 'Campagna Social 2024', duration: '0:30' },
  { id: 4, title: 'E-commerce Lux - Promo', duration: '2:15' },
  { id: 5, title: 'Restyling Beta - Preview', duration: '1:00' },
  { id: 6, title: 'Making Of - Backstage', duration: '3:45' },
  { id: 7, title: 'Intervista Team', duration: '5:20' },
  { id: 8, title: 'Evento Lucca 2024', duration: '4:10' },
];

// DIMENSIONI E POSIZIONE INIZIALE
const INITIAL_WIDTH = 700;
const INITIAL_HEIGHT = 500;

// MARGINI DI SICUREZZA
const EDGE_LIMIT = 5;
const TOP_EDGE_LIMIT = 80;

export function FinderMediaWindow({ colors, isFinderLight, onClose, zIndex = 50, onFocus, mediaType }) {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  
  // Posizione casuale per la finestra
  const getRandomPosition = () => ({
    x: 100 + Math.random() * 300,
    y: 100 + Math.random() * 150
  });
  
  const [size, setSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [position, setPosition] = useState(getRandomPosition());
  const [prevSize, setPrevSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [prevPosition, setPrevPosition] = useState(position);
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

  const handleMouseDown = useCallback((e) => {
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
  }, [position, size, onFocus]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = Math.max(EDGE_LIMIT, Math.min(window.innerWidth - size.width - EDGE_LIMIT, e.clientX - dragStart.x));
        const newY = Math.max(TOP_EDGE_LIMIT, Math.min(window.innerHeight - size.height - EDGE_LIMIT, e.clientY - dragStart.y));
        setPosition({ x: newX, y: newY });
      }
      
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(400, Math.min(1000, resizeStart.width + deltaX));
        const newHeight = Math.max(300, Math.min(700, resizeStart.height + deltaY));
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
  }, [isDragging, isResizing, dragStart, resizeStart, position, size]);

  const handleSearchClick = () => setIsSearchOpen(!isSearchOpen);
  const handleShareClick = () => setIsShareOpen(true);
  const copyToClipboard = (text) => { navigator.clipboard.writeText(text); alert('Copiato!'); };

  const handleClose = () => {
    if (onClose) onClose();
  };

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

  const windowStyle = {
    position: 'absolute',
    width: size.width,
    height: size.height,
    left: position.x,
    top: position.y,
    cursor: isDragging ? 'grabbing' : 'default'
  };

  const isImages = mediaType === 'Immagini';
  const items = isImages ? PLACEHOLDER_IMAGES : PLACEHOLDER_VIDEOS;
  const Icon = isImages ? ImageIcon : Film;

  return (
    <>
      <motion.div 
        ref={windowRef}
        onMouseDown={handleMouseDown}
        className="flex flex-col rounded-xl overflow-hidden shadow-2xl"
        style={{ ...windowStyle, zIndex }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          width: size.width,
          height: size.height,
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ 
          duration: 0.3, 
          ease: [0.16, 1, 0.3, 1],
          width: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
      >
        {/* Main Content - NO SIDEBAR */}
        <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: colors.finderBg }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ backgroundColor: colors.finderHeaderBg, borderColor: colors.finderBorder, height: '50px' }}>
            <div className="flex items-center gap-3">
              {/* Traffic Lights */}
              <div className="flex gap-2">
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
              <span className="font-semibold text-sm select-none ml-2" style={{ color: colors.finderText }}>{mediaType}</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-blue-500/20' : 'hover:bg-black/10'}`}
                style={{ color: viewMode === 'grid' ? '#3b82f6' : colors.finderText }}
                title="Vista icone"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-blue-500/20' : 'hover:bg-black/10'}`}
                style={{ color: viewMode === 'list' ? '#3b82f6' : colors.finderText }}
                title="Vista elenco"
              >
                <List size={16} />
              </button>
              <div className="w-px h-4 bg-current opacity-20 mx-1" />
              <button className="p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.finderText }}><ChevronDown size={14} /></button>
              <button onClick={(e) => { e.stopPropagation(); handleShareClick(); }} className="p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.finderText }}><Share size={14} /></button>
              <button className="p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.finderText }}><Tag size={14} /></button>
              <button className="p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.finderText }}><MoreHorizontal size={16} /></button>
              
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
                    className="ml-2 px-2 py-1 rounded text-sm outline-none w-20"
                    style={{ backgroundColor: isFinderLight ? '#e5e7eb' : '#374151', color: colors.finderText }}
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <button onClick={(e) => { e.stopPropagation(); handleSearchClick(); }} className="p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.finderText }}>
                {isSearchOpen ? <X size={14} /> : <Search size={14} />}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {isImages ? (
              // Vista Immagini
              viewMode === 'grid' ? (
                <div className="grid grid-cols-3 gap-3">
                  {items.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative aspect-[3/2] rounded-lg overflow-hidden border-2 cursor-pointer group"
                      style={{ borderColor: colors.finderBorder }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={img} 
                        alt={`Immagine ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 transition-colors"
                    >
                      <div className="w-16 h-12 rounded overflow-hidden shrink-0">
                        <img src={img} alt={`Immagine ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: colors.finderText }}>
                          Foto progetto_{String(idx + 1).padStart(3, '0')}.jpg
                        </p>
                        <p className="text-xs opacity-50" style={{ color: colors.finderText }}>
                          {Math.round(Math.random() * 5 + 1)} MB • JPG
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              // Vista Video
              viewMode === 'grid' ? (
                <div className="grid grid-cols-2 gap-4">
                  {items.map((video, idx) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer group bg-black"
                      style={{ borderColor: colors.finderBorder }}
                      whileHover={{ scale: 1.03 }}
                    >
                      {/* Thumbnail placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film size={40} className="text-white/30" />
                      </div>
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1" />
                        </div>
                      </div>
                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs">
                        {video.duration}
                      </div>
                      {/* Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-xs font-medium truncate">{video.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((video, idx) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 transition-colors"
                    >
                      <div className="w-20 h-12 rounded overflow-hidden shrink-0 bg-black relative flex items-center justify-center">
                        <Film size={20} className="text-white/30" />
                        <div className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-white text-[10px]">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: colors.finderText }}>
                          {video.title}
                        </p>
                        <p className="text-xs opacity-50" style={{ color: colors.finderText }}>
                          MOV • {Math.round(Math.random() * 500 + 100)} MB
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        {/* Resize handle */}
        <div
          className="resize-handle absolute bottom-0 right-0 w-5 h-5 z-30"
          style={{ cursor: 'se-resize' }}
          onMouseDown={handleMouseDown}
          title="Ridimensiona"
        />
      </motion.div>

      {/* Share Popup */}
      <AnimatePresence>
        {isShareOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsShareOpen(false)} 
            />
            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4">
              <motion.div 
                className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-2xl shadow-2xl pointer-events-auto w-full max-w-[320px] overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white">Condividi</h3>
                  <button 
                    onClick={() => setIsShareOpen(false)} 
                    className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <X size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <div className="p-5 grid grid-cols-3 gap-4">
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
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
