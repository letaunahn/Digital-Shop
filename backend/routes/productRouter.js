import express from 'express'
import upload from '../multer.js';
import { adminAllProducts, createNewReview, createProduct, deleteShopProduct, getAllProducts, getAllProductsShop } from '../controllers/productController.js';
import { isAdmin, isAuthenticated, isSeller } from '../middlewares/auth.js';

const productRouter = express.Router()

productRouter.post("/create-product", createProduct)
productRouter.get("/get-all-products-shop/:id", getAllProductsShop)
productRouter.delete("/delete-shop-product/:id", isSeller, deleteShopProduct)
productRouter.get("/get-all-products", getAllProducts)
productRouter.put("/create-new-review", isAuthenticated, createNewReview)
productRouter.get("/admin-all-products", isAuthenticated, isAdmin("Admin", adminAllProducts))

export default productRouter