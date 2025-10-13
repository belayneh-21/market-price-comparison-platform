"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MerchantNav } from "@/components/layout/merchant-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { api } from "@/lib/api"
import { setUser } from "@/lib/auth"

export default function MerchantProfilePage() {
  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const response = await api.merchant.getProfile()
    if (response.data?.merchant) {
      const merchant = response.data.merchant
      setFormData({
        storeName: merchant.storeName || "",
        email: merchant.email || "",
        phone: merchant.phone || "",
        location: merchant.location || "",
        address: merchant.address || "",
        password: "",
        confirmPassword: "",
      })
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      return
    }

    setSaving(true)

    const updateData: any = {
      storeName: formData.storeName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      address: formData.address,
    }

    if (formData.password) {
      updateData.password = formData.password
    }

    const response = await api.merchant.updateProfile(updateData)

    if (response.error) {
      setMessage({ type: "error", text: response.error })
    } else {
      setMessage({ type: "success", text: "Profile updated successfully" })
      if (response.data?.merchant) {
        setUser({ ...response.data.merchant, role: "merchant" })
      }
      setFormData({ ...formData, password: "", confirmPassword: "" })
    }

    setSaving(false)
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
        <Card>
          <CardHeader>
            <CardTitle>Store Profile</CardTitle>
            <CardDescription>Update your store information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {message.text && (
                <Alert variant={message.type === "error" ? "destructive" : "default"}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  name="storeName"
                  type="text"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" type="text" value={formData.address} onChange={handleChange} />
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-4 text-sm font-medium">Change Password</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Leave blank to keep current password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
