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

    //TODO: win check, draw check(?)

    //TODO: IF INVALID LOCATION, DISPLAY MESSAGE TO USER

    //TODO: consider making col and row state
    function dropPiece(col, row, isPlayerOne) {
        board[col][row] = isPlayerOne ? "1" : "2";
        setBoard(prev => [...prev]);

        if(winCheck(col, row, isPlayerOne)){
            socket.emit("send_message", "winner found");
        }
        
        changeTurn();
    }

    function sendDropPiece(col, row, isPlayerOne) {
        dropPiece(col, row, isPlayerOne);
        socket.emit("drop_piece", [col, row, isPlayerOne]);
    }

    //TODO: double check that this actually works
    function upDiagonalCheck(col, row, playerVal) {
        let currCol = col;
        let currRow = row;
        
        //can't go lower than [0][5]
        //finding starting vertices to then check the upwards diagonal line
        while(currRow < 5 && currCol > 0){
            currRow++;
            currCol--;
        }
        
        while(currRow - 3 >= 0 && currCol + 3 <= 6){
            if (board[currCol][currRow] == playerVal && board[currCol+1][currRow-1] == playerVal && 
                board[currCol+2][currRow-2] == playerVal && board[currCol+3][currRow-3] == playerVal){
                    return true;
                }
            
                currRow--;
                currCol++;
        }

        return false;
    }

    function downDiagonalCheck(col, row, playerVal) {
        let currCol = col;
        let currRow = row;
        
        //can't go higher than [0][0]
        while(currRow > 0 && currCol > 0){
            currRow--;
            currCol--;
        }

        while(currRow + 3 <= 5 && currCol + 3 <= 6){
            if (board[currCol][currRow] == playerVal && board[currCol+1][currRow+1] == playerVal && 
                board[currCol+2][currRow+2] == playerVal && board[currCol+3][currRow+3] == playerVal){
                    return true;
                }
            
                currRow++;
                currCol++;
        }

        return false;
    }
    

    function winCheck(col, row, isPlayerOne){
        let playerVal = 0;
        (isPlayerOne ? playerVal = 1 : playerVal = 2)
        //HORIZONTAL CHECK
        for (let c = 0; c < 4; c++){
            if (board[c][row] == playerVal && board[c+1][row] == playerVal && 
                board[c+2][row] == playerVal && board[c+3][row] == playerVal){
                    return true;
                }
        }
        
        //VERTICAL CHECK
        for (let r = 0; r < 3; r++){
            if (board[col][r] == playerVal && board[col][row+1] == playerVal && 
                board[col][r+2] == playerVal && board[col][row+2] == playerVal){
                    return true;
                }
        }

        //DIAGONAL CHECKS
        if (upDiagonalCheck(col, row, playerVal)){
            return true;
        }
        if (downDiagonalCheck(col, row, playerVal)){
            return true;
        }  
        
        return false;
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