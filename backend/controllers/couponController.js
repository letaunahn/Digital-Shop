import couponModel from '../models/couponModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export const createCouponCode = async (req, res, next) => {
    try {
        const isExistedCouponCode = await couponModel.find({
            name: req.body.name
        })

        if(isExistedCouponCode.length !== 0){
            return next(new ErrorHandler("Coupon code is already existed!", 400))
        }

        const couponCode = new couponModel(req.body)
        await couponCode.save()

        res.status(201).json({
            success: true,
            couponCode
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

export const getAllShopCoupons = async (req, res, next) => {
    try {
        const couponCodes = await couponModel.find({
            shopId: req.seller.id
        })
        res.status(201).json({
            success: true,
            couponCodes
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

export const deleteShopCoupon = async (req, res, next) => {
    try {
        const couponCode = await couponModel.findByIdAndDelete(req.params.id)

        if(!couponCode){
            return next(new ErrorHandler("Coupon code doesn't exist!", 400))
        }

        res.status(201).json({
            success: true,
            message: "Coupon code deleted successfully!"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

export const getCouponValue = async (req, res, next) => {
    try {
        const couponCode = await couponModel.findOne({name: req.params.name})

        res.status(200).json({
            success: true,
            couponCode
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}