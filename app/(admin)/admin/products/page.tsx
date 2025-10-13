"use client"

import { useState, useEffect } from "react"
import { AdminNav } from "@/components/layout/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Trash2 } from "lucide-react"
import { api } from "@/lib/api"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const response = await api.admin.getProducts()
    if (response.data?.products) {
      setProducts(response.data.products)
    }
    setLoading(false)
  }

  const handleApprove = async (id: string, isApproved: boolean) => {
    const response = await api.admin.approveProduct(id, isApproved)
    if (!response.error) {
      fetchProducts()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    const response = await api.admin.deleteProduct(id)
    if (!response.error) {
      fetchProducts()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Moderate and manage product listings</CardDescription>
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
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Merchant</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.merchant?.storeName}</TableCell>
                        <TableCell>{product.category?.name || "Uncategorized"}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={product.isApproved ? "default" : "secondary"}>
                            {product.isApproved ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {product.isApproved ? (
                              <Button variant="outline" size="sm" onClick={() => handleApprove(product._id, false)}>
                                <XCircle className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" onClick={() => handleApprove(product._id, true)}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="outline" size="sm" onClick={() => handleDelete(product._id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
