import React from 'react';

const DarkRoom = ({ gameState, showGlassEffect, glassShards, handleRedButtonClick, transitionToRoom }) => {
  return (
    <div className={`min-h-screen bg-black flex items-center justify-center relative overflow-hidden ${showGlassEffect ? 'animate-pulse' : ''}`}>
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

      <div className="text-center z-10 px-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="mb-12">
          <h1 className="text-xl sm:text-xl md:text-xl text-red-400 font-mono mb-4 animate-pulse">
            SYSTEM LOADING..
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mb-2">
            Choose wisely. Actions have consequences.
          </p>
          <div className="text-[10px] sm:text-xs text-gray-500 font-mono">
            [WARNING: Unauthorized access detected]
          </div>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleRedButtonClick}
            disabled={showGlassEffect}
            className={`
              relative w-full sm:w-auto px-6 py-4 sm:px-12 sm:py-6
              bg-gradient-to-r from-red-600 to-red-800 
              hover:from-red-700 hover:to-red-900 text-white font-bold 
              text-base sm:text-xl rounded-lg shadow-2xl transform hover:scale-105 
              transition-all duration-300 border-2 border-red-400 hover:border-red-300
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
            className="block w-full sm:w-auto mx-auto px-6 py-2 bg-gray-700 hover:bg-gray-600 
              text-gray-600 hover:text-black rounded transition-all duration-300 text-sm"
          >
            OK (Safe Mode)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DarkRoom;
