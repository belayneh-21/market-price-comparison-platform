import express from "express"
import { authenticate, authorizeRoles } from "../middleware/auth.middleware"
import {
  loginAdmin,
  getAllUsers,
  getAllMerchants,
  approveMerchant,
  updateMerchant,
  deleteMerchant,
  blockUser,
  deleteUser,
  getAllProducts,
  approveProduct,
  deleteProduct,
  getReports,
} from "../controllers/admin.controller"

const router = express.Router()

router.post("/login", loginAdmin)
router.get("/users", authenticate, authorizeRoles("admin"), getAllUsers)
router.get("/merchants", authenticate, authorizeRoles("admin"), getAllMerchants)
router.put("/merchants/:id/approve", authenticate, authorizeRoles("admin"), approveMerchant)
router.put("/merchants/:id", authenticate, authorizeRoles("admin"), updateMerchant)
router.delete("/merchants/:id", authenticate, authorizeRoles("admin"), deleteMerchant)
router.put("/users/:id/block", authenticate, authorizeRoles("admin"), blockUser)
router.delete("/users/:id", authenticate, authorizeRoles("admin"), deleteUser)
router.get("/products", authenticate, authorizeRoles("admin"), getAllProducts)
router.put("/products/:id/approve", authenticate, authorizeRoles("admin"), approveProduct)
router.delete("/products/:id", authenticate, authorizeRoles("admin"), deleteProduct)
router.get("/reports", authenticate, authorizeRoles("admin"), getReports)

export default router
