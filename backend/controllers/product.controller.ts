import type { Request, Response } from "express"
import Product from "../models/Product.model"

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, location, sort } = req.query

    const query: any = { isApproved: true }

    if (category) {
      query.category = category
    }

    if (location) {
      query.location = { $regex: location, $options: "i" }
    }

    let sortOption: any = { createdAt: -1 }
    if (sort === "price-asc") {
      sortOption = { price: 1 }
    } else if (sort === "price-desc") {
      sortOption = { price: -1 }
    }

    const products = await Product.find(query)
      .populate("merchant", "storeName location")
      .populate("category", "name")
      .sort(sortOption)

    res.json({ products, total: products.length })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id)
      .populate("merchant", "storeName location phone email")
      .populate("category", "name")

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    // Get similar products from other merchants
    const similarProducts = await Product.find({
      name: { $regex: product.name, $options: "i" },
      _id: { $ne: product._id },
      isApproved: true,
    })
      .populate("merchant", "storeName location")
      .populate("category", "name")
      .limit(10)

    res.json({ product, similarProducts })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({ message: "Search query is required" })
    }

    const products = await Product.find({
      $text: { $search: q as string },
      isApproved: true,
    })
      .populate("merchant", "storeName location")
      .populate("category", "name")
      .sort({ score: { $meta: "textScore" } })

    res.json({ products, total: products.length })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
