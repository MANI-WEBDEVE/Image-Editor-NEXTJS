import connectDB from "@/config/connectdb";
import User from "@/models/User-Schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  await connectDB();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      { message: "Login successful"},
      { status: 200 }
    );

    // // Set HTTP-only cookie
    response.cookies.set({
      name: "token",
      value: findUser.token,
      httpOnly: true,
      secure: true, // process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60, // 1 minute
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
