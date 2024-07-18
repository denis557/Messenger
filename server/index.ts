import { app, server } from './socket/socket'

const authRouter = require('./routes/authRoutes');
const messageRouter = require('./routes/messageRouter');

require('dotenv').config({ path: __dirname+'/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const app = express();
const PORT = process.env.PORT || 5000;

// const http =  require('http').Server(app);
const cors = require('cors');
// const socketIO = require('socket.io')(http, {
//     cors: {
//         origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
//         methods: ["GET", "POST"]
//     }
// });

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL!);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log('Connected to Data Base');
    // http.listen(PORT, () => {
    server.listen(PORT, () => {
        console.log('server started');
    })
})

// socketIO.on('connection', (socket) => {
//     console.log(`${socket.id} connected`);
//     socket.on('disconnect', () => {
//         console.log(`${socket.id} user disconnected`)
//     })
// })

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);