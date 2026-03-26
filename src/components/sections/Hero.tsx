import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Logo } from '../ui/Logo';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Blob configuration - positioned around the screen
  const floatingBlobs = [
    { color: '#A8D0E6', size: 400, x: '-5%', y: '10%', duration: 20 },
    { color: '#B5C7A6', size: 350, x: '75%', y: '60%', duration: 25 },
    { color: '#C5B9CD', size: 300, x: '85%', y: '5%', duration: 22 },
    { color: '#F4C2A1', size: 380, x: '5%', y: '70%', duration: 18 },
    { color: '#E8E4A0', size: 320, x: '50%', y: '40%', duration: 24 },
    { color: '#A8D0E6', size: 250, x: '30%', y: '85%', duration: 26 },
  ];

  const titleWords = ['Dove', 'l\'essenziale', 'prende', 'forma'];

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-eterea-cream"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingBlobs.map((blob, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.x,
              top: blob.y,
              backgroundColor: blob.color,
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.5,
              willChange: 'transform',
            }}
            animate={{
              x: [0, 80, -60, 40, -20, 0],
              y: [0, -100, 60, -80, 40, 0],
              scale: [1, 1.2, 0.9, 1.1, 0.95, 1],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: 'linear',
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          />
        ))}
        
        {/* Additional gradient overlay for smoothness */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(245,241,232,0.4) 100%)',
          }}
        />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(45,49,66,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45,49,66,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20"
        style={{ y, opacity, scale }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 text-eterea-peach" />
            <span className="text-sm font-medium text-eterea-gray">
              Design & Sviluppo Digitale
            </span>
          </motion.div>

          {/* Main Logo Animation */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          >
            <div className="hidden sm:block">
              <Logo size="xl" animated={true} />
            </div>
            <div className="sm:hidden">
              <Logo size="lg" animated={true} />
            </div>
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-eterea-dark mb-6 perspective-1000"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    className="inline-block"
                    variants={letterVariants}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-eterea-gray max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Trasformiamo idee in esperienze digitali uniche. 
            <br className="hidden sm:block" />
            Design che emoziona, tecnologia che stupisce.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.a
              href="#servizi"
              className="group relative px-8 py-4 bg-eterea-dark text-white rounded-full font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('servizi')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Scopri i servizi
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-eterea-blue via-eterea-lilac to-eterea-peach"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>

            <motion.a
              href="#lavori"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-eterea-dark rounded-full font-medium border border-eterea-dark/10 hover:border-eterea-dark/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('lavori')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Guarda i lavori
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-eterea-gray cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => document.getElementById('servizi')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scorri</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full border-2 border-eterea-blue/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full border-2 border-eterea-peach/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
    </section>
  );
}
