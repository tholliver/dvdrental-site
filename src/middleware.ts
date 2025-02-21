import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // const { pathname } = request.nextUrl
    // const isAuthenticated = request.cookies.has("auth-token")
    // const isAdmin = request.cookies.get("user-role")?.value === "admin"

    // // Redirect to login if not authenticated
    // if (!isAuthenticated && pathname !== "/login") {
    //     return NextResponse.redirect(new URL("/login", request.url))
    // }

    // // Protect admin routes
    // if (pathname.startsWith("/admin") && !isAdmin) {
    //     return NextResponse.redirect(new URL("/", request.url))
    // }

    // return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
}

