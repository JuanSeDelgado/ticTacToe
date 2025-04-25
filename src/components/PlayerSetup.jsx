import { Square } from "./Square";
export function PlayerSetup() {
  if (players != null) return null;
  
  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === false ? "Empate" : `Ganó: ${winnerNa} (${winner})`}</h2>
        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
