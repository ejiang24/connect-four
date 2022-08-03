import React from "react"
import Piece from "./Piece"

export default function Board(props) {
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
                onMouseEnter={() => {
                    console.log("col: " + index)
                    console.log("empty row index: " + findRow(index))
                }}
                onClick={() => dropPiece(index, findRow(index))}
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

    function dropPiece(col, row) {
        props.setPlayer(prev => !prev)
        board[col][row] = props.playerOne ? "1" : "2"
        setBoard(prev => [...prev])
        winCheck(col, row, 1)   
    }
    
    function winCheck(col, row, val) {
        if(board[col+1][row] == 1)
            console.log("WINNER!")
    }

    return (
        <div className='board-container'>{boardElement}</div>
    )
}