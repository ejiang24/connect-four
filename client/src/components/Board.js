import React from "react"
import Piece from "./Piece"
import socket from "../Socket"

export default function Board() {
    //======= PLAYER ========//
    const [isPlayerOne, setIsPlayerOne] = React.useState(true)

    function changeTurn() {
        setIsPlayerOne(prev => !prev) 
    }


    //======= BOARD ========//
    const [board, setBoard] = React.useState([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ])

    const boardElement = board.map((arr, index) => {
        return (
            <div 
                onClick={() => sendDropPiece(index, findRow(index), isPlayerOne)}
            >
                {
                    arr.map((row, index2) => {
                        return (
                            <Piece         
                                playerOne={true}
                                value={board[index][index2].toString()}
                                col={index}
                                row={index2}
                            />
                        )
                    })
                }
            </div>
        )}
    )

    function findRow(col) {
        for(let i = board[col].length; i >= 0; i--){
            if (board[col][i] == 0){
                return i
            }
        }
        return -1
    }

    function dropPiece(col, row, isPlayerOne) {
        board[col][row] = isPlayerOne ? "1" : "2" 
        setBoard(prev => [...prev])
        winCheck(col, row)   
        changeTurn()
    }

    function sendDropPiece(col, row, isPlayerOne) {
        dropPiece(col, row, isPlayerOne)
        socket.emit("drop_piece", [col, row, isPlayerOne])
    }

    function winCheck(col, row) {
        if(board[col][row+1] == 1)
            console.log("WINNER!")
    }

    React.useEffect(() => {
        socket.on("receive_drop_piece", (data) => {
            dropPiece(data[0], data[1], data[2])
        })
    }, [socket])


    return (
        <div className='board-container'>
            <h4>Current Player: {isPlayerOne ? "One" : "Two"}</h4>
            <div className='board'>{boardElement}</div>
        </div>
        
    )
}