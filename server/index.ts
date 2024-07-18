import { app, server } from './socket/socket'

const authRouter = require('./routes/authRoutes');
const messageRouter = require('./routes/messageRouter');

require('dotenv').config({ path: __dirname+'/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const cors = require('cors');

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL!);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log('Connected to Data Base');
    server.listen(PORT, () => {
        console.log('server started');
    })
})

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);