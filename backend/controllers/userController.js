import userModel from "../models/userModel.js"
import sendMail from "../utils/sendMail.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import sendToken from "../utils/jwtToken.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'

export const registerUser = async (req, res, next) => {
    try {
        const {name, email, password, avatar} = req.body
        console.log(avatar)
        const userEmail = await userModel.findOne({email})

        if (userEmail) {
            return next(new ErrorHandler("User already existed", 400))
        }

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars"
        })

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        const activationToken = createActivationToken(user)
        const activationUrl = `http://localhost:5173/activation/${activationToken}`

        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`
            })
            res.status(201).json({
                success: true,
                message: `PLease check your email:- ${user.email} to activate your account`
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m"
    })
}

export const activateUser = async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const newUser = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET
        )
        if(!newUser){
            return next(new ErrorHandler("Invalid token", 400))
        }

        const {name, email, password, avatar} = newUser

        let user = await userModel.findOne({email})

        if(user){
            return next(new ErrorHandler("User Already Existed", 400))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new userModel({
            name,
            email,
            password: hashedPassword,
            avatar
        })

        await user.save()
        res.status(201).json({
            success: true,
            message: "User activated successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return next(new ErrorHandler("Please enter the all fields", 400))
        }

        const user = await userModel.findOne({email}).select("+password")

        if(!user){
            return next(new ErrorHandler("User doesn't exist", 400))
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return next(new ErrorHandler("Please provide the correct information", 400))
        }
        sendToken(user, 201, res)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}


export const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id)

        if(!user){
            return next(new ErrorHandler("User doesn't exists", 400))
        }

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "none",
            secure: true
        })
        res.status(201).json({
            success: true,
            message: "Log out successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const updateInfo = async (req, res, next) => {
    try {
        const {email, password, phoneNumber, name} = req.body

        const user = await userModel.findOne({email}).select("+password")

        if(!user){
            return next(new ErrorHandler("User not found", 400))
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return next(new ErrorHandler("Please provide the correct information", 400))
        }

        user.name = name
        user.email = email
        user.phoneNumber = phoneNumber

        await user.save()
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const updateAvatar = async (req, res, next) => {
    try {
        let existedUser = await userModel.findById(req.user.id)
        if(req.body.avatar !== ""){
            const imageId = existedUser.avatar.public_id

            await cloudinary.v2.uploader.destroy(imageId)

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
            })

            existedUser.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }

            await existedUser.save()

            res.status(200).json({
                success: true,
                user: existedUser
            })
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const updateAddress = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id)
        const sameTypeAddress = user.addresses.find(
            (address) => address.addressType === req.body.addressType
        )
        if(sameTypeAddress){
            return next(new ErrorHandler(`${req.body.addressType} address already existed`))
        }

        const existedAddress = user.addresses.find((address) => address._id === req.body._id)
        if(existedAddress){
            Object.assign(existedAddress, req.body)
        } else {
            user.addresses.push(req.body)
        }

        await user.save()

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const deleteAddress = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const addressId = req.params.id
        await userModel.updateOne({
            _id: userId
        },{
            $pull: {addresses: {_id: addressId}}
        })

        const user = await userModel.findById(userId)
        res.status(200).json({success: true, user})
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const updatePassword = async (req, res, next) => {
    try {
        const {oldPassword, newPassword, confirmPassword} = req.body;
        const user = await userModel.findById(req.user.id).select("+password")

        const isPasswordMatched = await bcrypt.compare(oldPassword, user.password)

        if(!isPasswordMatched){
            return next(new ErrorHandler("Old password is incorrect!", 400))
        }

        if(newPassword !== confirmPassword){
            return next(new ErrorHandler("Password doesn't match with each other!", 400))
        }

        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(newPassword, salt)

        
        user.password = newPass

        await user.save()

        res.status(200).json({
            success: true,
            message: "Password updated successfully!"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const findUserInfo = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id)

        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find().sort({
            createdAt: -1
        })
        res.status(201).json({
            success: true,
            users
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id)
        if(!user){
            return next(new ErrorHandler("User is not available with this id", 400))
        }
        await userModel.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "User deleted successfully!"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}


