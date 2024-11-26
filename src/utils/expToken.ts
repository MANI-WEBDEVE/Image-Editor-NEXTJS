import jwt from "jsonwebtoken";

interface JWTPayload {
  exp?: number;
}

export function isTokenExpired(token: string): boolean {
  try {
    // Decode the token without verifying
    const decoded = jwt.decode(token) as JWTPayload;

    // Check if the token has an `exp` field
    if (!decoded || !decoded.exp) {
      return true; // Treat as expired if no exp field is present
    }

    // Compare the `exp` field with the current time
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Returns true if expired
  } catch (err) {
    return true; // If decoding fails, consider the token expired
  }
}
