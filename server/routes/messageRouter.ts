export{};
import protectRoute from "../middleware/protectRoute";
const { sendMessage, getMessages, getChats, getAllUsers, deleteChat } = require('../controllers/messageController');
const express = require('express');

const router = express.Router();

router.delete('/deleteChat/:id', deleteChat);
router.get('/users', protectRoute, getAllUsers);
router.get('/chats', protectRoute, getChats);
router.post('/sendMessage', protectRoute, sendMessage);
router.get('/:otherUserId', protectRoute, getMessages);

module.exports = router;