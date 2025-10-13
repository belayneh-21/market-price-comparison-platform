import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <LoginForm
          role="user"
          title="Welcome Back"
          description="Sign in to your account to continue"
          redirectPath="/products"
        />
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Are you a merchant?{" "}
          <Link href="/merchant/login" className="text-primary hover:underline">
            Merchant Login
          </Link>
        </div>
      </div>
    </div>
  )
}
