import { auth } from "@/server/auth"
import { redirect } from "next/navigation"

export const signIn = async (email: string, password: string) => {
  "use server"

  const res = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  })
  if (!res.redirect || !res.url) {
    return
  }
  redirect(res.url)
}
