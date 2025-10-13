import express from "express"
import { authenticate } from "../middleware/auth.middleware"
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/user.controller"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", authenticate, getUserProfile)
router.put("/profile", authenticate, updateUserProfile)

export default router
