import React from 'react'
import { useState, useEffect } from 'react'
import socket from "./Socket"
import Game from "./components/Game"

function App() {
  const [isPlayerOne, setIsPlayerOne] = React.useState(true)

  function changeTurn() {
    setIsPlayerOne(prev => !prev) 
  }

  function sendChangeTurn() {
    changeTurn()
    socket.emit("change_turn")
  }

  React.useEffect(() => {
    socket.on("receive_change_turn", () => {
      console.log("HELLO!!!!")
      changeTurn()
    })
  }, [socket])

  return (
    <div className="App">
      <h1>CONNECT FOUR</h1>
      <h4>Current Player: {isPlayerOne ? "One" : "Two"}</h4>
      <button onClick={sendChangeTurn}>CHANGE TURN</button>
      <Game playerOne={isPlayerOne} />
    </div>
  );
}

export default App;
