import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <RegisterForm
          role="user"
          title="Create Account"
          description="Sign up to start comparing prices"
          redirectPath="/products"
        />
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Want to sell products?{" "}
          <Link href="/merchant/register" className="text-primary hover:underline">
            Register as Merchant
          </Link>
        </div>
      </div>
    </div>
  )
}
