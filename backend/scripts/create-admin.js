// Run this script to create an admin user
// Usage: node scripts/create-admin.js

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "admin" },
})

const Admin = mongoose.model("Admin", AdminSchema)

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/market-price-platform")

    console.log("[v0] Connected to MongoDB")

    const existingAdmin = await Admin.findOne({ email: "admin@market.com" })
    if (existingAdmin) {
      console.log("[v0] Admin already exists")
      process.exit(0)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash("admin123", salt)

    const admin = await Admin.create({
      name: "Admin",
      email: "admin@market.com",
      password: hashedPassword,
      role: "admin",
    })

    console.log("[v0] Admin created successfully")
    console.log("Email: admin@market.com")
    console.log("Password: admin123")

    process.exit(0)
  } catch (error) {
    console.error("[v0] Error creating admin:", error)
    process.exit(1)
  }
}

createAdmin()
