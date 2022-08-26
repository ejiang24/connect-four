import React from "react"
import { useNavigate } from "react-router-dom"
import socket from "../Socket";

export default function Home() {
    //function, when called, navigate to some route
    let navigate = useNavigate();

    const [code, setCode] = React.useState("");

    function joinRoom() {
        if (code !== ""){
            socket.emit("join_room", code)
        }
    }

    return (
        <div>
            <h1>Connect Four</h1>
            <input 
                placeholder={"Enter code here"}
                value={code}
                onChange={(event) => {
                    setCode(event.target.value);
                }}
            />
            <button onClick={() => {
                navigate(`/game/${code}`)
                joinRoom()
            }}>
                enter game
            </button>
        </div>
    )
}

/*
<div>
            <h1>Connect Four</h1>
            <Button onClick={createGame}>create game</Button>
            <Button onClick={openModal}>join game</Button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                <Input value={room} onChange={(e) => setRoom(e.target.value)} type="text" placeholder="Room Id" />
                <Button onClick={() => joinGame(room)}>submit</Button>
            </Modal>
        </div>
*/