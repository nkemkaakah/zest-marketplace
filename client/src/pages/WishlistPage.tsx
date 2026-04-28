import type { ReactElement } from "react";
import { Eye, ShoppingCart, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

const dummyWishlistProducts: Product[] = [
  {
    id: "dummy-gucci-duffle",
    name: "Gucci duffle bag",
    slug: "gucci-duffle-bag",
    description: "Figma dummy wishlist item",
    price: 960,
    compareAtPrice: 1160,
    category: "fashion",
    stock: 10,
    rating: 4.8,
    reviewCount: 65,
    imageUrl: "https://www.figma.com/api/mcp/asset/ab981bb6-c169-40f1-8fd9-d8ffbce22239",
    isFlashSale: true,
  },
  {
    id: "dummy-rgb-cooler",
    name: "RGB liquid CPU Cooler",
    slug: "rgb-liquid-cpu-cooler",
    description: "Figma dummy wishlist item",
    price: 1960,
    compareAtPrice: null,
    category: "electronics",
    stock: 10,
    rating: 4.8,
    reviewCount: 65,
    imageUrl: "https://www.figma.com/api/mcp/asset/c3876940-2f1a-4f63-ad35-81681d655471",
    isFlashSale: false,
  },
  {
    id: "dummy-gp11",
    name: "GP11 Shooter USB Gamepad",
    slug: "gp11-shooter-usb-gamepad",
    description: "Figma dummy wishlist item",
    price: 550,
    compareAtPrice: null,
    category: "gaming",
    stock: 10,
    rating: 4.8,
    reviewCount: 65,
    imageUrl: "https://www.figma.com/api/mcp/asset/b1c1ecd6-6a3a-436e-a31e-711ecee0f45a",
    isFlashSale: false,
  },
  {
    id: "dummy-jacket",
    name: "Quilted Satin Jacket",
    slug: "quilted-satin-jacket",
    description: "Figma dummy wishlist item",
    price: 750,
    compareAtPrice: null,
    category: "fashion",
    stock: 10,
    rating: 4.8,
    reviewCount: 65,
    imageUrl: "https://www.figma.com/api/mcp/asset/a876036c-4fb7-4ff1-bbde-eabd6028e870",
    isFlashSale: false,
  },
];

const recommendations = [
  {
    id: "rec-laptop",
    name: "ASUS FHD Gaming Laptop",
    price: 960,
    compareAtPrice: 1160,
    ratingCount: 65,
    imageUrl: "https://www.figma.com/api/mcp/asset/e2dede34-c498-4bcf-90d5-c3d7eed44f65",
    badge: "-35%",
  },
  {
    id: "rec-monitor",
    name: "IPS LCD Gaming Monitor",
    price: 1160,
    ratingCount: 65,
    imageUrl: "https://www.figma.com/api/mcp/asset/1ce7ba63-631d-4688-83cd-fa3e65239da8",
  },
  {
    id: "rec-g92",
    name: "HAVIT HV-G92 Gamepad",
    price: 560,
    ratingCount: 65,
    imageUrl: "https://www.figma.com/api/mcp/asset/200f9e08-10a1-45a2-8bdf-09aa17179d53",
    badge: "NEW",
  },
  {
    id: "rec-keyboard",
    name: "AK-900 Wired Keyboard",
    price: 200,
    ratingCount: 65,
    imageUrl: "https://www.figma.com/api/mcp/asset/53ac4dfd-ac98-4f41-bb90-86c42f846359",
  },
];

export default function WishlistPage(): ReactElement {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);
  const addToCart = useCartStore((s) => s.add);
  const displayItems = items.length > 0 ? items : dummyWishlistProducts;
  const usesDummyItems = items.length === 0;

  return (
    <div className="mx-auto w-full px-4 py-16 lg:px-site">
      <section className="space-y-[60px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-sans text-title-20-reg text-fg">Wishlist ({displayItems.length})</h1>
          <Button variant="outline-muted" type="button" className="w-full sm:w-auto">
            Move All To Bag
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
          {displayItems.slice(0, 4).map((product) => {
              const discount =
                product.compareAtPrice && product.compareAtPrice > product.price
                  ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                  : null;

              return (
                <article key={product.id} className="w-full max-w-product-card">
                  <div className="relative h-[250px] overflow-hidden rounded-control bg-surface-muted">
                    {discount ? (
                      <span className="absolute left-3 top-3 rounded-control bg-sale px-3 py-1 font-sans text-title-12 text-fg-inverse">
                        -{discount}%
                      </span>
                    ) : null}
                    <button
                      type="button"
                      className="absolute right-3 top-3 inline-flex size-[34px] items-center justify-center rounded-full bg-surface text-fg"
                      aria-label="Remove from wishlist"
                      onClick={() => {
                        if (!usesDummyItems) {
                          remove(product.id);
                        }
                      }}
                    >
                      <Trash2 className="size-4" strokeWidth={1.75} />
                    </button>
                    <img src={product.imageUrl} alt="" className="h-full w-full object-contain p-6" loading="lazy" />
                    <button
                      type="button"
                      className="absolute bottom-0 flex h-[41px] w-full items-center justify-center gap-2 rounded-b-control bg-top text-fg-inverse"
                      onClick={() => {
                        addToCart(product, 1);
                      }}
                    >
                      <ShoppingCart className="size-4" strokeWidth={1.75} />
                      <span className="font-sans text-title-12">Add To Cart</span>
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-sans text-title-16 font-medium text-fg">{product.name}</h3>
                    <div className="flex items-center gap-3 font-sans text-title-16">
                      <span className="font-medium text-sale">{formatPrice(product.price)}</span>
                      {product.compareAtPrice ? (
                        <span className="text-fg line-through opacity-50">{formatPrice(product.compareAtPrice)}</span>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      </section>

      <section className="mt-20 space-y-[60px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block h-10 w-5 rounded-control bg-sale" aria-hidden />
            <h2 className="font-sans text-title-20-reg text-fg">Just For You</h2>
          </div>
          <Button variant="outline-muted" type="button" className="w-full sm:w-auto">
            See All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((product) => (
            <article key={product.id} className="w-full max-w-product-card">
              <div className="relative h-[250px] overflow-hidden rounded-control bg-surface-muted">
                {product.badge ? (
                  <span
                    className={`absolute left-3 top-3 rounded-control px-3 py-1 font-sans text-title-12 text-fg-inverse ${product.badge === "NEW" ? "bg-stock" : "bg-sale"}`}
                  >
                    {product.badge}
                  </span>
                ) : null}
                <button
                  type="button"
                  className="absolute right-3 top-3 inline-flex size-[34px] items-center justify-center rounded-full bg-surface text-fg"
                  aria-label="Quick view"
                >
                  <Eye className="size-4" strokeWidth={1.75} />
                </button>
                <img src={product.imageUrl} alt="" className="h-full w-full object-contain p-6" loading="lazy" />
                <button
                  type="button"
                  className="absolute bottom-0 flex h-[41px] w-full items-center justify-center gap-2 rounded-b-control bg-top text-fg-inverse"
                >
                  <ShoppingCart className="size-4" strokeWidth={1.75} />
                  <span className="font-sans text-title-12">Add To Cart</span>
                </button>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-sans text-title-16 font-medium text-fg">{product.name}</h3>
                <div className="flex items-center gap-3 font-sans text-title-16">
                  <span className="font-medium text-sale">{formatPrice(product.price)}</span>
                  {product.compareAtPrice ? (
                    <span className="text-fg line-through opacity-50">{formatPrice(product.compareAtPrice)}</span>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[#FFAD33]">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="size-4 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="font-sans text-title-14 font-semibold text-fg opacity-50">
                    ({product.ratingCount})
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
