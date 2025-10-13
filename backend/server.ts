import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes"
import merchantRoutes from "./routes/merchant.routes"
import adminRoutes from "./routes/admin.routes"
import productRoutes from "./routes/product.routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/market-price-platform")
  .then(() => console.log("[v0] MongoDB connected successfully"))
  .catch((err) => console.error("[v0] MongoDB connection error:", err))

// Routes
app.use("/api/users", userRoutes)
app.use("/api/merchants", merchantRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/products", productRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

app.listen(PORT, () => {
  console.log(`[v0] Server running on port ${PORT}`)
})

export default app
