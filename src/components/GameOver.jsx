import React from 'react'

export default function GameOver({winner ,rematchHandle}) {
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      {winner &&<p>{winner} won!</p>}
      {!winner &&<p>its a draw</p>}
      <p>
        <button onClick={rematchHandle}>
            Rematch!
        </button>
      </p>
    </div>
  )
}
