import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export default function MerchantLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <LoginForm
          role="merchant"
          title="Merchant Login"
          description="Sign in to manage your store"
          redirectPath="/merchant/dashboard"
        />
        <div className="text-center text-sm text-muted-foreground">
          Don't have a merchant account?{" "}
          <Link href="/merchant/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            User Login
          </Link>
          {" | "}
          <Link href="/admin/login" className="text-primary hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  )
}
