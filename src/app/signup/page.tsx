import { AuthForm } from "@/components/auth-form"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-16">
      <AuthForm type="signup" />
      <p className="text-center mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          Sign in instead
        </Link>
      </p>
    </div>
  )
}
