import React, { useState, useEffect } from 'react';

const MirrorRoom = ({ gameState, setGameState, transitionToRoom }) => {
  const [bloodDrops, setBloodDrops] = useState([]);
  const [whispers, setWhispers] = useState([]);
  const [eyesVisible, setEyesVisible] = useState(false);

  const handleMirrorClick = () => {
    setGameState(prev => ({
      ...prev,
      mirrorClicks: prev.mirrorClicks + 1,
      cursorStyle: 'not-allowed'
    }));

    // Add blood drops from mirror
const newDrops = Array.from({ length: 4 }, (_, i) => ({
  id: Date.now() + i,
  x: Math.random() * 100, // anywhere on screen horizontally
  delay: Math.random() * 800
}));

    setBloodDrops(prev => [...prev, ...newDrops]);
    
    // Add whisper text effect
    if (gameState.mirrorClicks >= 1) {
      const whisperTexts = ["help me", "trapped", "forever", "watching", "can't escape"," run away"," leave now", "the mirror knows", "it sees you", "don't look back"," it's too late"," they are coming"];
      const newWhisper = {
        id: Date.now(),
        text: whisperTexts[Math.floor(Math.random() * whisperTexts.length)],
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20
      };
      setWhispers(prev => [...prev, newWhisper]);
      
      setTimeout(() => {
        setWhispers(prev => prev.filter(w => w.id !== newWhisper.id));
      }, 3000);
    }

    // Show eyes occasionally
    if (gameState.mirrorClicks >= 2 && Math.random() < 0.4) {
      setEyesVisible(true);
      setTimeout(() => setEyesVisible(false), 2000);
    }

    // Clean up blood drops
    setTimeout(() => {
      setBloodDrops(prev => prev.filter(drop => !newDrops.includes(drop)));
    }, 4000);
  };

  const bloodTexts = [
    "WHO ARE YOU?",
    "WHAT DO YOU WANT?", 
    "YOU SHOULDN'T BE HERE",
    "TURN BACK NOW",
    "THE MIRROR SEES ALL"
  ];

  // Ambient effects
  useEffect(() => {
    if (gameState.mirrorClicks > 0) {
      const interval = setInterval(() => {
        // Random blood drops
        const ambientDrops = Array.from({ length: 1 }, (_, i) => ({
          id: Date.now() + i + 5000,
          x: Math.random() * 100,
          delay: 0
        }));
        setBloodDrops(prev => [...prev, ...ambientDrops]);
        
        setTimeout(() => {
          setBloodDrops(prev => prev.filter(drop => !ambientDrops.includes(drop)));
        }, 3000);
      }, 12000 + Math.random() * 8000);
      
      return () => clearInterval(interval);
    }
  }, [gameState.mirrorClicks]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Dark atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-gray-900/20 to-red-950/10 animate-pulse" 
           style={{ animationDuration: '6s' }}></div>
      
      {/* Creepy floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>
      
      {/* Lurking shadows in corners */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-8 w-16 h-32 bg-black/50 transform rotate-12 blur-sm animate-pulse opacity-40" 
             style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-24 right-12 w-20 h-28 bg-black/40 transform -rotate-6 blur-sm animate-pulse opacity-30"
             style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-12 w-14 h-24 bg-black/45 transform rotate-25 blur-md animate-pulse opacity-25"
             style={{ animationDuration: '9s', animationDelay: '0.5s' }}></div>
      </div>

      {/* Blood drops */}
      {bloodDrops.map(drop => (
        <div
          key={drop.id}
          className="absolute w-2 h-6 bg-gradient-to-b from-red-700 to-red-900 rounded-full opacity-80 z-10"
          style={{
            left: `${drop.x}%`,
            top: '-10px',
            animation: `bloodFall 4s ease-in forwards ${drop.delay}ms`
          }}
        />
      ))}

      {/* Whisper texts */}
      {whispers.map(whisper => (
        <div
          key={whisper.id}
          className="absolute text-white text-xs text-bold font-bold font-serif animate-pulse z-20 pointer-events-none"
          style={{
            left: `${whisper.x}%`,
            top: `${whisper.y}%`,
            animation: 'whisperFade 3s ease-out forwards'
          }}
        >
          {whisper.text}
        </div>
      ))}

      <div className="text-center relative z-30">
        {/* Enhanced title */}
        <h1 className="text-white text-5xl mb-12 font-serif tracking-wider relative">
          <span className="relative z-10">The Mirror Chamber</span>
          <div className="absolute inset-0 text-red-900/40 blur-sm animate-pulse" 
               style={{ animationDuration: '4s' }}>The Mirror Chamber</div>
        </h1>
        
        {/* The Mirror - Stable but enhanced */}
        <div className="relative mb-12">
          {/* Subtle ominous glow */}
          <div className="absolute -inset-6 bg-gradient-to-r from-red-900/30 via-gray-800/30 to-red-900/30 rounded-full blur-xl opacity-50"></div>
          
          <div 
            onClick={handleMirrorClick}
            className="relative w-80 h-96 mx-auto cursor-pointer transition-all duration-300 hover:scale-[1.02] group"
          >
            Ornate antique frame
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-700 via-yellow-800 to-yellow-900 rounded-2xl shadow-2xl border-4 border-yellow-900">
              {/* Decorative frame elements */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-700 rotate-45 border-2 border-yellow-900 shadow-lg"></div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-700 rotate-45 border-2 border-yellow-900 shadow-lg"></div>
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-yellow-700 rotate-45 border-2 border-yellow-900 shadow-lg"></div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-yellow-700 rotate-45 border-2 border-yellow-900 shadow-lg"></div>
              
              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-600"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-yellow-600"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-yellow-600"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-600"></div>
            </div>
            
            {/* Mirror surface */}
            <div className="absolute inset-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg overflow-hidden shadow-inner">
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/12"></div>
              
              {/* Initial state */}
              {gameState.mirrorClicks === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-500 text-xl font-serif opacity-70 group-hover:opacity-90 transition-opacity duration-500">
                    Look into the mirror...
                  </div>
                </div>
              )}
              
              {/* Horror text on mirror surface */}
              {gameState.mirrorClicks > 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  {/* Main blood text */}
                  <div className="text-red-500 font-bold text-xl text-center leading-tight mb-4 animate-pulse transform rotate-3">
                    {bloodTexts[Math.min(gameState.mirrorClicks - 1, bloodTexts.length - 1)]}
                  </div>
                  
                  {/* Progressive horror elements */}
                  {/* {gameState.mirrorClicks >= 2 && (
                    <div className="text-red-700/80 text-sm font-serif text-center animate-pulse opacity-60">
                      I see you watching
                    </div>
                  )}
                  
                  {gameState.mirrorClicks >= 3 && (
                    <div className="text-red-800/60 text-xs font-serif text-center mt-2 animate-pulse">
                      You can never leave
                    </div>
                  )}
                  
                  {gameState.mirrorClicks >= 4 && (
                    <div className="text-red-900/40 text-xs font-serif text-center mt-1 animate-pulse">
                      We are one now
                    </div>
                  )} */}
                  
                  {/* Blood drips from text */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {Array.from({ length: Math.min(gameState.mirrorClicks, 6) }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-8 bg-gradient-to-b from-red-600/80 to-red-900/80 animate-pulse"
                        style={{
                          animationDelay: `${i * 0.4}s`,
                          animationDuration: '3s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Eyes watching from the darkness */}
              {eyesVisible && gameState.mirrorClicks >= 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex space-x-8 opacity-60">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-500/50" 
                         style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              )}
              
              {/* Mirror cracks */}
              {gameState.mirrorClicks >= 3 && (
                <>
                  <div className="absolute top-8 left-16 w-20 h-px bg-gray-400/40 transform rotate-15"></div>
                  <div className="absolute bottom-20 right-12 w-16 h-px bg-gray-400/40 transform -rotate-30"></div>
                  <div className="absolute top-1/2 left-8 w-18 h-px bg-gray-400/40 transform rotate-45"></div>
                </>
              )}
              
              {/* Bloody handprint */}
              {gameState.mirrorClicks >= 5 && (
                <div className="absolute top-6 right-6 opacity-50">
                  <div className="w-14 h-18 relative transform rotate-12">
                    <div className="absolute inset-0 bg-red-800/60 rounded-full"></div>
                    <div className="absolute top-2 left-1 w-2 h-8 bg-red-800/60 rounded-full transform rotate-45"></div>
                    <div className="absolute top-1 left-3 w-2 h-9 bg-red-800/60 rounded-full transform rotate-15"></div>
                    <div className="absolute top-0 left-5 w-2 h-8 bg-red-800/60 rounded-full transform -rotate-15"></div>
                    <div className="absolute top-1 left-7 w-2 h-7 bg-red-800/60 rounded-full transform -rotate-45"></div>
                    <div className="absolute top-2 left-9 w-2 h-6 bg-red-800/60 rounded-full transform -rotate-60"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Enhanced progression button */}
        {gameState.mirrorClicks >= 3 && (
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-900/60 via-gray-800/60 to-red-900/60 rounded-lg blur-lg animate-pulse"
                 style={{ animationDuration: '3s' }}></div>
            
            <button
              onClick={() => transitionToRoom('puzzle-maze')}
              className="relative px-12 py-4 bg-gradient-to-r from-red-900 via-red-800 to-red-900 hover:from-red-800 hover:via-red-700 hover:to-red-800 text-white text-xl font-serif rounded-lg transition-all duration-300 shadow-2xl border-2 border-red-700 hover:border-red-500 transform hover:scale-105 group"
            >
              <span className="relative z-10 flex items-center gap-3 font-thin">
                Enter the Maze
                {/* <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center animate-pulse group-hover:animate-spin">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div> */}
              </span>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
        
        {/* Interactive hints */}
        {gameState.mirrorClicks === 0 && (
          <p className="text-gray-600 text-sm font-serif animate-pulse mt-8 opacity-60">
            Something stirs behind the glass...
          </p>
        )}
        
        {gameState.mirrorClicks > 0 && gameState.mirrorClicks < 3 && (
          <p className="text-red-500/80 text-sm font-serif animate-pulse mt-8">
            The mirror hungers for more... ({gameState.mirrorClicks}/3)
          </p>
        )}
        
        {gameState.mirrorClicks >= 3 && gameState.mirrorClicks < 5 && (
          <p className="text-red-400/60 text-sm font-serif animate-pulse mt-8">
            The darkness beckons you forward...
          </p>
        )}
      </div>
      
      <style jsx>{`
        @keyframes bloodFall {
          0% { transform: translateY(-10px); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes whisperFade {
          0% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 0.6; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default MirrorRoom;