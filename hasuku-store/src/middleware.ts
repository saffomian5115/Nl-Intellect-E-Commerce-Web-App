import { NextRequest, NextResponse } from "next/server";

// Admin credentials (stored in env vars for production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@hausku.de";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "hausku-admin-2024";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin pages (except login page)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    const session = request.cookies.get("admin-session");

    if (!session?.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Verify session is valid
    try {
      const sessionData = JSON.parse(
        Buffer.from(session.value, "base64").toString()
      );

      if (sessionData.expires < Date.now()) {
        // Session expired
        const response = NextResponse.redirect(
          new URL("/admin/login", request.url)
        );
        response.cookies.set("admin-session", "", { maxAge: 0, path: "/" });
        return response;
      }
    } catch {
      // Invalid session
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.set("admin-session", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  // Protect admin API routes (except login endpoint)
  if (
    pathname.startsWith("/api/admin") &&
    !pathname.startsWith("/api/admin/auth")
  ) {
    const session = request.cookies.get("admin-session");

    if (!session?.value) {
      return NextResponse.json(
        { error: "Nicht autorisiert" },
        { status: 401 }
      );
    }

    try {
      const sessionData = JSON.parse(
        Buffer.from(session.value, "base64").toString()
      );

      if (sessionData.expires < Date.now()) {
        return NextResponse.json(
          { error: "Sitzung abgelaufen" },
          { status: 401 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Ungültige Sitzung" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
