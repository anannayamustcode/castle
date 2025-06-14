import React from 'react';

const HackedPopup = ({ transitionToRoom }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse"></div>
      <div className="absolute top-0 left-0 text-green-400 font-mono text-xs p-4 opacity-50">
        BREACH DETECTED... INITIALIZING COUNTERMEASURES...
      </div>
      
      <div className="bg-gray-900 border-2 border-red-500 p-8 rounded-lg max-w-md w-full mx-4 animate-bounce">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-red-400 text-xl font-bold mb-4">SYSTEM COMPROMISED</h2>
          <p className="text-gray-300 mb-6">
            Your system has been infiltrated. Do you wish to proceed deeper into the unknown?
          </p>
          <div className="space-y-4">
            <button
              onClick={() => transitionToRoom('mirror-room')}
              className="w-full px-6 py-3 !bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors duration-300"
            >
              YES - PROCEED 
            </button>
            <button
              onClick={() => transitionToRoom('dark')}
              className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-black rounded transition-colors duration-300"
            >
              NO - ESCAPE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackedPopup;