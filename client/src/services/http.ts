import { getApiBaseUrl } from "./config";

interface ApiSuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}

interface ApiErrorEnvelope {
  success: false;
  message: string;
  errors: unknown;
}

type ApiEnvelope<T> = ApiSuccessEnvelope<T> | ApiErrorEnvelope;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return (
    isObject(value) &&
    "success" in value &&
    typeof value.success === "boolean" &&
    "message" in value &&
    typeof value.message === "string"
  );
}

export class ApiError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function apiJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const base = getApiBaseUrl();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const text = await response.text();
  const parsed = text.length > 0 ? (JSON.parse(text) as unknown) : undefined;

  if (!response.ok) {
    const message =
      isApiEnvelope(parsed) && parsed.success === false
        ? parsed.message
        : `Request failed with status ${response.status}`;
    throw new ApiError(
      message,
      response.status,
      text,
    );
  }

  if (text.length === 0) {
    return undefined as T;
  }

  if (isApiEnvelope<T>(parsed) && parsed.success) {
    return parsed.data;
  }

  return parsed as T;
}
