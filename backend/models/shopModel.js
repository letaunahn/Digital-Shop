import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your shopper name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your shopper email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter your shopper password"],
        minLength: [8, "Password shoule be greater than 8 characters"],
        select: false
    },
    description: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Seller"
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
    zipCode: {
        type: String,
        required: true
    },
    withdrawMethod: {
        type: Object,
    },
    availableBalance: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    transactions: [
        {
            amount: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                default: "Processing"
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            updatedAt: {
                type: Date
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordTime: Date
})


const shopModel = mongoose.model("Shop", shopSchema)
export default shopModel