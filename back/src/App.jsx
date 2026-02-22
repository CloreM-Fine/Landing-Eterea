import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopBar } from './components/TopBar';
import { CopyrightText } from './components/CopyrightText';
import { FinderWindow } from './components/FinderWindow';
import { NoteWindow } from './components/NoteWindow';
import { SnakeWindow } from './components/SnakeWindow';
import { TetrisWindow } from './components/TetrisWindow';
import { SafariWindow } from './components/SafariWindow';
import { MobileSafariFullscreen } from './components/MobileSafariFullscreen';

import { ServiziPage } from './pages/ServiziPage';
import { WorkPage } from './pages/WorkPage';
import { ChiSiamoPage } from './pages/ChiSiamoPage';
import { ContattiPage } from './pages/ContattiPage';
import { getFolderContent } from './data/folderContents.jsx';
import { EmailPopup } from './components/EmailPopup';
import { useTheme } from './hooks/useTheme';
import { useNote } from './hooks/useNote';
import { Menu, X } from 'lucide-react';

// CONFIGURAZIONE PADDING LAYOUT DESKTOP - Modifica questi valori per regolare gli spazi
const DESKTOP_PADDING_TOP = 96;     // Spazio dalla top bar (px) - era pt-24 = 96px
const DESKTOP_PADDING_BOTTOM = 0;  // Spazio dal fondo schermo (px) - era pb-8 = 32px
const DESKTOP_PADDING_X = 32;       // Spazio laterale (px) - era px-8 = 32px

function App() {
  const { bgColor, bgImage, bgVideo, previewImage, isLight, changeColor, changeImage, changeVideo, colors, isFinderLight, isImageBackground, isVideoBackground } = useTheme();
  const { content, title, updateContent, updateTitle, saveNote } = useNote();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Stato per finestre aperte/chiuse
  const [finderOpen, setFinderOpen] = useState(true);
  const [noteOpen, setNoteOpen] = useState(true);
  const [snakeOpen, setSnakeOpen] = useState(true);
  const [tetrisOpen, setTetrisOpen] = useState(true);
  
  // Finestre Safari aperte (una per cartella)
  const [safariWindows, setSafariWindows] = useState([]);
  
  // Mobile: pagina aperta e menu
  const [mobilePageOpen, setMobilePageOpen] = useState(false);
  const [mobilePageData, setMobilePageData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Pagine fullscreen (nuova navigazione)
  const [fullscreenPage, setFullscreenPage] = useState(null); // 'chi-siamo', 'contatti', 'servizi', 'work'
  
  // Gestione focus finestre - z-index dinamico
  // Al caricamento: Snake davanti a Note (snake 51 > note 49)
  const [windowZIndices, setWindowZIndices] = useState({
    finder: 50,
    note: 49,
    snake: 51,
    tetris: 47,
  });
  const topZIndexRef = useRef(50);
  
  const bringToFront = (windowName) => {
    topZIndexRef.current += 1;
    setWindowZIndices(prev => ({
      ...prev,
      [windowName]: topZIndexRef.current
    }));
  };
  
  const getZIndex = (windowName) => windowZIndices[windowName] || 40;
  
  // Determina se una finestra è in primo piano (per i controlli da tastiera)
  const isWindowActive = (windowName) => {
    const maxZ = Math.max(...Object.values(windowZIndices));
    return windowZIndices[windowName] === maxZ;
  };
  
  // Chiudi tutte le finestre e apri pagina fullscreen
  const navigateToFullscreen = (pageId) => {
    // Chiudi tutto
    setFinderOpen(false);
    setNoteOpen(false);
    setSnakeOpen(false);
    setTetrisOpen(false);
    setSafariWindows([]);
    setMobilePageOpen(false);
    setMobileMenuOpen(false);
    
    // Apri pagina fullscreen
    setFullscreenPage(pageId);
  };
  
  // Chiudi pagina fullscreen e torna al desktop
  const closeFullscreen = () => {
    setFullscreenPage(null);
    // Ripristina finestre
    setFinderOpen(true);
    setNoteOpen(true);
    setSnakeOpen(true);
    setTetrisOpen(true);
  };
  
  // Toggle tema chiaro/scuro
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Applica tema
    if (!isDarkTheme) {
      changeColor('#1a1a1a');
    } else {
      changeColor('#e5e7eb');
    }
  };
  
  // Wrapper per cambio colore - ferma video quando cambia colore
  const handleColorChange = (color) => {
    changeVideo(null); // Ferma video
    changeColor(color);
  };

  // Wrapper per cambio immagine - ferma video quando cambia immagine
  const handleImageChange = () => {
    changeVideo(null); // Ferma video
    changeImage();
  };

  // Apri una finestra Safari per una cartella (desktop)
  const openSafariWindow = (folderName, isMobileClick = false) => {
    // Chiudi pagina fullscreen se aperta
    if (fullscreenPage) {
      closeFullscreen();
    }
    
    // Mobile: apri pagina sotto
    if (isMobileClick || window.innerWidth < 1024) {
      const folderData = getFolderContent(folderName);
      setMobilePageData({ folderName, ...folderData });
      setMobilePageOpen(true);
      setTimeout(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }, 100);
      return;
    }
    
    // Desktop: finestra Safari
    const existingWindow = safariWindows.find(w => w.folderName === folderName);
    if (existingWindow) {
      bringToFront(`safari-${folderName}`);
      return;
    }
    
    const folderData = getFolderContent(folderName);
    setSafariWindows(prev => [...prev, {
      id: Date.now(),
      folderName,
      ...folderData
    }]);
    bringToFront(`safari-${folderName}`);
  };
  
  // Naviga a una sezione
  const navigateSafariWindow = (windowId, folderName) => {
    // Mobile
    if (window.innerWidth < 1024 && mobilePageOpen) {
      const folderData = getFolderContent(folderName);
      setMobilePageData({ folderName, ...folderData, isGoogleSearch: false, isGoogleMaps: false });
      setMobileMenuOpen(false);
      return;
    }
    
    // Desktop
    const folderData = getFolderContent(folderName);
    setSafariWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, folderName, ...folderData, isGoogleSearch: false, isGoogleMaps: false }
        : w
    ));
  };
  
  // Apri Google Maps
  const openGoogleMaps = (isMobileClick = false) => {
    // Chiudi pagina fullscreen se aperta
    if (fullscreenPage) {
      closeFullscreen();
    }
    
    // Mobile
    if (isMobileClick || window.innerWidth < 1024) {
      setMobilePageData({
        folderName: 'maps',
        title: 'Maps',
        url: 'maps.google.com',
        isGoogleSearch: false,
        isGoogleMaps: true
      });
      setMobilePageOpen(true);
      setTimeout(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }, 100);
      return;
    }
    
    // Desktop
    const newId = Date.now();
    setSafariWindows(prev => [...prev, {
      id: newId,
      folderName: `maps-${newId}`,
      title: 'Maps',
      url: 'maps.google.com',
      isGoogleSearch: false,
      isGoogleMaps: true,
      content: null
    }]);
    bringToFront(`safari-maps-${newId}`);
  };
  
  // Chiudi finestra Safari
  const closeSafariWindow = (folderName) => {
    setSafariWindows(prev => prev.filter(w => w.folderName !== folderName));
  };

  const handleSaveNote = () => {
    saveNote();
    setIsPopupOpen(true);
  };

  const showRestoreButton = !finderOpen || !noteOpen || !snakeOpen || !tetrisOpen;

  // Menu items per mobile
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

  const handleMobileMenuClick = (pageName) => {
    if (pageName === 'Maps') {
      openGoogleMaps(true);
    } else {
      openSafariWindow(pageName, true);
    }
    setMobileMenuOpen(false);
  };

  // Render della pagina fullscreen
  const renderFullscreenPage = () => {
    switch (fullscreenPage) {
      case 'chi-siamo':
        return <ChiSiamoPage />;
      case 'contatti':
        return <ContattiPage />;
      case 'servizi':
        return <ServiziPage />;
      case 'work':
        return <WorkPage />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full min-h-screen" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Background */}
      {bgVideo ? (
        <video
          key={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 -z-10 w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      ) : (
        <div 
          className="fixed inset-0 -z-10"
          style={{ 
            backgroundColor: bgImage ? 'transparent' : bgColor,
            backgroundImage: bgImage ? `url(${bgImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top Bar - Desktop e Mobile */}
      <TopBar 
        bgColor={bgColor}
        bgImage={bgImage}
        bgVideo={bgVideo}
        previewImage={previewImage}
        onColorChange={handleColorChange}
        onImageChange={handleImageChange}
        onVideoChange={changeVideo}
        isLight={isLight}
        colors={colors}
        isImageBackground={isImageBackground}
        isVideoBackground={isVideoBackground}
        onNavigate={navigateToFullscreen}
        currentPage={fullscreenPage}
        onRestoreDesktop={closeFullscreen}
        showRestore={!!fullscreenPage || showRestoreButton}
        isFinderLight={isFinderLight}
      />



      {/* Copyright Text - desktop */}
      <div className="hidden lg:block">
        <CopyrightText colors={colors} />
      </div>

      {/* PAGINA FULLSCREEN */}
      <AnimatePresence>
        {fullscreenPage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ 
              marginLeft: '80px',
              marginRight: '80px',
              marginTop: '80px',
              marginBottom: '0px'
            }}
          >
            {/* Contenuto pagina */}
            <div className="bg-white min-h-screen">
              {renderFullscreenPage()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layout Desktop - nascosto quando fullscreen */}
      {!fullscreenPage && (
        <div className="hidden lg:block absolute inset-0 pt-24 pb-8 px-8">
          <AnimatePresence>
            {finderOpen && (
              <FinderWindow 
                colors={colors} 
                isFinderLight={isFinderLight}
                onClose={() => setFinderOpen(false)}
                onMaximize={() => {}}
                zIndex={getZIndex('finder')}
                onFocus={() => bringToFront('finder')}
                onFolderClick={openSafariWindow}
                onOpenMaps={openGoogleMaps}
              />
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {noteOpen && (
              <NoteWindow 
                content={content}
                title={title}
                onContentChange={updateContent}
                onTitleChange={updateTitle}
                onSave={handleSaveNote}
                colors={colors}
                onClose={() => setNoteOpen(false)}
                zIndex={getZIndex('note')}
                onFocus={() => bringToFront('note')}
              />
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {snakeOpen && (
              <SnakeWindow 
                colors={colors}
                onClose={() => setSnakeOpen(false)}
                zIndex={getZIndex('snake')}
                onFocus={() => bringToFront('snake')}
                isActive={isWindowActive('snake')}
              />
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {tetrisOpen && (
              <TetrisWindow 
                colors={colors}
                onClose={() => setTetrisOpen(false)}
                zIndex={getZIndex('tetris')}
                onFocus={() => bringToFront('tetris')}
                isActive={isWindowActive('tetris')}
              />
            )}
          </AnimatePresence>
          
          {/* Finestre Safari */}
          {safariWindows.map((window) => (
            <AnimatePresence key={window.id}>
              <SafariWindow 
                colors={colors}
                isFinderLight={isFinderLight}
                onClose={() => closeSafariWindow(window.folderName)}
                zIndex={getZIndex(`safari-${window.folderName}`)}
                onFocus={() => bringToFront(`safari-${window.folderName}`)}
                title={window.title}
                content={window.content}
                url={window.url}
                folderName={window.folderName}
                onNavigate={(newFolder) => navigateSafariWindow(window.id, newFolder)}
                isGoogleSearch={window.isGoogleSearch || false}
                isGoogleMaps={window.isGoogleMaps || false}
              />
            </AnimatePresence>
          ))}

          {/* Tasto ripristina finestre rimosso - ora usiamo la navigazione laterale */}
        </div>
      )}

      {/* Layout Mobile - Come prima con finestre in colonna */}
      {!fullscreenPage && (
        <div className="lg:hidden pt-20 px-4 pb-60 space-y-4">
          {/* Finder */}
          <FinderWindow 
            colors={colors} 
            isFinderLight={isFinderLight}
            isMobileLayout={true}
            onFolderClick={openSafariWindow}
            onOpenMaps={openGoogleMaps}
          />
          
          {/* Note */}
          <NoteWindow 
            content={content}
            title={title}
            onContentChange={updateContent}
            onTitleChange={updateTitle}
            onSave={handleSaveNote}
            colors={colors}
            isMobileLayout={true}
          />
          
          {/* Snake */}
          <SnakeWindow 
            colors={colors}
            isMobileLayout={true}
            isActive={true}
          />
          
          {/* Tetris */}
          <TetrisWindow 
            colors={colors}
            isMobileLayout={true}
            isActive={true}
          />
          
          {/* Pagina aperta da cartella (sotto) */}
          {mobilePageOpen && mobilePageData && (
            <MobileSafariFullscreen 
              data={mobilePageData}
              colors={colors}
              isFinderLight={isFinderLight}
              onClose={() => setMobilePageOpen(false)}
              onNavigate={navigateSafariWindow}
            />
          )}
          
          {/* Footer Mobile - orizzontale in fondo */}
          <CopyrightText colors={colors} isMobile={true} />
        </div>
      )}

      {/* Burger Menu Fluttuante Mobile - Z-INDEX ALTO */}
      <div className="lg:hidden" style={{ zIndex: 9999 }}>
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
          style={{ zIndex: 9999, backgroundColor: isFinderLight ? '#3b82f6' : '#1e293b', color: '#ffffff' }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed bottom-36 right-4 w-64 max-h-[60vh] overflow-y-auto rounded-2xl shadow-2xl p-4"
              style={{ 
                zIndex: 9998,
                backgroundColor: isFinderLight ? 'rgba(255,255,255,0.95)' : 'rgba(30,41,59,0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3 
                className="text-xs font-semibold uppercase tracking-wider mb-3 px-2"
                style={{ color: isFinderLight ? '#71717a' : '#9ca3af' }}
              >
                Preferiti
              </h3>
              <div className="space-y-1 mb-4">
                {menuItems.filter(i => i.section === 'Preferiti').map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleMobileMenuClick(item.name)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      color: isFinderLight ? '#1f2937' : '#f3f4f6',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isFinderLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <h3 
                className="text-xs font-semibold uppercase tracking-wider mb-3 px-2"
                style={{ color: isFinderLight ? '#71717a' : '#9ca3af' }}
              >
                Servizi
              </h3>
              <div className="space-y-1">
                {menuItems.filter(i => i.section === 'Servizi').map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleMobileMenuClick(item.name)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      color: isFinderLight ? '#1f2937' : '#f3f4f6',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isFinderLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Email Popup */}
      <EmailPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        noteContent={content}
      />
    </div>
  );
}

export default App;
