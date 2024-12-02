import { Request, Response } from "express";
import * as argon2 from "argon2";
import { db, users } from "../db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../middlewares/authMiddleware";

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

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
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
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // verify password
    const isPasswordValid = await argon2.verify(
      existingUser.password,
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
        accessToken,
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
  if (!req.user?.id) {
    return res.status(401).json({
      error: "Unauthorized request",
    });
  }

  try {
    await db
      .update(users)
      .set({
        refreshToken: null,
      })
      .where(eq(users.id, req.user.id));
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
    };

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({
        message: "Logout successful",
      });
  } catch (error) {
    console.error("Error occurred while logging out:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  // extract refresh token from cookie
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      error: "Unauthorized request",
    });
  }

  // verify refresh token
  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload;
  } catch (verificationError) {
    return res.status(401).json({
      error: "Invalid or expired refresh token",
    });
  }

  // check if refresh token exist in db
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.refreshToken, refreshToken))
    .limit(1);
  if (!existingUser) {
    return res.status(401).json({
      error: "Refresh token not found or has been revoked",
    });
  }

  // find user
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
      error: "User associated with token not found",
    });
  }

  // generate new access and refresh token
  const tokenPayload = {
    id: user.id,
    email: user.email,
    username: user.userName,
  };
  const newAccessToken = jwt.sign(
    tokenPayload,
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  const newRefreshToken = jwt.sign(
    tokenPayload,
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  // update refresh token in db
  try {
    await db
      .update(users)
      .set({ refreshToken: newRefreshToken })
      .where(eq(users.id, user.id));
  } catch (error) {
    console.error("Error occurred while updating refresh token:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, cookieOptions)
    .cookie("refreshToken", newRefreshToken, cookieOptions)
    .json({
      message: "Token refreshed",
      accessToken: newAccessToken,
    });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  try {
    const [user] = await db
      .select({
        id: users.id,
        userName: users.userName,
        name: users.name,
        email: users.name,
        image: users.image,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const changeCurrentPassword = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  try {
    const userData = passwordChangeSchema.parse(req.body);

    // Find user and match current password
    const [user] = await db
      .select({
        password: users.password,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isCurrentPasswordValid = await argon2.verify(
      user.password!,
      userData.currentPassword
    );

    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Check if new password matches the current password
    const isNewPasswordSame = await argon2.verify(
      user.password!,
      userData.newPassword
    );

    if (isNewPasswordSame) {
      return res.status(400).json({
        error: "New password must be different from the current password",
      });
    }

    // Hash new password
    const newHashedPassword = await argon2.hash(userData.newPassword);

    // Update password
    await db
      .update(users)
      .set({ password: newHashedPassword })
      .where(eq(users.id, userId));

    res.status(200).json({
      message: "Password updated",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    } else {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// TODO:
// updateAccountDetails
// updateAvatar
