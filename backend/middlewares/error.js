import ErrorHandler from "../utils/ErrorHandler.js";

const error = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Error"

    if(err.name === "CastError"){
        const message = `Resources not found with this id.. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    if(err.code === 11000){
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }
    if(err.name === "JsonWebTokenError"){
        const message = `Your url is invalid please try again letter`;
        err = new ErrorHandler(message, 400)
    }

    if(err.name === "TokenExpiredError"){
        const message = `Your Url is expired, please try again later`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export default error