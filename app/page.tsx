import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Users, ShieldCheck, TrendingDown } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">Compare Local Market Prices</h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              Find the best deals from local merchants. Compare prices, save money, and support your community.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/merchant/register">Become a Merchant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose Us</h2>
            <p className="mt-4 text-lg text-muted-foreground">Everything you need to find the best prices</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <TrendingDown className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Compare prices across multiple merchants to find the best deals in your area.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Store className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Local Merchants</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Support local businesses while getting competitive prices on products you need.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Simple interface to search, filter, and compare products from different stores.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Verified Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All merchants and products are verified to ensure accurate pricing information.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Start Saving?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of users finding the best deals in their local area.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
