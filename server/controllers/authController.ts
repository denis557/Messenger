import { Chat } from '../models/chatModel';
import { User } from '../models/userModel'
import generateJwtAndSetCookie from '../utils/jwt&cookie';
import { v2 as cloudinary } from 'cloudinary'
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { name, email, password, username, bio } = req.body;
        let { avatar } = req.body;
        const userReq = await User.findOne({$or:[{email}, {username}]});

        if(!name || !email || !password || !username) {
            return res.status(400).json({ error: true, message: 'Fill required fields!'});
        }

        if(userReq) {
            return res.status(400).json({error: true, message: 'User with this email or username already exists'});
        }

        if(avatar) {
            const uploadedResponse = await cloudinary.uploader.upload(avatar);
            avatar = uploadedResponse.secure_url;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            username,
            bio,
            avatar
        });

        await user.save();

        const chat = new Chat({
            members: [ user._id ],
            lastMessage: {
                text: '',
                sender: user._id
            }
        });

        await chat.save();

        if(user) {
            generateJwtAndSetCookie(user._id, res);
            return res.status(201).json({
                user,
            })
        } else {
            return res.status(400).json({ error: true, message: 'Invalid user data'});
        }
    } catch (error) {
        res.status(500).json({error: true, message: error});
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        const isCorrectPassword = await bcrypt.compare(password, user?.password || '');

        if(!user || !isCorrectPassword) {
            return res.status(400).json({ error: true, message: 'Invalid email or password'});
        }

        generateJwtAndSetCookie(user._id, res);

        return res.status(200).json({
            user,
        })
    } catch (error) {
        res.status(500).json({ error: true, message: error.message});
        console.log(error)
    }
}

const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 1});

        res.status(200).json({ error: false, message: 'Logged out successfully'});
    } catch (error) {
        res.status(500).json({ error: true, message: error.message});
        console.log(error.message)
    }
}

async function updateProfile(req, res) {
    const { name, about, id, email } = req.body;
    let { avatar } = req.body;
    const userId = req.user._id
    try {
        let user = await User.findById(userId);
        if(!user) return res.status(400).json({ error: true, message: 'User not found'});

        if(avatar) {
            if(user.avatar) {
                await cloudinary.uploader.destroy(user.avatar.split('/').pop().split('.')[0]);
            }

            const uploadedResponse = await cloudinary.uploader.upload(avatar);
            avatar = uploadedResponse.secure_url;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = id || user.username;
        user.bio = about || user.bio;
        user.avatar = avatar || user.avatar

        user = await user.save();

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: true, message: error.message })
    }
}


export { signup, login, logout, updateProfile }