import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Store } from "lucide-react"

interface ProductCardProps {
  product: any
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`}>
      <Card className="h-full transition-shadow hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
            {product.image ? (
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Store className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category?.name}
            </Badge>
          </div>
          <h3 className="line-clamp-2 text-lg font-semibold">{product.name}</h3>
          <p className="mt-2 text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-2 border-t p-4 text-sm text-muted-foreground">
          <Store className="h-4 w-4" />
          <span className="line-clamp-1">{product.merchant?.storeName}</span>
          <MapPin className="ml-auto h-4 w-4" />
          <span className="line-clamp-1">{product.location}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
