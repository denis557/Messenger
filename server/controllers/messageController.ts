import { io } from '../socket/socket'
import { Chat } from '../models/chatModel'
import { User } from '../models/userModel'
import { Message } from '../models/messageModel'
import { getRecipientSocketId } from '../socket/socket'

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

async function getAllUsers(req, res) {
    const userId = req.user._id;
    try {
        const users = await User.find({ _id: { $ne: userId } });

        if(!users) return res.status(400).json({ error: true, message: 'No users found' });

        return res.status(200).json({ error: false, users})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function deleteChat(req, res) {
    try {
        // const chat = await Chat.findById(req.params.id);

        // if(!chat) {
        //     return res.status(400).json({ error: true, message: 'Chat not found' });
        // }

        await Chat.findByIdAndDelete(req.params.id);

        res.status(200).json({ error: false, message: "Chat deleted successfully" });
    } catch (error) {
       res.status(500).json({ error: true, message: error}) 
    }
}

async function blockUser(req, res) {
    const { otherUserId } = req.params;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if(!user) return res.status(400).json({ error: true, message: 'User not found'});

        const otherUser = await User.findById(otherUserId);
        if(!otherUser) return res.status(400).json({ error: true, message: 'Other user not found'});

        if(user.blockedUsers.includes(otherUserId)) res.status(400).json({ error: true, message: 'User is already blocked' });

        user.blockedUsers.push(otherUserId);
        await user.save();

        otherUser.blockedBy.push(userId);
        await otherUser.save();

        res.status(200).json({ error: false, user})
    } catch (error) {
        res.status(500).json({ error: true, message: error.message })
    }
}

async function unBlockUser(req, res) {
    const { otherUserId } = req.params;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if(!user) return res.status(400).json({ error: true, message: 'User not found'});

        const otherUser = await User.findById(otherUserId);
        if(!otherUser) return res.status(400).json({ error: true, message: 'Other user not found'});

        user.blockedUsers = user.blockedUsers.filter(id => id.toString() !== otherUserId.toString());
        await user.save();
        
        otherUser.blockedBy = otherUser.blockedBy.filter(id => id.toString() !== userId.toString());
        await otherUser.save();

        res.status(200).json({ error: false, user, otherUser })
    } catch (error) {
        res.status(500).json({ error: true, message: error.message })
    }
}

export { sendMessage, getMessages, getChats, getAllUsers, deleteChat, blockUser, unBlockUser }

//                           ^..^      /
//                           /_/\_____/
//                              /\   /\
//                             /  \ /  \