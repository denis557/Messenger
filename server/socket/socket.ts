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

const userSocketMap: { [key: string]: string } = {}
io.on('connection', (socket) => {
    console.log(socket.id);
    const userId = socket.handshake.query.userId as string | undefined;

    if(userId !== undefined) userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

export { io, server, app }