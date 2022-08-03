import React from "react"
import Piece from "./Piece"
import { Grid } from "@mui/material"

export default function Game(props) {
    let board = Array(10).fill(0).map(row => new Array(10).fill(0))

    const boardElement = board.map(arr => {
        return (
          <Grid item>
            {arr.map(i => {
                return (
                    <Piece 
                        playerOne={props.currPlayer} 
                    />
                )
            })}
          </Grid>
        )
      }) 

    return (
        <div>
            <Grid container>{boardElement}</Grid>
        </div>
       
    )
}