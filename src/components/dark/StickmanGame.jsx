import React, { useState, useEffect, useCallback } from 'react';

const StickmanGame = ({ gameState = { stickmanPosition: { x: 10, y: 82 } }, setGameState = () => {}, transitionToRoom = () => {} }) => {
  const [gamePhysics, setGamePhysics] = useState({
    velocity: { x: 0, y: 0 },
    onGround: true,
    canDoubleJump: true
  });
  const [collectibles, setCollectibles] = useState([
    { id: 1, x: 25, y: 72, collected: false },
    { id: 2, x: 60, y: 57, collected: false },
    { id: 3, x: 75, y: 42, collected: false }
  ]);
  const [keys, setKeys] = useState({});
  const [touchControls, setTouchControls] = useState({
    left: false,
    right: false,
    jump: false
  });

  // Platform definitions
  const platforms = [
    { x: 0, y: 90, width: 100, height: 10, type: 'ground' },
    { x: 20, y: 75, width: 25, height: 5, type: 'platform' },
    { x: 55, y: 60, width: 20, height: 5, type: 'platform' },
    { x: 70, y: 45, width: 25, height: 5, type: 'platform' }
  ];

  // Keyboard event handlers
  const handleKeyDown = useCallback((e) => {
    setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
  }, []);

  const handleKeyUp = useCallback((e) => {
    setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Touch control handlers
  const handleTouchStart = (control) => {
    setTouchControls(prev => ({ ...prev, [control]: true }));
  };

  const handleTouchEnd = (control) => {
    setTouchControls(prev => ({ ...prev, [control]: false }));
  };

  // Collision detection
  const checkPlatformCollision = (x, y, width = 3, height = 8) => {
    for (let platform of platforms) {
      if (x + width > platform.x && 
          x < platform.x + platform.width &&
          y + height > platform.y && 
          y < platform.y + platform.height) {
        return platform;
      }
    }
    return null;
  };

  // Game physics and movement
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setGameState(prev => {
        let newX = prev.stickmanPosition.x;
        let newY = prev.stickmanPosition.y;
        let newVelocity = { ...gamePhysics.velocity };
        let onGround = false;
        let canDoubleJump = gamePhysics.canDoubleJump;

        // Check both keyboard and touch inputs
        const leftPressed = keys['a'] || keys['arrowleft'] || touchControls.left;
        const rightPressed = keys['d'] || keys['arrowright'] || touchControls.right;
        const jumpPressed = keys[' '] || keys['w'] || keys['arrowup'] || touchControls.jump;

        // Horizontal movement
        if (leftPressed) {
          newVelocity.x = Math.max(newVelocity.x - 0.5, -3);
        } else if (rightPressed) {
          newVelocity.x = Math.min(newVelocity.x + 0.5, 3);
        } else {
          newVelocity.x *= 0.8; // Friction
        }

        // Jumping
        if (jumpPressed && (gamePhysics.onGround || gamePhysics.canDoubleJump)) {
          if (gamePhysics.onGround) {
            newVelocity.y = -8;
            onGround = false;
          } else if (gamePhysics.canDoubleJump) {
            newVelocity.y = -6;
            canDoubleJump = false;
          }
        }

        // Apply gravity
        newVelocity.y += 0.4;

        // Update position
        newX += newVelocity.x;
        newY += newVelocity.y;

        // Boundary constraints
        newX = Math.max(1, Math.min(96, newX));

        // Platform collision detection
        const collision = checkPlatformCollision(newX, newY);
        if (collision && newVelocity.y > 0) {
          newY = collision.y - 8;
          newVelocity.y = 0;
          onGround = true;
          canDoubleJump = true;
        }

        // Ground collision
        if (newY > 82) {
          newY = 82;
          newVelocity.y = 0;
          onGround = true;
          canDoubleJump = true;
        }

        // Update physics state
        setGamePhysics({
          velocity: newVelocity,
          onGround,
          canDoubleJump
        });

        return {
          ...prev,
          stickmanPosition: { x: newX, y: newY }
        };
      });
    }, 16); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [keys, touchControls, gamePhysics]);

  // Collectible collection
  useEffect(() => {
    const playerX = gameState.stickmanPosition.x;
    const playerY = gameState.stickmanPosition.y;

    setCollectibles(prev => prev.map(collectible => {
      if (!collectible.collected && 
          Math.abs(playerX - collectible.x) < 4 && 
          Math.abs(playerY - collectible.y) < 6) {
        return { ...collectible, collected: true };
      }
      return collectible;
    }));
  }, [gameState.stickmanPosition]);

  const collectedCount = collectibles.filter(c => c.collected).length;
  const allCollected = collectedCount === collectibles.length;
  const isNearGoal = gameState.stickmanPosition.x > 85 && gameState.stickmanPosition.y < 50;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-700 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h1 className="text-white text-3xl mb-2 font-bold">Platform Game</h1>
        <div className="text-white text-lg">
          Collected: {collectedCount}/{collectibles.length}
        </div>
        {/* <div className="text-gray-300 text-sm mt-2">
          Use WASD or Arrow Keys to move and jump
        </div> */}
      </div>
      
      <div className="relative w-full max-w-4xl h-80 bg-black border-2 border-white rounded-lg overflow-hidden">
        {/* Platforms */}
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="absolute bg-green-600 rounded"
            style={{
              left: `${platform.x}%`,
              bottom: `${100 - platform.y - platform.height}%`,
              width: `${platform.width}%`,
              height: `${platform.height}%`
            }}
          />
        ))}
        
        {/* Collectibles */}
        {collectibles.map(collectible => !collectible.collected && (
          <div
            key={collectible.id}
            className="absolute w-4 h-4 bg-yellow-400 rounded-full"
            style={{
              left: `${collectible.x}%`,
              bottom: `${100 - collectible.y}%`
            }}
          />
        ))}
        
        {/* Goal */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full" />
        
        {/* Player */}
        <div 
          className="absolute w-4 h-8 bg-blue-400 rounded transition-all duration-100"
          style={{
            left: `${gameState.stickmanPosition.x}%`,
            bottom: `${100 - gameState.stickmanPosition.y}%`
          }}
        />
      </div>

      {/* Touch Controls for Mobile */}
      <div className="flex justify-center items-center space-x-4 mt-6 md:hidden">
        <div className="flex space-x-2">
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleTouchStart('left');
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleTouchEnd('left');
            }}
            onMouseDown={() => handleTouchStart('left')}
            onMouseUp={() => handleTouchEnd('left')}
            onMouseLeave={() => handleTouchEnd('left')}
            className="w-16 h-10 rounded-lg border-2 border-white text-white font-bold text-lg select-none !bg-blue-800 active:bg-blue-600"
          >
            ←
          </button>
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              handleTouchStart('right');
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleTouchEnd('right');
            }}
            onMouseDown={() => handleTouchStart('right')}
            onMouseUp={() => handleTouchEnd('right')}
            onMouseLeave={() => handleTouchEnd('right')}
            className="w-16 h-10 rounded-lg border-2 border-white text-white font-bold text-lg select-none !bg-blue-800 active:bg-blue-600"
          >
            →
          </button>
        </div>
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            handleTouchStart('jump');
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleTouchEnd('jump');
          }}
          onMouseDown={() => handleTouchStart('jump')}
          onMouseUp={() => handleTouchEnd('jump')}
          onMouseLeave={() => handleTouchEnd('jump')}
          className="w-20 h-10 rounded-lg border-1 border-white text-white font-bold text-sm select-none !bg-green-800 active:bg-green-600"
        >
          JUMP
        </button>
      </div>
      
      {/* Victory condition */}
      {isNearGoal && allCollected && (
        <div className="mt-6 text-center">
          <div className="bg-black bg-opacity-50 rounded-lg p-3 shadow-lg">
            <p className="text-white text-xl mb-4">Level Complete</p>
            <button
              onClick={() => transitionToRoom('final-chaos')}
              className="px-9 py-2 !bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Incomplete message */}
      {isNearGoal && !allCollected && (
        <div className="mt-6 text-center">
          <div className="bg-black bg-opacity-50 rounded-lg p-4 border border-red-400">
            <p className="text-red-300">Collect all items to proceed!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickmanGame;  