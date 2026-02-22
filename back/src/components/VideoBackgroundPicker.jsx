import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// VIDEO BRITISH - URL da Pexels (testati e funzionanti)
const VIDEOS = [
  {
    id: 1,
    // London Streets - Pexels
    url: 'public/videos/1.mp4',
  },
  {
    id: 2,
    // Big Ben / Parliament - Pexels
    url: 'public/videos/2.mp4',
  },
  {
    id: 3,
    // British Countryside - Pexels
    url: 'public/videos/3.mp4',
  },
  {
    id: 4,
    // City / Night - Pexels
    url: 'public/videos/4.mp4',
  }
];

export function VideoBackgroundPicker({ 
  bgVideo, 
  onVideoChange, 
  isLight
}) {
  const videoRef = useRef(null);
  // Stato: indice del video attualmente attivo come sfondo
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Calcola il prossimo video da mostrare nel cerchio
  const nextIndex = (activeIndex + 1) % VIDEOS.length;
  const nextVideo = VIDEOS[nextIndex];

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Attiva il prossimo video come sfondo
    const newIndex = (activeIndex + 1) % VIDEOS.length;
    setActiveIndex(newIndex);
    onVideoChange(VIDEOS[newIndex].url);
    
    console.log('🎬 VIDEO SFONDO:', newIndex + 1, '/', VIDEOS.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  return (
    <motion.button
      onClick={handleClick}
      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 cursor-pointer overflow-hidden relative"
      style={{
        backgroundColor: '#0f172a',
        borderColor: isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
    >
      {/* Nel cerchio mostra il PROSSIMO video, non quello attivo */}
      <video
        ref={videoRef}
        src={nextVideo.url}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.button>
  );
}

export { VIDEOS };
