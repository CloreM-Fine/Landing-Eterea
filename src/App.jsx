import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopBar } from './components/TopBar';

// Componente pagina fullscreen con effetto espansione laterale
function FullscreenPage({ fullscreenPage, renderFullscreenPage }) {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  
  // Reset scroll quando cambia pagina
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    setScrollY(0);
  }, [fullscreenPage]);
  
  // Calcola margine in base allo scroll (da 80px a 0px)
  // Inizia a restringere dopo 100px di scroll, completo a 400px
  const calculateMargin = () => {
    const startShrink = 100;
    const endShrink = 400;
    
    if (scrollY <= startShrink) return 80;
    if (scrollY >= endShrink) return 0;
    
    const progress = (scrollY - startShrink) / (endShrink - startShrink);
    return 80 * (1 - progress);
  };
  
  const margin = calculateMargin();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      ref={containerRef}
      onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ 
        marginLeft: `${margin}px`,
        marginRight: `${margin}px`,
        marginTop: '80px',
        marginBottom: '0px',
        transition: 'margin-left 0.1s ease-out, margin-right 0.1s ease-out'
      }}
    >
      <div className="bg-white min-h-screen">
        {renderFullscreenPage()}
      </div>
    </motion.div>
  );
}
import { CopyrightText } from './components/CopyrightText';
import { FinderWindow } from './components/FinderWindow';
import { FinderMediaWindow } from './components/FinderMediaWindow';
import { NoteWindow } from './components/NoteWindow';
import { SnakeWindow } from './components/SnakeWindow';
import { TetrisWindow } from './components/TetrisWindow';
import { SafariWindow } from './components/SafariWindow';

import { ServiziPage } from './pages/ServiziPage';
import { WorkPage } from './pages/WorkPage';
import { ChiSiamoPage } from './pages/ChiSiamoPage';
import { ContattiPage } from './pages/ContattiPage';
import { getFolderContent } from './data/folderContents.jsx';
import { EmailPopup } from './components/EmailPopup';
import { useTheme } from './hooks/useTheme';
import { useNote } from './hooks/useNote';

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
  
  // Finestre Media (Immagini/Video)
  const [mediaWindows, setMediaWindows] = useState([]);
  
  // Pagine fullscreen
  const [fullscreenPage, setFullscreenPage] = useState(null);
  
  // Gestione focus finestre - z-index dinamico
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
  
  const isWindowActive = (windowName) => {
    const maxZ = Math.max(...Object.values(windowZIndices));
    return windowZIndices[windowName] === maxZ;
  };
  
  const navigateToFullscreen = (pageId) => {
    setFinderOpen(false);
    setNoteOpen(false);
    setSnakeOpen(false);
    setTetrisOpen(false);
    setSafariWindows([]);
    setFullscreenPage(pageId);
  };
  
  const closeFullscreen = () => {
    setFullscreenPage(null);
    setFinderOpen(true);
    setNoteOpen(true);
    setSnakeOpen(true);
    setTetrisOpen(true);
  };
  
  const handleColorChange = (color) => {
    changeVideo(null);
    changeColor(color);
  };

  const handleImageChange = () => {
    changeVideo(null);
    changeImage();
  };

  const openSafariWindow = (folderName) => {
    if (fullscreenPage) {
      closeFullscreen();
    }
    
    const existingWindow = safariWindows.find(w => w.folderName === folderName);
    if (existingWindow) {
      bringToFront(`safari-${existingWindow.id}`);
      return;
    }
    
    const newWindowId = Date.now();
    const folderData = getFolderContent(folderName);
    setSafariWindows(prev => [...prev, {
      id: newWindowId,
      folderName,
      ...folderData
    }]);
    bringToFront(`safari-${newWindowId}`);
  };
  
  const navigateSafariWindow = (windowId, folderName) => {
    const folderData = getFolderContent(folderName);
    setSafariWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, folderName, ...folderData, isGoogleSearch: false, isGoogleMaps: false }
        : w
    ));
  };
  
  const openGoogleMaps = () => {
    if (fullscreenPage) {
      closeFullscreen();
    }
    
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
    bringToFront(`safari-${newId}`);
  };
  
  const closeSafariWindow = (folderName) => {
    setSafariWindows(prev => prev.filter(w => w.folderName !== folderName));
  };
  
  const openMediaWindow = (mediaType) => {
    if (fullscreenPage) {
      closeFullscreen();
    }
    
    // Controlla se esiste già una finestra dello stesso tipo
    const existingWindow = mediaWindows.find(w => w.mediaType === mediaType);
    if (existingWindow) {
      bringToFront(`media-${existingWindow.id}`);
      return;
    }
    
    const newWindowId = Date.now();
    setMediaWindows(prev => [...prev, {
      id: newWindowId,
      mediaType: mediaType, // 'Immagini' o 'Video'
      title: mediaType,
    }]);
    bringToFront(`media-${newWindowId}`);
  };
  
  const closeMediaWindow = (id) => {
    setMediaWindows(prev => prev.filter(w => w.id !== id));
  };

  const handleSaveNote = () => {
    saveNote();
    setIsPopupOpen(true);
  };

  const showRestoreButton = !finderOpen || !noteOpen || !snakeOpen || !tetrisOpen;

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

      {/* Top Bar */}
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

      {/* Copyright Text */}
      <CopyrightText colors={colors} />

      {/* PAGINA FULLSCREEN */}
      <AnimatePresence>
        {fullscreenPage && (
          <FullscreenPage 
            key={fullscreenPage}
            fullscreenPage={fullscreenPage}
            renderFullscreenPage={renderFullscreenPage}
          />
        )}
      </AnimatePresence>

      {/* Layout Desktop */}
      {!fullscreenPage && (
        <div className="absolute inset-0 pt-24 pb-8 px-8">
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
                onOpenMedia={openMediaWindow}
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
                zIndex={getZIndex(`safari-${window.id}`)}
                onFocus={() => bringToFront(`safari-${window.id}`)}
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
          
          {/* Finestre Media (Immagini/Video) */}
          {mediaWindows.map((window) => (
            <AnimatePresence key={window.id}>
              <FinderMediaWindow 
                colors={colors}
                isFinderLight={isFinderLight}
                onClose={() => closeMediaWindow(window.id)}
                zIndex={getZIndex(`media-${window.id}`)}
                onFocus={() => bringToFront(`media-${window.id}`)}
                mediaType={window.mediaType}
              />
            </AnimatePresence>
          ))}
        </div>
      )}

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
