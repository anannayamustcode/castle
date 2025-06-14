import React, { useState } from 'react';

const ColorHarmony = ({ onBack }) => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [displaySequence, setDisplaySequence] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [activeColor, setActiveColor] = useState(null);

  const colors = [
    { id: 0, bg: 'bg-gradient-to-br from-rose-100 to-pink-200', active: 'bg-gradient-to-br from-rose-200 to-pink-300', border: 'border-rose-300', emoji: '🌸' },
    { id: 1, bg: 'bg-gradient-to-br from-sky-100 to-blue-200', active: 'bg-gradient-to-br from-sky-200 to-blue-300', border: 'border-sky-300', emoji: '🦋' },
    { id: 2, bg: 'bg-gradient-to-br from-emerald-100 to-green-200', active: 'bg-gradient-to-br from-emerald-200 to-green-300', border: 'border-emerald-300', emoji: '🌿' },
    { id: 3, bg: 'bg-gradient-to-br from-violet-100 to-purple-200', active: 'bg-gradient-to-br from-violet-200 to-purple-300', border: 'border-violet-300', emoji: '🍄' }
  ];

  const startGame = () => {
    const newSequence = [Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    setPlayerSequence([]);
    setLevel(1);
    setGameStarted(true);
    setGameOver(false);
    playSequence(newSequence);
  };

  const playSequence = (seq) => {
    setDisplaySequence(true);
    seq.forEach((colorId, index) => {
      setTimeout(() => {
        setActiveColor(colorId);
        setTimeout(() => {
          setActiveColor(null);
          if (index === seq.length - 1) {
            setDisplaySequence(false);
          }
        }, 500);
      }, (index + 1) * 700);
    });
  };

  const handleColorClick = (colorId) => {
    if (displaySequence || gameOver) return;

    const newPlayerSequence = [...playerSequence, colorId];
    setPlayerSequence(newPlayerSequence);

    // Check if correct
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true);
      return;
    }

    // Check if sequence complete
    if (newPlayerSequence.length === sequence.length) {
      setLevel(level + 1);
      const newSequence = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(newSequence);
      setPlayerSequence([]);
      setTimeout(() => playSequence(newSequence), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Floating cottagecore elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-pulse">🌻</div>
      <div className="absolute top-20 right-20 text-4xl opacity-30 animate-bounce">🦋</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-25 animate-pulse">🌸</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-bounce">🍄</div>
      <div className="absolute top-1/3 left-1/4 text-3xl opacity-15 animate-pulse">✨</div>
      <div className="absolute bottom-1/3 right-1/4 text-3xl opacity-15 animate-pulse">🌿</div>
      <div className="absolute top-1/2 left-10 text-2xl opacity-10 animate-pulse">🌾</div>
      <div className="absolute top-1/2 right-10 text-2xl opacity-10 animate-pulse">🦋</div>

      <div className="bg-gradient-to-br from-cream-100 to-stone-100 rounded-[2rem] shadow-2xl border-4 border-amber-200 p-12 max-w-2xl w-full text-center relative backdrop-blur-sm bg-opacity-90">
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-2xl">🌾</div>
        <div className="absolute top-4 right-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 left-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 right-4 text-2xl">🌾</div>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎨</div>
          <h2 className="text-3xl font-bold text-amber-800 mb-2">Color Harmony</h2>
          <p className="text-amber-600 mb-4">Remember and repeat the magical color sequence!</p>
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="bg-gradient-to-r from-amber-100 to-yellow-100 px-6 py-2 rounded-full text-amber-700 border-2 border-amber-200 font-semibold shadow-sm">
              Level: {level}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mb-8">
          {colors.map((color) => {
            const isActive = activeColor === color.id;
            return (
              <button
                key={color.id}
                onClick={() => handleColorClick(color.id)}
                disabled={displaySequence || !gameStarted || gameOver}
                className={`aspect-square rounded-3xl border-4 transition-all duration-300 hover:scale-110 hover:rotate-3 relative group overflow-hidden ${
                  isActive ? color.active : color.bg
                } ${color.border} ${
                  displaySequence || !gameStarted || gameOver 
                    ? 'cursor-not-allowed opacity-70' 
                    : 'cursor-pointer hover:shadow-2xl'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="w-full h-full flex items-center justify-center">
                  <div className={`text-4xl transition-all duration-200 ${isActive ? 'animate-bounce scale-125' : 'group-hover:scale-110'}`}>
                    {color.emoji}
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-lg opacity-30">✨</div>
              </button>
            );
          })}
        </div>

        {displaySequence && (
          <div className="text-center mb-6">
            {/* <div className="flex justify-center items-center gap-2 mb-2">
              <span className="text-2xl animate-pulse">✨</span>
              <p className="text-amber-600 font-semibold text-lg">Watch the magical sequence...</p>
              <span className="text-2xl animate-pulse">✨</span>
            </div> */}
          </div>
        )}

        {gameStarted && !displaySequence && !gameOver && (
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2">
              <span className="text-xl">🌟</span>
              <p className="text-amber-600 font-semibold">Your turn! Repeat the sequence</p>
              <span className="text-xl">🌟</span>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-4 border-2 border-rose-200 mb-4">
              <div className="text-4xl mb-2">🌻</div>
              <p className="text-rose-700 text-lg font-semibold">What a lovely day! You reached level {level}</p>
              {/* <p className="text-rose-600 text-sm mt-1">Every flower blooms in its own time 🌸</p> */}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-6">
          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 rounded-full text-amber-800 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-amber-200 font-semibold relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-amber-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="flex items-center gap-2">
              <span className="text-lg"></span>
              <span>{gameStarted ? 'New Garden' : 'Start'}</span>
            </div>
          </button>
          <button
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-stone-100 to-amber-100 hover:from-stone-200 hover:to-amber-200 rounded-full text-amber-800 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-stone-200 font-semibold relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-stone-200 to-amber-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🏠</span>
              {/* <span>Back Home</span> */}
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

export default ColorHarmony;