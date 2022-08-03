import React from "react"
import Piece from "./Piece"
import Board from "./Board"

export default function Game(props) {
    /*
    let boardElement = Array(10).fill(0).map((row, index) => new Array(10).fill(
        <Piece 
            playerOne={props.currPlayer} 
            id={index}
        />
    ))
    */

    return (
        <div className='board-container'>
            <Board playerOne={props.playerOne}/>     
        </div>  
    )
}