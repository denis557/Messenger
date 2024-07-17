const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        lastMessage: {
            text: String,
            sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
        },
    },
    { timestamps: true}
);

export const Chat = mongoose.model("Chat", chatSchema);