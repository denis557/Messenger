const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String, minLength: 6 },
    username: { type: String, unique: true },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" }
});

export const User = mongoose.model("User", userSchema);