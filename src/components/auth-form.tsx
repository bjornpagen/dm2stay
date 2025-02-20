"use client"

import type * as React from "react"
import { redirect } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { authClient } from "@/lib/auth"

type AuthFormProps = {
  type: "signin" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (type === "signin") {
      const remember = formData.get("remember") === "on"
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: remember
      })

      if (error) {
        throw new Error(error.message)
      }

      redirect("/conversations")
    } else {
      const name = formData.get("name") as string
      const { error } = await authClient.signUp.email({
        email,
        password,
        name
      })

      if (error) {
        throw new Error(error.message)
      }

      redirect("/conversations")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>
            {type === "signin" ? "Sign In" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {type === "signin"
              ? "Enter your credentials to sign in"
              : "Fill in your details to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete={
                type === "signin" ? "current-password" : "new-password"
              }
            />
          </div>
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
              />
            </div>
          )}
          {type === "signin" && (
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" name="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {type === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
