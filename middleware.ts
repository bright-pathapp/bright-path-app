import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/auth/login" || path === "/auth/signup" || path === "/";

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect unauthenticated users to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect authenticated users away from auth pages
  if (token && isPublicPath) {
    // Redirect based on user role
    if (token.role === "TEACHER" || token.role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/teacher", request.url));
    } else if (token.role === "PARENT") {
      return NextResponse.redirect(new URL("/dashboard/parent", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Role-based access control
  if (token) {
    // Restrict teacher routes to teachers
    if (
      path.startsWith("/dashboard/teacher") &&
      token.role !== "TEACHER" &&
      token.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Restrict parent routes to parents
    if (path.startsWith("/dashboard/parent") && token.role !== "PARENT") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

// Specify which paths should trigger this middleware
export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/dashboard/:path*",
    "/students/:path*",
    "/moods/:path*",
    "/classes/:path*",
  ],
};
