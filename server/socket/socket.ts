import { Server } from "socket.io";

const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log(socket.id);
})

export { io, server, app }