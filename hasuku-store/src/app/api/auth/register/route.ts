import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-Mail und Passwort sind erforderlich" },
        { status: 400 }
      );
    }

    // TODO: Implement registration with bcryptjs
    // 1. Check if email already exists
    // 2. Hash password with bcryptjs
    // 3. Create customer record
    // 4. Return success

    return NextResponse.json(
      { error: "Registrierung noch nicht implementiert" },
      { status: 501 }
    );
  } catch (error) {
    console.error("POST /api/auth/register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
