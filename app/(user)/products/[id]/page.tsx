"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Store, Phone, Mail } from "lucide-react"
import { api } from "@/lib/api"
import Image from "next/image"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [similarProducts, setSimilarProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    setLoading(true)
    const response = await api.products.getById(params.id as string)
    if (response.data?.product) {
      setProduct(response.data.product)
      setSimilarProducts(response.data.similarProducts || [])
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-96 rounded-lg bg-muted" />
            <div className="h-64 rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-lg text-muted-foreground">Product not found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Details */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
            {product.image ? (
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Store className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category?.name}</Badge>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
            </div>

            {product.description && (
              <div>
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="mt-2 text-muted-foreground">{product.description}</p>
              </div>
            )}

            {/* Merchant Info */}
            <Card>
              <CardHeader>
                <CardTitle>Merchant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{product.merchant?.storeName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{product.merchant?.location}</span>
                </div>
                {product.merchant?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{product.merchant.phone}</span>
                  </div>
                )}
                {product.merchant?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{product.merchant.email}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Price Comparison */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Price Comparison</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similarProducts.map((similar) => (
                <Card key={similar._id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{similar.merchant?.storeName}</CardTitle>
                    <CardDescription>{similar.merchant?.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold text-primary">${similar.price.toFixed(2)}</p>
                    <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                      <a href={`/products/${similar._id}`}>View Details</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
