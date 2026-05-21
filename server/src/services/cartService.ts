import { supabase } from "../config/supabase.js";
import type { Cart, CartLine } from "../types/cart.js";
import type { Product } from "../types/product.js";

interface CartItemRow {
  id: string;
  product_id: string;
  quantity: number;
  products: {
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
  };
}

function mapCartRow(row: CartItemRow): CartLine {
  const p = row.products;
  const category = Array.isArray(p.categories)
    ? p.categories[0]?.name
    : p.categories?.name;

  const product: Product = {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: Number(p.price),
    compareAtPrice: p.compare_at_price === null ? null : Number(p.compare_at_price),
    category: category ?? "Uncategorized",
    stock: p.stock,
    rating: Number(p.rating),
    reviewCount: p.review_count,
    imageUrl: p.image_url,
    isFlashSale: p.is_flash_sale,
  };

  return { productId: row.product_id, quantity: row.quantity, product };
}

export async function getCart(sessionId: string): Promise<Cart> {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      id,
      product_id,
      quantity,
      products!inner(
        id, name, slug, description, price, compare_at_price,
        stock, rating, review_count, image_url, is_flash_sale,
        categories!inner(name)
      )
      `,
    )
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch cart: ${error.message}`);
  }

  return {
    sessionId,
    lines: (data ?? []).map((row) => mapCartRow(row as unknown as CartItemRow)),
  };
}

export async function upsertCartItem(
  sessionId: string,
  productId: string,
  quantity: number,
): Promise<CartLine> {
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, stock")
    .eq("id", productId)
    .maybeSingle<{ id: string; stock: number }>();

  if (productError || !product) {
    throw new Error("Product not found");
  }
  if (quantity > product.stock) {
    throw new Error(`Only ${product.stock} items in stock`);
  }

  const { error } = await supabase.from("cart_items").upsert(
    { session_id: sessionId, product_id: productId, quantity },
    { onConflict: "session_id,product_id" },
  );

  if (error) {
    throw new Error(`Failed to update cart: ${error.message}`);
  }

  const cart = await getCart(sessionId);
  const line = cart.lines.find((l) => l.productId === productId);
  if (!line) {
    throw new Error("Cart item not found after upsert");
  }
  return line;
}

export async function removeCartItem(
  sessionId: string,
  productId: string,
): Promise<void> {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("session_id", sessionId)
    .eq("product_id", productId);

  if (error) {
    throw new Error(`Failed to remove cart item: ${error.message}`);
  }
}

export async function clearCart(sessionId: string): Promise<void> {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    throw new Error(`Failed to clear cart: ${error.message}`);
  }
}
