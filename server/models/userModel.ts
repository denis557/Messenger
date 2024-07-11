const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    id: {type: String, unique: true},
    about: String
});

export const User = mongoose.model('User', userSchema, 'Messenger_users');