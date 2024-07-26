const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        lastMessage: {
            text: String,
            sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            seen: { type: Boolean, default: false }
        },
        unreadCount: { type: Number, default: 0 }
    },
    { timestamps: true}
);

export const Chat = mongoose.model("Chat", chatSchema);