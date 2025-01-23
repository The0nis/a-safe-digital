import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import config from "./config";
 


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateNewTokens(refreshToken: string) {
  // Verify the refresh token
  if (!config.REFRESH_TOKEN_SECRET || !config.AUTH_SECRET) {
    throw new Error("Internal Sever Error");
  }
  const decoded = jwt.verify(
    refreshToken,
    config.REFRESH_TOKEN_SECRET
  ) as jwt.JwtPayload;

  console.log("new tokeen", decoded);

  // Generate new access token
  const newAccessToken = jwt.sign(
    { userId: decoded.userId },
    config.AUTH_SECRET,
    {
      expiresIn: "15m",
    }
  );

  console.log("new tokeen", newAccessToken);

  // Generate new refresh token
  const newRefreshToken = jwt.sign(
    { userId: decoded.userId },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d", // Refresh token expires in 7 days
    }
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

export const iife = <T>(fn: () => T) => fn();