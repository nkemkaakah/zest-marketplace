/**
 * Base URL for the Express API (no trailing slash).
 * Falls back to same-origin `/api` via Vite dev proxy when unset.
 */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL;
  if (typeof raw === "string" && raw.length > 0) {
    return raw.replace(/\/$/, "");
  }
  return "";
}
