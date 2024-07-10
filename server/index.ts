require('dotenv').config({ path: __dirname+'/.env' });
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

const http =  require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
    cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
    }
});

mongoose.connect(process.env.MONGO_URL!);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log('Connected to Data Base');
    http.listen(PORT, () => {
        console.log('server started');
    })
})

app.get('api', (req, res) => {
    res.json({
        message: 'server connected'
    })
})

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    socket.on('disconnect', () => {
        console.log(`${socket.id} user disconnected`)
    })
})