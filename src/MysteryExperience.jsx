// import React, { useState, useEffect, useRef } from 'react';
// import DarkRoom from './components/dark/DarkRoom';
// import HackedPopup from './components/dark/HackedPopup';
// import MirrorRoom from './components/dark/MirrorRoom';
// import PuzzleMaze from './components/dark/PuzzleMaze';
// import CrypticChat from './components/dark/CrypticChat';
// import MoralDilemma from './components/dark/MoralDilemma';
// import StickmanGame from './components/dark/StickmanGame';
// import FinalChaos from './components/dark/FinalChaos';
// import WholesoomeRoom from './components/light/WholesoomeRoom';

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

//   // Apply cursor style based on game state
//   useEffect(() => {
//     document.body.style.cursor = gameState.cursorStyle;
//     return () => {
//       document.body.style.cursor = 'default';
//     };
//   }, [gameState.cursorStyle]);

//   // Render current room
//   const renderCurrentRoom = () => {
//     const commonProps = {
//       gameState,
//       setGameState,
//       transitionToRoom,
//       showGlassEffect,
//       glassShards,
//       chatInputRef
//     };

//     switch (currentRoom) {
//       case 'dark': 
//         return <DarkRoom {...commonProps} handleRedButtonClick={handleRedButtonClick} />;
//       case 'wholesome': 
//         return <WholesoomeRoom setCurrentRoom={setCurrentRoom} />;
//       case 'hacked-popup': 
//         return <HackedPopup {...commonProps} />;
//       case 'mirror-room': 
//         return <MirrorRoom {...commonProps} />;
//       case 'puzzle-maze': 
//         return <PuzzleMaze {...commonProps} />;
//       case 'cryptic-chat': 
//         return <CrypticChat {...commonProps} />;
//       case 'moral-dilemma': 
//         return <MoralDilemma {...commonProps} />;
//       case 'stickman-game': 
//         return <StickmanGame {...commonProps} />;
//       case 'final-chaos': 
//         return <FinalChaos {...commonProps} 
//           setCurrentRoom={setCurrentRoom} 
//           setShowGlassEffect={setShowGlassEffect} 
//         />;
//       default: 
//         return <DarkRoom {...commonProps} handleRedButtonClick={handleRedButtonClick} />;
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


// // This code is a React component that serves as the main entry point for a mystery experience game.

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

  const transitionToRoom = (roomName, delay = 0) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentRoom(roomName);
      setIsTransitioning(false);
    }, delay);
  };

  const handleRedButtonClick = () => {
    setGlassShards(generateGlassShards());
    setShowGlassEffect(true);
    setGameState(prev => ({ ...prev, hasClickedRed: true, cursorStyle: 'crosshair' }));

    setTimeout(() => {
      transitionToRoom('hacked-popup', 1500);
    }, 500);
  };

  useEffect(() => {
    document.body.style.cursor = gameState.cursorStyle;
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [gameState.cursorStyle]);

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
        return <FinalChaos {...commonProps} setCurrentRoom={setCurrentRoom} setShowGlassEffect={setShowGlassEffect} />;
      default:
        return <DarkRoom {...commonProps} handleRedButtonClick={handleRedButtonClick} />;
    }
  };

  return (
    <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'} min-h-screen`}>
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
