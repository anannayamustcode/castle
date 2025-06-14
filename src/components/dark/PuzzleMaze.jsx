import React, { useState, useEffect, useCallback } from 'react';

const PuzzleMaze = ({ gameState, setGameState, transitionToRoom }) => {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [ghostPositions, setGhostPositions] = useState([
    { x: 5, y: 3 }, { x: 9, y: 7 }, { x: 11, y: 11 }
  ]);
  const [floatingElements, setFloatingElements] = useState([]);
  
  // Whimsical maze with eerie touches
  const maze = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,1,1,1,0,1,1,1,0,1,1,0],
    [0,1,0,0,0,0,1,0,1,0,0,0,1,2,0], // 🌙
    [0,1,1,1,1,0,1,1,1,0,1,1,1,0,0],
    [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0], // 🔮
    [0,1,1,1,1,0,1,0,1,1,1,0,1,1,0],
    [0,0,0,0,1,0,1,0,1,0,1,0,0,1,0],
    [0,1,1,1,1,0,1,1,1,0,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,2,0], // 🕯️
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,0,0,0,0,0,0,1,0,0,2,0], // ⭐
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,3,0,0,0,0,0,0,0]
  ];

  const puzzlePieces = [
    { id: 1, shape: '🌙', clue: "", pos: { x: 13, y: 2 } },
    { id: 2, shape: '🔮', clue: "", pos: { x: 1, y: 6 } },
    { id: 3, shape: '🕯️', clue: "", pos: { x: 13, y: 10 } },
    { id: 4, shape: '⭐', clue: "", pos: { x: 13, y: 12 } }
  ];

  const [collectedPieces, setCollectedPieces] = useState(gameState.puzzlePieces || []);
  const [magicParticles, setMagicParticles] = useState([]);

  // Create floating magical elements
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingElements(prev => [
        ...prev.slice(-8), // Keep only last 8 elements
        {
          id: Date.now(),
          emoji: ['🛸','🪄', '👾', '🍄', '🍥', '🕸️'][Math.floor(Math.random() * 6)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: 3 + Math.random() * 2
        }
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Move ghosts randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setGhostPositions(prev => prev.map(ghost => {
        const moves = [
          { x: ghost.x + 1, y: ghost.y },
          { x: ghost.x - 1, y: ghost.y },
          { x: ghost.x, y: ghost.y + 1 },
          { x: ghost.x, y: ghost.y - 1 }
        ].filter(pos => 
          pos.x > 0 && pos.x < 14 && pos.y > 0 && pos.y < 14 && 
          maze[pos.y][pos.x] !== 0
        );
        
        return moves.length > 0 ? moves[Math.floor(Math.random() * moves.length)] : ghost;
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const movePlayer = useCallback((dx, dy) => {
    setPlayerPos(prev => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;
      
      if (newX < 0 || newX >= maze[0].length || newY < 0 || newY >= maze.length) {
        return prev;
      }
      
      if (maze[newY][newX] === 0) {
        return prev;
      }
      
      // Check puzzle piece collection
      const piece = puzzlePieces.find(p => p.pos.x === newX && p.pos.y === newY);
      if (piece && !collectedPieces.includes(piece.id)) {
        setCollectedPieces(current => [...current, piece.id]);
        setGameState(prev => ({
          ...prev,
          puzzlePieces: [...(prev.puzzlePieces || []), piece.id]
        }));
        
        // Create magic particles
        setMagicParticles(prev => [
          ...prev,
          ...Array.from({ length: 6 }, (_, i) => ({
            id: Date.now() + i,
            x: newX * 32 + 16,
            y: newY * 32 + 16,
            emoji: ['✨', '🌟', '💫'][Math.floor(Math.random() * 3)]
          }))
        ]);
        
        setTimeout(() => {
          setMagicParticles(prev => prev.slice(6));
        }, 1000);
      }
      
      return { x: newX, y: newY };
    });
  }, [maze, puzzlePieces, collectedPieces, setGameState]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  const getCellContent = (x, y) => {
    // Player
    if (playerPos.x === x && playerPos.y === y) {
      return '🧙‍♂️';
    }
    
    // Ghosts
    const ghost = ghostPositions.find(g => g.x === x && g.y === y);
    if (ghost) {
      return '🐞';
    }
    
    // Puzzle pieces
    const piece = puzzlePieces.find(p => p.pos.x === x && p.pos.y === y);
    if (piece && !collectedPieces.includes(piece.id)) {
      return piece.shape;
    }
    
    // Exit
    if (maze[y][x] === 3) {
      return collectedPieces.length >= 3 ? '🚪' : '🔐';
    }
    
    // Random decorations in paths
    if (maze[y][x] === 1 && Math.random() < 0.05) {
      return ['🕸️', '🌿', '🦇', '🐛'][Math.floor(Math.random() * 4)];
    }
    
    return '';
  };

  const getCellClass = (x, y) => {
    const baseClass = "w-8 h-8 flex items-center justify-center text-lg transition-all duration-300 relative";
    
    if (maze[y][x] === 0) {
      return `${baseClass} bg-gradient-to-br from-purple-900 to-black border border-purple-700 shadow-inner`; // Walls
    } else if (playerPos.x === x && playerPos.y === y) {
      return `${baseClass} bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-500/50 animate-pulse`; // Player
    } else if (maze[y][x] === 3) {
      return `${baseClass} bg-gradient-to-r from-yellow-400 to-orange-500 ${collectedPieces.length >= 3 ? 'animate-bounce' : 'opacity-30'}`; // Exit
    } else {
      const isGhostHere = ghostPositions.some(g => g.x === x && g.y === y);
      return `${baseClass} bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 ${isGhostHere ? 'animate-pulse bg-red-900' : ''}`; // Path
    }
  };

  const handleCellClick = (x, y) => {
    const dx = x - playerPos.x;
    const dy = y - playerPos.y;
    
    if (Math.abs(dx) + Math.abs(dy) === 1) {
      movePlayer(dx, dy);
    }
  };

  const handleExitClick = () => {
    if (collectedPieces.length >= 3 && playerPos.x === 7 && playerPos.y === 14) {
      transitionToRoom('cryptic-chat');
    }
  };

  return (
<div className="min-h-screen bg-gradient-to-b from-black to-purple-800 p-4 relative overflow-hidden">
      {/* Floating magical elements */}
      {floatingElements.map(element => (
        <div
          key={element.id}
          className="absolute text-2xl pointer-events-none animate-bounce"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDuration: `${element.duration}s`,
            opacity: 0.7
          }}
        >
          {element.emoji}
        </div>
      ))}
      
      {/* Magic particles */}
      {magicParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-xl pointer-events-none animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {particle.emoji}
        </div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-white text-4xl text-center mb-6 font-mono animate-pulse">
        Your typical maze
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Maze */}
          <div className="flex-1">
            <div className="inline-block bg-black/50 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-purple-500/30">
              {maze.map((row, y) => (
                <div key={y} className="flex">
                  {row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className={getCellClass(x, y)}
                      onClick={() => handleCellClick(x, y)}
                      style={{
                        cursor: Math.abs(x - playerPos.x) + Math.abs(y - playerPos.y) === 1 ? 'pointer' : 'default'
                      }}
                    >
                      {getCellContent(x, y)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
             {playerPos.x === 7 && playerPos.y === 14 && collectedPieces.length >= 3 && (
                <button
                  onClick={handleExitClick}
                  className="px-9 py-3 bg-gradient-to-r from-purple-500 to-black hover:from-purple-600 hover:to-black text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce font-bold"
                >
                Enter the Portal 
                </button>
              )}
            </div>
          </div>
          
          {/* Mystical Inventory */}
          <div className="lg:w-80">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 shadow-2xl">
              <h2 className="text-purple-200 text-xl mb-4 font-mono flex items-center gap-2">
                🔮 Mystical Findings
              </h2>
              <div className="space-y-3">
                {puzzlePieces.map((piece) => (
                  <div
                    key={piece.id}
                    className={`
                      p-4 rounded-xl transition-all duration-500 border-2
                      ${collectedPieces.includes(piece.id) 
                        ? 'bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-green-400/50 shadow-green-500/20 shadow-lg animate-pulse' 
                        : 'bg-gray-800/50 border-gray-600/30 opacity-60'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl animate-bounce">{piece.shape}</span>
                      <div>
                        <p className="text-white text-sm font-bold">
                          {collectedPieces.includes(piece.id) ? ' ' : '❓ Hidden'}
                        </p>
                        {collectedPieces.includes(piece.id) && (
                          <p className="text-green-200 text-xs mt-1 italic font-mono">"{piece.clue}"</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-900/30 rounded-xl border border-purple-400/30">
                <p className="text-purple-200 text-sm font-mono flex items-center gap-2">
                 {collectedPieces.length}/4 mysteries
                </p>
                <div className="w-full bg-gray-700/50 rounded-full h-3 mt-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-700 shadow-lg"
                    style={{ width: `${(collectedPieces.length / 4) * 100}%` }}
                  ></div>
                </div>
                {collectedPieces.length >= 3 && (
                  <p className="text-green-300 text-xs mt-2 animate-pulse font-bold">
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleMaze;