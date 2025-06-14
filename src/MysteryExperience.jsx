import React, { useState, useEffect, useRef } from 'react';
import DarkRoom from './components/dark/DarkRoom';
import HackedPopup from './components/dark/HackedPopup';
import MirrorRoom from './components/dark/MirrorRoom';
import PuzzleMaze from './components/dark/PuzzleMaze';
import CrypticChat from './components/dark/CrypticChat';
import MoralDilemma from './components/dark/MoralDilemma';
import StickmanGame from './components/dark/StickmanGame';
import FinalChaos from './components/dark/FinalChaos';
import WholesoomeRoom from './components/light/WholesoomeRoom';

const MysteryExperience = () => {
  const [currentRoom, setCurrentRoom] = useState('dark');
  const [gameState, setGameState] = useState({
    hasClickedRed: false,
    mirrorClicks: 0,
    puzzlePieces: [],
    chatMessages: [],
    trainChoice: null,
    stickmanPosition: { x: 50, y: 80 },
    cursorStyle: 'default'
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGlassEffect, setShowGlassEffect] = useState(false);
  const [glassShards, setGlassShards] = useState([]);
  const chatInputRef = useRef(null);

  // Generate random glass shards
  const generateGlassShards = () => {
    const shards = [];
    for (let i = 0; i < 25; i++) {
      shards.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        size: Math.random() * 40 + 15,
        delay: Math.random() * 0.8
      });
    }
    return shards;
  };

  // Transition between rooms with effects
  const transitionToRoom = (roomName, delay = 0) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentRoom(roomName);
      setIsTransitioning(false);
    }, delay);
  };

  // Handle red button click
  const handleRedButtonClick = () => {
    setGlassShards(generateGlassShards());
    setShowGlassEffect(true);
    setGameState(prev => ({ ...prev, hasClickedRed: true, cursorStyle: 'crosshair' }));
    
    setTimeout(() => {
      transitionToRoom('hacked-popup', 1500);
    }, 500);
  };

  // Apply cursor style based on game state
  useEffect(() => {
    document.body.style.cursor = gameState.cursorStyle;
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [gameState.cursorStyle]);

  // Render current room
  const renderCurrentRoom = () => {
    const commonProps = {
      gameState,
      setGameState,
      transitionToRoom,
      showGlassEffect,
      glassShards,
      chatInputRef
    };

    switch (currentRoom) {
      case 'dark': 
        return <DarkRoom {...commonProps} handleRedButtonClick={handleRedButtonClick} />;
      case 'wholesome': 
        return <WholesoomeRoom setCurrentRoom={setCurrentRoom} />;
      case 'hacked-popup': 
        return <HackedPopup {...commonProps} />;
      case 'mirror-room': 
        return <MirrorRoom {...commonProps} />;
      case 'puzzle-maze': 
        return <PuzzleMaze {...commonProps} />;
      case 'cryptic-chat': 
        return <CrypticChat {...commonProps} />;
      case 'moral-dilemma': 
        return <MoralDilemma {...commonProps} />;
      case 'stickman-game': 
        return <StickmanGame {...commonProps} />;
      case 'final-chaos': 
        return <FinalChaos {...commonProps} 
          setCurrentRoom={setCurrentRoom} 
          setShowGlassEffect={setShowGlassEffect} 
        />;
      default: 
        return <DarkRoom {...commonProps} handleRedButtonClick={handleRedButtonClick} />;
    }
  };

  return (
    <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {renderCurrentRoom()}
      
      <style jsx>{`
        @keyframes glassShatter {
          0% {
            transform: translate(0, 0) rotate(var(--rotation)) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(calc(var(--random-x) * 300px), calc(var(--random-y) * 300px)) rotate(calc(var(--rotation) + 360deg)) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MysteryExperience;


// import React, { useState, useEffect, useRef } from 'react';

// const MysteryExperience = () => {
//   const [currentRoom, setCurrentRoom] = useState('dark');
//   const [gameState, setGameState] = useState({
//     hasClickedRed: false,
//     mirrorClicks: 0,
//     puzzlePieces: [],
//     chatMessages: [],
//     trainChoice: null,
//     stickmanPosition: { x: 50, y: 80 },
//     cursorStyle: 'default'
//   });
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [showGlassEffect, setShowGlassEffect] = useState(false);
//   const [glassShards, setGlassShards] = useState([]);
//   const chatInputRef = useRef(null);

//   // Generate random glass shards
//   const generateGlassShards = () => {
//     const shards = [];
//     for (let i = 0; i < 25; i++) {
//       shards.push({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         rotation: Math.random() * 360,
//         size: Math.random() * 40 + 15,
//         delay: Math.random() * 0.8
//       });
//     }
//     return shards;
//   };

//   // Transition between rooms with effects
//   const transitionToRoom = (roomName, delay = 0) => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentRoom(roomName);
//       setIsTransitioning(false);
//     }, delay);
//   };

//   // Handle red button click
//   const handleRedButtonClick = () => {
//     setGlassShards(generateGlassShards());
//     setShowGlassEffect(true);
//     setGameState(prev => ({ ...prev, hasClickedRed: true, cursorStyle: 'crosshair' }));
    
//     setTimeout(() => {
//       transitionToRoom('hacked-popup', 1500);
//     }, 500);
//   };

//   // ROOM COMPONENTS

//   // Initial Dark Room
//   const DarkRoom = () => (
//     <div className={`min-h-screen bg-black flex items-center justify-center relative overflow-hidden ${showGlassEffect ? 'animate-pulse' : ''}`}>
//       {/* Glass shatter effect */}
//       {showGlassEffect && (
//         <div className="absolute inset-0 pointer-events-none z-50">
//           {glassShards.map((shard) => (
//             <div
//               key={shard.id}
//               className="absolute bg-white opacity-80"
//               style={{
//                 left: `${shard.x}%`,
//                 top: `${shard.y}%`,
//                 width: `${shard.size}px`,
//                 height: `${shard.size}px`,
//                 transform: `rotate(${shard.rotation}deg)`,
//                 clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
//                 animation: `glassShatter 1.5s ease-out ${shard.delay}s forwards`
//               }}
//             />
//           ))}
//         </div>
//       )}
      
//       <div className="absolute inset-0 bg-red-900 opacity-5 animate-pulse"></div>
      
//       <div className="text-center z-10">
//         <div className="mb-12">
//           <h1 className="text-2xl text-red-400 font-mono mb-4 animate-pulse">
//             SYSTEM INITIALIZATION...
//           </h1>
//           <p className="text-gray-500 text-sm mb-2">Choose wisely. Actions have consequences.</p>
//           <div className="text-xs text-gray-600 font-mono">
//             [WARNING: Unauthorized access detected]
//           </div>
//         </div>
        
//         <div className="space-y-6">
//           <button
//             onClick={handleRedButtonClick}
//             disabled={showGlassEffect}
//             className={`
//               relative px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 
//               hover:from-red-700 hover:to-red-900 text-white font-bold text-xl
//               rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300
//               border-2 border-red-400 hover:border-red-300
//               ${showGlassEffect ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-red-500/50'}
//             `}
//           >
//             <span className="relative z-10">
//               🚫 DO NOT CLICK THIS BUTTON! 🚫
//             </span>
//             <div className="absolute inset-0 bg-red-500 rounded-lg blur opacity-30 animate-pulse"></div>
//           </button>
          
//           <button
//             onClick={() => transitionToRoom('wholesome')}
//             className="block mx-auto px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-black rounded transition-all duration-300 text-sm"
//           >
//             OK (Safe Mode)
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Fake Hacked Popup
//   const HackedPopup = () => (
//     <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
//       <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse"></div>
//       <div className="absolute top-0 left-0 text-green-400 font-mono text-xs p-4 opacity-50">
//         BREACH DETECTED... INITIALIZING COUNTERMEASURES...
//       </div>
      
//       <div className="bg-gray-900 border-2 border-red-500 p-8 rounded-lg max-w-md w-full mx-4 animate-bounce">
//         <div className="text-center">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className="text-red-400 text-xl font-bold mb-4">SYSTEM COMPROMISED</h2>
//           <p className="text-gray-300 mb-6">
//             Your system has been infiltrated. Do you wish to proceed deeper into the unknown?
//           </p>
//           <div className="space-y-4">
//             <button
//               onClick={() => transitionToRoom('mirror-room')}
//               className="w-full px-6 py-3 !bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors duration-300"
//             >
//               YES - PROCEED 
//             </button>
//             <button
//               onClick={() => transitionToRoom('dark')}
//               className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-black rounded transition-colors duration-300"
//             >
//               NO - ESCAPE
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Mirror Room
//   const MirrorRoom = () => {
//     const handleMirrorClick = () => {
//       setGameState(prev => ({
//         ...prev,
//         mirrorClicks: prev.mirrorClicks + 1,
//         cursorStyle: 'not-allowed'
//       }));
//     };

//     const bloodTexts = [
//       "WHO ARE YOU?",
//       "WHAT DO YOU WANT?",
//       "YOU SHOULDN'T BE HERE",
//       "TURN BACK NOW",
//       "THE MIRROR SEES ALL"
//     ];

//     return (
//       <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center relative">
//         <div className="absolute inset-0 bg-blue-900 opacity-5 animate-pulse"></div>
        
//         <div className="text-center">
//           <h1 className="text-white text-3xl mb-8 font-serif">The Mirror Chamber</h1>
          
//           <div 
//             onClick={handleMirrorClick}
//             className="relative w-64 h-80 mx-auto mb-8 cursor-pointer border-8 border-silver bg-gradient-to-b from-gray-300 to-gray-600 rounded-lg shadow-2xl hover:shadow-red-500/30 transition-all duration-500"
//           >
//             <div className="absolute inset-4 bg-black opacity-80 rounded flex items-center justify-center">
//               <div className="text-gray-400 text-lg">Look into the mirror...</div>
//             </div>
            
//             {gameState.mirrorClicks > 0 && (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-red-600 font-bold text-lg animate-pulse transform rotate-12">
//                   {bloodTexts[Math.min(gameState.mirrorClicks - 1, bloodTexts.length - 1)]}
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {gameState.mirrorClicks >= 3 && (
//             <button
//               onClick={() => transitionToRoom('puzzle-maze')}
//               className="px-8 py-3 !bg-purple-700 hover:bg-purple-600 text-white rounded transition-colors duration-300 animate-pulse"
//             >
//               Enter the Maze →
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Puzzle Maze
//   const PuzzleMaze = () => {
//     const puzzlePieces = [
//       { id: 1, shape: '🧩', clue: "The first key lies in darkness" },
//       { id: 2, shape: '🔑', clue: "Trust not the mirror's reflection" },
//       { id: 3, shape: '🗝️', clue: "The chatbot speaks in riddles" },
//       { id: 4, shape: '⚡', clue: "Choose your path carefully" }
//     ];

//     const handlePieceClick = (piece) => {
//       if (!gameState.puzzlePieces.includes(piece.id)) {
//         setGameState(prev => ({
//           ...prev,
//           puzzlePieces: [...prev.puzzlePieces, piece.id],
//           cursorStyle: 'grab'
//         }));
//       }
//     };

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-8">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-white text-3xl text-center mb-8 font-mono">The Puzzle Maze</h1>
          
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//             {puzzlePieces.map((piece) => (
//               <div
//                 key={piece.id}
//                 onClick={() => handlePieceClick(piece)}
//                 className={`
//                   p-6 rounded-lg cursor-pointer transition-all duration-300 text-center
//                   ${gameState.puzzlePieces.includes(piece.id) 
//                     ? 'bg-green-600 shadow-green-500/50' 
//                     : 'bg-gray-700 hover:bg-gray-600'
//                   }
//                 `}
//               >
//                 <div className="text-4xl mb-2">{piece.shape}</div>
//                 <p className="text-white text-sm">{piece.clue}</p>
//               </div>
//             ))}
//           </div>
          
//           {gameState.puzzlePieces.length >= 3 && (
//             <div className="text-center">
//               <p className="text-green-400 mb-4">Pieces collected! The path reveals itself...</p>
//               <button
//                 onClick={() => transitionToRoom('cryptic-chat')}
//                 className="px-8 py-3 !bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors duration-300"
//               >
//                 Enter the Chat Room →
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Cryptic Chatbox
//   const CrypticChat = () => {
//     const [userInput, setUserInput] = useState('');
    
//     const crypticResponses = [
//       "01110100 01101000 01100101 00100000 01100001 01101110 01110011 01110111 01100101 01110010",
//       "The trains run on time, but time runs on nothing...",
//       "Mirror mirror on the wall, who's the glitchiest of them all?",
//       "ERROR: Reality.exe has stopped working",
//       "Do you hear the whispers in the static?",
//       "The button remembers everything..."
//     ];

//     const handleSendMessage = () => {
//       if (userInput.trim()) {
//         const newMessages = [
//           { sender: 'user', text: userInput },
//           { sender: 'bot', text: crypticResponses[Math.floor(Math.random() * crypticResponses.length)] }
//         ];
        
//         setGameState(prev => ({
//           ...prev,
//           chatMessages: [...prev.chatMessages, ...newMessages]
//         }));
        
//         setUserInput('');
//       }
//     };

//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center p-4">
//         <div className="w-full max-w-2xl">
//           <div className="bg-gray-900 border border-green-500 rounded-lg overflow-hidden">
//             <div className="bg-green-900 p-3 text-green-400 font-mono text-sm">
//               SECURE CHAT - ENTITY_UNKNOWN
//             </div>
            
//             <div className="h-64 overflow-y-auto p-4 space-y-2">
//               <div className="text-green-400 text-sm font-mono">
//                 &gt; Connection established... Entity detected...
//               </div>
//               {gameState.chatMessages.map((msg, index) => (
//                 <div key={index} className={`text-sm ${msg.sender === 'user' ? 'text-blue-400' : 'text-red-400'}`}>
//                   {msg.sender === 'user' ? 'YOU: ' : 'ENTITY: '}{msg.text}
//                 </div>
//               ))}
//             </div>
            
//             <div className="p-4 border-t border-green-500">
//               <div className="flex space-x-2">
//                 <input
//                   ref={chatInputRef}
//                   type="text"
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   className="flex-1 bg-black border border-green-500 text-green-400 p-2 rounded font-mono text-sm"
//                   placeholder="Type your message..."
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="px-4 py-2 !bg-green-700 hover:bg-green-600 text-white rounded transition-colors duration-300"
//                 >
//                   SEND
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {gameState.chatMessages.length >= 4 && (
//             <div className="text-center mt-6">
//               <button
//                 onClick={() => transitionToRoom('moral-dilemma')}
//                 className="px-8 py-3 !bg-red-700 hover:bg-red-600 text-white rounded transition-colors duration-300 animate-pulse"
//               >
//                 The Entity Shows You Something... →
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Moral Dilemma Railway
//   const MoralDilemma = () => {
//     const handleTrainChoice = (choice) => {
//       setGameState(prev => ({ ...prev, trainChoice: choice }));
//     };

//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black flex items-center justify-center p-4">
//         <div className="max-w-4xl w-full text-center">
//           <h1 className="text-white text-3xl mb-8 font-serif">The Railway Dilemma</h1>
          
//           <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-8 mb-8">
//             <p className="text-white text-lg mb-6">
//               A runaway trolley is heading towards 5 people tied to the tracks. 
//               You can pull a lever to divert it to another track, but there's 1 person on that track.
//             </p>
//             <p className="text-yellow-400 text-sm mb-6">
//               But wait... what if the 5 people are murderers and the 1 person is a child? 🤔
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <button
//                 onClick={() => handleTrainChoice('save-five')}
//                 className={`p-6 rounded-lg transition-all duration-300 ${
//                   gameState.trainChoice === 'save-five' 
//                     ? '!bg-blue-600 border-2 border-blue-400' 
//                     : '!bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
//                 }`}
//               >
//                 <div className="text-4xl mb-2">🚂</div>
//                 <h3 className="text-white font-bold mb-2">Pull the Lever</h3>
//                 <p className="text-gray-300 text-sm">Save 5, sacrifice 1</p>
//               </button>
              
//               <button
//                 onClick={() => handleTrainChoice('save-one')}
//                 className={`p-6 rounded-lg transition-all duration-300 ${
//                   gameState.trainChoice === 'save-one' 
//                     ? '!bg-blue-700 border-2 border-red-400' 
//                     : '!bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
//                 }`}
//               >
//                 <div className="text-4xl mb-2">🚂</div>
//                 <h3 className="text-white font-bold mb-2">Do Nothing</h3>
//                 <p className="text-gray-300 text-sm">Let fate decide</p>
//               </button>
//             </div>
            
//             {gameState.trainChoice && (
//               <div className="mt-6">
//                 <p className="text-green-400 mb-4">
//                   Choice recorded... The simulation remembers everything.
//                 </p>
//                 <button
//                   onClick={() => transitionToRoom('stickman-game')}
//                   className="px-8 py-3 !bg-purple-700 hover:bg-purple-600 text-white rounded transition-colors duration-300"
//                 >
//                   Enter the Final Game →
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Mini Stickman Platformer
//   const StickmanGame = () => {
//     const moveStickman = (direction) => {
//       setGameState(prev => ({
//         ...prev,
//         stickmanPosition: {
//           x: Math.max(0, Math.min(90, prev.stickmanPosition.x + (direction === 'left' ? -10 : 10))),
//           y: prev.stickmanPosition.y
//         }
//       }));
//     };

//     const jumpStickman = () => {
//       setGameState(prev => ({
//         ...prev,
//         stickmanPosition: { ...prev.stickmanPosition, y: 60 }
//       }));
      
//       setTimeout(() => {
//         setGameState(prev => ({
//           ...prev,
//           stickmanPosition: { ...prev.stickmanPosition, y: 80 }
//         }));
//       }, 500);
//     };

//     return (
//       <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 flex flex-col items-center justify-center p-4">
//         <h1 className="text-white text-2xl mb-4 font-mono">Escape the Digital Void</h1>
        
//         <div className="relative w-full max-w-4xl h-64 bg-black border-2 border-white rounded-lg overflow-hidden">
//           {/* Game platforms */}
//           <div className="absolute bottom-0 left-0 w-full h-8 bg-green-600"></div>
//           <div className="absolute bottom-16 left-32 w-24 h-4 bg-green-600"></div>
//           <div className="absolute bottom-32 right-32 w-24 h-4 bg-green-600"></div>
          
//           {/* Goal */}
//           <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
//             🏆
//           </div>
          
//           {/* Stickman character */}
//           <div 
//             className="absolute transition-all duration-300 text-2xl"
//             style={{
//               left: `${gameState.stickmanPosition.x}%`,
//               bottom: `${100 - gameState.stickmanPosition.y}%`
//             }}
//           >
//             🚶
//           </div>
//         </div>
        
//         <div className="flex space-x-4 mt-6">
//           <button
//             onClick={() => moveStickman('left')}
//             className="px-6 py-3 !bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-300"
//           >
//             ← Left
//           </button>
//           <button
//             onClick={jumpStickman}
//             className="px-6 py-3 !bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-300"
//           >
//             ↑ Jump
//           </button>
//           <button
//             onClick={() => moveStickman('right')}
//             className="px-6 py-3 !bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-300"
//           >
//             Right →
//           </button>
//         </div>
        
//         {gameState.stickmanPosition.x > 80 && gameState.stickmanPosition.y < 70 && (
//           <div className="mt-6 text-center">
//             <p className="text-yellow-400 text-xl mb-4">You've reached the end! (for now)</p>
//             <button
//               onClick={() => transitionToRoom('final-chaos')}
//               className="px-8 py-3 !bg-red-700 hover:bg-red-600 text-white rounded transition-colors duration-300 animate-pulse"
//             >
//               COMPLETE THE EXPERIENCE →
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Final Chaos Room
//   const FinalChaos = () => {
//     useEffect(() => {
//       // Dramatic exit music simulation
//       const audio = {
//         play: () => console.log('🎵 DRAMATIC EXIT MUSIC PLAYING 🎵')
//       };
//       audio.play();
//     }, []);

//     return (
//       <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
//         {/* Chaotic visual effects */}
//         <div className="absolute inset-0">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-red-500 animate-ping"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 2}s`
//               }}
//             />
//           ))}
//         </div>
        
//         <div className="text-center z-10 animate-pulse">
//           <h1 className="text-6xl text-red-500 font-bold mb-4 animate-bounce">
//             SYSTEM OVERLOAD
//           </h1>
//           <p className="text-white text-2xl mb-8 animate-pulse">
//             REALITY.EXE HAS STOPPED WORKING
//           </p>
          
//           <div className="space-y-4 text-lg text-gray-300">
//             <p className="animate-pulse">All choices recorded...</p>
//             <p className="animate-pulse">All paths traversed...</p>
//             <p className="animate-pulse">The experience is complete.</p>
//           </div>
          
//           <button
//             onClick={() => {
//               setCurrentRoom('dark');
//               setGameState({
//                 hasClickedRed: false,
//                 mirrorClicks: 0,
//                 puzzlePieces: [],
//                 chatMessages: [],
//                 trainChoice: null,
//                 stickmanPosition: { x: 50, y: 80 },
//                 cursorStyle: 'default'
//               });
//               setShowGlassEffect(false);
//             }}
//             className="mt-8 px-8 py-3 !bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-300"
//           >
//             RESTART EXPERIENCE
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Wholesome Room (unchanged)
//   const WholesoomeRoom = () => (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center p-8">
//       <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl w-full text-center">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Cozy Corner! 🌟</h1>
//           <p className="text-lg text-gray-600">You chose the safe path. Here are some wholesome activities!</p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
//             <div className="text-4xl mb-3">🎨</div>
//             <h3 className="font-semibold text-pink-800 mb-2">Creative Corner</h3>
//             <p className="text-sm text-pink-600">Draw, design, and create beautiful things!</p>
//           </div>
          
//           <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
//             <div className="text-4xl mb-3">🧩</div>
//             <h3 className="font-semibold text-blue-800 mb-2">Puzzle Games</h3>
//             <p className="text-sm text-blue-600">Challenge your mind with fun puzzles!</p>
//           </div>
          
//           <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
//             <div className="text-4xl mb-3">🌱</div>
//             <h3 className="font-semibold text-green-800 mb-2">Virtual Garden</h3>
//             <p className="text-sm text-green-600">Grow and tend to digital plants!</p>
//           </div>
//         </div>
        
//         <button 
//           onClick={() => setCurrentRoom('dark')}
//           className="mt-8 px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 transition-colors duration-300"
//         >
//           ← Go Back
//         </button>
//       </div>
//     </div>
//   );

//   // Apply cursor style based on game state
//   useEffect(() => {
//     document.body.style.cursor = gameState.cursorStyle;
//     return () => {
//       document.body.style.cursor = 'default';
//     };
//   }, [gameState.cursorStyle]);

//   // Render current room
//   const renderCurrentRoom = () => {
//     switch (currentRoom) {
//       case 'dark': return <DarkRoom />;
//       case 'wholesome': return <WholesoomeRoom />;
//       case 'hacked-popup': return <HackedPopup />;
//       case 'mirror-room': return <MirrorRoom />;
//       case 'puzzle-maze': return <PuzzleMaze />;
//       case 'cryptic-chat': return <CrypticChat />;
//       case 'moral-dilemma': return <MoralDilemma />;
//       case 'stickman-game': return <StickmanGame />;
//       case 'final-chaos': return <FinalChaos />;
//       default: return <DarkRoom />;
//     }
//   };

//   return (
//     <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
//       {renderCurrentRoom()}
      
//       <style jsx>{`
//         @keyframes glassShatter {
//           0% {
//             transform: translate(0, 0) rotate(var(--rotation)) scale(1);
//             opacity: 0.8;
//           }
//           100% {
//             transform: translate(calc(var(--random-x) * 300px), calc(var(--random-y) * 300px)) rotate(calc(var(--rotation) + 360deg)) scale(0);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MysteryExperience;