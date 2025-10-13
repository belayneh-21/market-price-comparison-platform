"use client"

import { ProductForm } from "@/components/merchant/product-form"
import { MerchantNav } from "@/components/layout/merchant-nav"

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <MerchantNav />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="mt-2 text-muted-foreground">Create a new product listing for your store</p>
        </div>

        <ProductForm />
      </div>
    </div>
  )
}
