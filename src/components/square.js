import React from "react";
import '../styles/square.css'

const Square = ({ value, onClick }) => {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  };
export default Square;