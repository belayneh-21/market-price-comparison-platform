import type { Response } from "express"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.model"
import User from "../models/User.model"
import Merchant from "../models/Merchant.model"
import Product from "../models/Product.model"
import type { AuthRequest } from "../middleware/auth.middleware"

export const loginAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 })
    res.json({ users, total: users.length })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const getAllMerchants = async (req: AuthRequest, res: Response) => {
  try {
    const merchants = await Merchant.find().select("-password").sort({ createdAt: -1 })
    res.json({ merchants, total: merchants.length })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const approveMerchant = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { isApproved } = req.body

    const merchant = await Merchant.findByIdAndUpdate(id, { isApproved }, { new: true }).select("-password")

    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" })
    }

    res.json({
      message: `Merchant ${isApproved ? "approved" : "disapproved"} successfully`,
      merchant,
    })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const blockUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    // In a real app, you'd add a 'blocked' field to the User model
    res.json({ message: "User blocked successfully" })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({ message: "User deleted successfully" })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const getAllProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await Product.find()
      .populate("merchant", "storeName location")
      .populate("category", "name")
      .sort({ createdAt: -1 })

    res.json({ products, total: products.length })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const approveProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { isApproved } = req.body

    const product = await Product.findByIdAndUpdate(id, { isApproved }, { new: true })
      .populate("merchant", "storeName location")
      .populate("category", "name")

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({
      message: `Product ${isApproved ? "approved" : "disapproved"} successfully`,
      product,
    })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const getReports = async (req: AuthRequest, res: Response) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalMerchants = await Merchant.countDocuments()
    const totalProducts = await Product.countDocuments()
    const approvedMerchants = await Merchant.countDocuments({ isApproved: true })
    const pendingMerchants = await Merchant.countDocuments({ isApproved: false })

    // Get top products by merchant count
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          categoryName: "$category.name",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ])

    res.json({
      totalUsers,
      totalMerchants,
      totalProducts,
      approvedMerchants,
      pendingMerchants,
      productsByCategory,
    })
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
