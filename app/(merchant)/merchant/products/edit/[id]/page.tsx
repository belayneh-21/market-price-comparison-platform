"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ProductForm } from "@/components/merchant/product-form"
import { MerchantNav } from "@/components/layout/merchant-nav"
import { api } from "@/lib/api"

export default function EditProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    const response = await api.products.getById(params.id as string)
    if (response.data?.product) {
      setProduct(response.data.product)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <MerchantNav />
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-96 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MerchantNav />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="mt-2 text-muted-foreground">Update your product information</p>
        </div>

        <ProductForm product={product} />
      </div>
    </div>
  )
}
