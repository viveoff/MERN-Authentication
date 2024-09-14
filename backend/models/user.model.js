 import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String, 
        required: true
    },
    lastlogin: {
        typeo: Date,
        default: Date.now
    },
    isVerified: {
        typeo: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
 }, {timestamps: true});

export const User = mongoose.model('User', userSchema);
