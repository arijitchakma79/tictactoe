import React from "react";
import {Square} from '../components';
import '../styles/board.css';


const Board = ({ squares, onClick }) => {
    return (
      <div className="game-board">
        {squares.map((square, index) => (
          <Square key={index} value={square} onClick={() => onClick(index)} />
        ))}
      </div>
    );
  };

export default Board;