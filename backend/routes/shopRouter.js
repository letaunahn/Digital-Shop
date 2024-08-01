import express from 'express'
import { activateShop, createShop, getAllSellers, getSeller, getShopInfo, loginShop, logoutShop, updateSellerInfo, updateShopAvatar } from '../controllers/shopController.js'
import { isAdmin, isAuthenticated, isSeller } from '../middlewares/auth.js'

const shopRouter = express.Router()

shopRouter.post('/create-shop', createShop)
shopRouter.post("/activation", activateShop)
shopRouter.post("/login-shop", loginShop)
shopRouter.get("/get-seller", isSeller, getSeller)
shopRouter.get("/logout", logoutShop)
shopRouter.get("/get-shop-info/:id", getShopInfo)
shopRouter.put("/update-shop-avatar", isSeller, updateShopAvatar)
shopRouter.put("/update-seller-info", isSeller, updateSellerInfo)
shopRouter.get("/admin-all-sellers", isAuthenticated, isAdmin("Admin"), getAllSellers)

export default shopRouter