import React from 'react'

export default function Log({turns}) {


    return (
      <ol id='log'>
        {turns.map( (turns) => (<li key={`${turns.squre.row}${turns.squre.col}`}>{turns.player} selected {turns.squre.row},{turns.squre.col}</li>))}
      </ol>
  )
}
