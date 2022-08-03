import React from "react"

export default function Piece(props) {
    const [claim, setClaim] = React.useState("")

    function claimToken() {
        if (props.playerOne == true)
            setClaim("1")
        else if (props.playerOne == false)
            setClaim("2")
    }

    return(
        <div className={`piece${claim}`} onClick={claimToken}>
            <p>.</p>
        </div>
    )
}