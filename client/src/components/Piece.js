import React from "react"

export default function Piece(props) {
    return(
        <div className={`piece${props.value}`} >
            <p></p>
        </div>
    )
}