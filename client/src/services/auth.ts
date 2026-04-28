import { apiJson } from "./http";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  avatarUrl: string | null;
}

interface AuthPayload {
  user: AuthUser;
}

interface RegisterInput {
  email: string;
  password: string;
  fullName?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export function register(input: RegisterInput): Promise<AuthPayload> {
  return apiJson<AuthPayload>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function login(input: LoginInput): Promise<AuthPayload> {
  return apiJson<AuthPayload>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function logout(): Promise<null> {
  return apiJson<null>("/api/auth/logout", {
    method: "POST",
  });
}

export function me(): Promise<AuthPayload> {
  return apiJson<AuthPayload>("/api/auth/me");
}
