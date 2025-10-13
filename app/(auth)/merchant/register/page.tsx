import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export default function MerchantRegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <RegisterForm
          role="merchant"
          title="Register Your Store"
          description="Create a merchant account to start selling"
          redirectPath="/merchant/dashboard"
        />
        <div className="text-center text-sm text-muted-foreground">
          Already have a merchant account?{" "}
          <Link href="/merchant/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
