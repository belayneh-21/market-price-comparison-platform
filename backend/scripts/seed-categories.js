// Run this script to seed initial categories
// Usage: node scripts/seed-categories.js

const mongoose = require("mongoose")
require("dotenv").config()

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
})

const Category = mongoose.model("Category", CategorySchema)

const categories = [
  { name: "Electronics", slug: "electronics", description: "Electronic devices and gadgets" },
  { name: "Groceries", slug: "groceries", description: "Food and daily essentials" },
  { name: "Clothing", slug: "clothing", description: "Apparel and fashion items" },
  { name: "Home & Kitchen", slug: "home-kitchen", description: "Home appliances and kitchenware" },
  { name: "Books", slug: "books", description: "Books and stationery" },
  { name: "Sports", slug: "sports", description: "Sports equipment and accessories" },
  { name: "Beauty", slug: "beauty", description: "Beauty and personal care products" },
  { name: "Toys", slug: "toys", description: "Toys and games" },
]

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/market-price-platform")

    console.log("[v0] Connected to MongoDB")

    await Category.deleteMany({})
    await Category.insertMany(categories)

    console.log("[v0] Categories seeded successfully")
    console.log(`[v0] Created ${categories.length} categories`)

    process.exit(0)
  } catch (error) {
    console.error("[v0] Error seeding categories:", error)
    process.exit(1)
  }
}

seedCategories()
