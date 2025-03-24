
import React from 'react';

interface GameSquareProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinningSquare: boolean;
  index: number;
}

const GameSquare: React.FC<GameSquareProps> = ({ value, onClick, isWinningSquare, index }) => {
  // Logo for each square
  const renderAppleLogo = () => {
    return (
      <div className="absolute top-1 right-1 opacity-20 w-6 h-6">
        <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" 
            fill="currentColor"
          />
        </svg>
      </div>
    );
  };

  const renderSymbol = () => {
    if (value === null) return null;

    if (value === 'X') {
      return (
        <div className="x-shape w-14 h-14 md:w-18 md:h-18">
          <svg width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10L40 40" strokeWidth="6" strokeLinecap="round" />
            <path d="M40 10L10 40" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="o-shape w-14 h-14 md:w-18 md:h-18">
          <svg width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="15" strokeWidth="6" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div 
      className={`game-square min-w-[90px] min-h-[90px] md:min-w-[110px] md:min-h-[110px] cursor-pointer 
                ${value === null ? 'hover:bg-game-hover' : ''} 
                ${isWinningSquare ? 'bg-game-win/20' : ''}`}
      onClick={onClick}
      data-testid={`square-${index}`}
    >
      {renderAppleLogo()}
      {renderSymbol()}
    </div>
  );
};

export default GameSquare;
