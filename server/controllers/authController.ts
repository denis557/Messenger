import { User } from '../models/userModel'
import generateJwtAndSetCookie from '../utils/jwt&cookie';
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { name, email, password, username, bio } = req.body;
        const user = await User.findOne({$or:[{email}, {username}]});

        if(user) {
            return res.status(400).json({error: true, message: 'User with this email or username already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username,
            bio
        });

        await newUser.save();

        if(newUser) {
            generateJwtAndSetCookie(newUser._id, res);
            return res.status(201).json({
                newUser,
                _id: newUser._id,
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


export { signup, login, logout }