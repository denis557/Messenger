const jwt = require('jsonwebtoken');
import { User } from '../models/userModel'
// import jwt from 'jsonwebtoken'

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token) res.status(400).json({ error: true, message: 'Unauthorized'});

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        req.user = user;

        next();
    } catch (error) {
        res.status(400).json({ error: true, message: error.message});
        console.log(error.message)
    }
}

export default protectRoute