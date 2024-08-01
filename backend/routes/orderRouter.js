import express from 'express'
import { adminAllOrders, createOrder, getAllSellerOrder, getAllUserOrders, orderRefund, orderRefundSuccess, updateOrderStatus } from '../controllers/orderController.js'
import { isAdmin, isAuthenticated, isSeller } from '../middlewares/auth.js'

const orderRouter = express.Router()

orderRouter.post("/create-order", createOrder)
orderRouter.get("/get-all-orders/:userId", getAllUserOrders)
orderRouter.get("/get-seller-all-orders/:shopId", getAllSellerOrder)
orderRouter.put("/update-order-status/:id", isSeller, updateOrderStatus)
orderRouter.put("/order-refund/:id", orderRefund)
orderRouter.put("/order-refund-success/:id", isSeller, orderRefundSuccess)
orderRouter.get("/admin-all-orders", isAuthenticated, isAdmin("Admin", adminAllOrders))

export default orderRouter