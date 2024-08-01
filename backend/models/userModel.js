import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than 4 characters"],
        select: false
    },
    phoneNumber: {
        type: String
    },
    addresses: [
        {
            country: {
                type: String
            },
            province: {
                type: String
            },
            address1: {
                type: String
            },
            address2: {
                type: String
            },
            zipCode: {
                type: String
            },
            addressType: {
                type: String
            }
        }
    ],
    role: {
        type: String,
        default: "user"
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
})

const userModel = mongoose.model("User", userSchema)
export default userModel