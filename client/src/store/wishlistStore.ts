import type { Product } from "@/types/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WishlistState {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (exists) {
          set({
            items: get().items.filter((p) => p.id !== product.id),
          });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      remove: (productId) => {
        set({ items: get().items.filter((p) => p.id !== productId) });
      },
      has: (productId) => get().items.some((p) => p.id === productId),
    }),
    {
      name: "zest-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
