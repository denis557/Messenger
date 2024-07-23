const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String, minLength: 6 },
    username: { type: String, unique: true },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    blockedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

export const User = mongoose.model("User", userSchema);