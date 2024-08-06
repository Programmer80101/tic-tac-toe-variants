import { useState } from 'react';

function Square({ value, onClick, highlight }) {
  let className = "square";
  if (highlight) {
    console.log(highlight)
    className = 
      "square highlight";
  }
  return (
    <button 
      className={className}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(
    Array(9).fill(null)
  )
  
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetBoard() {
    const nextSquares = 
      Array(9).fill(null);
    setSquares(nextSquares);
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let line = [-1];
  let status;
  if (winner) {
    [status, line] = winner;
  } else {
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  }

  const handleHighlight = i => line.includes(i);
  
  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} highlight={handleHighlight(0)}/>
        <Square value={squares[1]} onClick={() => handleClick(1)} highlight={handleHighlight(1)}/>
        <Square value={squares[2]} onClick={() => handleClick(2)} highlight={handleHighlight(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} highlight={handleHighlight(3)}/>
        <Square value={squares[4]} onClick={() => handleClick(4)} highlight={handleHighlight(4)}/>
        <Square value={squares[5]} onClick={() => handleClick(5)} highlight={handleHighlight(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} highlight={handleHighlight(6)}/>
        <Square value={squares[7]} onClick={() => handleClick(7)} highlight={handleHighlight(7)}/>
        <Square value={squares[8]} onClick={() => handleClick(8)} highlight={handleHighlight(8)}/>
      </div>
      <div>
        <button
          id="reset-btn"
          onClick={resetBoard}
        >
          Reset Board
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const win = 'Winner: ' + squares[a];
      return [win, [a, b, c]];
    }
  }
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) { 
      return null;
    }
  }
  return ['Draw', []];
}