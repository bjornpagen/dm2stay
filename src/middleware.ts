import { type NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth"

const PUBLIC_ROUTES: RegExp[] = [
  /^\/$/,
  /^\/api\/.*/,
  /^\/signin.*/,
  /^\/signup.*/
]

const isPublicRoute = (path: string) =>
  PUBLIC_ROUTES.some((regex) => regex.test(path))

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
}

export async function middleware(request: NextRequest) {
  if (isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const sessionCookie = getSessionCookie(request)
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url))
  }
  return NextResponse.next()
}
