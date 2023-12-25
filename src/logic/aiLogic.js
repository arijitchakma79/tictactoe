import calculateWinner from "./calculateWinner";

/**
 * Checks if the game board is full.
 * @param {Array} board - The current state of the game board.
 * @returns {boolean} - True if the board is full, otherwise false.
 */
const isBoardFull = (board) => board.every((cell) => cell !== null);

/**
 * Evaluates the current state of the game board.
 * @param {Array} board - The current state of the game board.
 * @returns {number} - The score for the current board state (-1, 0, 1).
 */
const evaluateBoard = (board) => {
  const winner = calculateWinner(board);
  if (winner === 'X') {
    return -1;
  } else if (winner === 'O') {
    return 1;
  } else {
    return 0;
  }
};

/**
 * Implementation of the minimax algorithm for finding the best move.
 * @param {Array} board - The current state of the game board.
 * @param {number} depth - The depth of the recursion in the minimax algorithm.
 * @param {boolean} maximizingPlayer - Indicates whether the player is maximizing or minimizing.
 * @returns {number} - The score for the best move.
 */
const minimax = (board, depth, maximizingPlayer) => {
  const score = evaluateBoard(board);

  if (score !== 0) {
    return score;
  }

  if (isBoardFull(board)) {
    return 0;
  }

  if (maximizingPlayer) {
    let maxEvaluation = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const evaluation = minimax(board, depth + 1, false);
        board[i] = null;
        maxEvaluation = Math.max(maxEvaluation, evaluation);
      }
    }
    return maxEvaluation;
  } else {
    let minEvaluation = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const evaluation = minimax(board, depth + 1, true);
        board[i] = null;
        minEvaluation = Math.min(minEvaluation, evaluation);
      }
    }
    return minEvaluation;
  }
};

/**
 * Finds the best move using the minimax algorithm.
 * @param {Array} board - The current state of the game board.
 * @returns {number} - The index of the best move.
 */
const getBestMove = (board) => {
  const emptySquares = board.reduce((acc, cell, index) => {
    if (cell === null) {
      acc.push(index);
    }
    return acc;
  }, []);

  let bestMove = -1;
  let bestEvaluation = -Infinity;

  emptySquares.forEach((index) => {
    const newBoard = board.slice();
    newBoard[index] = 'O';
    const evaluation = minimax(newBoard, 0, false);

    if (evaluation > bestEvaluation) {
      bestEvaluation = evaluation;
      bestMove = index;
    }
  });

  return bestMove;
};

export { getBestMove, isBoardFull };
