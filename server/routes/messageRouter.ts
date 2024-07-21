export{};
import protectRoute from "../middleware/protectRoute";
const { sendMessage, getMessages, getChats, getAllUsers } = require('../controllers/messageController');
const express = require('express');

const router = express.Router();

router.get('/users', protectRoute, getAllUsers);
router.get('/chats', protectRoute, getChats);
router.post('/sendMessage', protectRoute, sendMessage);
router.get('/:otherUserId', protectRoute, getMessages);

module.exports = router;