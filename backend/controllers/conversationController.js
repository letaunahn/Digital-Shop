import conversationModel from "../models/conversationModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createNewConversation = async (req, res, next) => {
    try {
        const {groupTitle, userId, sellerId} = req.body;
        const isExistedConversation = await conversationModel.findOne({groupTitle})

        if(isExistedConversation){
            const conversation = isExistedConversation
            res.status(201).json({
                success: true,
                conversation
            })
        } else {
            const conversation = await conversationModel.create({
                members: [userId, sellerId],
                groupTitle: groupTitle
            })

            res.status(201).json({
                success: true,
                conversation
            })
        }
    } catch (error) {
        return next(new ErrorHandler(error.response.message, 500))
    }
}

export const getAllConversationsOfSeller = async (req, res, next) => {
    try {
        const conversations = await conversationModel.find({
            members: {
                $in: [req.params.id]
            }
        }).sort({updatedAt: -1, createdAt: -1})

        res.status(201).json({
            success: true,
            conversations
        })
    } catch (error) {
        return next(new ErrorHandler(error, 500))
    }
}

export const getAllConversationsOfUser = async (req, res, next) => {
    try {
        const conversations = await conversationModel.find({
            members: {
                $in: [req.params.id]
            }
        }).sort({updatedAt: -1, createdAt: -1})

        res.status(201).json({
            success: true,
            conversations
        })
    } catch (error) {
        return next(new ErrorHandler(error, 500))
    }
}

export const updateLastMessage = async (req, res, next) => {
    try {
        const {lastMessage, lastMessageId} = req.body

        const conversation = await conversationModel.findByIdAndUpdate(req.params.id, {
            lastMessage,
            lastMessageId
        })
        res.status(201).json({
            success: true,
            conversation
        })
    } catch (error) {
        return next(new ErrorHandler(error, 500))
    }
}