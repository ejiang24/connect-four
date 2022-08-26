import React from 'react'


import Home from "./pages/Home"
import Game from "./pages/Game"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() { 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/game/*" element={<Game />}/>
        </Routes>
      </Router>  
    </div>
  )
}

export default App;

/*
<div className="header">
        <h1>CONNECT FOUR</h1>
      </div>
      <main>
        <div className="game-container">
          <Board />
          <Chat />
        </div>
      </main> 
*/
