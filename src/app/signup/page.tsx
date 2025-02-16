import * as React from "react"
import { redirect } from "next/navigation"
import { authClient } from "@/client/auth"
import { AuthForm } from "@/components/auth-form"

async function signUp(formData: FormData) {
  "use server"

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  const { error } = await authClient.signUp.email({
    email,
    password,
    name,
    callbackURL: "/dashboard"
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect("/signin")
}

export default function SignUpPage() {
  return (
    <React.Suspense>
      <div className="container max-w-5xl mx-auto px-4 py-16">
        <AuthForm type="signup" action={signUp} />
      </div>
    </React.Suspense>
  )
}
