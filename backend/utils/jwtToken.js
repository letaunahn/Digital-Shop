// create token and saving that in cookies
import  jwt  from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRES}
    )
}

const sendToken = (user, statusCode, res) => {
    const token = createToken(user._id)

    const options = {
        expires: new Date(Date.now() + 90*24*60*60*1000),
        httpOnly: true,
        sameSite: "none",
        secure: true
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}

export default sendToken;