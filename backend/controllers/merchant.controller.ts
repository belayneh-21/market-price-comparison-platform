import type { Response } from "express"
import jwt from "jsonwebtoken"
import Merchant from "../models/Merchant.model"
import Product from "../models/Product.model"
import type { AuthRequest } from "../middleware/auth.middleware"

export const registerMerchant = async (req: AuthRequest, res: Response) => {
  try {
    const { storeName, email, phone, password, location, address } = req.body

    const existingMerchant = await Merchant.findOne({ email })
    if (existingMerchant) {
      return res.status(400).json({ message: "Merchant already exists" })
    }

    const merchant = await Merchant.create({
      storeName,
      email,
      phone,
      password,
      location,
      address,
    })

    const token = jwt.sign({ id: merchant._id, role: merchant.role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.status(201).json({
      message: "Merchant registered successfully",
      token,
      merchant: {
        id: merchant._id,
        storeName: merchant.storeName,
        email: merchant.email,
        phone: merchant.phone,
        location: merchant.location,
        role: merchant.role,
        isApproved: merchant.isApproved,
      },
    })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const loginMerchant = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body

    const merchant = await Merchant.findOne({ email })
    if (!merchant) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = await merchant.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: merchant._id, role: merchant.role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.json({
      message: "Login successful",
      token,
      merchant: {
        id: merchant._id,
        storeName: merchant.storeName,
        email: merchant.email,
        phone: merchant.phone,
        location: merchant.location,
        role: merchant.role,
        isApproved: merchant.isApproved,
      },
    })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const getMerchantProfile = async (req: AuthRequest, res: Response) => {
  try {
    const merchant = await Merchant.findById(req.user?.id).select("-password")
    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" })
    }

    res.json({ merchant })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const updateMerchantProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { storeName, email, phone, location, address, password } = req.body

    const merchant = await Merchant.findById(req.user?.id)
    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" })
    }

    if (storeName) merchant.storeName = storeName
    if (email) merchant.email = email
    if (phone) merchant.phone = phone
    if (location) merchant.location = location
    if (address) merchant.address = address
    if (password) merchant.password = password

    await merchant.save()

    res.json({
      message: "Profile updated successfully",
      merchant: {
        id: merchant._id,
        storeName: merchant.storeName,
        email: merchant.email,
        phone: merchant.phone,
        location: merchant.location,
        role: merchant.role,
      },
    })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const getMerchantProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await Product.find({ merchant: req.user?.id }).populate("category", "name").sort({ createdAt: -1 })

    res.json({ products })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const addProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, category, description, image, price, location } = req.body

    const product = await Product.create({
      name,
      category,
      description,
      image,
      price,
      merchant: req.user?.id,
      location,
    })

    await product.populate("category", "name")

    res.status(201).json({
      message: "Product added successfully",
      product,
    })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { name, category, description, image, price, location } = req.body

    const product = await Product.findOne({ _id: id, merchant: req.user?.id })
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    if (name) product.name = name
    if (category) product.category = category
    if (description) product.description = description
    if (image) product.image = image
    if (price) product.price = price
    if (location) product.location = location

    await product.save()
    await product.populate("category", "name")

    res.json({
      message: "Product updated successfully",
      product,
    })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const product = await Product.findOneAndDelete({ _id: id, merchant: req.user?.id })
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
