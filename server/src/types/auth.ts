import type { Request } from "express";

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  avatarUrl: string | null;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}
