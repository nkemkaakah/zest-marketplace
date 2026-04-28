import { PRODUCTS } from "../data/products.js";
import type { PaginatedProducts, Product } from "../types/product.js";

export type ProductSort = "newest" | "price-asc" | "price-desc";

export interface ProductQuery {
  page: number;
  pageSize: number;
  sort: ProductSort;
  category?: string;
  q?: string;
  flashOnly?: boolean;
}

function normalizePage(page: unknown): number {
  const n = typeof page === "string" ? Number.parseInt(page, 10) : Number(page);
  if (!Number.isFinite(n) || n < 1) {
    return 1;
  }
  return Math.floor(n);
}

function normalizePageSize(size: unknown): number {
  const n = typeof size === "string" ? Number.parseInt(size, 10) : Number(size);
  if (!Number.isFinite(n) || n < 1) {
    return 12;
  }
  return Math.min(48, Math.max(1, Math.floor(n)));
}

function parseSort(raw: unknown): ProductSort {
  if (raw === "price-asc" || raw === "price-desc" || raw === "newest") {
    return raw;
  }
  return "newest";
}

export function parseProductQuery(query: Record<string, unknown>): ProductQuery {
  return {
    page: normalizePage(query.page),
    pageSize: normalizePageSize(query.pageSize ?? query.limit),
    sort: parseSort(query.sort),
    category:
      typeof query.category === "string" && query.category.length > 0
        ? query.category
        : undefined,
    q: typeof query.q === "string" && query.q.length > 0 ? query.q : undefined,
    flashOnly: query.flashOnly === "1" || query.flashOnly === "true",
  };
}

function normalizeCategory(value: string): string {
  return value
    .replaceAll("\u2019", "'")
    .replaceAll("\u2018", "'")
    .trim()
    .toLowerCase();
}

function filterProducts(query: ProductQuery): Product[] {
  let list = [...PRODUCTS];
  if (query.category) {
    const needle = normalizeCategory(query.category);
    list = list.filter((item) => normalizeCategory(item.category) === needle);
  }
  if (query.q) {
    const needle = query.q.toLowerCase();
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle),
    );
  }
  if (query.flashOnly) {
    list = list.filter((item) => item.isFlashSale);
  }
  return list;
}

function sortProducts(list: Product[], sort: ProductSort): Product[] {
  const copy = [...list];
  if (sort === "price-asc") {
    copy.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    copy.sort((a, b) => b.price - a.price);
  } else {
    copy.sort((a, b) => Number.parseInt(b.id, 10) - Number.parseInt(a.id, 10));
  }
  return copy;
}

export function listProducts(query: ProductQuery): PaginatedProducts {
  const filtered = filterProducts(query);
  const sorted = sortProducts(filtered, query.sort);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
  const safePage = Math.min(query.page, totalPages);
  const start = (safePage - 1) * query.pageSize;
  const items = sorted.slice(start, start + query.pageSize);
  return {
    items,
    page: safePage,
    pageSize: query.pageSize,
    total,
    totalPages,
  };
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
