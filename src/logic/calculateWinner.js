/**
 * Calculates the winner of the Tic Tac Toe game based on the current board state.
 * @param {Array} squares - The array representing the current state of the game board.
 * @returns {string|null} - The symbol ('X' or 'O') of the winner or null if there is no winner yet.
 */


const calculateWinner = (squares) => {
    // Define winning combinations (lines) on the game board
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    // Check each winning combination
    for (const [a, b, c] of lines) {
      // If the squares at positions a, b, and c are all the same (not null), a winner is found
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        // Return the symbol of the winner
        return squares[a];
      }
    }
  
    // If no winner is found, return null
    return null;
  };
  
  export default calculateWinner;
  