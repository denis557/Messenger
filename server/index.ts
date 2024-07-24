import { app, server } from './socket/socket'
import { v2 as cloudinary } from 'cloudinary'

const authRouter = require('./routes/authRoutes');
const messageRouter = require('./routes/messageRouter');

require('dotenv').config({ path: __dirname+'/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const cors = require('cors');

app.use(express.json({ limit: '10mb' }));
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

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);