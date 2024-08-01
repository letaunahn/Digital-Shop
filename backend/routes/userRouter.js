import express from 'express'
import { activateUser, deleteAddress, deleteUser, findUserInfo, getAllUsers, getUser, loginUser, logoutUser, registerUser, updateAddress, updateAvatar, updateInfo, updatePassword } from '../controllers/userController.js'
import { isAdmin, isAuthenticated } from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post("/create-user", registerUser)
userRouter.post("/activation", activateUser)
userRouter.post("/login-user", loginUser)
userRouter.get("/getuser", isAuthenticated, getUser)
userRouter.get("/logout", logoutUser)
userRouter.put("/update-user-info", isAuthenticated,updateInfo)
userRouter.put("/update-avatar", isAuthenticated, updateAvatar)
userRouter.put("/update-user-addresses", isAuthenticated, updateAddress)
userRouter.delete("/delete-user-address/:id", isAuthenticated, deleteAddress)
userRouter.put("/update-user-password", isAuthenticated, updatePassword)
userRouter.get("/user-info/:id", findUserInfo)
userRouter.get("/admin-all-users", isAuthenticated, isAdmin("Admin"), getAllUsers)
userRouter.delete("/delete-user/:id", isAuthenticated, isAdmin("Admin"), deleteUser)

export default userRouter