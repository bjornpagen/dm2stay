import * as React from "react"
import { AuthForm } from "@/components/auth-form"

export default function SignUpPage() {
  return (
    <React.Fragment>
      <div className="container max-w-5xl mx-auto px-4 py-16">
        <AuthForm type="signup" />
      </div>
    </React.Fragment>
  )
}
