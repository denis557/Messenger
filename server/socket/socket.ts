import { Server } from "socket.io";
import { Message } from '../models/messageModel'

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

export const getRecipientSocketId = (recipientId) => userSocketMap[recipientId];
const userSocketMap: { [key: string]: string } = {}

io.on("connection", (socket) => {
	console.log("user connected", socket.id);
	const userId = socket.handshake.query.userId as string;

	if (userId != "undefined") userSocketMap[userId] = socket.id;
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on('markMessagesAsSeen', async({ chatId, userId }) => {
		try {
			await Message.updateMany({ chatId: chatId, seen: false }, { $set: {seen: true} });
			io.to(userSocketMap[userId]).emit('messagesSeen', { chatId });
		} catch (error) {
			console.log(error)
		}
	})

	socket.on("disconnect", () => {
		console.log("user disconnected");
		delete userSocketMap[userId];
		io.emit('getOnlineUsers', Object.keys(userSocketMap))
	});
});

export { io, server, app }