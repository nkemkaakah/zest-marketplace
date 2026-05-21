import { supabase } from "../config/supabase.js";
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

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  stock: number;
  rating: number;
  review_count: number;
  image_url: string;
  is_flash_sale: boolean;
  categories: { name: string } | { name: string }[] | null;
}

function mapProductRow(row: ProductRow): Product {
  const category =
    Array.isArray(row.categories) ? row.categories[0]?.name : row.categories?.name;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: Number(row.price),
    compareAtPrice:
      row.compare_at_price === null ? null : Number(row.compare_at_price),
    category: category ?? "Uncategorized",
    stock: row.stock,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    imageUrl: row.image_url,
    isFlashSale: row.is_flash_sale,
  };
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

async function countProducts(query: ProductQuery): Promise<number> {
  let request = supabase
    .from("products")
    .select("id, categories!inner(name)", { count: "exact", head: true });
  if (query.flashOnly) {
    request = request.eq("is_flash_sale", true);
  }
  if (query.category) {
    request = request.ilike("categories.name", normalizeCategory(query.category));
  }
  if (query.q) {
    const escaped = query.q.replaceAll("%", "\\%").replaceAll(",", "\\,");
    request = request.or(`name.ilike.%${escaped}%,description.ilike.%${escaped}%`);
  }
  const { count, error } = await request;
  if (error) {
    throw new Error(`Failed to fetch products count: ${error.message}`);
  }
  return count ?? 0;
}

export async function listProducts(query: ProductQuery): Promise<PaginatedProducts> {
  const total = await countProducts(query);
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
  const safePage = Math.min(query.page, totalPages);
  const start = (safePage - 1) * query.pageSize;
  const end = start + query.pageSize - 1;

  let request = supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      price,
      compare_at_price,
      stock,
      rating,
      review_count,
      image_url,
      is_flash_sale,
      categories!inner(name)
      `,
    )
    .range(start, end);
  if (query.flashOnly) {
    request = request.eq("is_flash_sale", true);
  }
  if (query.category) {
    request = request.ilike("categories.name", normalizeCategory(query.category));
  }
  if (query.q) {
    const escaped = query.q.replaceAll("%", "\\%").replaceAll(",", "\\,");
    request = request.or(`name.ilike.%${escaped}%,description.ilike.%${escaped}%`);
  }
  if (query.sort === "price-asc") {
    request = request
      .order("price", { ascending: true })
      .order("created_at", { ascending: false });
  } else if (query.sort === "price-desc") {
    request = request
      .order("price", { ascending: false })
      .order("created_at", { ascending: false });
  } else {
    request = request.order("created_at", { ascending: false });
  }
  const { data, error } = await request;
  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
  const items = (data ?? []).map((row) => mapProductRow(row as ProductRow));

  return {
    items,
    page: safePage,
    pageSize: query.pageSize,
    total,
    totalPages,
  };
}

export async function getProductByIdOrSlug(
  idOrSlug: string,
): Promise<Product | null> {
  const idOrSlugValue = idOrSlug.trim();
  let request = supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      price,
      compare_at_price,
      stock,
      rating,
      review_count,
      image_url,
      is_flash_sale,
      categories!inner(name)
      `,
    )
    .limit(1);

  request = isUuid(idOrSlugValue)
    ? request.or(`id.eq.${idOrSlugValue},slug.eq.${idOrSlugValue}`)
    : request.eq("slug", idOrSlugValue);

  const { data, error } = await request.maybeSingle<ProductRow>();
  if (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
  if (!data) {
    return null;
  }
  return mapProductRow(data);
}
