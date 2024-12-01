import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db, users } from "../db";
import { eq } from "drizzle-orm";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
      };
    }
  }
}

interface JwtPayload {
  id: string;
  email: string;
  username: string;
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized request",
      });
    }

    let decodedToken: JwtPayload;
    try {
      decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;
    } catch (verificationError) {
      return res.status(401).json({
        error: "Invalid or expired access token",
      });
    }

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        userName: users.userName,
      })
      .from(users)
      .where(eq(users.id, decodedToken.id))
      .limit(1);

    if (!user) {
      return res.status(401).json({
        error: "User no longer exists",
      });
    }

    req.user = {
      id: user.id,
      email: user.email!,
      username: user.userName!,
    };

    // console.log("USER: ", req.user);

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(500).json({
      error: "Internal server error during authentication",
    });
  }
};
