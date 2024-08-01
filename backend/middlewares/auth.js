import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import shopModel from "../models/shopModel.js";

export const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Please login to continue", 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await userModel.findById(decoded.id)

    next()
}

export const isSeller = async (req, res, next) => {
    const {seller_token} = req.cookies;

    if(!seller_token){
        return next(new ErrorHandler("Please login to continue", 401))
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY)


    req.seller = await shopModel.findById(decoded.id)

    next()
}

export const isAdmin = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} can not access this resources`))
        }
        next()
    }
}