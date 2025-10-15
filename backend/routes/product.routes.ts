import express from "express"
import { getAllProducts, getProductById, searchProducts, getCategories } from "../controllers/product.controller"

const router = express.Router()

router.get("/", getAllProducts)
router.get("/search", searchProducts)
router.get("/:id", getProductById)
router.get("/categories", getCategories)

export default router
