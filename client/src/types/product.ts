export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isFlashSale: boolean;
}

export type ProductSort = "newest" | "price-asc" | "price-desc";

export interface PaginatedProducts {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
