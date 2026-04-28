import type { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  updateUserProfile,
} from "../services/authService.js";
import type { AuthenticatedRequest } from "../types/auth.js";
import { errorResponse, successResponse } from "../utils/response.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

interface AuthBody {
  email?: string;
  password?: string;
  fullName?: string;
}

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password, fullName } = req.body as AuthBody;

  if (!email || !password) {
    res.status(400).json(errorResponse("email and password are required"));
    return;
  }

  try {
    const user = await registerUser({
      email,
      password,
      fullName,
    });
    res.status(201).json(successResponse({ user }, "Registration successful"));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    res.status(400).json(errorResponse(message));
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as AuthBody;

  if (!email || !password) {
    res.status(400).json(errorResponse("email and password are required"));
    return;
  }

  try {
    const { user, accessToken, refreshToken } = await loginUser({ email, password });
    res.cookie("access_token", accessToken, COOKIE_OPTIONS);
    res.cookie("refresh_token", refreshToken, COOKIE_OPTIONS);
    res.json(successResponse({ user }, "Login successful"));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    res.status(401).json(errorResponse(message));
  }
}

export function logout(_req: Request, res: Response): void {
  res.clearCookie("access_token", { path: "/" });
  res.clearCookie("refresh_token", { path: "/" });
  res.json(successResponse(null, "Logged out successfully"));
}

export function getMe(req: AuthenticatedRequest, res: Response): void {
  if (!req.user) {
    res.status(401).json(errorResponse("Unauthorized"));
    return;
  }

  res.json(successResponse({ user: req.user }, "Current user"));
}

export async function updateMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json(errorResponse("Unauthorized"));
    return;
  }

  const { fullName } = req.body as { fullName?: unknown };
  if (fullName !== undefined && typeof fullName !== "string") {
    res.status(400).json(errorResponse("fullName must be a string"));
    return;
  }

  const nextFullName =
    typeof fullName === "string" ? (fullName.trim().length > 0 ? fullName.trim() : null) : null;

  const updated = await updateUserProfile({
    userId: req.user.id,
    fullName: nextFullName,
  });

  if (!updated) {
    res.status(400).json(errorResponse("Unable to update user profile"));
    return;
  }

  res.json(successResponse({ user: updated }, "Profile updated"));
}
