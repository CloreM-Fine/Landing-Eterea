import { useState, useEffect, useCallback } from 'react';

// Calculate luminance of a hex color
function getLuminance(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const toLinear = (c) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  
  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return luminance;
}

// Array immagini
const unsplashImages = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80',
  'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1920&q=80',
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80',
];

export function useTheme() {
  const [bgColor, setBgColor] = useState('#151e26');
  const [bgImage, setBgImage] = useState(null);
  const [bgVideo, setBgVideo] = useState(null);
  const [previewImage, setPreviewImage] = useState(() => 
    unsplashImages[Math.floor(Math.random() * unsplashImages.length)]
  );
  
  // Se c'è un video o un'immagine, forza dark mode. Altrimenti calcola dal colore.
  const isLight = (bgVideo || bgImage) ? false : getLuminance(bgColor) > 0.5;
  
  // Apply background to body
  useEffect(() => {
    if (bgImage) {
      document.body.style.backgroundColor = '#000000';
      document.body.style.backgroundImage = `url(${bgImage})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    } else {
      document.body.style.backgroundColor = bgColor;
      document.body.style.backgroundImage = 'none';
    }
  }, [bgColor, bgImage]);
  
  const changeColor = useCallback((color) => {
    setBgImage(null);
    setBgColor(color);
  }, []);
  
  const changeImage = useCallback(() => {
    // Resetta il video quando cambia immagine
    setBgVideo(null);
    // Applica l'immagine di preview
    setBgImage(previewImage);
    // Scegli una nuova preview diversa
    let newPreview;
    do {
      newPreview = unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
    } while (newPreview === previewImage && unsplashImages.length > 1);
    setPreviewImage(newPreview);
  }, [previewImage]);
  
  const changeVideo = useCallback((videoUrl) => {
    setBgVideo(videoUrl);
    // Non toccare bgImage - sono indipendenti
    // La dark mode è gestita automaticamente da isLight
  }, []);
  
  // Finder usa sempre i colori del tema: beige chiaro per sidebar, scuro per contenuto
  const primaryColor = '#151e26';
  const secondaryColor = '#f5f5dc';
  
  // Colors for adaptive UI - coerenti con il tema
  const colors = {
    logo: isLight ? '#151e26' : '#ffffff',
    email: isLight ? '#151e26' : '#ffffff',
    copyright: isLight ? 'rgba(21, 30, 38, 0.4)' : 'rgba(255, 255, 255, 0.4)',
    // Sidebar: beige chiaro
    sidebarBg: secondaryColor,
    sidebarText: primaryColor,
    sidebarHeader: `${primaryColor}99`, // 60% opacity
    sidebarHover: `${primaryColor}10`, // 10% opacity
    // Finder main: beige
    finderBg: secondaryColor,
    finderText: primaryColor,
    finderHeaderBg: secondaryColor,
    finderBorder: `${primaryColor}20`, // 20% opacity
    folderLabel: primaryColor,
    folderSubtext: `${primaryColor}80`, // 50% opacity
    // Note: stessi colori
    noteBg: secondaryColor,
    noteText: primaryColor,
    noteHeaderBg: secondaryColor,
    noteBorder: `${primaryColor}20`,
    notePlaceholder: `${primaryColor}60`,
  };
  
  return {
    bgColor,
    bgImage,
    bgVideo,
    previewImage,
    isLight,
    changeColor,
    changeImage,
    changeVideo,
    colors,
    isFinderLight,
    isImageBackground: !!bgImage,
    isVideoBackground: !!bgVideo,
  };
}
