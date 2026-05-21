import type { CartLine } from "@/types/cart";
import type { Product } from "@/types/product";
import {
  clearCartApi,
  fetchCart,
  removeCartItem,
  upsertCartItem,
} from "@/services/cart";
import { create } from "zustand";

interface CartState {
  lines: CartLine[];
  synced: boolean;
  error: string | null;
  sync: () => Promise<void>;
  add: (product: Product, quantity?: number) => Promise<void>;
  remove: (productId: string) => Promise<void>;
  setQuantity: (productId: string, quantity: number) => Promise<void>;
  clear: () => Promise<void>;
}

export const useCartStore = create<CartState>()((set, get) => ({
  lines: [],
  synced: false,
  error: null,

  sync: async () => {
    try {
      const { lines } = await fetchCart();
      set({ lines, synced: true, error: null });
    } catch {
      // Don't block the UI if the initial sync fails
      set({ synced: true });
    }
  },

  add: async (product, quantity = 1) => {
    const prev = get().lines;
    const existing = prev.find((l) => l.productId === product.id);
    const newQty = (existing?.quantity ?? 0) + quantity;

    // Optimistic update
    const next: CartLine[] = existing
      ? prev.map((l) =>
          l.productId === product.id ? { ...l, quantity: newQty } : l,
        )
      : [...prev, { productId: product.id, quantity: newQty, product }];
    set({ lines: next, error: null });

    try {
      await upsertCartItem(product.id, newQty);
    } catch (e) {
      set({
        lines: prev,
        error: e instanceof Error ? e.message : "Failed to add to cart",
      });
    }
  },

  remove: async (productId) => {
    const prev = get().lines;
    set({ lines: prev.filter((l) => l.productId !== productId), error: null });
    try {
      await removeCartItem(productId);
    } catch (e) {
      set({
        lines: prev,
        error: e instanceof Error ? e.message : "Failed to remove item",
      });
    }
  },

  setQuantity: async (productId, quantity) => {
    const prev = get().lines;
    if (quantity < 1) {
      set({ lines: prev.filter((l) => l.productId !== productId), error: null });
      try {
        await removeCartItem(productId);
      } catch (e) {
        set({
          lines: prev,
          error: e instanceof Error ? e.message : "Failed to update cart",
        });
      }
      return;
    }
    set({
      lines: prev.map((l) =>
        l.productId === productId ? { ...l, quantity } : l,
      ),
      error: null,
    });
    try {
      await upsertCartItem(productId, quantity);
    } catch (e) {
      set({
        lines: prev,
        error: e instanceof Error ? e.message : "Failed to update cart",
      });
    }
  },

  clear: async () => {
    const prev = get().lines;
    set({ lines: [], error: null });
    try {
      await clearCartApi();
    } catch (e) {
      set({
        lines: prev,
        error: e instanceof Error ? e.message : "Failed to clear cart",
      });
    }
  },
}));
