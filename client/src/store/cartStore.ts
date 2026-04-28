import type { Product } from "@/types/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  quantity: number;
  product: Product;
}

interface CartState {
  lines: CartLine[];
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

function mergeLines(lines: CartLine[], product: Product, quantity: number): CartLine[] {
  const idx = lines.findIndex((l) => l.productId === product.id);
  if (idx === -1) {
    return [...lines, { productId: product.id, quantity, product }];
  }
  const next = [...lines];
  const line = next[idx];
  if (!line) {
    return lines;
  }
  next[idx] = {
    ...line,
    quantity: line.quantity + quantity,
    product,
  };
  return next;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (product, quantity = 1) => {
        set((state) => ({
          lines: mergeLines(state.lines, product, quantity),
        }));
      },
      remove: (productId) => {
        set((state) => ({
          lines: state.lines.filter((l) => l.productId !== productId),
        }));
      },
      setQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity < 1) {
            return {
              lines: state.lines.filter((l) => l.productId !== productId),
            };
          }
          return {
            lines: state.lines.map((l) =>
              l.productId === productId ? { ...l, quantity } : l,
            ),
          };
        });
      },
      clear: () => {
        set({ lines: [] });
      },
    }),
    {
      name: "zest-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);
