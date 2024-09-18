import { generateKey } from 'crypto';
import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {generateVerficationCode} from '../utils/generateVerificationCode.js';

export const signup =  async (req, res) => {
    const {email, password, name} = req.body;

    try {
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists) {
            return res.status(400).json({success: false, message: "User already exists"});
        }
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }

    const hashedPassord = await bcrypt.hash(password, 10);
    const verificationCode = generateVerficationCode();
    const user = new User({
        email,
        password: hashedPassord,
        name,
        verificationToken
    })
}

export const login =  async (req, res) => {
    res.send("Login route");
}

export const logout =  async (req, res) => {
    res.send("Logout  route");
}