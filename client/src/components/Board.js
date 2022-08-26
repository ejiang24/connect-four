import React from "react"
import Piece from "./Piece"
import socket from "../Socket"

export default function Board() {
    const [isGameOver, setIsGameOver] = React.useState(false)
    const [hoverCoords, setHoverCoords] = React.useState([-1, -1])
    const [isPlayerOne, setIsPlayerOne] = React.useState(true)

    function changeTurn() {
        setIsPlayerOne(prev => !prev) 
    }


    //======= BOARD ========//
    const [board, setBoard] = React.useState(
        JSON.parse(localStorage.getItem("board")) ||
        [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ])

    function handleMouseOver(col, row) {
        board[col][row] = (isPlayerOne ? "1-5" : "2-5")
        setBoard(prev => [...prev]);
    }

    function handleMouseLeave(col, row) {
        if(board[col][row] != 1 && board[col][row] != 2){
            board[col][row] = 0
        setBoard(prev => [...prev]);
        }   
    }

    const boardElement = board.map((arr, index) => {
        return (
            <div 
                onClick={() => sendDropPiece(index, findRow(index), isPlayerOne)}
                onMouseEnter={() => {
                    //move this method into handlemouseover prob
                    setHoverCoords([index, findRow(index)]);
                    handleMouseOver(index, findRow(index));
                }}
                onMouseLeave={() => {
                    handleMouseLeave(hoverCoords[0], hoverCoords[1])
                }}
            >
                {
                    arr.map((row, index2) => {
                        return (
                            <Piece         
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
            if (board[col][i] == 0 || board[col][i] == "1-5" || board[col][i] == "2-5"){
                return i
            }
        }
        return -1
    }

    //TODO: draw check(?)

    //TODO: IF INVALID LOCATION, DISPLAY MESSAGE TO USER

    //TODO: consider making col and row state
    function dropPiece(col, row, isPlayerOne) {
        board[col][row] = isPlayerOne ? "1" : "2";
        setBoard(prev => [...prev]);

        if(winCheck(col, row, isPlayerOne)){
            setIsGameOver(true)
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
                    /*
                    board[col][r] = "1-1"
                    board[col][row+1] = "1-1"
                    board[col][r+2] = "1-1"
                    board[col][row+2] = "1-1"
                    setBoard(prev => [...prev]);
                    */
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

    //RESET FUNCTIONALITY
    function reset(){
        for(let c = 0; c < 7; c++){
            for(let r = 0; r < 6; r++){
                board[c][r] = 0;
            }
        }
        setBoard(prev => [...prev]);
        setIsGameOver(false);
        setIsPlayerOne(true);
    }

    function sendReset(){
        reset();
        socket.emit("reset");
    }

    React.useEffect(() => {
        socket.on("receive_drop_piece", (data) => {
            dropPiece(data[0], data[1], data[2])
        });
        socket.on("receive_reset", () => {
            reset();
        });
    }, [socket])

    
    React.useEffect(() => {
        localStorage.setItem("board", JSON.stringify(board))
    }, [board])
    


    //TODO: FIX THE ISGAMEOVER SHIT BC IT JUST LOOKS DUMB
    return (
        <div>
            <h4>Current Player: {isPlayerOne ? 'One' : 'Two'}</h4>
            <div className='board-container'>
                <div className='board'>
                    {boardElement}
                    {isGameOver && <div className='game-over-screen'></div>}
                    {isGameOver && <h3>GAME OVER</h3>}
                    {isGameOver && <button className='reset-button' onClick={sendReset}>RESET</button>}  
                </div>
            </div>  
            <button onClick={sendReset}>Clear board</button> 
        </div>
        
        
    )
}