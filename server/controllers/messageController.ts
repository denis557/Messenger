import { io } from '../socket/socket';
import { Chat } from '../models/chatModel'
import { Message } from '../models/messageModel'
import { getRecipientSocketId } from '../socket/socket';

async function sendMessage(req, res) {
    try {
        const { recipientId, message } = req.body;
        const senderId = req.user._id;

        let chat = await Chat.findOne({
            members: { $all: [ senderId, recipientId ] }
        });

        if(!chat){
            chat = new Chat({
                members: [ senderId, recipientId ],
                lastMessage: {
                    text: message,
                    sender: senderId
                }
            });

            await chat.save();
        }

        const newMessage = new Message({
            chatId: chat._id,
            userId: senderId,
            text: message
        })

        await Promise.all([
            newMessage.save(),
            chat.updateOne({
                lastMessage: {
                    text: message,
                    sender: senderId
                }
            })
        ]);

        const recipientSocketId = getRecipientSocketId(recipientId);
        if(recipientSocketId) {
            io.to(recipientSocketId).emit('newMessage', newMessage)
        }

        res.status(201).json({ error: false, newMessage});
    } catch (error) {
        res.status(500).json({ error: true, message: error.message});
        console.log(error.message);
    }
}

async function getMessages(req, res) {
    const { otherUserId } = req.params;
    const userId = req.user._id;
    try {
        const chat = await Chat.findOne({
            members: { $all: [userId, otherUserId] }
        });
        if(!chat) {
            return res.status(404).json({ error: true, message: 'Chat not found'});
        }

        const messages = await Message.find({ 
            chatId: chat._id
        }).sort({ createdAt: 1 });

        return res.status(200).json({ error: false, messages});
    } catch (error) {
        res.status(500).json({ error: true, message: error.message})
    }
}

async function getChats(req, res) {
    const userId = req.user._id;
    try {
        const chats = await Chat.find({ members: userId }).populate({
            path: "members",
            select: "name avatar"
        });

        chats.forEach(chat => {
            chat.members = chat.members.filter(
                members => members._id.toString() !== userId.toString()
            );
        });

        return res.status(200).json(chats);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export { sendMessage, getMessages, getChats }