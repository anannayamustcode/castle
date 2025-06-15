import React, { useState, useEffect, useCallback } from 'react';

const CottageCoreMinesweeper = ({ onBack }) => {
  const [board, setBoard] = useState([]);
  const [gameState, setGameState] = useState('ready'); // 'ready', 'playing', 'won', 'lost'
  const [flagCount, setFlagCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [firstClick, setFirstClick] = useState(true);

  const difficulties = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 }
  };

  const currentDiff = difficulties[difficulty];

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // Create empty board
  const createEmptyBoard = useCallback(() => {
    const newBoard = [];
    for (let row = 0; row < currentDiff.rows; row++) {
      const boardRow = [];
      for (let col = 0; col < currentDiff.cols; col++) {
        boardRow.push({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0
        });
      }
      newBoard.push(boardRow);
    }
    return newBoard;
  }, [currentDiff.rows, currentDiff.cols]);

  // Place mines on board
  const placeMines = useCallback((board, avoidRow, avoidCol) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell, isMine: false })));
    let minesPlaced = 0;
    
    while (minesPlaced < currentDiff.mines) {
      const row = Math.floor(Math.random() * currentDiff.rows);
      const col = Math.floor(Math.random() * currentDiff.cols);
      
      // Don't place mine on first click position or if already has mine
      if ((row === avoidRow && col === avoidCol) || newBoard[row][col].isMine) {
        continue;
      }
      
      newBoard[row][col].isMine = true;
      minesPlaced++;
    }
    
    return newBoard;
  }, [currentDiff.mines, currentDiff.rows, currentDiff.cols]);

  // Calculate neighbor counts
  const calculateNeighbors = useCallback((board) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    
    for (let row = 0; row < currentDiff.rows; row++) {
      for (let col = 0; col < currentDiff.cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          
          // Check all 8 neighbors
          for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (r >= 0 && r < currentDiff.rows && 
                  c >= 0 && c < currentDiff.cols && 
                  newBoard[r][c].isMine) {
                count++;
              }
            }
          }
          
          newBoard[row][col].neighborMines = count;
        }
      }
    }
    
    return newBoard;
  }, [currentDiff.rows, currentDiff.cols]);

  // Flood fill for empty cells
  const revealEmptyCells = useCallback((board, startRow, startCol) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const queue = [[startRow, startCol]];
    const visited = new Set();
    
    while (queue.length > 0) {
      const [row, col] = queue.shift();
      const key = `${row}-${col}`;
      
      if (visited.has(key) || 
          row < 0 || row >= currentDiff.rows || 
          col < 0 || col >= currentDiff.cols ||
          newBoard[row][col].isFlagged ||
          newBoard[row][col].isMine) {
        continue;
      }
      
      visited.add(key);
      newBoard[row][col].isRevealed = true;
      
      // If this cell has no neighboring mines, reveal all neighbors
      if (newBoard[row][col].neighborMines === 0) {
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r !== row || c !== col) {
              queue.push([r, c]);
            }
          }
        }
      }
    }
    
    return newBoard;
  }, [currentDiff.rows, currentDiff.cols]);

  // Check win condition
  const checkWinCondition = useCallback((board) => {
    let revealedCount = 0;
    let totalCells = currentDiff.rows * currentDiff.cols;
    
    for (let row = 0; row < currentDiff.rows; row++) {
      for (let col = 0; col < currentDiff.cols; col++) {
        if (board[row][col].isRevealed) {
          revealedCount++;
        }
      }
    }
    
    return revealedCount === totalCells - currentDiff.mines;
  }, [currentDiff.rows, currentDiff.cols, currentDiff.mines]);

  // Reveal all mines (for game over)
  const revealAllMines = useCallback((board) => {
    return board.map(row => 
      row.map(cell => ({
        ...cell,
        isRevealed: cell.isRevealed || cell.isMine
      }))
    );
  }, []);

  // Handle cell click
  const handleCellClick = useCallback((row, col) => {
    if (gameState === 'won' || gameState === 'lost') return;
    if (board[row][col].isRevealed || board[row][col].isFlagged) return;

    let newBoard;

    // First click - initialize board with mines
    if (firstClick) {
      newBoard = placeMines(board, row, col);
      newBoard = calculateNeighbors(newBoard);
      setFirstClick(false);
      setGameState('playing');
    } else {
      newBoard = board.map(row => row.map(cell => ({ ...cell })));
    }

    // Check if clicked on mine
    if (newBoard[row][col].isMine) {
      newBoard = revealAllMines(newBoard);
      setBoard(newBoard);
      setGameState('lost');
      return;
    }

    // Reveal cell(s)
    if (newBoard[row][col].neighborMines === 0) {
      newBoard = revealEmptyCells(newBoard, row, col);
    } else {
      newBoard[row][col].isRevealed = true;
    }

    setBoard(newBoard);

    // Check win condition
    if (checkWinCondition(newBoard)) {
      setGameState('won');
    }
  }, [board, gameState, firstClick, placeMines, calculateNeighbors, revealEmptyCells, revealAllMines, checkWinCondition]);

  // Handle right click (flag)
  const handleRightClick = useCallback((e, row, col) => {
    e.preventDefault();
    if (gameState === 'won' || gameState === 'lost') return;
    if (board[row][col].isRevealed) return;

    const newBoard = board.map(r => 
      r.map(cell => ({ ...cell }))
    );
    
    const wasFlag = newBoard[row][col].isFlagged;
    newBoard[row][col].isFlagged = !wasFlag;
    
    setBoard(newBoard);
    setFlagCount(prev => wasFlag ? prev - 1 : prev + 1);
  }, [board, gameState]);

  // Start new game
  const startNewGame = useCallback(() => {
    const emptyBoard = createEmptyBoard();
    setBoard(emptyBoard);
    setGameState('ready');
    setFlagCount(0);
    setTimeElapsed(0);
    setFirstClick(true);
  }, [createEmptyBoard]);

  // Initialize on mount and difficulty change
  useEffect(() => {
    startNewGame();
  }, [startNewGame, difficulty]);

  // Get cell display content
  const getCellContent = (cell) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    if (cell.neighborMines === 0) return '';
    return cell.neighborMines.toString();
  };

  // Get cell styling
  const getCellStyle = (cell) => {
    if (cell.isFlagged) {
      return 'bg-gradient-to-br from-red-100 to-pink-200 border-red-300';
    }
    if (!cell.isRevealed) {
      return 'bg-gradient-to-br from-amber-100 to-yellow-200 border-amber-300 hover:from-amber-200 hover:to-yellow-300 cursor-pointer';
    }
    if (cell.isMine) {
      return 'bg-gradient-to-br from-red-200 to-red-300 border-red-400';
    }
    return 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200';
  };

  // Get number color
  const getNumberColor = (num) => {
    const colors = {
      '1': 'text-blue-600',
      '2': 'text-green-600', 
      '3': 'text-red-600',
      '4': 'text-purple-600',
      '5': 'text-yellow-600',
      '6': 'text-pink-600',
      '7': 'text-black',
      '8': 'text-gray-600'
    };
    return colors[num] || 'text-gray-600';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (board.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating cottagecore elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-pulse">🌻</div>
      <div className="absolute top-20 right-20 text-4xl opacity-30 animate-bounce">🐝</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-25 animate-pulse">🌸</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-bounce">🍄</div>
      <div className="absolute top-1/3 left-1/4 text-3xl opacity-15 animate-pulse">✨</div>
      <div className="absolute bottom-1/3 right-1/4 text-3xl opacity-15 animate-pulse">🌿</div>

      <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-[2rem] shadow-2xl border-4 border-amber-200 p-6 max-w-6xl w-full text-center relative backdrop-blur-sm bg-opacity-90">
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-2xl">🌾</div>
        <div className="absolute top-4 right-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 left-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 right-4 text-2xl">🌾</div>

        <div className="text-center mb-4">
          <div className="text-5xl mb-3 animate-bounce">🕳️</div>
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Garden Minesweeper</h2>
          {/* <p className="text-amber-600 mb-3 text-sm">Clear the garden without disturbing the sleeping creatures!</p> */}
        </div>

        {/* Game Stats */}
        <div className="flex justify-center items-center gap-4 mb-4 flex-wrap text-sm">
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 px-3 py-1 rounded-full text-amber-700 border-2 border-amber-200 font-semibold shadow-sm">
            🚩 {flagCount}/{currentDiff.mines}
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-sky-100 px-3 py-1 rounded-full text-blue-700 border-2 border-blue-200 font-semibold shadow-sm">
            ⏰ {formatTime(timeElapsed)}
          </div>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full text-green-700 border-2 border-green-200 font-semibold shadow-sm text-sm"
          >
            <option value="easy">🌱 Easy</option>
            <option value="medium">🌿 Medium</option>
            <option value="hard">🌳 Hard</option>
          </select>
        </div>

        {/* Game Status Messages */}
        {gameState === 'won' && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-3 border-2 border-green-200 mb-4">
            <div className="text-3xl mb-1">🌻</div>
            <p className="text-green-700 font-semibold">Garden cleared! All creatures are safe!</p>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-3 border-1 border-rose-200 mb-5">
            <p className="text-rose-700 font-semibold">Oh no! You have lost!</p>
          </div>
        )}

        {/* Game Board */}
        <div className="flex justify-center mb-4 overflow-x-auto">
          <div 
            className="grid gap-0.5 p-3 bg-gradient-to-br from-stone-200 to-amber-200 rounded-xl border-2 border-stone-300 shadow-inner"
            style={{ 
              gridTemplateColumns: `repeat(${currentDiff.cols}, 1fr)`,
              maxWidth: '90vw'
            }}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-6 h-6 text-xs font-bold border border-solid rounded transition-all duration-100 hover:scale-105 flex items-center justify-center ${getCellStyle(cell)} ${
                    cell.isRevealed || gameState === 'won' || gameState === 'lost' ? '' : 'active:scale-95'
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                  disabled={gameState === 'won' || gameState === 'lost'}
                >
                  <span className={getNumberColor(getCellContent(cell))}>
                    {getCellContent(cell)}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs text-amber-600 mb-4 max-w-md mx-auto">
          Left click to reveal • Right click to flag • Clear all safe spots to win!
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={startNewGame}
            className="px-6 py-3 bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 rounded-full text-amber-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-amber-200 font-semibold"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🌱</span>
              <span>New Garden</span>
            </div>
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-stone-100 to-amber-100 hover:from-stone-200 hover:to-amber-200 rounded-full text-amber-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-stone-200 font-semibold"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🏠</span>
            </div>
          </button>
        </div>

        {/* Bottom decorative border */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 mb-[-10px]">
          <span className="text-lg opacity-30">🌸</span>
          <span className="text-lg opacity-30">🌿</span>
          <span className="text-lg opacity-30">🌻</span>
          <span className="text-lg opacity-30">🍄</span>
          <span className="text-lg opacity-30">🌸</span>
        </div>
      </div>
    </div>
  );
};

export default CottageCoreMinesweeper;