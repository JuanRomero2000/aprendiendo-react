import { useState } from 'react'
import { TURNS } from './constants.js'
import { Board } from './components/Board.jsx'
import { Square } from './components/Square'
import { checkWinner } from './logic/board.js'
import { checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { SaveGameToStorage } from './logic/storage/index.js'
import confetti from 'canvas-confetti'

function App() {
  
  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  
  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    
    if (board[index] || winner) return 

    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    
    // Guardar partida en localStorage
    SaveGameToStorage({board: newBoard, turn: newTurn})

    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }        
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  
  return (
    <main className='board'>
      <h1>Triqui</h1>

      <Board board={board} updateBoard={updateBoard}/>
      
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

    </main>
  )
}

export default App
