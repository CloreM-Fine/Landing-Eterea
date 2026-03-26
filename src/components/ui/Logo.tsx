import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: { container: 'h-8', letter: 'text-lg', circle: 'w-7 h-7' },
  md: { container: 'h-12', letter: 'text-2xl', circle: 'w-10 h-10' },
  lg: { container: 'h-16', letter: 'text-3xl', circle: 'w-14 h-14' },
  xl: { container: 'h-24', letter: 'text-5xl', circle: 'w-20 h-20' },
};

const letters = [
  { char: 'E', color: '#A8D0E6', delay: 0 },
  { char: 'T', color: '#B5C7A6', delay: 0.1 },
  { char: 'E', color: '#FAF8F3', delay: 0.2 },
  { char: 'R', color: '#C5B9CD', delay: 0.3 },
  { char: 'E', color: '#E8E4A0', delay: 0.4 },
  { char: 'A', color: '#F4C2A1', delay: 0.5 },
];

export function Logo({ className = '', animated = true, size = 'md' }: LogoProps) {
  const sizeClasses = sizes[size];

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    initial: { 
      scale: 0, 
      rotate: -180,
      opacity: 0 
    },
    animate: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.5,
      }
    }
  };

  const Wrapper = animated ? motion.div : 'div';

  return (
    <Wrapper 
      className={`flex items-center gap-1 ${className}`}
      variants={animated ? containerVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
    >
      {letters.map((letter, index) => (
        <motion.div
          key={index}
          className={`relative ${sizeClasses.circle} flex items-center justify-center rounded-full cursor-default`}
          style={{ 
            backgroundColor: letter.color,
            boxShadow: `0 4px 15px ${letter.color}80`,
          }}
          variants={animated ? letterVariants : undefined}
          whileHover={animated ? 'hover' : undefined}
        >
          <span 
            className={`${sizeClasses.letter} font-serif font-bold text-eterea-dark select-none`}
            style={{ 
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {letter.char}
          </span>
        </motion.div>
      ))}
    </Wrapper>
  );
}

export function LogoText({ className = '' }: { className?: string }) {
  return (
    <span className={`font-serif text-2xl font-bold tracking-tight ${className}`}>
      <span className="text-eterea-blue">E</span>
      <span className="text-eterea-sage">T</span>
      <span className="text-eterea-dark">E</span>
      <span className="text-eterea-lilac">R</span>
      <span className="text-eterea-lemon">E</span>
      <span className="text-eterea-peach">A</span>
    </span>
  );
}
