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
    <React.Fragment>
      <main className="container max-w-5xl mx-auto px-4 py-16">
        <div className="space-y-12">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Create T3 App
              </h1>
              {session ? (
                <p className="text-xl text-muted-foreground">
                  Welcome, {session.user.name ?? "User"}!
                </p>
              ) : (
                <p className="text-xl text-muted-foreground">Welcome, Guest!</p>
              )}
            </div>
            {!session && (
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl">First Steps</CardTitle>
                <CardDescription className="text-base">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </CardDescription>
                <Button asChild variant="default" size="lg">
                  <Link
                    href="https://create.t3.gg/en/usage/first-steps"
                    target="_blank"
                  >
                    Learn More
                  </Link>
                </Button>
              </CardHeader>
            </Card>

            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl">Documentation</CardTitle>
                <CardDescription className="text-base">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </CardDescription>
                <Button asChild variant="default" size="lg">
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
      <SignOutButton />
    </React.Fragment>
  )
}
