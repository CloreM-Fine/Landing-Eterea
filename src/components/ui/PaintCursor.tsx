import { useEffect, useRef, useState } from 'react';

export function PaintCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const pointsRef = useRef<Array<{ x: number; y: number; size: number; life: number }>>([]);

  useEffect(() => {
    // Check if mobile
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

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x || e.clientX;
      mouseRef.current.prevY = mouseRef.current.y || e.clientY;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Add points along the path for smoother trail
      const distance = Math.hypot(
        mouseRef.current.x - mouseRef.current.prevX,
        mouseRef.current.y - mouseRef.current.prevY
      );
      const steps = Math.max(1, Math.floor(distance / 2)); // More points for smoother trail

      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        pointsRef.current.push({
          x: mouseRef.current.prevX + (mouseRef.current.x - mouseRef.current.prevX) * t,
          y: mouseRef.current.prevY + (mouseRef.current.y - mouseRef.current.prevY) * t,
          size: Math.random() * 20 + 50, // Random size between 50-70
          life: 1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      pointsRef.current = pointsRef.current.filter((point) => {
        point.life -= 0.005; // Fade speed - slower for longer trail

        if (point.life <= 0) return false;

        // Draw soft circle
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size * point.life
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${point.life * 0.6})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${point.life * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * point.life, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

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
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        mixBlendMode: 'difference',
      }}
    />
  );
}
