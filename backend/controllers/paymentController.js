import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const paymentProcess = async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: {
            individual: "Tuananh"
        }
    })
    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    })
}

export const stripeApiKey = async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
}