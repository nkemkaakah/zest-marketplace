import type { HealthResponse } from "@/types/api";
import { apiJson } from "./http";

export async function fetchHealth(): Promise<HealthResponse> {
  return apiJson<HealthResponse>("/api/health");
}
