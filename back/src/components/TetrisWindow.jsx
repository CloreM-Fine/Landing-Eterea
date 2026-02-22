import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Play } from 'lucide-react';

// DIMENSIONI E POSIZIONE INIZIALE TETRIS
const INITIAL_WIDTH = 380;
const INITIAL_HEIGHT = 580;
const TETRIS_X = 50;
const TETRIS_Y = 250;

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

const BOARD_WIDTH = 15;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 22;

const COLORS = {
  I: '#00f0f0', O: '#f0f000', T: '#a000f0',
  S: '#00f000', Z: '#f00000', J: '#0000f0', L: '#f0a000'
};

const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
};

export function TetrisWindow({ colors, onClose, zIndex = 40, onFocus, isMobileLayout = false, isActive = true }) {
  const isMobileDevice = useIsMobile();
  const isMobile = isMobileLayout || isMobileDevice;
  
  const [size, setSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [position, setPosition] = useState({ x: TETRIS_X, y: TETRIS_Y });
  const [prevSize, setPrevSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });
  const [prevPosition, setPrevPosition] = useState({ x: TETRIS_X, y: TETRIS_Y });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Game state
  const [gameState, setGameState] = useState('idle'); // idle, playing, paused, gameOver
  const [board, setBoard] = useState(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('tetrisHighScore')) || 0;
    }
    return 0;
  });
  const [lines, setLines] = useState(0);

  const boardRef = useRef(board);
  const currentPieceRef = useRef(currentPiece);
  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(score);
  const linesRef = useRef(lines);
  const dropIntervalRef = useRef(null);
  const dropSpeedRef = useRef(1000);

  useEffect(() => { boardRef.current = board; }, [board]);
  useEffect(() => { currentPieceRef.current = currentPiece; }, [currentPiece]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { linesRef.current = lines; }, [lines]);

  const getRandomPiece = () => {
    const pieces = Object.keys(SHAPES);
    const type = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      type,
      shape: SHAPES[type],
      x: Math.floor((BOARD_WIDTH - SHAPES[type][0].length) / 2),
      y: 0,
      color: COLORS[type],
    };
  };

  const startGame = useCallback(() => {
    const newBoard = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
    const firstPiece = getRandomPiece();
    
    setBoard(newBoard);
    boardRef.current = newBoard;
    setCurrentPiece(firstPiece);
    currentPieceRef.current = firstPiece;
    setScore(0);
    scoreRef.current = 0;
    setLines(0);
    linesRef.current = 0;
    setGameState('playing');
    gameStateRef.current = 'playing';
    dropSpeedRef.current = 700;
    
    startDropInterval();
  }, []);

  const startDropInterval = () => {
    if (dropIntervalRef.current) clearInterval(dropIntervalRef.current);
    dropIntervalRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing') {
        moveDown();
      }
    }, dropSpeedRef.current);
  };

  const stopDropInterval = () => {
    if (dropIntervalRef.current) {
      clearInterval(dropIntervalRef.current);
      dropIntervalRef.current = null;
    }
  };

  const isValidMove = (piece, newX, newY, newShape = null) => {
    const shape = newShape || piece.shape;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) return false;
          if (boardY >= 0 && boardRef.current[boardY][boardX]) return false;
        }
      }
    }
    return true;
  };

  const lockPiece = () => {
    const newBoard = boardRef.current.map(row => [...row]);
    const piece = currentPieceRef.current;
    
    piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0) newBoard[boardY][boardX] = piece.color;
        }
      });
    });

    const linesCleared = clearLines(newBoard);
    if (linesCleared > 0) {
      const newLines = linesRef.current + linesCleared;
      const newScore = scoreRef.current + linesCleared * 100 * linesCleared;
      setLines(newLines);
      linesRef.current = newLines;
      setScore(newScore);
      scoreRef.current = newScore;
      dropSpeedRef.current = Math.max(100, 700 - Math.floor(newLines / 10) * 70);
      startDropInterval();
    }

    setBoard(newBoard);
    boardRef.current = newBoard;

    const newPiece = getRandomPiece();
    setCurrentPiece(newPiece);
    currentPieceRef.current = newPiece;

    if (!isValidMove(newPiece, newPiece.x, newPiece.y)) {
      setGameState('gameOver');
      gameStateRef.current = 'gameOver';
      stopDropInterval();
      if (scoreRef.current > highScore) {
        setHighScore(scoreRef.current);
        localStorage.setItem('tetrisHighScore', scoreRef.current);
      }
    }
  };

  const clearLines = (board) => {
    let linesCleared = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (board[y].every(cell => cell !== 0)) {
        board.splice(y, 1);
        board.unshift(Array(BOARD_WIDTH).fill(0));
        linesCleared++;
        y++;
      }
    }
    return linesCleared;
  };

  const moveLeft = () => {
    if (gameStateRef.current !== 'playing' || !currentPieceRef.current) return;
    if (isValidMove(currentPieceRef.current, currentPieceRef.current.x - 1, currentPieceRef.current.y)) {
      const newPiece = { ...currentPieceRef.current, x: currentPieceRef.current.x - 1 };
      setCurrentPiece(newPiece);
      currentPieceRef.current = newPiece;
    }
  };

  const moveRight = () => {
    if (gameStateRef.current !== 'playing' || !currentPieceRef.current) return;
    if (isValidMove(currentPieceRef.current, currentPieceRef.current.x + 1, currentPieceRef.current.y)) {
      const newPiece = { ...currentPieceRef.current, x: currentPieceRef.current.x + 1 };
      setCurrentPiece(newPiece);
      currentPieceRef.current = newPiece;
    }
  };

  const moveDown = () => {
    if (gameStateRef.current !== 'playing' || !currentPieceRef.current) return;
    if (isValidMove(currentPieceRef.current, currentPieceRef.current.x, currentPieceRef.current.y + 1)) {
      const newPiece = { ...currentPieceRef.current, y: currentPieceRef.current.y + 1 };
      setCurrentPiece(newPiece);
      currentPieceRef.current = newPiece;
    } else {
      lockPiece();
    }
  };

  const hardDrop = () => {
    if (gameStateRef.current !== 'playing' || !currentPieceRef.current) return;
    let dropY = currentPieceRef.current.y;
    while (isValidMove(currentPieceRef.current, currentPieceRef.current.x, dropY + 1)) {
      dropY++;
    }
    const newPiece = { ...currentPieceRef.current, y: dropY };
    setCurrentPiece(newPiece);
    currentPieceRef.current = newPiece;
    lockPiece();
  };

  const rotate = () => {
    if (gameStateRef.current !== 'playing' || !currentPieceRef.current) return;
    const piece = currentPieceRef.current;
    const rotated = piece.shape[0].map((_, i) => piece.shape.map(row => row[i]).reverse());
    
    let newX = piece.x;
    if (!isValidMove(piece, newX, piece.y, rotated)) {
      if (isValidMove(piece, newX - 1, piece.y, rotated)) newX -= 1;
      else if (isValidMove(piece, newX + 1, piece.y, rotated)) newX += 1;
      else return;
    }
    
    const newPiece = { ...piece, shape: rotated, x: newX };
    setCurrentPiece(newPiece);
    currentPieceRef.current = newPiece;
  };

  const resetGame = () => {
    stopDropInterval();
    setGameState('idle');
    gameStateRef.current = 'idle';
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
    boardRef.current = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
    setCurrentPiece(null);
    currentPieceRef.current = null;
    setScore(0);
    scoreRef.current = 0;
    setLines(0);
    linesRef.current = 0;
  };

  // Chiudi finestra
  const handleClose = () => {
    stopDropInterval();
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
        const newHeight = Math.max(500, resizeStart.height + deltaY);
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

  // Keyboard controls - SOLO WASD per Tetris (solo quando in focus)
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
      
      // Solo WASD e Enter per Tetris
      const validKeys = ['w', 'W', 'a', 'A', 's', 'S', 'd', 'D', 'Enter', ' '];
      if (!validKeys.includes(e.key)) return;
      
      if (gameStateRef.current === 'idle') {
        if (['w', 'W', 'a', 'A', 's', 'S', 'd', 'D', 'Enter', ' '].includes(e.key)) {
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
        case 'a': case 'A':
          e.preventDefault();
          moveLeft();
          break;
        case 'd': case 'D':
          e.preventDefault();
          moveRight();
          break;
        case 's': case 'S':
          e.preventDefault();
          moveDown();
          break;
        case 'w': case 'W':
          e.preventDefault();
          rotate();
          break;
        case 'Enter':
          e.preventDefault();
          hardDrop();
          break;
        default: return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [startGame, isActive]);

  useEffect(() => {
    return () => stopDropInterval();
  }, []);

  const renderBoard = () => {
    const display = board.map(row => [...row]);
    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = currentPiece.y + y;
            const boardX = currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              display[boardY][boardX] = currentPiece.color;
            }
          }
        });
      });
    }
    return display;
  };

  const boardWidth = BOARD_WIDTH * CELL_SIZE;
  const boardHeight = BOARD_HEIGHT * CELL_SIZE;

  // Stili responsive
  const windowStyle = isMobile ? {
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '500px',
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
      className="flex flex-col rounded-xl overflow-hidden shadow-2xl tetris-window"
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
            Tetris
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
        WASD per muovere/ruotare • ENTER per piazzare
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-3" style={{ backgroundColor: colors.noteBg }}>
        <div className="flex items-center justify-between w-full max-w-[260px] mb-2">
          <span className="text-2xl font-bold" style={{ color: colors.noteText }}>{score}</span>
          <span className="text-sm" style={{ color: colors.notePlaceholder }}>
            {gameState === 'playing' ? 'Playing...' : gameState === 'gameOver' ? 'Game Over!' : 'Premi WASD'}
          </span>
        </div>

        <div className="relative rounded-lg overflow-hidden border-2" 
          style={{ width: boardWidth, height: boardHeight, borderColor: colors.noteBorder }}>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE}px)` }}>
            {renderBoard().map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${y}-${x}`}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: cell || '#000',
                    border: cell ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(40,40,40,0.5)',
                    boxShadow: cell ? 'inset 0 0 4px rgba(255,255,255,0.2)' : 'none',
                  }}
                />
              ))
            )}
          </div>

          {gameState === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#e8e8ed' }}>Tetris</h2>
              <p className="text-sm mb-4" style={{ color: '#888' }}>Premi WASD per iniziare</p>
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
