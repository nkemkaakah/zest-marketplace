import type { NextFunction, Response } from "express";
import { getUserFromAccessToken } from "../services/authService.js";
import type { AuthenticatedRequest } from "../types/auth.js";
import { errorResponse } from "../utils/response.js";

/**
 * Protects routes that require an authenticated user.
 */
export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const accessToken = req.cookies?.access_token as string | undefined;

  if (!accessToken) {
    res.status(401).json(errorResponse("Unauthorized"));
    return;
  }

  const user = await getUserFromAccessToken(accessToken);

  if (!user) {
    res.status(401).json(errorResponse("Invalid or expired token"));
    return;
  }

  req.user = user;
  next();
}
