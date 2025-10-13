"use client"

import { useState, useEffect } from "react"
import { AdminNav } from "@/components/layout/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import { api } from "@/lib/api"

export default function AdminMerchantsPage() {
  const [merchants, setMerchants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMerchants()
  }, [])

  const fetchMerchants = async () => {
    setLoading(true)
    const response = await api.admin.getMerchants()
    if (response.data?.merchants) {
      setMerchants(response.data.merchants)
    }
    setLoading(false)
  }

  const handleApprove = async (id: string, isApproved: boolean) => {
    const response = await api.admin.approveMerchant(id, isApproved)
    if (!response.error) {
      fetchMerchants()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Merchant Management</CardTitle>
            <CardDescription>Approve and manage merchant accounts</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded bg-muted" />
                ))}
              </div>
            ) : merchants.length === 0 ? (
              <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No merchants found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {merchants.map((merchant) => (
                      <TableRow key={merchant._id}>
                        <TableCell className="font-medium">{merchant.storeName}</TableCell>
                        <TableCell>{merchant.email}</TableCell>
                        <TableCell>{merchant.location}</TableCell>
                        <TableCell>
                          <Badge variant={merchant.isApproved ? "default" : "secondary"}>
                            {merchant.isApproved ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(merchant.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {merchant.isApproved ? (
                              <Button variant="outline" size="sm" onClick={() => handleApprove(merchant._id, false)}>
                                <XCircle className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" onClick={() => handleApprove(merchant._id, true)}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
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
