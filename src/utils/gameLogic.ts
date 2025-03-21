type Player = 'X' | 'O' | null;
type Board = Player[];
type GameState = 'playing' | 'won' | 'draw';

export interface GameStatus {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  state: GameState;
  winLine: number[] | null;
}

// Winning combinations (rows, columns, diagonals)
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Initialize a new game state
export const initializeGame = (): GameStatus => ({
  board: Array(9).fill(null),
  currentPlayer: 'X', // Player always starts
  winner: null,
  state: 'playing',
  winLine: null
});

// Check if the game is won by any player
export const checkWinner = (board: Board): { winner: Player; winLine: number[] | null } => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winLine: combo };
    }
  }
  return { winner: null, winLine: null };
};

// Check if the game is a draw
export const isDraw = (board: Board): boolean => {
  return board.every(square => square !== null);
};

// Make a player move
export const makeMove = (gameStatus: GameStatus, squareIndex: number): GameStatus => {
  // If square is already filled or game is over, return unchanged
  if (
    gameStatus.board[squareIndex] !== null || 
    gameStatus.state !== 'playing'
  ) {
    return gameStatus;
  }

  // Create a new board with the move
  const newBoard = [...gameStatus.board];
  newBoard[squareIndex] = gameStatus.currentPlayer;

  // Check for winner
  const { winner, winLine } = checkWinner(newBoard);
  
  // Check for draw
  const draw = !winner && isDraw(newBoard);
  
  // Determine new state
  let newState: GameState = 'playing';
  if (winner) newState = 'won';
  else if (draw) newState = 'draw';

  return {
    board: newBoard,
    currentPlayer: gameStatus.currentPlayer === 'X' ? 'O' : 'X', // Switch player
    winner,
    state: newState,
    winLine
  };
};

// AI makes a move - now with quicker, more randomized response
export const makeAIMove = (gameStatus: GameStatus): GameStatus => {
  if (gameStatus.state !== 'playing' || gameStatus.currentPlayer !== 'O') {
    return gameStatus;
  }

  const board = gameStatus.board;
  
  // Get all available moves
  const availableSquares = board.map((square, i) => square === null ? i : null).filter(i => i !== null) as number[];
  
  if (availableSquares.length === 0) {
    return gameStatus;
  }
  
  // Random move selection (increased to 40% chance for more variation)
  if (Math.random() < 0.4) {
    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    return makeMove({ ...gameStatus, currentPlayer: 'O' }, availableSquares[randomIndex]);
  }
  
  // Otherwise use strategy with slightly randomized priorities
  const strategies = [
    // Try to win
    () => findWinningMove(board, 'O'),
    // Block player from winning
    () => findWinningMove(board, 'X'),
    // Take center if available
    () => board[4] === null ? 4 : -1,
    // Take a corner
    () => {
      const corners = [0, 2, 6, 8];
      const availableCorners = corners.filter(i => board[i] === null);
      if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
      }
      return -1;
    },
    // Take any available square
    () => availableSquares[Math.floor(Math.random() * availableSquares.length)]
  ];
  
  // Shuffle strategies slightly for more randomness
  if (Math.random() < 0.3) {
    const temp = strategies[2];
    strategies[2] = strategies[3];
    strategies[3] = temp;
  }
  
  // Try each strategy until one works
  for (const strategy of strategies) {
    const moveIndex = strategy();
    if (moveIndex !== -1) {
      return makeMove({ ...gameStatus, currentPlayer: 'O' }, moveIndex);
    }
  }
  
  // Fallback - take the first available square
  return makeMove({ ...gameStatus, currentPlayer: 'O' }, availableSquares[0]);
};

// Find a winning move for the given player
const findWinningMove = (board: Board, player: Player): number => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    // Check if two squares in a line are filled by player and the third is empty
    if (
      (board[a] === player && board[b] === player && board[c] === null) ||
      (board[a] === player && board[c] === player && board[b] === null) ||
      (board[b] === player && board[c] === player && board[a] === null)
    ) {
      // Return the empty square
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }
  return -1;
};

// Generate a random Myntra coupon code
export const generateCoupon = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let coupon = '';
  // Generate 4 groups of 4 characters
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      coupon += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < 3) coupon += '-';
  }
  return coupon;
};
