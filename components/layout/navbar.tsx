"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getUser, removeAuthToken, isAuthenticated } from "@/lib/auth"
import { Store, User, LogOut } from "lucide-react"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const user = getUser()
  const authenticated = isAuthenticated()

  const handleLogout = () => {
    removeAuthToken()
    router.push("/login")
  }

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
              <Store className="h-6 w-6" />
              <span>Market Price</span>
            </Link>

            {authenticated && user?.role === "user" && (
              <div className="hidden items-center gap-4 md:flex">
                <Link
                  href="/products"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === "/products" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Products
                </Link>
                <Link
                  href="/profile"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === "/profile" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Profile
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {authenticated && user ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name || user.storeName}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
