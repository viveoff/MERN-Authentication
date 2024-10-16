import { generateKey } from 'crypto';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateVerficationCode } from '../utils/generateVerificationCode.js';
import { generateTokenAndSetCookie  } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Validate input
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        // Check if user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification code
        const verificationCode = generateVerficationCode();

        // Create a new user instance
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationCode,  // missing field added
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        // Save the user to the database
        await user.save();

        // Generate JWT token and set it in cookie (assuming you have this function)
        generateTokenAndSetCookie(res, user._id);

        // Return success response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined, // Do not return password in the response
            },
        });
    } catch (error) {
        // Catch any errors and return response
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    res.send("Login route");
}

export const logout = async (req, res) => {
    res.send("Logout route");
}
