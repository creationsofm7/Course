// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getSessionCookie } from 'better-auth'

// // Add paths that should be public
// const publicPaths = ['/signin', '/api/auth']

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // Check if the path is public
//   const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

//   // Get the token from cookies
//   const token = true;
//   // Allow access to public paths
//   if (isPublicPath) return NextResponse.next()

//   // Redirect to login if no token is present
//   if (!token) {
//     const loginUrl = new URL('/signin', request.url)
//     // Preserve the original URL as a redirect parameter
//     loginUrl.searchParams.set('redirect', pathname)
//     return NextResponse.redirect(loginUrl)
//   }

//   // Continue to protected route if token exists
//   return NextResponse.next()
// }

// // Configure which routes to run middleware on
// export const config = {
//   matcher: [
//     /*
//      * Match all paths except:
//      * 1. /api/auth (authentication routes)
//      * 2. /_next (Next.js internals)
//      * 3. /static (static files)
//      * 4. .*\\..* (files with extensions)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
//   ],
// }

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cooklab/:path*", "/apitest"], // Protect all course routes
};
