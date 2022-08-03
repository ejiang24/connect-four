import React from 'react'
import { useState, useEffect } from 'react'
import socket from "./Socket"
import Board from "./components/Board"

function App() {
  

  /*
  function sendChangeTurn() {
    changeTurn()
    console.log(isPlayerOne)
    socket.emit("change_turn")
  }
  */

  /*
  React.useEffect(() => {
    socket.on("receive_drop_piece", () => {
      console.log("hm")
      changeTurn()
    })
  }, [socket])
*/
  

  return (
    <div className="App">
      <h1>CONNECT FOUR</h1>
      <Board />
    </div>
  );
}

export default App;
