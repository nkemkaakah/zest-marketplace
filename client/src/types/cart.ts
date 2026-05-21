import type { Product } from "./product";

export interface CartLine {
  productId: string;
  quantity: number;
  product: Product;
}
