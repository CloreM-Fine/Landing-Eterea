import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, List, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

// DIMENSIONI E POSIZIONE INIZIALE NOTE
// Modifica questi valori per cambiare posizione e dimensioni
const INITIAL_WIDTH = 420;      // Larghezza iniziale
const INITIAL_HEIGHT = 450;     // Altezza iniziale
const NOTE_X = 1130;            // Posizione X (da sinistra)
const NOTE_Y = 100;             // Posizione Y (dall'alto)

// MARGINI DI SICUREZZA - Modifica questi per controllare i limiti di spostamento
const EDGE_LIMIT = 5;          // Margine laterale e inferiore
const TOP_EDGE_LIMIT = 80;     // Margine SUPERIORE specifico (più spazio per la Top Bar)

export function NoteWindow({ content, title, onContentChange, onTitleChange, onSave, colors, onClose, zIndex = 40, onFocus }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  const [size, setSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [position, setPosition] = useState({ x: NOTE_X, y: NOTE_Y });
  const [prevSize, setPrevSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [prevPosition, setPrevPosition] = useState({ x: NOTE_X, y: NOTE_Y });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const textareaRef = useRef(null);
  
  // Chiudi finestra
  const handleClose = () => {
    if (onClose) onClose();
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
  
  const currentDate = new Date();
  const formattedDate = format(currentDate, "d MMMM yyyy 'alle ore' HH:mm", { locale: it });

  const isInteractiveElement = (target) => {
    const interactiveTags = ['BUTTON', 'INPUT', 'TEXTAREA', 'A', 'SELECT'];
    if (interactiveTags.includes(target.tagName)) return true;
    if (target.closest('button') || target.closest('input') || target.closest('textarea')) return true;
    return false;
  };

  // Drag e resize
  const handleMouseDown = useCallback((e) => {
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
        const newWidth = Math.max(300, Math.min(500, resizeStart.width + deltaX));
        const newHeight = Math.max(400, Math.min(700, resizeStart.height + deltaY));
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

  const toggleCase = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    if (selectedText) {
      const isAllUpperCase = selectedText === selectedText.toUpperCase();
      const newText = isAllUpperCase ? selectedText.toLowerCase() : selectedText.toUpperCase();
      const newContent = content.substring(0, start) + newText + content.substring(end);
      onContentChange(newContent);
      setTimeout(() => {
        textarea.setSelectionRange(start, start + newText.length);
        textarea.focus();
      }, 0);
    }
  };

  const addBulletList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    if (selectedText) {
      const lines = selectedText.split('\n');
      const bulletedLines = lines.map(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('• ')) return trimmedLine.substring(2);
        else if (trimmedLine) return '• ' + trimmedLine;
        return line;
      });
      const newText = bulletedLines.join('\n');
      const newContent = content.substring(0, start) + newText + content.substring(end);
      onContentChange(newContent);
      setTimeout(() => {
        textarea.setSelectionRange(start, start + newText.length);
        textarea.focus();
      }, 0);
    } else {
      const newContent = content.substring(0, start) + '• ' + content.substring(end);
      onContentChange(newContent);
      setTimeout(() => {
        textarea.setSelectionRange(start + 2, start + 2);
        textarea.focus();
      }, 0);
    }
  };

  // Stili desktop
  const windowStyle = {
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
      {/* Header */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b" style={{ backgroundColor: colors.noteHeaderBg, borderColor: colors.noteBorder, height: '50px' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-2 select-none">
            <button 
              onClick={handleClose}
              className="traffic-light traffic-light-red hover:brightness-110 transition-all cursor-pointer"
              title="Chiudi"
            />
            <div className="traffic-light traffic-light-yellow" title="Minimizza" />
            <button 
              onClick={handleMaximize}
              className="traffic-light traffic-light-green hover:brightness-110 transition-all cursor-pointer"
              title="Massimizza"
            />
          </div>
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTitle(false); }}
              className="font-semibold text-sm bg-transparent border-none outline-none px-0 w-32"
              style={{ color: colors.noteText }}
              autoFocus
            />
          ) : (
            <span 
              className="font-semibold text-sm cursor-pointer hover:opacity-70 transition-opacity select-none"
              style={{ color: colors.noteText }}
              onClick={() => setIsEditingTitle(true)}
            >
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button onClick={toggleCase} className="p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.noteText }} title="Maiuscolo/Minuscolo"><Type size={16} /></button>
          <button onClick={addBulletList} className="p-1.5 rounded hover:bg-black/10 transition-colors" style={{ color: colors.noteText }} title="Elenco puntato"><List size={16} /></button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-3 md:p-4" style={{ backgroundColor: colors.noteBg }}>
        <p className="text-xs mb-3 text-center select-none" style={{ color: colors.notePlaceholder }}>{formattedDate}</p>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Scrivi qui..."
          className="flex-1 w-full resize-none border-none outline-none text-sm leading-relaxed"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            backgroundColor: 'transparent',
            color: colors.noteText,
            overflow: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
        />
        <div className="flex justify-end mt-4">
          <motion.button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-full hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#007aff' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save size={14} />
            Salva
          </motion.button>
        </div>
      </div>

      {/* Resize handle invisibile - cursore macOS */}
      <div
        className="resize-handle absolute bottom-0 right-0 w-5 h-5 z-30"
        style={{ cursor: 'se-resize' }}
        onMouseDown={handleMouseDown}
        title="Ridimensiona"
      />
    </motion.div>
  );
}
