import React from 'react'
import Board from "./components/Board"
import Chat from "./components/Chat"

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
      <div className="header">
        <h1>CONNECT FOUR</h1>
      </div>
      <main>
        <div className="game-container">
          <Board />
          <Chat />
        </div>
      </main> 
    </div>
  );
}

export default App;
