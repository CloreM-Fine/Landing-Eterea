import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'eterea-note-content';
const STORAGE_TITLE_KEY = 'eterea-note-title';

export function useNote() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Nuova nota');
  const [lastSaved, setLastSaved] = useState(null);
  
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedTitle = localStorage.getItem(STORAGE_TITLE_KEY);
    if (saved) {
      setContent(saved);
      setLastSaved(new Date());
    }
    if (savedTitle) {
      setTitle(savedTitle);
    }
  }, []);
  
  // Auto-save to localStorage when content changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (content !== '') {
        localStorage.setItem(STORAGE_KEY, content);
        localStorage.setItem(STORAGE_TITLE_KEY, title);
        setLastSaved(new Date());
      }
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [content, title]);
  
  const updateContent = useCallback((newContent) => {
    setContent(newContent);
  }, []);
  
  const updateTitle = useCallback((newTitle) => {
    setTitle(newTitle);
  }, []);
  
  const saveNote = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, content);
    localStorage.setItem(STORAGE_TITLE_KEY, title);
    setLastSaved(new Date());
    return content;
  }, [content, title]);
  
  const clearNote = useCallback(() => {
    setContent('');
    setTitle('Nuova nota');
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_TITLE_KEY);
    setLastSaved(null);
  }, []);
  
  return {
    content,
    title,
    lastSaved,
    updateContent,
    updateTitle,
    saveNote,
    clearNote,
  };
}
