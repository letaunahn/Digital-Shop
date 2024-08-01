import express from 'express'
import { createNewConversation, getAllConversationsOfSeller, getAllConversationsOfUser, updateLastMessage } from '../controllers/conversationController.js'
import { isAuthenticated, isSeller } from '../middlewares/auth.js'

const conversationRouter = express.Router()

conversationRouter.post("/create-new-conversation", createNewConversation)
conversationRouter.get("/get-all-conversation-seller/:id", isSeller, getAllConversationsOfSeller)
conversationRouter.get("/get-all-conversation-user/:id", isAuthenticated, getAllConversationsOfUser)
conversationRouter.put("/update-last-message/:id", updateLastMessage)

export default conversationRouter