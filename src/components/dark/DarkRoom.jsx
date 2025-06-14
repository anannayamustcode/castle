import React from 'react';

const DarkRoom = ({ gameState, showGlassEffect, glassShards, handleRedButtonClick, transitionToRoom }) => {
  return (
    <div className={`min-h-screen bg-black flex items-center justify-center relative overflow-hidden ${showGlassEffect ? 'animate-pulse' : ''}`}>
      {/* Glass shatter effect */}
      {showGlassEffect && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {glassShards.map((shard) => (
            <div
              key={shard.id}
              className="absolute bg-white opacity-80"
              style={{
                left: `${shard.x}%`,
                top: `${shard.y}%`,
                width: `${shard.size}px`,
                height: `${shard.size}px`,
                transform: `rotate(${shard.rotation}deg)`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                animation: `glassShatter 1.5s ease-out ${shard.delay}s forwards`
              }}
            />
          ))}
        </div>
      )}
      
      <div className="absolute inset-0 bg-red-900 opacity-5 animate-pulse"></div>
      
      <div className="text-center z-10">
        <div className="mb-12">
          <h1 className="text-2xl text-red-400 font-mono mb-4 animate-pulse">
            SYSTEM INITIALIZATION...
          </h1>
          <p className="text-gray-500 text-sm mb-2">Choose wisely. Actions have consequences.</p>
          <div className="text-xs text-gray-600 font-mono">
            [WARNING: Unauthorized access detected]
          </div>
        </div>
        
        <div className="space-y-6">
          <button
            onClick={handleRedButtonClick}
            disabled={showGlassEffect}
            className={`
              relative px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 
              hover:from-red-700 hover:to-red-900 text-white font-bold text-xl
              rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300
              border-2 border-red-400 hover:border-red-300
              ${showGlassEffect ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-red-500/50'}
            `}
          >
            <span className="relative z-10">
              DO NOT CLICK THIS BUTTON!
            </span>
            <div className="absolute inset-0 bg-red-500 rounded-lg blur opacity-30 animate-pulse"></div>
          </button>
          
          <button
            onClick={() => transitionToRoom('wholesome')}
            className="block mx-auto px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-500 hover:text-black rounded transition-all duration-300 text-sm"
          >
            OK (Safe Mode)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DarkRoom;