const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { String, minLength: 6 },
    username: { type: String, unique: true },
    bio: { String, default: '' },
    avatar: { type: String, default: ''},
    chats: { type: [String], default: '' }
});

export const User = mongoose.model('User', userSchema);