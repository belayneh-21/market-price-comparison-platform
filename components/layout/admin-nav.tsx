"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getUser, removeAuthToken } from "@/lib/auth"
import { ShieldCheck, LayoutDashboard, Users, Store, Package, BarChart, LogOut } from "lucide-react"

export function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()
  const user = getUser()

  const handleLogout = () => {
    removeAuthToken()
    router.push("/admin/login")
  }

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-xl font-semibold">
              <ShieldCheck className="h-6 w-6" />
              <span>Admin Panel</span>
            </Link>

            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/admin/dashboard"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/admin/dashboard" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/users"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/admin/users" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
              <Link
                href="/admin/merchants"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/admin/merchants" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Store className="h-4 w-4" />
                Merchants
              </Link>
              <Link
                href="/admin/products"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/admin/products" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                href="/admin/reports"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/admin/reports" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <BarChart className="h-4 w-4" />
                Reports
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
