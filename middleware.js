import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  // Allow the requests if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  // 2) The token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next()
  }

  // Redirect to login page if accessing protected route and not logged in
  if (!token && pathname.startsWith("/dashboards")) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboards/:path*"],
}
