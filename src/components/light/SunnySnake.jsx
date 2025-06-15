import React, { useState, useEffect } from 'react';

const SunnySnake = ({ onBack }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const GRID_SIZE = 20;

  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: 1 });
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  const changeDirection = (newDirection) => {
    if (!gameStarted || gameOver) return;
    
    const { x, y } = newDirection;
    // Prevent moving in opposite direction
    if ((x === 1 && direction.x === -1) || 
        (x === -1 && direction.x === 1) ||
        (y === 1 && direction.y === -1) || 
        (y === -1 && direction.y === 1)) {
      return;
    }
    setDirection(newDirection);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake(currentSnake => {
        const newSnake = [...currentSnake];
        const head = { 
          x: newSnake[0].x + direction.x, 
          y: newSnake[0].y + direction.y 
        };

        // Check boundaries
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, food, gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, gameOver]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Floating elements for cottagecore atmosphere */}
      <div className="absolute top-10 left-10 text-4xl md:text-6xl opacity-20 animate-pulse">🌿</div>
      <div className="absolute top-20 right-20 text-3xl md:text-4xl opacity-30 animate-bounce">🐝</div>
      <div className="absolute bottom-20 left-20 text-4xl md:text-5xl opacity-25 animate-pulse">🌸</div>
      <div className="absolute bottom-10 right-10 text-3xl md:text-4xl opacity-20 animate-bounce">🍄</div>
      <div className="absolute top-1/3 left-1/4 text-2xl md:text-3xl opacity-15 animate-pulse">✨</div>
      <div className="absolute bottom-1/3 right-1/4 text-2xl md:text-3xl opacity-15 animate-pulse">🌻</div>
      <div className="absolute top-1/2 left-10 text-2xl md:text-3xl opacity-20 animate-pulse">🌺</div>
      
      <div className="bg-gradient-to-br from-cream-100 to-stone-100 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-2 md:border-4 border-amber-200 p-6 md:p-12 max-w-4xl w-full relative backdrop-blur-sm bg-opacity-90">
        {/* Decorative corners */}
        <div className="absolute top-2 md:top-4 left-2 md:left-4 text-lg md:text-2xl">🌾</div>
        <div className="absolute top-2 md:top-4 right-2 md:right-4 text-lg md:text-2xl">🌾</div>
        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 text-lg md:text-2xl">🌾</div>
        <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 text-lg md:text-2xl">🌾</div>
        
        <div className="text-center mb-6 md:mb-8">
          <div className="text-4xl md:text-6xl mb-4 animate-bounce">🐍</div>
          
          <div className="flex justify-center gap-3 md:gap-6 mb-4">
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-amber-200 shadow-sm">
              <span className="text-amber-700 font-light flex items-center gap-2">
                <span className="text-base md:text-lg">🍯</span>
                <span className="text-sm md:text-base">Honey: {score}</span>
              </span>
            </div>
            {gameOver && (
              <div className="bg-gradient-to-r from-rose-100 to-pink-100 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-rose-200 shadow-sm animate-pulse">
                <span className="text-rose-700 font-light flex items-center gap-2 text-sm md:text-base">
                  Rest & Try Again
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl md:rounded-3xl p-3 md:p-6 mb-4 md:mb-8 border-2 md:border-3 border-amber-200 shadow-inner relative overflow-hidden">
          {/* Garden background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-2 text-sm md:text-lg">🌱</div>
            <div className="absolute top-2 right-2 text-sm md:text-lg">🌱</div>
            <div className="absolute bottom-2 left-2 text-sm md:text-lg">🌱</div>
            <div className="absolute bottom-2 right-2 text-sm md:text-lg">🌱</div>
          </div>
          
          <div className="grid grid-cols-20 gap-0 border border-gray-200 max-w-xs sm:max-w-md md:max-w-lg mx-auto relative">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;
              const isHead = snake[0] && snake[0].x === x && snake[0].y === y;

              return (
                <div
                  key={index}
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
                    isSnake 
                      ? isHead 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-sm animate-pulse'
                        : 'bg-gradient-to-br from-green-300 to-green-400 rounded-lg shadow-sm'
                      : isFood 
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full shadow-lg animate-bounce'
                        : 'bg-gradient-to-br from-green-50 to-yellow-50 border-green-100 border opacity-30'
                  }`}
                >
                  {isFood && (
                    <div className="w-full h-full flex items-center justify-center text-xs">🍯</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Touch Controls */}
        <div className="md:hidden mb-6">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => changeDirection({ x: 0, y: -1 })}
              className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-full border-2 border-green-200 shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center text-2xl"
            >
              ⬆
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => changeDirection({ x: -1, y: 0 })}
                className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-full border-2 border-green-200 shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center text-2xl"
              >
                ⬅
              </button>
              <button
                onClick={() => changeDirection({ x: 1, y: 0 })}
                className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-full border-2 border-green-200 shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center text-2xl"
              >
                ➡
              </button>
            </div>
            <button
              onClick={() => changeDirection({ x: 0, y: 1 })}
              className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-full border-2 border-green-200 shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center text-2xl"
            >
              ⬇
            </button>
          </div>
        </div>

        {/* Desktop instruction text (hidden on mobile) */}
        {!gameStarted && (
          <div className="text-center mb-6 hidden md:block">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200 mb-4">
              <p className="text-amber-700 text-lg font-light mb-3">🎮 Ready for a peaceful garden adventure?</p>
              <p className="text-amber-600 font-light">Use arrow keys to guide your gentle serpent friend!</p>
            </div>
          </div>
        )}

        {/* Mobile instruction text */}
        {!gameStarted && (
          <div className="text-center mb-6 md:hidden">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 border-2 border-amber-200 mb-4">
              <p className="text-amber-700 font-light mb-2">🎮 Garden Adventure</p>
              <p className="text-amber-600 font-light text-sm">Tap the arrows to guide your serpent!</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="text-center mb-6 hidden md:block">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200">
              <p className="text-rose-700 text-lg font-light">AYY Good scoree, You collected {score} drops</p>
              {/* <p className="text-rose-600 font-light mt-2">Every garden adventure is a lovely memory!</p> */}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-3 md:gap-6">
          <button
            onClick={resetGame}
            className="px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 rounded-full border-2 border-amber-200 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl relative group"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-base md:text-lg group-hover:animate-spin">
                {gameStarted ? '' : '🌱'}
              </span>
              <span className="text-amber-800 font-light text-sm md:text-base">
                {gameStarted ? 'New Adventure' : 'Begin Journey'}
              </span>
            </div>
          </button>
          
          <button
            onClick={onBack}
            className="px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-stone-200 to-amber-200 hover:from-stone-300 hover:to-amber-300 rounded-full border-2 border-stone-300 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl relative group"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-base md:text-lg group-hover:animate-pulse">🏠</span>
              <span className="text-stone-700 font-light text-sm md:text-base hidden sm:inline"></span>
            </div>
          </button>
        </div>
        
        {/* Bottom decorative border */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 md:gap-2">
          <span className="text-sm md:text-lg opacity-30">🌸</span>
          <span className="text-sm md:text-lg opacity-30">🌿</span>
          <span className="text-sm md:text-lg opacity-30">🌻</span>
          <span className="text-sm md:text-lg opacity-30">🍄</span>
          <span className="text-sm md:text-lg opacity-30">🌸</span>
        </div>
      </div>
    </div>
  );
};

export default SunnySnake;