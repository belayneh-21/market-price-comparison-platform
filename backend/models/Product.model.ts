import mongoose, { type Document, Schema } from "mongoose"

export interface IProduct extends Document {
  name: string
  category: mongoose.Types.ObjectId
  description?: string
  image?: string
  price: number
  merchant: mongoose.Types.ObjectId
  location: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    merchant: {
      type: Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search and filtering
ProductSchema.index({ name: "text", description: "text" })
ProductSchema.index({ category: 1, location: 1 })
ProductSchema.index({ price: 1 })

export default mongoose.model<IProduct>("Product", ProductSchema)
