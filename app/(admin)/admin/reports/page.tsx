"use client"

import { useState, useEffect } from "react"
import { AdminNav } from "@/components/layout/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    setLoading(true)
    const response = await api.admin.getReports()
    if (response.data) {
      setReports(response.data)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="mt-2 text-muted-foreground">Platform insights and statistics</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>Key metrics and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 animate-pulse rounded bg-muted" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm text-muted-foreground">Total Users</span>
                    <span className="text-lg font-semibold">{reports?.totalUsers || 0}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm text-muted-foreground">Total Merchants</span>
                    <span className="text-lg font-semibold">{reports?.totalMerchants || 0}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm text-muted-foreground">Approved Merchants</span>
                    <span className="text-lg font-semibold">{reports?.approvedMerchants || 0}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm text-muted-foreground">Pending Merchants</span>
                    <span className="text-lg font-semibold">{reports?.pendingMerchants || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Products</span>
                    <span className="text-lg font-semibold">{reports?.totalProducts || 0}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products by Category</CardTitle>
              <CardDescription>Distribution of products across categories</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 animate-pulse rounded bg-muted" />
                  ))}
                </div>
              ) : reports?.productsByCategory?.length > 0 ? (
                <div className="space-y-4">
                  {reports.productsByCategory.map((item: any) => (
                    <div key={item._id} className="flex items-center justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">{item.categoryName}</span>
                      <span className="text-lg font-semibold">{item.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No data available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
