
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw } from 'lucide-react';
import GameBoard from '@/components/GameBoard';
import PrizeModal from '@/components/PrizeModal';
import Header from '@/components/Header';
import { initializeGame, makeMove, makeAIMove, GameStatus } from '@/utils/gameLogic';

const Index = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(initializeGame);
  const [isPrizeModalOpen, setIsPrizeModalOpen] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const { toast } = useToast();

  // Reset the game
  const resetGame = () => {
    setGameStatus(initializeGame);
    setIsPrizeModalOpen(false);
    setAiThinking(false); // Ensure AI thinking is reset
  };

  // Handle player's click on a square
  const handleSquareClick = (index: number) => {
    if (aiThinking || gameStatus.state !== 'playing' || gameStatus.currentPlayer !== 'X') {
      return;
    }

    // If square is already filled, show a toast message
    if (gameStatus.board[index] !== null) {
      toast({
        description: "This square is already filled.",
        duration: 2000,
      });
      return;
    }

    // Make player's move
    const newGameStatus = makeMove(gameStatus, index);
    setGameStatus(newGameStatus);
  };

  // Handle AI's turn - with quicker response time and improved reliability
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Check if it's AI's turn
    if (gameStatus.currentPlayer === 'O' && gameStatus.state === 'playing') {
      setAiThinking(true);
      
      // Reduced timeout for quicker AI response
      timer = setTimeout(() => {
        try {
          const aiGameStatus = makeAIMove(gameStatus);
          setGameStatus(aiGameStatus);
        } catch (error) {
          console.error("Error in AI move:", error);
          // Fallback - make a random move if there's an error
          const availableSquares = gameStatus.board
            .map((square, i) => square === null ? i : null)
            .filter(i => i !== null) as number[];
            
          if (availableSquares.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableSquares.length);
            const fallbackGameStatus = makeMove(
              { ...gameStatus, currentPlayer: 'O' }, 
              availableSquares[randomIndex]
            );
            setGameStatus(fallbackGameStatus);
          }
        } finally {
          // Ensure aiThinking is set to false regardless of success or failure
          setAiThinking(false);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  // Check if player won and show prize modal
  useEffect(() => {
    if (gameStatus.state === 'won' && gameStatus.winner === 'X') {
      const timer = setTimeout(() => {
        setIsPrizeModalOpen(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="glass-card px-6 py-8 w-full max-w-md animate-scale-in">
        {/* Game header with status */}
        <Header gameStatus={gameStatus} />
        
        {/* Game board */}
        <GameBoard 
          gameStatus={gameStatus} 
          onSquareClick={handleSquareClick} 
        />
        
        {/* Reset button */}
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={resetGame} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            New Game
          </Button>
        </div>
      </div>
      
      {/* Prize modal */}
      <PrizeModal 
        isOpen={isPrizeModalOpen} 
        onClose={() => setIsPrizeModalOpen(false)} 
      />
      
      <Toaster />
    </div>
  );
};

export default Index;
