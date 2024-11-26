import connectDB from "@/config/connectdb";
import User from "@/models/User-Schema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
  await connectDB();
  try {
    const { username, email, password } = await req.json();

    console.log({ username, email, password });
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password, salt);
    // console.log("hashedPassword",{ hashedPassword });
    // Create new user with hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Update user with token
    await User.findByIdAndUpdate(newUser._id, { token: token });

    // Set token in cookie
   return NextResponse.json({message: "user created"}, { status: 201 });

    // // Set HTTP-only cookie
    // response.cookies.set({
    //   name: 'token',
    //   value: token, 
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
    //   maxAge: 7 * 24 * 60 * 60 // 7 days
    // });

    // return response;

  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
