import { useEffect, useRef, useState } from 'react';

// Colori palette Eterea per la scia
const etereaColors = [
  '#A8D0E6', // blue
  '#B5C7A6', // sage  
  '#C5B9CD', // lilac
  '#E8E4A0', // lemon
  '#F4C2A1', // peach
];

interface TrailPoint {
  x: number;
  y: number;
  angle: number;
  color: string;
  life: number;
  width: number;
  height: number;
}

export function PaintCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const pointsRef = useRef<TrailPoint[]>([]);
  const colorIndexRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x || e.clientX;
      mouseRef.current.prevY = mouseRef.current.y || e.clientY;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const distance = Math.hypot(
        mouseRef.current.x - mouseRef.current.prevX,
        mouseRef.current.y - mouseRef.current.prevY
      );
      
      // Più punti per scia più fluida
      const steps = Math.max(1, Math.floor(distance / 4));

      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const x = mouseRef.current.prevX + (mouseRef.current.x - mouseRef.current.prevX) * t;
        const y = mouseRef.current.prevY + (mouseRef.current.y - mouseRef.current.prevY) * t;
        
        const angle = Math.atan2(
          mouseRef.current.y - mouseRef.current.prevY,
          mouseRef.current.x - mouseRef.current.prevX
        );

        // Variazione dimensione per effetto pennellata
        const variation = Math.sin(Date.now() * 0.01 + i) * 10;
        
        pointsRef.current.push({
          x,
          y,
          angle,
          color: etereaColors[colorIndexRef.current % etereaColors.length],
          life: 1,
          width: 35 + variation, // larghezza variabile
          height: 60 + variation * 0.5, // lunghezza
        });

        if (i % 8 === 0) {
          colorIndexRef.current++;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Disegna ogni punto come forma con contorno netto
      pointsRef.current = pointsRef.current.filter((point) => {
        point.life -= 0.015;

        if (point.life <= 0) return false;

        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.rotate(point.angle);
        
        // Forma pennellata con contorni netti (no gradiente)
        const w = point.width * point.life;
        const h = point.height * point.life;
        
        ctx.beginPath();
        // Disegna forma organica tipo pennellata
        ctx.ellipse(0, 0, h, w, 0, 0, Math.PI * 2);
        
        // Colore solido brillante (più chiaro)
        ctx.fillStyle = point.color;
        ctx.globalAlpha = point.life; // Massima opacity
        ctx.fill();
        
        // Aggiungi bordo netto più sottile
        ctx.globalAlpha = point.life * 0.8;
        ctx.strokeStyle = point.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
    />
  );
}
