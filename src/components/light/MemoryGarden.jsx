import React, { useState, useEffect } from 'react';
import { Heart, Star, Flower, Sun, Moon, Sparkles, Leaf, Circle } from 'lucide-react';

const MemoryGarden = ({ onBack }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const icons = [Heart, Star, Flower, Sun, Moon, Sparkles, Leaf, Circle];

  useEffect(() => {
    const shuffledCards = [...icons, ...icons]
      .map((icon, index) => ({ id: index, icon, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (cardId) => {
    if (flipped.length === 2 || flipped.includes(cardId) || matched.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first]?.icon === cards[second]?.icon) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    const shuffledCards = [...icons, ...icons]
      .map((icon, index) => ({ id: index, icon, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

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
      <div className="absolute top-40 right-40 text-2xl opacity-25 animate-bounce">🧚‍♀️</div>
      
      <div className="bg-gradient-to-br from-cream-100 to-stone-100 rounded-[2rem] shadow-2xl border-4 border-amber-200 p-12 max-w-4xl w-full relative backdrop-blur-sm bg-opacity-90">
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-2xl">🌾</div>
        <div className="absolute top-4 right-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 left-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 right-4 text-2xl">🌾</div>
        
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🌻</div>
          {/* <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">🌸</span>
            <span className="text-2xl">🌿</span>
            <span className="text-2xl">🌻</span>
            <span className="text-2xl">🦋</span>
            <span className="text-2xl">🌸</span>
          </div> */}
          <h2 className="text-4xl font-light text-amber-800 mb-3">Memory Garden</h2>
          {/* <p className="text-amber-600 text-lg font-light mb-6">Find matching pairs among the wildflowers!</p> */}
          
          <div className="flex justify-center gap-6 mb-4">

            {gameWon && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border-2 border-green-200 shadow-sm animate-pulse">
                <span className="text-green-700 font-light flex items-center gap-2">
                  <span className="text-lg">🎉</span>
                  Garden Complete!
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8 max-w-lg mx-auto">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            const isFlipped = flipped.includes(index) || matched.includes(index);
            
            return (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-2xl border-3 transition-all duration-500 hover:scale-110 hover:shadow-lg relative group overflow-hidden ${
                  isFlipped 
                    ? matched.includes(index)
                      ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 shadow-lg'
                      : 'bg-gradient-to-br from-yellow-100 to-amber-100 border-amber-300 shadow-lg'
                    : 'bg-gradient-to-br from-stone-50 to-amber-50 border-stone-200 hover:border-amber-300 hover:from-amber-50 hover:to-yellow-50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-amber-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                {isFlipped && (
                  <div className="flex items-center justify-center h-full">
                    <IconComponent 
                      className={`w-8 h-8 transition-all duration-300 ${
                        matched.includes(index) 
                          ? 'text-green-600 animate-pulse' 
                          : 'text-amber-600'
                      }`} 
                    />
                  </div>
                )}
                
                {!isFlipped && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-6 h-6 bg-gradient-to-br from-amber-200 to-stone-200 rounded-full opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute top-2 right-2 text-xs opacity-30 group-hover:opacity-50">🌸</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center gap-6">
                        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 px-6 py-3 rounded-full border-2 border-amber-200 shadow-sm">
              <span className="text-amber-700 font-light flex items-center gap-2">
                <span className="text-lg">🌾</span>
                Moves: {moves}
              </span>
            </div>
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 rounded-full border-2 border-amber-200 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl relative group"
          >
            <div className="flex items-center gap-3">
              {/* <span className="text-lg group-hover:animate-spin">🔄</span> */}
              <span className="text-amber-800 font-light">Plant New Garden</span>
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

export default MemoryGarden;