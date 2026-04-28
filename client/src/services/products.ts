import type { PaginatedProducts, Product, ProductSort } from "@/types/product";
import { apiJson } from "./http";

export interface FetchProductsParams {
  page?: number;
  pageSize?: number;
  sort?: ProductSort;
  category?: string;
  q?: string;
  flashOnly?: boolean;
}

function toQuery(params: FetchProductsParams): string {
  const search = new URLSearchParams();
  if (params.page !== undefined) {
    search.set("page", String(params.page));
  }
  if (params.pageSize !== undefined) {
    search.set("pageSize", String(params.pageSize));
  }
  if (params.sort) {
    search.set("sort", params.sort);
  }
  if (params.category) {
    search.set("category", params.category);
  }
  if (params.q) {
    search.set("q", params.q);
  }
  if (params.flashOnly) {
    search.set("flashOnly", "1");
  }
  const qs = search.toString();
  return qs.length > 0 ? `?${qs}` : "";
}

export async function fetchProducts(
  params: FetchProductsParams = {},
): Promise<PaginatedProducts> {
  const query = toQuery(params);
  return apiJson<PaginatedProducts>(`/api/products${query}`);
}

export async function fetchProductById(id: string): Promise<Product> {
  return apiJson<Product>(`/api/products/${encodeURIComponent(id)}`);
}
