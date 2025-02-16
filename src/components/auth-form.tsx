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

type AuthFormProps = {
  type: "signin" | "signup"
  action: (formData: FormData) => Promise<void>
}

export function AuthForm({ type, action }: AuthFormProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <form action={action}>
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
