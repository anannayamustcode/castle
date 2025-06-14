import React, { useState, useEffect } from 'react';

const MoralDilemma = ({ gameState = {}, setGameState = () => {}, transitionToRoom = () => {} }) => {
  const [trainPosition, setTrainPosition] = useState(-20); // Start way to the left
  const [isAnimating, setIsAnimating] = useState(false);
  const [showImpact, setShowImpact] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrainPosition(prev => {
        const newPos = prev + 0.4;
        if (newPos > 100) return -20; // Reset when off screen
        if (newPos > 75 && !showImpact) {
          setShowImpact(true);
          setTimeout(() => setShowImpact(false), 2000);
        }
        return newPos;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [showImpact]);

  const handleLeverClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newChoice = gameState.trainChoice === 'save-five' ? 'save-one' : 'save-five';
    setGameState(prev => ({ ...prev, trainChoice: newChoice }));
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const isLeverPulled = gameState.trainChoice === 'save-five';

  const Person = ({ x, y, color = '#ef4444', isChild = false, isDanger = false }) => (
    <div 
      className={`absolute transition-all duration-300 ${isDanger && showImpact ? 'animate-pulse' : ''}`} 
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <div className={`relative ${isChild ? 'scale-75' : 'scale-100'}`}>
        {/* Shadow */}
        <div className="absolute top-6 left-2 w-12 h-2 bg-black opacity-20 rounded-full blur-sm"></div>
        
        {/* Person */}
        <svg width="16" height="28" viewBox="0 0 16 28" className="drop-shadow-sm">
          {/* Head */}
          <circle cx="8" cy="5" r="4" fill={color} stroke="#000" strokeWidth="0.5"/>
          {isChild && <circle cx="6" cy="4" r="0.5" fill="#000"/>}
          {isChild && <circle cx="10" cy="4" r="0.5" fill="#000"/>}
          {isChild && <path d="M 6 6 Q 8 7 10 6" stroke="#000" strokeWidth="0.5" fill="none"/>}
          
          {/* Body */}
          <ellipse cx="8" cy="16" rx="3" ry="7" fill={color} stroke="#000" strokeWidth="0.5"/>
          
          {/* Arms */}
          <ellipse cx="4" cy="12" rx="1.5" ry="4" fill={color} stroke="#000" strokeWidth="0.5" transform="rotate(-20 4 12)"/>
          <ellipse cx="12" cy="12" rx="1.5" ry="4" fill={color} stroke="#000" strokeWidth="0.5" transform="rotate(20 12 12)"/>
          
          {/* Legs */}
          <ellipse cx="6" cy="25" rx="1.5" ry="4" fill={color} stroke="#000" strokeWidth="0.5"/>
          <ellipse cx="10" cy="25" rx="1.5" ry="4" fill={color} stroke="#000" strokeWidth="0.5"/>
          
          {/* Clothing details */}
          <rect x="6" y="12" width="4" height="8" fill="none" stroke="#000" strokeWidth="0.3" opacity="0.6"/>
        </svg>
        
        {/* Danger indicator */}
        {isDanger && (
          <div className="absolute -top-2 -left-1 text-red-500 animate-bounce">
            ⚠️
          </div>
        )}
      </div>
    </div>
  );

  const Train = ({ position, isOnUpperTrack }) => (
    <div 
      className="absolute transition-all duration-100 ease-linear"
      style={{ 
        left: `${position}%`,
        bottom: isOnUpperTrack && position > 45 ? '160px' : '120px', // Proper vertical positioning
        transform: isOnUpperTrack && position > 45 ? 'rotate(-16deg)' : 'rotate(0deg)', // Fix rotation
        zIndex: 10
      }}
    >
      <div className="relative drop-shadow-lg">
        {/* Smoke */}
        <div className="absolute -top-4 left-8 opacity-60">
          {Array.from({length: 3}).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-gray-300 rounded-full animate-pulse"
              style={{
                left: `${i * 4}px`,
                top: `${-i * 2}px`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
        
        {/* Train body */}
        <svg width="50" height="25" viewBox="0 0 50 25">
          {/* Main body */}
          <rect x="3" y="8" width="40" height="12" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1" rx="2"/>
          <rect x="8" y="5" width="12" height="6" fill="#1f2937" stroke="#000" strokeWidth="0.5" rx="1"/>
          
          {/* Windows */}
          <rect x="18" y="10" width="5" height="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="0.5"/>
          <rect x="26" y="10" width="5" height="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="0.5"/>
          <rect x="34" y="10" width="5" height="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="0.5"/>
          
          {/* Front */}
          <polygon points="43,8 47,12 43,20" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="0.5"/>
          
          {/* Wheels */}
          <circle cx="12" cy="21" r="3" fill="#374151" stroke="#000" strokeWidth="0.5"/>
          <circle cx="12" cy="21" r="1.5" fill="#6b7280"/>
          <circle cx="30" cy="21" r="3" fill="#374151" stroke="#000" strokeWidth="0.5"/>
          <circle cx="30" cy="21" r="1.5" fill="#6b7280"/>
          
          {/* Details */}
          <rect x="5" y="16" width="35" height="1" fill="#7f1d1d"/>
          <circle cx="40" cy="12" r="1" fill="#fbbf24"/>
        </svg>
      </div>
    </div>
  );

  const currentDangerTrack = isLeverPulled ? 'upper' : 'lower';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            The Trolley Problem
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            A runaway trolley is speeding toward five people. You can pull a lever to divert it to another track, 
            where it will kill one person instead. What do you choose?
          </p>
        </div>

        {/* Main Scene */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-600 rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="relative h-96 bg-gradient-to-b from-sky-300 via-green-200 to-green-300 rounded-xl overflow-hidden shadow-inner">
            
            {/* Background elements */}
            <div className="absolute inset-0">
              {/* Clouds */}
              <div className="absolute top-4 left-20 w-16 h-8 bg-white opacity-70 rounded-full"></div>
              <div className="absolute top-8 right-32 w-12 h-6 bg-white opacity-50 rounded-full"></div>
              
              {/* Hills */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-400 to-transparent rounded-b-xl"></div>
            </div>

            {/* Railway Infrastructure */}
            {/* Main track from left */}
            <div className="absolute bottom-29 left-0 w-7/8 h-6 bg-gradient-to-r from-amber-600 to-amber-500 shadow-md"></div>
            <div className="absolute bottom-[8.35rem] left-0 w-7/8 h-2 bg-gradient-to-r from-yellow-600 to-yellow-500"></div>
            {/* Track ties */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`tie-main-${i}`}
                className="absolute bottom-28 w-2 h-8 bg-amber-900 shadow-sm"
                style={{ left: `${i * 3.3}%` }}
              />
            ))}

            {/* Junction point */}
            <div className="absolute bottom-32 left-1/2 w-4 h-3 bg-amber-600 shadow-md"></div>

            {/* Upper diverging track */}
            <div 
              className="absolute bottom-31.5 left-1/2 w-110 h-4 bg-gradient-to-r from-amber-500 to-amber-600 origin-left shadow-md"
              style={{ transform: 'rotate(-9deg)' }}
            ></div>
            <div 
              className="absolute bottom-[7.5rem] left-1/2 w-110 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 origin-left"
              style={{ transform: 'rotate(-9deg)' }}
            ></div>

            {/* Upper track ties */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`tie-upper-${i}`}
                className="absolute w-2 h-8 bg-amber-900 origin-left shadow-sm"
                style={{ 
                  left: `${50 + i * 3.8}%`, 
                  bottom: `${112 + i * 6}px`,
                  transform: 'rotate(-18deg)'
                }}
              />
            ))}

            {/* Lower continuing track */}
            <div className="absolute bottom-32 left-1/2 w-110 h-3 bg-gradient-to-r from-amber-500 to-amber-600 shadow-md"></div>
            <div className="absolute bottom-31 left-1/2 w-110` h-1 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>

            {/* Lower track ties */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`tie-lower-${i}`}
                className="absolute bottom-28 w-2 h-8 bg-amber-900 shadow-sm"
                style={{ left: `${50 + i * 3.8}%` }}
              />
            ))}

            {/* Track switch */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
              <div 
                className={`w-12 h-2 bg-gray-400 origin-left transition-all duration-500 shadow-sm ${
                  isLeverPulled ? 'rotate-[-18deg] bg-yellow-400' : 'rotate-0'
                }`}
              ></div>
            </div>

            {/* People on tracks - properly positioned */}
            {/* Five people on lower track */}
            <Person x={360} y={300} color="#ef4444" isDanger={currentDangerTrack === 'lower'} />
            <Person x={385} y={300} color="#f97316" isDanger={currentDangerTrack === 'lower'} />
            <Person x={410} y={300} color="#eab308" isDanger={currentDangerTrack === 'lower'} />
            <Person x={435} y={300} color="#22c55e" isDanger={currentDangerTrack === 'lower'} />
            <Person x={460} y={300} color="#3b82f6" isDanger={currentDangerTrack === 'lower'} />
            
            {/* One child on upper track */}
            <Person x={400} y={165} color="#8b5cf6" isChild={true} isDanger={currentDangerTrack === 'upper'} />

            {/* Train */}
            <Train position={trainPosition} isOnUpperTrack={isLeverPulled} />

            {/* Lever Control */}
            <div className="absolute top-30 right-160">
              <div className=" p-4 rounded-lg">
                <button
                  onClick={handleLeverClick}
                  disabled={isAnimating}
                  className="relative group p-2 !bg-transparent"
                >
                  <div className="relative">
                    {/* Lever base */}
                  <div className="absolute top-[-6px] left-[-10px] w-6 h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full border-2 border-gray-400 shadow-lg"></div>
                    
                    {/* Lever handle */}
                    <div 
                      className={`absolute left-0 top-[-48px] w-2 h-12 bg-gradient-to-t origin-bottom transition-all duration-500 rounded-full shadow-md ${
                        isLeverPulled 
                          ? 'from-red-600 to-red-400 rotate-45 group-hover:from-red-500 group-hover:to-red-300' 
                          : 'from-green-600 to-green-400 rotate-0 group-hover:from-green-500 group-hover:to-green-300'
                      } ${isAnimating ? 'animate-pulse' : ''}`}
                    >
                      <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full shadow-lg ${
                        isLeverPulled ? 'bg-red-500' : 'bg-green-500'
                      }`}></div>
                    </div>
                    
                    {/* Status lights */}
                    <div className="absolute -bottom-8 -left-4 flex space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        !isLeverPulled ? 'bg-green-400 shadow-green-400 shadow-md' : 'bg-gray-600'
                      }`}></div>
                      <div className={`w-3 h-3 rounded-full ${
                        isLeverPulled ? 'bg-red-400 shadow-red-400 shadow-md' : 'bg-gray-600'
                      }`}></div>
                    </div>
                  </div>
                </button>
                
                <div className="text-center mt-8">
                  <div className={`text-xs font-bold ${
                    isLeverPulled ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {isLeverPulled ? 'DIVERTED' : 'STRAIGHT'}
                  </div>
                </div>
              </div>
            </div>

            {/* Track labels */}
            <div className="absolute bottom-18 right-24 bg-transparent text-black px-3 py-1 rounded-full text-sm font-thin">
              5 PEOPLE (who like Pineapple on Pizza)
            </div>
            <div className="absolute top-30 right-24 bg-transparent text-black px-3 py-1 rounded-full text-sm font-thin">
              1 PERSON (who eats normal pizza)
            </div>
          </div>
        </div>

        {/* Status and Controls */}
        <div className="text-center">
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 mb-6">
            <div className="text-2xl text-white mb-4 font-semibold">
              {!gameState.trainChoice ? (
                "Make your choice by pulling the lever"
              ) : (
                "Choice Made"
              )}
            </div>
            
            <div className={`text-lg mb-4 font-medium ${
              isLeverPulled ? 'text-red-300' : 'text-blue-300'
            }`}>
              {isLeverPulled 
                ? "Train diverted: Save 5 people who like pineapple on pizza" 
                : "Train continues: Save 1 person who eats normal pizza"}
            </div>
            
            {gameState.trainChoice && (
              <div className="border-t border-slate-600 pt-6 mt-6">
                <div className="text-green-400 mb-4 text-lg font-semibold">
                  ✓ Your moral choice has been recorded
                </div>
                <button
                  onClick={() => transitionToRoom('stickman-game')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Continue to Final Challenge →
                </button>
              </div>
            )}
          </div>
          
          {!gameState.trainChoice && (
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              This is a classic philosophical thought experiment. There is no "correct" answer - 
              it explores the tension between utilitarian and deontological ethical frameworks.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoralDilemma;