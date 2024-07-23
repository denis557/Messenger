export {};
import protectRoute from "../middleware/protectRoute";
const { signup, login, logout, updateProfile } = require('../controllers/authController');
const express = require('express');

const router = express.Router();

router.put('/update', protectRoute, updateProfile)
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;