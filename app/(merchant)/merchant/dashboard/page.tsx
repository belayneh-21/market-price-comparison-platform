"use client"

import { useState, useEffect } from "react"
import { MerchantNav } from "@/components/layout/merchant-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Package, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import { ProductTable } from "@/components/merchant/product-table"

export default function MerchantDashboardPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    avgPrice: 0,
    recentProducts: 0,
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const response = await api.merchant.getProducts()
    if (response.data?.products) {
      const prods = response.data.products
      setProducts(prods)

      // Calculate stats
      const total = prods.length
      const avg = total > 0 ? prods.reduce((sum: number, p: any) => sum + p.price, 0) / total : 0
      const recent = prods.filter((p: any) => {
        const createdAt = new Date(p.createdAt)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return createdAt > weekAgo
      }).length

      setStats({
        totalProducts: total,
        avgPrice: avg,
        recentProducts: recent,
      })
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const response = await api.merchant.deleteProduct(id)
    if (!response.error) {
      fetchProducts()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MerchantNav />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Manage your products and store</p>
          </div>
          <Button asChild>
            <Link href="/merchant/products/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.avgPrice.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Across all products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recent Additions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentProducts}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>Manage your product listings</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded bg-muted" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-lg font-medium">No products yet</p>
                  <p className="mt-2 text-sm text-muted-foreground">Get started by adding your first product</p>
                  <Button className="mt-4" asChild>
                    <Link href="/merchant/products/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <ProductTable products={products} onDelete={handleDelete} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
