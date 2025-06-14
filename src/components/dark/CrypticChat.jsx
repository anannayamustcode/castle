import React, { useState } from 'react';

const CrypticChat = ({ gameState, setGameState, transitionToRoom, chatInputRef }) => {
  const [userInput, setUserInput] = useState('');
  
  const crypticResponses = [
    "01110100 01101000 01100101 00100000 01100001 01101110 01110011 01110111 01100101 01110010",
    "The trains run on time, but time runs on nothing...",
    "Mirror mirror on the wall, who's the glitchiest of them all?",
    "ERROR: Reality.exe has stopped working",
    "Do you hear the whispers in the static?",
    "The button remembers everything..."
  ];

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newMessages = [
        { sender: 'user', text: userInput },
        { sender: 'bot', text: crypticResponses[Math.floor(Math.random() * crypticResponses.length)] }
      ];
      
      setGameState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages, ...newMessages]
      }));
      
      setUserInput('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-900 border border-green-500 rounded-lg overflow-hidden">
          <div className="bg-green-900 p-3 text-green-400 font-mono text-sm">
            SECURE CHAT - ENTITY_UNKNOWN
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-2">
            <div className="text-green-400 text-sm font-mono">
              &gt; Connection established... Entity detected...
            </div>
            {gameState.chatMessages.map((msg, index) => (
              <div key={index} className={`text-sm ${msg.sender === 'user' ? 'text-blue-400' : 'text-red-400'}`}>
                {msg.sender === 'user' ? 'YOU: ' : 'ENTITY: '}{msg.text}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-green-500">
            <div className="flex space-x-2">
              <input
                ref={chatInputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-black border border-green-500 text-green-400 p-2 rounded font-mono text-sm"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 !bg-green-700 hover:bg-green-600 text-white rounded transition-colors duration-300"
              >
                SEND
              </button>
            </div>
          </div>
        </div>
        
        {gameState.chatMessages.length >= 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => transitionToRoom('moral-dilemma')}
              className="px-8 py-3 !bg-red-700 hover:bg-red-600 text-white rounded transition-colors duration-300 animate-pulse"
            >
              The Entity Shows You Something... →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrypticChat;