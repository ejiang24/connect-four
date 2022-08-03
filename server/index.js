const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io')
const cors = require("cors")
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: { 
        origin: 'http://localhost:3000',
        //what methods are we requesting?
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("change_turn", () => {
        //emitting to other people
        //broadcast sends to everyone but self
        socket.broadcast.emit("receive_change_turn")
    })
})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
});