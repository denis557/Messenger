// import {Request, Response, Router} from 'express';
// import { User } from '../models/userModel';

// const router = Router();

// router.post('/create-account', async (req: Request, res: Response) => {
    
//     const { name, email, password, id, about} = req.body;

//     if(!name) {
//         return res.status(400).json({ error: true, message: 'Name is required'});
//     }

//     if(!email) {
//         return res.status(400).json({ error: true, message: 'Email is required'});
//     }

//     if(!id) {
//         return res.status(400).json({ error: true, message: 'Id is required'});
//     }

//     if(!password) {
//         return res.status(400).json({ error: true, message: 'Password is required'});
//     }

//     const isUser = await User.findOne({ email: email});

//     if(isUser) {
//         return res.status(400).json({ error: true, message: 'User already exists'});
//     }

//     const user = new User({
//         name,
//         email,
//         id,
//         password,
//         about
//     });

//     await user.save();
// });

// export default router

export {};
const express = require('express');

const router = express.Router();

router.post('/signup');
router.post('/login');

module.exports = router;