
import React from 'react';
import GameSquare from './GameSquare';
import { GameStatus } from '../utils/gameLogic';

interface GameBoardProps {
  gameStatus: GameStatus;
  onSquareClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameStatus, onSquareClick }) => {
  const { board, winLine } = gameStatus;

  const renderSquare = (index: number) => {
    const isWinningSquare = winLine ? winLine.includes(index) : false;
    
    return (
      <GameSquare 
        key={index} 
        value={board[index]} 
        onClick={() => onSquareClick(index)}
        isWinningSquare={isWinningSquare}
        index={index}
      />
    );
  };

  return (
    <div 
      className="grid grid-cols-3 gap-0 border-2 border-game-border rounded-lg overflow-hidden 
                 bg-game-board shadow-lg transform transition-transform duration-500 
                 w-[242px] md:w-[302px] mx-auto"
      aria-label="Tic Tac Toe game board"
    >
      {Array(9).fill(null).map((_, index) => renderSquare(index))}
    </div>
  );
};

export default GameBoard;
