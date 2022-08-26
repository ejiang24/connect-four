import React from "react"
import Board from "../components/Board"
import Chat from "../components/Chat"

export default function Game() {
    return (
        <div >
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