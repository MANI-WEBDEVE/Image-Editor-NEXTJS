import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  // await connectDB();
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
 
    if (!token) {
      return NextResponse.json(
        { error: "No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string);
    
    return NextResponse.json({
      user: decoded,
      token
    }, { status: 200 });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}
