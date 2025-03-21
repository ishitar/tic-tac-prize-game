
import React from 'react';
import { GameStatus } from '../utils/gameLogic';

interface HeaderProps {
  gameStatus: GameStatus;
}

const Header: React.FC<HeaderProps> = ({ gameStatus }) => {
  const { state, currentPlayer, winner } = gameStatus;
  
  const getStatusMessage = () => {
    if (state === 'won') {
      return winner === 'X' ? 'You Won!' : 'AI Won';
    } else if (state === 'draw') {
      return 'It\'s a Draw';
    } else {
      return currentPlayer === 'X' ? 'Your Turn' : 'AI is Thinking...';
    }
  };
  
  const statusMessage = getStatusMessage();
  const isFinished = state === 'won' || state === 'draw';
  
  return (
    <div className="text-center mb-8 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-light mb-3 tracking-tight">
        Tic Tac Prize
      </h1>
      <div 
        className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium 
                  ${isFinished 
                    ? state === 'won' 
                      ? winner === 'X' 
                        ? 'bg-game-player/10 text-game-player animate-pulse-gentle' 
                        : 'bg-game-ai/10 text-game-ai' 
                      : 'bg-game-draw/10 text-game-draw'
                    : currentPlayer === 'X' 
                      ? 'bg-game-player/10 text-game-player' 
                      : 'bg-game-ai/10 text-game-ai animate-pulse-gentle'
                  }`}
      >
        {statusMessage}
      </div>
      {winner === 'X' && (
        <p className="mt-3 text-sm text-gray-500 animate-fade-in">
          Congratulations! Claim your Myntra coupon.
        </p>
      )}
    </div>
  );
};

export default Header;
