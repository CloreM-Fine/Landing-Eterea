import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ColorPicker } from './ColorPicker';
import { ImageBackgroundPicker } from './ImageBackgroundPicker';
import { VideoBackgroundPicker } from './VideoBackgroundPicker';
import { Menu, X } from 'lucide-react';

export function TopBar({ 
  bgColor, 
  bgImage, 
  bgVideo,
  previewImage, 
  onColorChange, 
  onImageChange, 
  onVideoChange,
  isLight, 
  colors, 
  isImageBackground,
  isVideoBackground,
  onNavigate,
  currentPage,
  onRestoreDesktop,
  showRestore,
  isFinderLight
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'chi-siamo', label: 'CHI SIAMO' },
    { id: 'contatti', label: 'CONTATTI' },
    { id: 'servizi', label: 'SERVIZI' },
    { id: 'work', label: 'WORK' },
  ];

  const handleNavClick = (itemId) => {
    onNavigate(itemId);
    setMenuOpen(false);
  };

  return (
    <div className="fixed top-8 left-8 right-8 flex items-center justify-between z-50 pointer-events-none">
      {/* Logo Section + Cerchi + Menu */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <h1 
          className="font-bold text-3xl tracking-tight"
          style={{ color: colors.logo }}
        >
          ETEREA
        </h1>
        
        {/* Container cerchi + menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative z-10">
            <ColorPicker 
              bgColor={bgColor}
              onColorChange={onColorChange}
              isLight={isLight}
            />
          </div>
          <div className="relative z-10">
            <ImageBackgroundPicker 
              previewImage={previewImage}
              bgImage={bgImage}
              onImageChange={onImageChange}
              isLight={isLight}
            />
          </div>
          <div className="relative z-10">
            <VideoBackgroundPicker 
              bgVideo={bgVideo}
              onVideoChange={onVideoChange}
              isLight={isLight}
            />
          </div>
          
          {/* Nuovo cerchio menu */}
          <div className="relative">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center
                transition-all duration-300
                ${menuOpen
                  ? isLight
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-white'
                  : isLight
                    ? 'bg-transparent text-black border-black hover:bg-black hover:text-white'
                    : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                }
              `}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={14} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={14} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Pulsanti che escono dal cerchio - EQUIDISTANTI */}
            <AnimatePresence>
              {menuOpen && (
                <>
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ 
                        opacity: 0, 
                        x: 0,
                        scale: 0.5
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 100 + (index * 100),
                        scale: 1
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: 0,
                        scale: 0.5
                      }}
                      transition={{ 
                        duration: 0.4,
                        delay: index * 0.08,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        absolute top-0 left-0 whitespace-nowrap
                        px-4 py-2 rounded-full border text-xs font-black uppercase tracking-wider
                        transition-colors duration-200
                        ${isLight
                          ? currentPage === item.id
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black hover:bg-black hover:text-white'
                          : currentPage === item.id
                            ? 'bg-white text-black border-white'
                            : 'bg-black text-white border-white hover:bg-white hover:text-black'
                        }
                      `}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Email + Ripristina Scrivania */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {showRestore && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={onRestoreDesktop}
            className={`
              px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-colors
              ${isLight
                ? 'bg-black text-white border-black hover:bg-white hover:text-black'
                : 'bg-white text-black border-white hover:bg-black hover:text-white'
              }
            `}
          >
            ← Ripristina Scrivania
          </motion.button>
        )}
        <a 
          href="mailto:info@etereastudio.com"
          className="text-xs sm:text-sm hover:opacity-80 transition-opacity"
          style={{ color: colors.email }}
        >
          info@etereastudio.com
        </a>
      </div>
    </div>
  );
}
