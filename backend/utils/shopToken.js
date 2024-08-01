import  jwt  from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRES}
    )
}

const sendShopToken = (seller, statusCode, res) => {
    const token = createToken(seller._id)

    const options = {
        expires: new Date(Date.now() + 90*24*60*60*1000),
        httpOnly: true,
        sameSite: "none",
        secure: true
    }

    res.status(statusCode).cookie("seller_token", token, options).json({
        success: true,
        seller, 
        token,
    })
}

export default sendShopToken