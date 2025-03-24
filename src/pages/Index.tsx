
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw } from 'lucide-react';
import GameBoard from '@/components/GameBoard';
import PrizeModal from '@/components/PrizeModal';
import Header from '@/components/Header';
import { initializeGame, makeMove, makeAIMove, GameStatus } from '@/utils/gameLogic';
import ArticleContent from '@/components/ArticleContent';

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
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content - Article on the left */}
          <div className="lg:w-2/3 w-full">
            <ArticleContent />
          </div>
          
          {/* Game as an ad on the right */}
          <div className="lg:w-1/3 w-full">
            <div className="glass-card px-6 py-8 sticky top-8 animate-scale-in border-2 border-game-player/20 rounded-xl overflow-hidden">
              <div className="absolute top-2 right-3 text-xs font-medium text-gray-500">Advertisement</div>
              
              {/* Game header with status */}
              <Header gameStatus={gameStatus} />
              
              {/* Game board */}
              <GameBoard 
                gameStatus={gameStatus} 
                onSquareClick={handleSquareClick} 
              />
              
              {/* Reset button */}
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={resetGame} 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Play Again
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Play to win Apple Store coupons!</p>
              </div>
            </div>
          </div>
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
