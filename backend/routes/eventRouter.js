import express from 'express'
import upload from '../multer.js'
import { adminAllEvents, createEvent, deleteShopEvent, getAllEvents, getAllShopEvents } from '../controllers/eventController.js'
import { isAdmin, isAuthenticated } from '../middlewares/auth.js';

const eventRouter = express.Router()

eventRouter.post("/create-event", createEvent)
eventRouter.get("/get-all-events", getAllEvents)
eventRouter.get("/get-all-events/:id", getAllShopEvents)
eventRouter.delete("/delete-shop-event/:id", deleteShopEvent)
eventRouter.get("/admin-all-events", isAuthenticated, isAdmin("Admin"), adminAllEvents)

export default eventRouter