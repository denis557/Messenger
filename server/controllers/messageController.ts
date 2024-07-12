import { Chat } from '../models/chatModel'
import { Message } from '../models/messageModel'

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

        res.status(201).json({ error: false, message: 'Message sent successfully'});
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
            path: 'members',
            select: 'name avatar'
        });

        return res.status(200).json({ error: false, chats });
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message});
    }
}

export { sendMessage, getMessages, getChats }