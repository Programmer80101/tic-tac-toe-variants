import { useState } from 'react';

export default function Game() {
  const mods = [
      'Classic',
      'Inverse (Misere)',
      'Chaotic'
    ]
  return (
    <>
      <h2>{mods[0]}</h2>
      <Classic evalWinner = {evalWinnerClassic} id="classic" />
      <h2>{mods[1]}</h2>
      <Misere />
      <h2>{mods[2]}</h2>
      <Chaotic />
    </>
  );
}

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

function Classic({ evalWinner, id }) {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(
    Array(9).fill(null)
  );
  
  function handleClick(i) {
    if (squares[i] || evalWinner(squares)) return;
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

  const winner =
    evalWinner(squares);
  let line = [-1];
  let status;
  if (winner) {
    [status, line] = winner;
  } else {
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  }

  const handleHighlight = i => line.includes(i);
  
  return (
    <div className="board" id={id}>
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

function evalWinnerClassic(squares) {
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

function Misere() {
  return <Classic evalWinner = {evalWinnerMisere} id = "misere"/>;
}

function evalWinnerMisere(squares) {
  const win = 
    evalWinnerClassic(squares);
  if (win === null ||
    win[0] === 'Draw') return win;
  const [loser, line] = win;
  const winner = (loser === 'Winner: X') ? 'O' : 'X';
  return ['Winner: ' + winner, line];
}

function Chaotic({ evalWinner = evalWinnerChaotic, id = "chaotic" }) {
  const [oneIsNext, setOneIsNext] = useState(true);
  const [squares, setSquares] = useState(
    Array(9).fill(null)
  );
  const [char, setChar] = useState('X')

  function handleChange() {
    const play = (char === 'X') ? 'O' : 'X';
    setChar(play);
  }
  
  function handleClick(i) {
    if (squares[i] || evalWinner(squares, oneIsNext)) return;
    const nextSquares = squares.slice();
    if (oneIsNext) {
      nextSquares[i] = char;
    } else {
      nextSquares[i] = char;
    }
    setSquares(nextSquares);
    setOneIsNext(!oneIsNext);
  }

  function resetBoard() {
    const nextSquares = 
      Array(9).fill(null);
    setSquares(nextSquares);
    setOneIsNext(true);
  }

  const winner =
    evalWinner(squares, oneIsNext);
  let line = [-1];
  let status;
  if (winner) {
    [status, line] = winner;
  } else {
    status = "Next player: " + (oneIsNext ? '1' : '2');
  }

  const handleHighlight = i => line.includes(i);
  
  return (
    <div className="board" id={id}>
      <div className="controls">
        <div className="status">{status}
        </div>
        <div className="options">
          <div>
            <label for="play-x">
              <input
                type="radio"
                name="char"
                value="X"
                id="play-x"
                checked={char === 'X'}
                onChange={handleChange}
              ></input>
              Play X
            </label>
          </div>
          <div>
            <label for="play-o">
              <input
                type="radio"
                name="char"
                value="O"
                checked={char === 'O'}
                onChange={handleChange}
              ></input>
              Play O
            </label>
          </div>
        </div>
      </div>
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

function evalWinnerChaotic(squares, oneIsNext) {
  const win = 
    evalWinnerClassic(squares);
  if (win === null ||
    win[0] === 'Draw') return win;
  const line = win[1];
  const winner = !oneIsNext ? '1' : '2';
  return ['Winner: Player ' + winner, line];
}