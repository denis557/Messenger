const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        reply: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
        seen: { type: Boolean, default: false },
        isEdited: { type: Boolean, default: false },
        file: { type: String, default: '' }
    },
    { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);