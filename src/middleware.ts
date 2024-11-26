import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./utils/expToken";

// Define routes where middleware applies (optional)
const protectedRoutes = ["/dashboard", "/profile"];

export function middleware(req: NextRequest) {
  // Get token from cookies
  const token = req.cookies.get("token")?.value as string;

  
  // Get the pathname from the request URL
  const { pathname } = req.nextUrl;

  if ((pathname === "/login" || pathname === "/sign-in") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect to dashboard or any other page
  } else if (isTokenExpired(token) && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  } 
//    

// if(isTokenExpired(token)) {
//     console.log(req.url)
//     return NextResponse.redirect(new URL("/login", req.url))
//   }


  // Allow request to proceed if no conditions are triggered
  return NextResponse.next();
}

// Apply middleware to specific routes (optional)
export const config = {
    matcher: ["/login", "/sign-in" , "/dashboard"], // Apply middleware to login and signup routes
  };