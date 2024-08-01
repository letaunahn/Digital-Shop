import express from 'express'
import { paymentProcess, stripeApiKey } from '../controllers/paymentController.js'

const paymentRouter = express.Router()

paymentRouter.post("/process", paymentProcess)
paymentRouter.get("/stripeapikey", stripeApiKey)

export default paymentRouter