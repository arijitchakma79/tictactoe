// App.js
import React, { useState } from "react";
import { Board } from "./components";
import calculateWinner from "./logic/calculateWinner";
import './styles/app.css'
import { isBoardFull, getBestMove } from "./logic/aiLogic";


const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [modeAI, setModeAi] = useState(false);

  const handleAiClick = (index) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[index]) {
      return;
    }

    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    
    if (!calculateWinner(newSquares) && !newSquares.every(cell => cell !== null)) {
    
      setTimeout(() => {
    
        const aiMove = getBestMove(newSquares);

       
        const updatedSquares = newSquares.slice();
        updatedSquares[aiMove] = 'O';

        
        setSquares(updatedSquares);
        setXIsNext(true); 
      }, 500); 
    }
  };

  const handleMultiplayerClick = (index) => {
    const newSquares = squares.slice();

    if (calculateWinner(newSquares) || newSquares[index]){
      return;
    }

    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  const handleAiMode = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setModeAi(true);
  };

  const handleMultiplayerMode = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setModeAi(false);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setModeAi(false);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull(squares)) {
    status = 'It\'s a Tie!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }


  return (
    <div className="game">
      <div className="mode">
        {modeAI ? 'You are playing against AI' : 'You are playing against another player'}
        
      </div>
      <div className="status">{status}</div>
      <div className="game-board">
      <Board squares={squares} onClick={modeAI? handleAiClick : handleMultiplayerClick} />
      </div>
      <div className="game-info">
        <div className="buttons">
        <button onClick={handleMultiplayerMode}>Play Multiplayer</button>
        <button onClick={handleAiMode}>Play Against AI</button>
        <button onClick={handleRestart}>Restart Game</button>
        </div>
      </div>
    </div>
  );
};

export default App;
