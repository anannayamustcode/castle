import React, { useState } from 'react';
import MemoryGarden from './MemoryGarden';
import SunnySnake from './SunnySnake';
import ColorHarmony from './ColorHarmony';

const WholesomeRoom = ({ setCurrentRoom }) => {
  const [currentGame, setCurrentGame] = useState(null);

  if (currentGame === 'memory') {
    return <MemoryGarden onBack={() => setCurrentGame(null)} />;
  }

  if (currentGame === 'snake') {
    return <SunnySnake onBack={() => setCurrentGame(null)} />;
  }

  if (currentGame === 'colors') {
    return <ColorHarmony onBack={() => setCurrentGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Floating elements for cottagecore atmosphere */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-pulse">🌿</div>
      <div className="absolute top-20 right-20 text-4xl opacity-30 animate-bounce">🐝</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-25 animate-pulse">🌸</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-bounce">🍄</div>
      <div className="absolute top-1/3 left-1/4 text-3xl opacity-15 animate-pulse">✨</div>
      <div className="absolute bottom-1/3 right-1/4 text-3xl opacity-15 animate-pulse">🌻</div>
      
      <div className="bg-gradient-to-br from-cream-100 to-stone-100 rounded-[2rem] shadow-2xl border-4 border-amber-200 p-12 max-w-4xl w-full text-center relative backdrop-blur-sm bg-opacity-90">
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-2xl">🌾</div>
        <div className="absolute top-4 right-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 left-4 text-2xl">🌾</div>
        <div className="absolute bottom-4 right-4 text-2xl">🌾</div>
        
        <div className="mb-8">
          <div className="text-6xl mb-6 animate-bounce">🏠</div>
          {/* <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">🌸</span>
            <span className="text-2xl">🌿</span>
            <span className="text-2xl">🌻</span>
            <span className="text-2xl">🐝</span>
            <span className="text-2xl">🌸</span>
          </div> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <button
            onClick={() => setCurrentGame('memory')}
            className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border-4 border-green-200 hover:border-green-300 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:rotate-1 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="text-6xl mb-4 group-hover:animate-bounce">🌻</div>
            {/* <div className="flex justify-center gap-1 mb-2">
              <span className="text-lg">🌿</span>
              <span className="text-lg">🍃</span>
              <span className="text-lg">🌿</span>
            </div> */}
            <div className="absolute top-2 right-2 text-lg opacity-50">✨</div>
          </button>
          
          <button
            onClick={() => setCurrentGame('snake')}
            className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-8 border-4 border-amber-200 hover:border-amber-300 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:-rotate-1 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-yellow-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="text-6xl mb-4 group-hover:animate-bounce">🐍</div>
            {/* <div className="flex justify-center gap-1 mb-2">
              <span className="text-lg">🌾</span>
              <span className="text-lg">☀️</span>
              <span className="text-lg">🌾</span> */}
            {/* </div> */}
            <div className="absolute top-2 right-2 text-lg opacity-50">🌟</div>
          </button>
          
          <button
            onClick={() => setCurrentGame('colors')}
            className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-8 border-4 border-rose-200 hover:border-rose-300 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:rotate-1 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-pink-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="text-6xl mb-4 group-hover:animate-bounce">🕳️</div>
            {/* <div className="flex justify-center gap-1 mb-2">
              <span className="text-lg">🌸</span>
              <span className="text-lg">🐝</span>
              <span className="text-lg">🌸</span>
            </div> */}
            <div className="absolute top-2 right-2 text-lg opacity-50">💫</div>
          </button>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={() => setCurrentRoom('dark')}
            className="px-10 py-4 bg-gradient-to-r from-stone-200 to-amber-200 hover:from-stone-300 hover:to-amber-300 rounded-full border-2 border-stone-300 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl relative group"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-thin group-hover:animate-pulse">Go Back</span>
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

export default WholesomeRoom;