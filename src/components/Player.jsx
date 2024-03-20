import React, { useState } from 'react'
import "../index.css"
export default function Player({Initialname , symbol , isActive ,handleNamePlayerName}) {
  const [isEditing , setIsEditing] = useState(false);
  const [ playerName , setPlayerName] = useState(Initialname)
  
  const ChangeCHandler = (e)=>{
    setPlayerName(e.target.value)
    
  }

  const handleEditClick = ()=>{
    setIsEditing((editing)=>!editing)
    if(isEditing){
      handleNamePlayerName(symbol , playerName)
    }
  }
  let editableUser = <span className="player-name">{playerName}</span>
  
  if (isEditing) {
    editableUser = <input type="text" required value={playerName} onChange={ChangeCHandler} />
  }
  return (
      <li className={isActive? 'active' : undefined}>
          <span className="player">
          {editableUser}
          <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{!isEditing? "Edit": "Save"}</button>
    </li>
  )
}
