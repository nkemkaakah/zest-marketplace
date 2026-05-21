import type { Product } from "./product.js";

export interface CartLine {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  sessionId: string;
  lines: CartLine[];
}
