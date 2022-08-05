import React from "react"
import socket from "../Socket"

export default function Chat() {
    const [message, setMessage] = React.useState("")
    const [messageList, setMessageList] = React.useState([])

    function displayMessage(msg) {
        setMessageList(prev => [...prev, msg])
    }

    function sendMessage(msg) { 
        displayMessage(msg)
        setMessage("")
        socket.emit("send_message", msg)
    }

    const messagesElement = messageList.map(message => {
        return (
            <p className="message" key={message}>{message}</p>
        )
    })

    React.useEffect(() => {
        socket.off("receive_message").on("receive_message", (msg) => {
            displayMessage(msg)
        })
    }, [socket])

    return (
        <div className='chat-container'>
            <h3>Chat room yay</h3>
            <div className='message-container'>
                {messagesElement}
            </div>
            <input 
                placeholder={"Chat!"}
                value={message}
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        sendMessage(message)
                    }
                }}
            />
            <button onClick={() => sendMessage(message)}>Send</button>
        </div>
    )
}