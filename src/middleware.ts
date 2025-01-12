// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware
import authConfig from "@/lib/auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, "/")
    return Response.redirect(url)
  }
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/contact/:path*",
    "/sell/:path*",
    "/pos/:path*",
    "/openingStock/:path*",
    "/contacts/:path*",
    "/stock-adjustment/:path*",
    "/reports/:path*",
    "/profit-loss/:path*",
    "/sale-purchase/:path*",
  ],
}
