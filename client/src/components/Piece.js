import React from "react"
import socket from "../Socket"

export default function Piece(props) {
    /*
    const [claim, setClaim] = React.useState("")

    function claimToken() {
        if (props.playerOne == true)
            setClaim("1")
        else if (props.playerOne == false)
            setClaim("2")
    }
/*
    function sendClaimToken() {
        claimToken()
        socket.emit("claim_token")
    }

    React.useEffect(() => {
        socket.on("receive_claim_token", () => {
          claimToken()
        })
      }, [socket])
      */

    return(
        <div className={`piece${props.value}`} >
            <p></p>
        </div>
    )
}