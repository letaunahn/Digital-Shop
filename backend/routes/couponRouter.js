import express from 'express'
import { isSeller } from '../middlewares/auth.js'
import { createCouponCode, deleteShopCoupon, getAllShopCoupons, getCouponValue } from '../controllers/couponController.js'

const couponRouter = express.Router()

couponRouter.post("/create-coupon-code", isSeller, createCouponCode)
couponRouter.get("/get-coupon/:id", isSeller, getAllShopCoupons)
couponRouter.delete("/delete-coupon/:id", isSeller, deleteShopCoupon)
couponRouter.get("/get-coupon-value/:name", getCouponValue)

export default couponRouter