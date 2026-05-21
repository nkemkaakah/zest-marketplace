import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

const COOKIE_NAME = "cart_session_id";
const COOKIE_MAX_AGE_MS = 60 * 60 * 24 * 365 * 1000; // 1 year

export interface CartSessionRequest extends Request {
  cartSessionId: string;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function cartSession(
  req: CartSessionRequest,
  res: Response,
  next: NextFunction,
): void {
  let sessionId = req.cookies?.[COOKIE_NAME] as string | undefined;
  if (!sessionId || !UUID_RE.test(sessionId)) {
    sessionId = randomUUID();
    res.cookie(COOKIE_NAME, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE_MS,
      path: "/",
    });
  }
  req.cartSessionId = sessionId;
  next();
}
