import connectDB from "@/config/connectdb";
import User from "@/models/User-Schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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

    // Generate JWT token
    const token = jwt.sign(
        { userId: findUser._id, email: findUser.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );
  
      // Update user with token
      await User.findByIdAndUpdate(findUser, { token: token });
  


    const response = NextResponse.json(
      { message: "Login successful", username:findUser.username, email:findUser.email },
      { status: 200 }
    );

    // // Set HTTP-only cookie
    response.cookies.set({
      name: "token",
      value: findUser.token,
      httpOnly: true,
      secure: true, // process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
