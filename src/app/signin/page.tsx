import * as React from "react"
import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { auth } from "@/server/auth"

async function signIn(formData: FormData) {
  "use server"

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const remember = formData.get("remember") === "on"

  const { error } = await auth.api.email({
    email,
    password,
    callbackURL: "/dashboard",
    rememberMe: remember
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect("/dashboard")
}

export default function SignInPage() {
  return (
    <React.Suspense>
      <div className="container max-w-5xl mx-auto px-4 py-16">
        <AuthForm type="signin" action={signIn} />
      </div>
    </React.Suspense>
  )
}
