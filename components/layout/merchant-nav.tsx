"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getUser, removeAuthToken } from "@/lib/auth"
import { Store, LayoutDashboard, Package, User, LogOut } from "lucide-react"

export function MerchantNav() {
  const router = useRouter()
  const pathname = usePathname()
  const user = getUser()

  const handleLogout = () => {
    removeAuthToken()
    router.push("/merchant/login")
  }

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/merchant/dashboard" className="flex items-center gap-2 text-xl font-semibold">
              <Store className="h-6 w-6" />
              <span>Merchant Portal</span>
            </Link>

            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/merchant/dashboard"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/merchant/dashboard" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/merchant/products/add"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith("/merchant/products") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                href="/merchant/profile"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/merchant/profile" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.storeName}</span>
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
