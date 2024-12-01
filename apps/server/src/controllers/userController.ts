import { Request, Response } from "express";
import * as argon2 from "argon2";
import { db, users } from "../db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const registerSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerUser = async (req: Request, res: Response) => {
  try {
    // input validation
    const userData = registerSchema.parse(req.body);

    // check for existing user
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, userData.email))
      .limit(1);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // hash the password
    const hashPassword = await argon2.hash(userData.password);

    // create and save the user
    const [newUser] = await db
      .insert(users)
      .values({
        userName: userData.userName,
        name: userData.name,
        email: userData.email,
        password: hashPassword,
      })
      .returning({
        id: users.id,
        userName: users.userName,
        name: users.name,
        email: users.email,
      });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    } else {
      // TODO: use winston to log unexpected errors
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // input validation
    const userData = loginSchema.parse(req.body);

    // check if user exist
    const [existingUser] = await db
      .select({
        id: users.id,
        email: users.email,
        userName: users.userName,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, userData.email));
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // verify password
    const isPasswordValid = await argon2.verify(
      existingUser.password!,
      userData.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // generate tokens: access, refresh
    // TODO: type safe env
    const tokenPayload = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.userName,
    };
    const accessToken = jwt.sign(
      tokenPayload,
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const refreshToken = jwt.sign(
      tokenPayload,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    // store refresh token in db
    await db
      .update(users)
      .set({ refreshToken })
      .where(eq(users.id, existingUser.id));

    // Secure cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };

    // return response with cookies and user info
    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        message: "Login successful",
        user: {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.userName,
        },
      });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    } else {
      // TODO: use winston to log unexpected errors
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  // TODO: remove refresh token, (required id: req.user.id: middleware)
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json({
      message: "Logout successful",
    });
};

// refreshAccessToken
// changeCurrentPassword
// getCurrentUser
// updateAccountDetails
// updateAvatar
