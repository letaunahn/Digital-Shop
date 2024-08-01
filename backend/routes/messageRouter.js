import express from 'express'
import { createNewMessage, getAllMessagesOfConversation } from '../controllers/messageController.js'

const messageRouter = express.Router()

messageRouter.post("/create-new-message", createNewMessage)
messageRouter.get("/get-all-messages/:id", getAllMessagesOfConversation)

export default messageRouter