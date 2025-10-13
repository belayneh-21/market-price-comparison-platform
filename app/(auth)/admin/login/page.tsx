import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <LoginForm
          role="admin"
          title="Admin Login"
          description="Sign in to access the admin panel"
          redirectPath="/admin/dashboard"
        />
        <div className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            User Login
          </Link>
          {" | "}
          <Link href="/merchant/login" className="text-primary hover:underline">
            Merchant Login
          </Link>
        </div>
      </div>
    </div>
  )
}
