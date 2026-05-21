import type { CartLine } from "@/types/cart";
import { apiJson } from "./http";

interface CartResponse {
  sessionId: string;
  lines: CartLine[];
}

export function fetchCart(): Promise<CartResponse> {
  return apiJson<CartResponse>("/api/cart");
}

export function upsertCartItem(productId: string, quantity: number): Promise<CartLine> {
  return apiJson<CartLine>(`/api/cart/items/${encodeURIComponent(productId)}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(productId: string): Promise<null> {
  return apiJson<null>(`/api/cart/items/${encodeURIComponent(productId)}`, {
    method: "DELETE",
  });
}

export function clearCartApi(): Promise<null> {
  return apiJson<null>("/api/cart", { method: "DELETE" });
}
