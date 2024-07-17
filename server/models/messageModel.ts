const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String
    },
    { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);