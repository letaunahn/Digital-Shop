import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your coupon code name"],
        unique: true
    },
    value: {
        type: Number,
        required: true
    },
    minAmount: {
        type: Number
    },
    maxAmount: {
        type: Number
    },
    shopId: {
        type: String,
        required: true
    },
    selectedProduct: {
        type: String
    }, 
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const couponModel = mongoose.model("Coupon", couponSchema)
export default couponModel