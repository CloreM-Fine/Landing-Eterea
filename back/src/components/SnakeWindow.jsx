import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Play } from 'lucide-react';

// DIMENSIONI E POSIZIONE INIZIALE SNAKE
const INITIAL_WIDTH = 420;
const INITIAL_HEIGHT = 520;
const SNAKE_X = 1250;
const SNAKE_Y = 300;

// MARGINI DI SICUREZZA
const EDGE_LIMIT = 5;
const TOP_EDGE_LIMIT = 80;

// Hook per rilevare se è mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
}

const GRID_SIZE = 20;
const CELL_SIZE = 18;
const INITIAL_SPEED = 150;

export function SnakeWindow({ colors, onClose, zIndex = 40, onFocus, isMobileLayout = false, isActive = true }) {
  const isMobileDevice = useIsMobile();
  const isMobile = isMobileLayout || isMobileDevice;
  
  const [size, setSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [position, setPosition] = useState({ x: SNAKE_X, y: SNAKE_Y });
  const [prevSize, setPrevSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [prevPosition, setPrevPosition] = useState({ x: SNAKE_X, y: SNAKE_Y });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Game state
  const [gameState, setGameState] = useState('idle'); // idle, playing, gameOver
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('snakeHighScore')) || 0;
    }
    return 0;
  });

  const gameStateRef = useRef(gameState);
  const directionRef = useRef(direction);
  const nextDirectionRef = useRef(nextDirection);
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const gameLoopRef = useRef(null);
  const speedRef = useRef(INITIAL_SPEED);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { directionRef.current = direction; }, [direction]);
  useEffect(() => { nextDirectionRef.current = nextDirection; }, [nextDirection]);
  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { foodRef.current = food; }, [food]);

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    snakeRef.current = initialSnake;
    setFood(generateFood(initialSnake));
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setNextDirection({ x: 1, y: 0 });
    nextDirectionRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameState('playing');
    gameStateRef.current = 'playing';
    speedRef.current = INITIAL_SPEED;
    
    if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    gameLoop();
  }, [generateFood]);

  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    const currentSnake = snakeRef.current;
    const currentNextDir = nextDirectionRef.current;
    
    setDirection(currentNextDir);
    directionRef.current = currentNextDir;
    
    const head = currentSnake[0];
    const newHead = {
      x: head.x + currentNextDir.x,
      y: head.y + currentNextDir.y,
    };

    if (
      newHead.x < 0 || newHead.x >= GRID_SIZE ||
      newHead.y < 0 || newHead.y >= GRID_SIZE ||
      currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setGameState('gameOver');
      gameStateRef.current = 'gameOver';
      const currentScore = currentSnake.length - 1;
      if (currentScore > highScore) {
        setHighScore(currentScore);
        localStorage.setItem('snakeHighScore', currentScore);
      }
      return;
    }

    const newSnake = [newHead, ...currentSnake];
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      const newFood = generateFood(newSnake);
      setFood(newFood);
      foodRef.current = newFood;
      speedRef.current = Math.max(50, INITIAL_SPEED - (newSnake.length - 1) * 2);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    snakeRef.current = newSnake;
    setScore(newSnake.length - 1);

    gameLoopRef.current = setTimeout(gameLoop, speedRef.current);
  }, [food, generateFood, highScore]);

  const resetGame = () => {
    if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    setGameState('idle');
    gameStateRef.current = 'idle';
    setSnake([{ x: 10, y: 10 }]);
    snakeRef.current = [{ x: 10, y: 10 }];
    setDirection({ x: 0, y: 0 });
    directionRef.current = { x: 0, y: 0 };
    setNextDirection({ x: 0, y: 0 });
    nextDirectionRef.current = { x: 0, y: 0 };
    setScore(0);
    setFood({ x: 15, y: 15 });
  };

  // Chiudi finestra
  const handleClose = () => {
    if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
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

  const isInteractiveElement = (target) => {
    const interactiveTags = ['BUTTON', 'INPUT', 'TEXTAREA', 'A', 'SELECT'];
    if (interactiveTags.includes(target.tagName)) return true;
    if (target.closest('button') || target.closest('input') || target.closest('textarea')) return true;
    return false;
  };

  // Solo su desktop abilita drag e resize
  const handleMouseDown = useCallback((e) => {
    if (isMobile) return;
    if (onFocus) onFocus();
    
    if (e.target.closest('.resize-handle')) {
      e.preventDefault();
      setIsResizing(true);
      setResizeStart({ x: e.clientX, y: e.clientY, width: size.width, height: size.height });
      return;
    }
    
    if (isInteractiveElement(e.target)) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position, size, isMobile, onFocus]);

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = Math.max(EDGE_LIMIT, Math.min(window.innerWidth - size.width - EDGE_LIMIT, e.clientX - dragStart.x));
        const newY = Math.max(TOP_EDGE_LIMIT, Math.min(window.innerHeight - size.height - EDGE_LIMIT, e.clientY - dragStart.y));
        setPosition({ x: newX, y: newY });
      }
      
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(350, resizeStart.width + deltaX);
        const newHeight = Math.max(450, resizeStart.height + deltaY);
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
  }, [isDragging, isResizing, dragStart, resizeStart, position, size, isMobile]);

  // Keyboard controls - SOLO FRECCE per Snake (solo quando in focus)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Non rispondere se non è in focus
      if (!isActive) return;
      
      // Non rispondere se il focus è su un input/textarea/contenteditable
      const activeElement = document.activeElement;
      if (activeElement) {
        const tagName = activeElement.tagName.toLowerCase();
        const isInput = tagName === 'input' || tagName === 'textarea';
        const isContentEditable = activeElement.contentEditable === 'true';
        if (isInput || isContentEditable) return;
      }
      
      if (gameStateRef.current === 'idle') {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
          startGame();
        }
        return;
      }
      
      if (gameStateRef.current === 'gameOver') {
        if (e.key === ' ') {
          e.preventDefault();
          resetGame();
        }
        return;
      }
      
      if (gameStateRef.current !== 'playing') return;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (directionRef.current.y === 0) {
            setNextDirection({ x: 0, y: -1 });
            nextDirectionRef.current = { x: 0, y: -1 };
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (directionRef.current.y === 0) {
            setNextDirection({ x: 0, y: 1 });
            nextDirectionRef.current = { x: 0, y: 1 };
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (directionRef.current.x === 0) {
            setNextDirection({ x: -1, y: 0 });
            nextDirectionRef.current = { x: -1, y: 0 };
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (directionRef.current.x === 0) {
            setNextDirection({ x: 1, y: 0 });
            nextDirectionRef.current = { x: 1, y: 0 };
          }
          break;
        default: return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [startGame, isActive]);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    };
  }, []);

  // Stili responsive
  const windowStyle = isMobile ? {
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '400px',
    left: 'auto',
    top: 'auto'
  } : {
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
      className="flex flex-col rounded-xl overflow-hidden shadow-2xl snake-window"
      style={{ ...windowStyle, zIndex }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        width: isMobile ? '100%' : size.width,
        height: isMobile ? 'auto' : size.height,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b select-none" 
        style={{ backgroundColor: colors.noteHeaderBg, borderColor: colors.noteBorder, height: '50px' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
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
          <span className="font-semibold text-sm select-none" style={{ color: colors.noteText }}>
            Snake
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={resetGame}
            className="p-1.5 rounded hover:bg-black/10 transition-colors"
            style={{ color: colors.noteText }}
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={startGame}
            className="p-1.5 rounded hover:bg-black/10 transition-colors"
            style={{ color: colors.noteText }}
            title="Ricomincia"
          >
            <Play className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 ml-2">
            <Trophy className="w-4 h-4" style={{ color: colors.noteText }} />
            <span className="text-sm font-medium" style={{ color: colors.noteText }}>{highScore}</span>
          </div>
        </div>
      </div>

      {/* Legenda controlli */}
      <div className="px-3 py-2 text-xs text-center border-b select-none" 
        style={{ backgroundColor: colors.noteBg, borderColor: colors.noteBorder, color: colors.notePlaceholder }}>
        Usa le FRECCE per muovere
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-3" style={{ backgroundColor: colors.noteBg }}>
        <div className="flex items-center justify-between w-full max-w-[360px] mb-2">
          <span className="text-2xl font-bold" style={{ color: colors.noteText }}>{score}</span>
          <span className="text-sm" style={{ color: colors.notePlaceholder }}>
            {gameState === 'playing' ? 'Playing...' : gameState === 'gameOver' ? 'Game Over!' : 'Premi una freccia'}
          </span>
        </div>

        <div className="relative rounded-lg overflow-hidden border-2" 
          style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE, borderColor: colors.noteBorder }}>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)` }}>
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isSnake = snake.some(s => s.x === x && s.y === y);
              const isFood = food.x === x && food.y === y;
              const isHead = snake[0]?.x === x && snake[0]?.y === y;
              
              return (
                <div
                  key={i}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: isHead ? '#4ade80' : isSnake ? '#22c55e' : isFood ? '#ef4444' : '#000',
                    border: '1px solid rgba(40,40,40,0.3)',
                    borderRadius: isFood ? '50%' : '2px',
                    boxShadow: isHead ? '0 0 8px #4ade80' : isFood ? '0 0 8px #ef4444' : 'none',
                  }}
                />
              );
            })}
          </div>

          {gameState === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#e8e8ed' }}>Snake</h2>
              <p className="text-sm mb-4" style={{ color: '#888' }}>Premi una freccia per iniziare</p>
            </div>
          )}

          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
              <h2 className="text-3xl font-bold text-red-500 mb-2">Game Over</h2>
              <p className="text-xl text-white mb-1">Score: {score}</p>
              {score === highScore && score > 0 && (
                <p className="text-yellow-400 text-sm mb-3">Nuovo Record!</p>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Resize handle */}
      {!isMobile && (
        <div
          className="resize-handle absolute bottom-0 right-0 w-5 h-5 z-30"
          style={{ cursor: 'se-resize' }}
          onMouseDown={handleMouseDown}
          title="Ridimensiona"
        />
      )}
    </motion.div>
  );
}
