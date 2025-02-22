import { AuthForm } from "@/components/auth-form"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-16">
      <AuthForm type="signin" />
      <p className="text-center mt-4 text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Create one now
        </Link>
      </p>
    </div>
  )
}
