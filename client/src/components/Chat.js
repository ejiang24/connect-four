import React from "react"
import socket from "../Socket"

export default function Chat() {
    const [message, setMessage] = React.useState("")
    const [messageList, setMessageList] = React.useState([])

    function displayMessage(msg) {
        if (msg.length > 0){
            setMessageList(prev => [...prev, msg])
        } 
    }

    function sendMessage(msg) { 
        displayMessage(msg)
        setMessage("")
        socket.emit("send_message", msg)
    }

    //TODO: MAKE SURE THE KEYS ARE UNIQUE LOL
    const messagesElement = messageList.map(message => {
        return (
            <p className="message" key={messageList.length}>{message}</p>
        )
    })

    React.useEffect(() => {
        socket.off("receive_message").on("receive_message", ({ msg ,  }) => {
            displayMessage(msg)
        })
    }, [socket])

    return (
        <div className='chat-container'>
            <h3>Chat Room</h3>
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