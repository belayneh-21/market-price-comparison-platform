import express from "express"
import { authenticate, authorizeRoles } from "../middleware/auth.middleware"
import {
  registerMerchant,
  loginMerchant,
  getMerchantProfile,
  updateMerchantProfile,
  getMerchantProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/merchant.controller"

const router = express.Router()

router.post("/register", registerMerchant)
router.post("/login", loginMerchant)
router.get("/profile", authenticate, authorizeRoles("merchant"), getMerchantProfile)
router.put("/profile", authenticate, authorizeRoles("merchant"), updateMerchantProfile)
router.get("/products", authenticate, authorizeRoles("merchant"), getMerchantProducts)
router.post("/products", authenticate, authorizeRoles("merchant"), addProduct)
router.put("/products/:id", authenticate, authorizeRoles("merchant"), updateProduct)
router.delete("/products/:id", authenticate, authorizeRoles("merchant"), deleteProduct)

export default router
