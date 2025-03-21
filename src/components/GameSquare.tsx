
import React from 'react';

interface GameSquareProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinningSquare: boolean;
  index: number;
}

const GameSquare: React.FC<GameSquareProps> = ({ value, onClick, isWinningSquare, index }) => {
  const renderSymbol = () => {
    if (value === null) return null;

    if (value === 'X') {
      return (
        <div className="x-shape w-12 h-12 md:w-16 md:h-16">
          <svg width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10L40 40" strokeLinecap="round" />
            <path d="M40 10L10 40" strokeLinecap="round" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="o-shape w-12 h-12 md:w-16 md:h-16">
          <svg width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="15" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div 
      className={`game-square min-w-[80px] min-h-[80px] md:min-w-[100px] md:min-h-[100px] cursor-pointer 
                ${value === null ? 'hover:bg-game-hover' : ''} 
                ${isWinningSquare ? 'bg-game-win/10' : ''}`}
      onClick={onClick}
      data-testid={`square-${index}`}
    >
      {renderSymbol()}
    </div>
  );
};

export default GameSquare;
