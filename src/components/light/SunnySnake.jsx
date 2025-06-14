// import React, { useState, useEffect } from 'react';

// const SunnySnake = ({ onBack }) => {
//   const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
//   const [food, setFood] = useState({ x: 15, y: 15 });
//   const [direction, setDirection] = useState({ x: 0, y: 1 });
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [gameStarted, setGameStarted] = useState(false);

//   const GRID_SIZE = 20;

//   const generateFood = () => {
//     return {
//       x: Math.floor(Math.random() * GRID_SIZE),
//       y: Math.floor(Math.random() * GRID_SIZE)
//     };
//   };

//   const resetGame = () => {
//     setSnake([{ x: 10, y: 10 }]);
//     setFood(generateFood());
//     setDirection({ x: 0, y: 1 });
//     setGameOver(false);
//     setScore(0);
//     setGameStarted(true);
//   };

//   useEffect(() => {
//     if (!gameStarted || gameOver) return;

//     const moveSnake = () => {
//       setSnake(currentSnake => {
//         const newSnake = [...currentSnake];
//         const head = { 
//           x: newSnake[0].x + direction.x, 
//           y: newSnake[0].y + direction.y 
//         };

//         // Check boundaries
//         if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
//           setGameOver(true);
//           return currentSnake;
//         }

//         // Check self collision
//         if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
//           setGameOver(true);
//           return currentSnake;
//         }

//         newSnake.unshift(head);

//         // Check food collision
//         if (head.x === food.x && head.y === food.y) {
//           setScore(s => s + 1);
//           setFood(generateFood());
//         } else {
//           newSnake.pop();
//         }

//         return newSnake;
//       });
//     };

//     const interval = setInterval(moveSnake, 200);
//     return () => clearInterval(interval);
//   }, [direction, food, gameStarted, gameOver]);

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (!gameStarted || gameOver) return;
      
//       switch (e.key) {
//         case 'ArrowUp':
//           if (direction.y !== 1) setDirection({ x: 0, y: -1 });
//           break;
//         case 'ArrowDown':
//           if (direction.y !== -1) setDirection({ x: 0, y: 1 });
//           break;
//         case 'ArrowLeft':
//           if (direction.x !== 1) setDirection({ x: -1, y: 0 });
//           break;
//         case 'ArrowRight':
//           if (direction.x !== -1) setDirection({ x: 1, y: 0 });
//           break;
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [direction, gameStarted, gameOver]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-3xl shadow-lg p-8">
//           <div className="text-center mb-6">
//             <h2 className="text-3xl font-bold text-orange-800 mb-2">🐍 Sunny Snake</h2>
//             <p className="text-orange-600">Collect the golden fruits!</p>
//             <div className="mt-4">
//               <span className="bg-yellow-100 px-4 py-2 rounded-full text-orange-700">Score: {score}</span>
//             </div>
//           </div>

//           <div className="bg-yellow-50 rounded-2xl p-4 mb-6 border-2 border-yellow-200">
//             <div className="grid grid-cols-20 gap-0 max-w-md mx-auto">
//               {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
//                 const x = index % GRID_SIZE;
//                 const y = Math.floor(index / GRID_SIZE);
//                 const isSnake = snake.some(segment => segment.x === x && segment.y === y);
//                 const isFood = food.x === x && food.y === y;
//                 const isHead = snake[0] && snake[0].x === x && snake[0].y === y;

//                 return (
//                   <div
//                     key={index}
//                     className={`w-3 h-3 border border-yellow-100 ${
//                       isSnake 
//                         ? isHead 
//                           ? 'bg-orange-400 rounded-full'
//                           : 'bg-orange-300 rounded-sm'
//                         : isFood 
//                           ? 'bg-yellow-400 rounded-full'
//                           : 'bg-yellow-50'
//                     }`}
//                   />
//                 );
//               })}
//             </div>
//           </div>

//           {!gameStarted && (
//             <div className="text-center mb-4">
//               <p className="text-orange-600 mb-4">Use arrow keys to control your snake!</p>
//             </div>
//           )}

//           {gameOver && (
//             <div className="text-center mb-4">
//               <p className="text-red-600 text-lg font-semibold">Game Over! Final Score: {score}</p>
//             </div>
//           )}

//           <div className="flex justify-center gap-4">
//             <button
//               onClick={resetGame}
//               className="px-6 py-3 bg-yellow-200 hover:bg-yellow-300 rounded-full text-orange-800 transition-colors"
//             >
//               {gameStarted ? '🔄 New Game' : '🎮 Start Game'}
//             </button>
//             <button
//               onClick={onBack}
//               className="px-6 py-3 bg-orange-200 hover:bg-orange-300 rounded-full text-orange-800 transition-colors"
//             >
//               ← Back to Games
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SunnySnake;

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Floating elements for cottagecore atmosphere */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-pulse">🌿</div>
      <div className="absolute top-20 right-20 text-4xl opacity-30 animate-bounce">🦋</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-25 animate-pulse">🌸</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-bounce">🍄</div>
      <div className="absolute top-1/3 left-1/4 text-3xl opacity-15 animate-pulse">✨</div>
      <div className="absolute bottom-1/3 right-1/4 text-3xl opacity-15 animate-pulse">🌻</div>
      <div className="absolute top-1/2 left-10 text-3xl opacity-20 animate-pulse">🌺</div>
      <div className="absolute top-40 right-40 text-2xl opacity-25 animate-bounce">🐝</div>
      
      <div className="bg-gradient-to-br from-cream-100 to-stone-100 rounded-[2rem] shadow-2xl border-4 border-amber-200 p-12 max-w-4xl w-full relative backdrop-blur-sm bg-opacity-90">
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-2xl">🌾</div>
        <div className="absolute top-4 right-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 left-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 right-4 text-2xl">🌾</div>
        
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🐍</div>
          {/* <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">🌾</span>
            <span className="text-2xl">☀️</span>
            <span className="text-2xl">🌾</span>
            <span className="text-2xl">🍯</span>
            <span className="text-2xl">🌾</span>
          </div> */}
          <h2 className="text-4xl font-light text-amber-800 mb-3">Serpent</h2>
          {/* <p className="text-amber-600 text-lg font-light mb-6">Help the friendly snake gather golden honey drops!</p> */}
          
          <div className="flex justify-center gap-6 mb-4">

            {gameOver && (
              <div className="bg-gradient-to-r from-rose-100 to-pink-100 px-6 py-3 rounded-full border-2 border-rose-200 shadow-sm animate-pulse">
                <span className="text-rose-700 font-light flex items-center gap-2">
                  <span className="text-lg"></span>
                  Rest & Try Again
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl p-6 mb-8 border-3 border-amber-200 shadow-inner relative overflow-hidden">
          {/* Garden background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-2 text-lg">🌱</div>
            <div className="absolute top-2 right-2 text-lg">🌱</div>
            <div className="absolute bottom-2 left-2 text-lg">🌱</div>
            <div className="absolute bottom-2 right-2 text-lg">🌱</div>
          </div>
          
          <div className="grid grid-cols-20 gap-0 max-w-lg mx-auto relative">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;
              const isHead = snake[0] && snake[0].x === x && snake[0].y === y;

              return (
                <div
                  key={index}
                  className={`w-4 h-4 transition-all duration-200 ${
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

        {!gameStarted && (
          <div className="text-center mb-6">
            {/* <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200 mb-4">
              <p className="text-amber-700 text-lg font-light mb-3">🎮 Ready for a peaceful garden adventure?</p>
              <p className="text-amber-600 font-light">Use arrow keys to guide your gentle serpent friend!</p>
            </div> */}
          </div>
        )}

        {gameOver && (
          <div className="text-center mb-6">
            {/* <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200"> */}
              {/* <p className="text-rose-700 text-lg font-light">🌺 The serpent rests after collecting {score} honey drops</p>
              <p className="text-rose-600 font-light mt-2">Every garden adventure is a lovely memory!</p> */}
            {/* </div> */}
          </div>
        )}

        <div className="flex justify-center gap-6">
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 px-6 py-3 rounded-full border-2 border-amber-200 shadow-sm">
              <span className="text-amber-700 font-light flex items-center gap-2">
                <span className="text-lg">🍯</span>
                Honey: {score}
              </span>
            </div>
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 rounded-full border-2 border-amber-200 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl relative group"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg group-hover:animate-spin">
                {gameStarted ? '' : ''}
              </span>
              <span className="text-amber-800 font-light">
                {gameStarted ? 'New Garden Adventure' : 'Begin'}
              </span>
            </div>
          </button>
          
          <button
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-stone-200 to-amber-200 hover:from-stone-300 hover:to-amber-300 rounded-full border-2 border-stone-300 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl relative group"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg group-hover:animate-pulse">🏠</span>
              {/* <span className="text-stone-700 font-light">Back to Cottage</span> */}
            </div>
          </button>
        </div>
        
        {/* Bottom decorative border */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
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

export default SunnySnake;