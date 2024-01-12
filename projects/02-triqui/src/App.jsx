import { useState } from 'react'
import confetti from 'canvas-confetti'

const TURNS = {
  X : 'x',
  O : 'o'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const Square = ({ children, isSelected, updateBoard, index}) => {
  
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className={className} onClick={handleClick}> {children} </div>
  )
}

function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    
    if (board[index] || winner) return 

    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }        

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

  }

  const checkWinner = (boardToCheck) => {

    for (const combo of WINNER_COMBOS){
      const [posA, posB, posC] = combo
      if (boardToCheck[posA] === boardToCheck[posB] && boardToCheck[posA] === boardToCheck[posC]){
        return boardToCheck[posA]
      }
    }

    return null

  }

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  
  return (
    <main className='board'>
      <h1>Triqui</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2> 
                {winner === false ? 'Empate' : 'Ganó:'}
              </h2>
              
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>  
        )
      }
    </main>
  )
}

export default App