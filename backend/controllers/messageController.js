import cloudinary from 'cloudinary'
import messagesModel from '../models/messagesModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export const createNewMessage = async (req, res, next) => {
    try {
        const messageData = req.body

        if(req.body.images){
            const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
                folder: "messages"
            })
            messageData.images = {
                public_id: myCloud.public_id,
                url: myCloud.url
            }
        }

        messageData.conversationId = req.body.conversationId
        messageData.sender = req.body.sender 
        messageData.text = req.body.text

        const message = new messagesModel({
            conversationId: messageData.conversationId,
            text: messageData.text,
            sender: messageData.sender,
            images: messageData.images ? messageData.images : undefined
        })

        await message.save()

        res.status(201).json({
            success: true,
            message
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const getAllMessagesOfConversation = async (req, res, next) => {
    try {
        const messages = await messagesModel.find({
            conversationId: req.params.id
        })

        res.status(201).json({
            success: true,
            messages
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}