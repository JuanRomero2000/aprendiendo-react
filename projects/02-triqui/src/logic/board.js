import { WINNER_COMBOS } from "../constants"

export const checkWinner = (boardToCheck) => {

    for (const combo of WINNER_COMBOS){
      const [posA, posB, posC] = combo
      if (boardToCheck[posA] === boardToCheck[posB] && boardToCheck[posA] === boardToCheck[posC]){
        return boardToCheck[posA]
      }
    }

    return null
}

export const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null)
}