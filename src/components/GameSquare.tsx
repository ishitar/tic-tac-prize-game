
import React from 'react';

interface GameSquareProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinningSquare: boolean;
  index: number;
}

const GameSquare: React.FC<GameSquareProps> = ({ value, onClick, isWinningSquare, index }) => {
  // Logo for each square
  const renderMyntraLogo = () => {
    return (
      <div className="absolute top-1 right-1 opacity-20 w-6 h-6">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M221.749,132.115a25.489,25.489,0,0,1,50.978.029V293.572L336.4,265.425l-49,126.641-49-126.641,63.678,28.147V132.144a68.14,68.14,0,0,0-68.07-68.138c-.2,0-.395,0-.594.005V34.006c.2,0,.394-.5.594-.005a98.139,98.139,0,0,1,98.07,98.138V265.515l-49.559-23.178-49.441,23.178V132.115Z" 
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
      {renderMyntraLogo()}
      {renderSymbol()}
    </div>
  );
};

export default GameSquare;
