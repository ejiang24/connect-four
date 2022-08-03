import React from 'react'
import io from "socket.io-client"
import Game from "./components/Game"

const socket = io.connect("http://localhost:3001")

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
      changeTurn()
    })
  }, [socket])

  return (
    <div className="App">
      <h1>CONNECT FOUR</h1>
      <h4>Current Player: {isPlayerOne ? "One" : "Two"}</h4>
      <button onClick={sendChangeTurn}>CHANGE TURN</button>
      <Game currPlayer={isPlayerOne}/>
    </div>
  );
}

export default App;
