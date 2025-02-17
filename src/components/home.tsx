import Link from "next/link"
import { getSession } from "@/server/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import * as React from "react"
import { SignOutButton } from "./sign-out-button"

export async function HomeContent() {
  const session = await getSession()

  return (
    <main className="container max-w-5xl mx-auto px-4 py-16">
      <div className="space-y-16">
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Create T3 App
            </h1>
            {session ? (
              <p className="text-xl text-muted-foreground">
                Welcome back,{" "}
                <span className="font-medium text-foreground">
                  {session.user.name ?? "User"}
                </span>
                !
              </p>
            ) : (
              <p className="text-xl text-muted-foreground">
                Build full-stack apps with the best developer experience
              </p>
            )}
          </div>
          <div className="flex gap-4">
            {!session ? (
              <React.Fragment>
                <Button asChild variant="outline">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-foreground to-foreground/70 hover:from-foreground/90 hover:to-foreground/60"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </React.Fragment>
            ) : (
              <SignOutButton className="hover:bg-destructive/90" />
            )}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <Card className="group relative overflow-hidden border-2 hover:border-foreground/50 transition-all">
            <CardHeader className="space-y-6">
              <div className="space-y-4">
                <CardTitle className="text-2xl font-bold">
                  First Steps
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </CardDescription>
              </div>
              <Button
                asChild
                variant="default"
                size="lg"
                className="group-hover:bg-foreground group-hover:text-background transition-colors"
              >
                <Link
                  href="https://create.t3.gg/en/usage/first-steps"
                  target="_blank"
                >
                  Learn More
                </Link>
              </Button>
            </CardHeader>
          </Card>

          <Card className="group relative overflow-hidden border-2 hover:border-foreground/50 transition-all">
            <CardHeader className="space-y-6">
              <div className="space-y-4">
                <CardTitle className="text-2xl font-bold">
                  Documentation
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </CardDescription>
              </div>
              <Button
                asChild
                variant="default"
                size="lg"
                className="group-hover:bg-foreground group-hover:text-background transition-colors"
              >
                <Link
                  href="https://create.t3.gg/en/introduction"
                  target="_blank"
                >
                  Learn More
                </Link>
              </Button>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  )
}
