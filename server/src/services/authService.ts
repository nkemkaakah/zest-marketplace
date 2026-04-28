import { supabase } from "../config/supabase.js";
import type { AuthenticatedUser } from "../types/auth.js";

export interface RegisterInput {
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

interface UsersRow {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

function mapUserRow(row: UsersRow): AuthenticatedUser {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    phone: row.phone,
    avatarUrl: row.avatar_url,
  };
}

function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!name || !domain) {
    return "unknown";
  }
  const visible = name.slice(0, 2);
  return `${visible}***@${domain}`;
}

export async function registerUser(input: RegisterInput): Promise<AuthenticatedUser> {
  console.info(`[auth] register attempt for ${maskEmail(input.email)}`);
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName ?? null,
      },
    },
  });

  if (error || !data.user?.id) {
    console.warn(
      `[auth] register failed for ${maskEmail(input.email)}: ${error?.message ?? "unknown error"}`,
    );
    throw new Error(error?.message ?? "Registration failed");
  }

  const user = await getPublicUserById(data.user.id);
  console.info(`[auth] register success for user ${data.user.id}`);
  return (
    user ?? {
      id: data.user.id,
      email: data.user.email ?? input.email,
      fullName: input.fullName ?? null,
      phone: null,
      avatarUrl: null,
    }
  );
}

export async function loginUser(input: LoginInput): Promise<{
  user: AuthenticatedUser;
  accessToken: string;
  refreshToken: string;
}> {
  console.info(`[auth] login attempt for ${maskEmail(input.email)}`);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  const accessToken = data.session?.access_token;
  const refreshToken = data.session?.refresh_token;
  const userId = data.user?.id;

  if (error || !accessToken || !refreshToken || !userId) {
    console.warn(
      `[auth] login failed for ${maskEmail(input.email)}: ${error?.message ?? "invalid credentials"}`,
    );
    throw new Error(error?.message ?? "Invalid email or password");
  }

  const user =
    (await getPublicUserById(userId)) ?? {
      id: userId,
      email: data.user?.email ?? input.email,
      fullName: null,
      phone: null,
      avatarUrl: null,
    };

  console.info(`[auth] login success for user ${userId}`);
  return {
    user,
    accessToken,
    refreshToken,
  };
}

export async function getUserFromAccessToken(
  accessToken: string,
): Promise<AuthenticatedUser | null> {
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user?.id) {
    console.warn(`[auth] access token invalid: ${error?.message ?? "no user"}`);
    return null;
  }

  const user = await getPublicUserById(data.user.id);
  if (user) {
    return user;
  }

  return {
    id: data.user.id,
    email: data.user.email ?? "",
    fullName: null,
    phone: null,
    avatarUrl: null,
  };
}

async function getPublicUserById(id: string): Promise<AuthenticatedUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, full_name, phone, avatar_url")
    .eq("id", id)
    .maybeSingle<UsersRow>();

  if (error || !data) {
    return null;
  }

  return mapUserRow(data);
}
