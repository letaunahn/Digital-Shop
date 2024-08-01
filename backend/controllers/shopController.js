import shopModel from "../models/shopModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import jwt from 'jsonwebtoken';
import sendMail from "../utils/sendMail.js";
import bcrypt from 'bcrypt'
import sendShopToken from "../utils/shopToken.js";
import cloudinary from 'cloudinary'

export const createShop = async (req, res, next) => {
    try {
        const {email} = req.body
        const sellerEmail = await shopModel.findOne({email})
        if(sellerEmail){
            return next(new ErrorHandler("User already existed", 400))
        }

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars"
        })

        const seller = {
            name: req.body.name,
            email: email,
            password: req.body.password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode
        }

        const activationToken = createActivationToken(seller)
        const activationUrl = `http://localhost:5173/shop-activation/${activationToken}`

        try {
            await sendMail({
                email: seller.email,
                subject: "Activate your account",
                message: `Hello ${seller.name}, please click on the link to activate your account: ${activationUrl}`
            })
            res.status(201).json({
                success: true,
                message: `PLease check your email:- ${seller.email} to activate your account`
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m"
    })
}

export const activateShop = async (req, res, next) => {
    try {
        const {activation_token} = req.body;
        const newSeller = jwt.verify(
            activation_token, process.env.ACTIVATION_SECRET
        )
        if(!newSeller){
            return next(new ErrorHandler("Invalid token", 400))
        }

        const {name, email, password, avatar, zipCode, address, phoneNumber} = newSeller

        let seller = await shopModel.findOne({email})
        if(seller){
            return next(new ErrorHandler("User Already Existed", 400))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        seller = new shopModel({
            name,
            email,
            password: hashedPassword,
            avatar,
            zipCode,
            address,
            phoneNumber
        })

        await seller.save()
        res.status(201).json({
            success: true,
            message: "User activated successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const loginShop = async (req, res, next) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return next(new ErrorHandler("Please enter the all fields", 400))
        }

        const seller = await shopModel.findOne({email}).select("+password")

        if(!seller){
            return next(new ErrorHandler("User doesn't exist", 400))
        }
        const isPasswordValid = await bcrypt.compare(password, seller.password)

        if(!isPasswordValid){
            return next(new ErrorHandler("Please provide the correct information", 400))
        }
        sendShopToken(seller, 201, res)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const getSeller = async(req, res, next) => {
    try {
        const seller = await shopModel.findById(req.seller._id)
        if(!seller){
            return next(new ErrorHandler("User doesn't exist", 400))
        }
        res.status(200).json({
            success: true,
            seller
        })
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

export const logoutShop = async (req, res, next) => {
    try {
        res.cookie("seller_token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "none",
            secure: true
        })
        res.status(201).json({
            success: true,
            message: "Log out successfully!"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const getShopInfo = async (req, res, next) => {
    try {
        const shop = await shopModel.findById(req.params.id)
        res.status(201).json({
            success: true,
            shop
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const updateShopAvatar = async (req, res, next) => {
    try {
        let existedSeller = await shopModel.findById(req.seller._id)
        const imageId = existedSeller.avatar.public_id
        await cloudinary.v2.uploader.destroy(imageId)
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150
        })

        existedSeller.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }

        await existedSeller.save()

        res.status(200).json({
            success: true,
            seller: existedSeller
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const updateSellerInfo = async (req, res, next) => {
    try {
        const {name, description, address, phoneNumber, zipCode} = req.body

        const shop = await shopModel.findOne(req.seller._id)

        if(!shop){
            return next(new ErrorHandler("User not found", 400))
        }

        shop.name = name
        shop.description = description
        shop.address = address
        shop.phoneNumber = phoneNumber
        shop.zipCode = zipCode

        await shop.save()

        res.status(201).json({
            success: true,
            shop
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const getAllSellers = async (req, res, next) => {
    try {
        const seller = await shopModel.find().sort({
            createdAt: -1
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const deleteSeller = async (req, res, next) => {
    try {
        const seller = await shopModel.findById(req.params.id)
        if(!seller){
            return next(new ErrorHandler("Seller is not available with this id, 400"))
        }
        await shopModel.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "Seller deleted successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error,message, 500))
    }
}