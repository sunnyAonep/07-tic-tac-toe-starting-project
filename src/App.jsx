import React, { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import { WINNING_COMBINATIONS } from "./components/WinningCombination"

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X"
  if(gameTurns.length > 0  && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer
}

const initialGameBoard = [
  [null , null , null],
  [null , null , null],
  [null , null , null]
]

function driveWinner(gameBoard , player) {
  let winner  = null
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column]
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = player[firstSquareSymbol];
    }
  }
  return winner
}

function deriveGameBourd(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];
    for(const turn of gameTurns){
        const { squre , player} = turn
        const { row , col } = squre;
        gameBoard[row][col] = player; 
    }
    return gameBoard
}

function App() {
  const [player ,setPlayer]= useState({
    X: 'Player 1',
    O: 'Player 2',
  })
  const [gameTurns , setGameTurns] = useState([])
  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameBourd(gameTurns)
  const winner = driveWinner(gameBoard , player)
 
  const hasDraw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex , colIndex)=>{
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { squre: {row: rowIndex ,col: colIndex }, player: currentPlayer },
        ...prevTurns]

      return updateTurns  
    });
  }

  const rematchHandle = ()=>{
    setGameTurns([])
  }

  const handleNamePlayerName = (symbol , newName)=>{
    setPlayer(prevplayers => {
      return{
        ...prevplayers,
        [symbol] : newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player handleNamePlayerName={handleNamePlayerName} Initialname={"Player 1"} symbol={"X"} isActive={activePlayer === 'X'}/>
          <Player handleNamePlayerName={handleNamePlayerName}Initialname={"Player 2"} symbol={"O"} isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} rematchHandle={rematchHandle}/>}
        <GameBoard onSelectSquare={handleSelectSquare}  board={gameBoard}/>
      </div>
      <Log  turns={gameTurns}/>
    </main>
  )
}

export default App
