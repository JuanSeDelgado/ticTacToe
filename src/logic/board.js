import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardtoCheck) => {
  // Creamos un for para revisar dentro de WINNER_COMBOS para ver si X u O ganó
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardtoCheck[a] && boardtoCheck[a] === boardtoCheck[b] && boardtoCheck[a] === boardtoCheck[c]
    ) {
      return boardtoCheck[a];
    }
  }
  return null;
};


export const checkEndGame = (newBoard) => {
  // Revisa si todos los square tienen un valor y no hay un ganador
  return newBoard.every((square) => square != null);
};