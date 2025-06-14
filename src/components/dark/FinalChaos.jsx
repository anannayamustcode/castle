import React, { useEffect } from 'react';

const FinalChaos = ({ setCurrentRoom, setGameState, setShowGlassEffect }) => {
  useEffect(() => {
    // Dramatic exit music simulation
    const audio = {
      play: () => console.log('🎵 DRAMATIC EXIT MUSIC PLAYING 🎵')
    };
    audio.play();
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Chaotic visual effects */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="text-center z-10 animate-pulse">
        <h1 className="text-6xl text-red-500 font-bold mb-4 animate-bounce">
          SYSTEM OVERLOAD
        </h1>
        <p className="text-white text-2xl mb-8 animate-pulse">
          REALITY.EXE HAS STOPPED WORKING
        </p>
        
        <div className="space-y-4 text-lg text-gray-300">
          <p className="animate-pulse">All choices recorded...</p>
          <p className="animate-pulse">All paths traversed...</p>
          <p className="animate-pulse">The experience is complete.</p>
        </div>
        
        <button
          onClick={() => {
            setCurrentRoom('dark');
            setGameState({
              hasClickedRed: false,
              mirrorClicks: 0,
              puzzlePieces: [],
              chatMessages: [],
              trainChoice: null,
              stickmanPosition: { x: 50, y: 80 },
              cursorStyle: 'default'
            });
            setShowGlassEffect(false);
          }}
          className="mt-8 px-8 py-3 !bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-300"
        >
          RESTART EXPERIENCE
        </button>
      </div>
    </div>
  );
};

export default FinalChaos;