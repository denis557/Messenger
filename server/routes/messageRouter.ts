export{};
import protectRoute from "../middleware/protectRoute";
const { sendMessage, getMessages, getChats } = require('../controllers/messageController');
const express = require('express');

const router = express.Router();

router.post('/sendMessage', protectRoute, sendMessage);
router.get('/:otherUserId', protectRoute, getMessages);
router.get('/chats', protectRoute, getChats);

module.exports = router;