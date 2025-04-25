import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { Board } from "./components/Board";
import { saveGameStorage, resetGameStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null); // null seria que no hay ganador, false empate

  const updateBoard = (index) => {
    if (board[index] || winner) return; // No actualizamos si ya hay algo en ese Square

    const newBoard = [...board]; // Crea un "Nuevo" tablero para el turno en cuestion

    newBoard[index] = turn; // Le paso al nuevo tablero el indice del square donde voy a jugar
    setBoard(newBoard); // Cambio el estado del nuevo tablero para pintar

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; // Reviso quien tiene el turno
    setTurn(newTurn); // Cambio el turno segun corresponda

    // Guardar partida
    saveGameStorage({
      board: newBoard,
      turn: newTurn,
    });

    const newWinner = checkWinnerFrom(newBoard); // Revisamos si hay un ganador

    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const [startGame, setStartGame] = useState(false);
  const handleStartGame = () => {
    setStartGame(true);
  };


  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      { !startGame ? (<div className="playerSetUp">
        <input type="text" placeholder="Nombre del jugador ✕" />
        <input type="text" placeholder="Nombre del jugador ○ " />
        <button onClick={handleStartGame}>Empezar el juego</button>
      </div>): undefined}
      
      {startGame ? (<><button onClick={resetGame}>Reset del juego</button>
        <Board board={board} updateBoard={updateBoard} />
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section></>) : undefined}

      {/*Render Condicional al haber un ganador*/}
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
