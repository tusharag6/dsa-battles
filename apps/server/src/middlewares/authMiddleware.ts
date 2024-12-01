import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db, users } from "../db";
import { eq } from "drizzle-orm";
import axios from "axios";

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

export interface JwtPayload {
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
    } catch (verificationError: any) {
      if (verificationError.name === "TokenExpiredError") {
        try {
          const refreshResponse = await axios.post(
            `${process.env.SERVER_URL}/api/v1/users/refresh`,
            {},
            {
              withCredentials: true,
              headers: {
                Cookie: req.headers.cookie,
              },
            }
          );

          // If refresh is successful, update cookies and set new authorization header
          if (refreshResponse.headers["set-cookie"]) {
            refreshResponse.headers["set-cookie"].forEach((cookie) => {
              res.setHeader("Set-Cookie", cookie);
            });
          }

          // If refresh is successful, retry the original request
          if (refreshResponse.data.accessToken) {
            req.headers[
              "authorization"
            ] = `Bearer ${refreshResponse.data.accessToken}`;

            // Re-verify the new token
            decodedToken = jwt.verify(
              refreshResponse.data.accessToken,
              process.env.ACCESS_TOKEN_SECRET!
            ) as JwtPayload;
          } else {
            // Refresh failed
            return res.status(401).json({ error: "Authentication failed" });
          }
        } catch (refreshError) {
          console.log("REFRESH TOKEN", req.cookies?.refreshToken);

          console.log("REFRESH ERROR", refreshError);

          return res.status(401).json({ error: "Failed to refresh token" });
        }
      } else {
        return res.status(401).json({ error: "Invalid access token" });
      }
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

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(500).json({
      error: "Internal server error during authentication",
    });
  }
};
