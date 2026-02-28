import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userCookie = request.cookies.get("user")?.value;

    let user: { role?: string } | null = null;
    try {
        if (userCookie) user = JSON.parse(userCookie);
    } catch {
        user = null;
    }

    const isAuthenticated = !!user;
    const isAdmin = user?.role === "ADMIN";

    if (pathname.startsWith("/admin")) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        if (!isAdmin) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login", "/signup"],
};
