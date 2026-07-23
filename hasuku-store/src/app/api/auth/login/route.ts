import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-Mail und Passwort sind erforderlich" },
        { status: 400 }
      );
    }

    // TODO: Implement authentication with bcryptjs
    // 1. Find customer by email
    // 2. Compare password hash
    // 3. Generate session/JWT token

    return NextResponse.json(
      { error: "Authentifizierung noch nicht implementiert" },
      { status: 501 }
    );
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
