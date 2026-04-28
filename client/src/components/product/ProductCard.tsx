import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "flash";
}

export function ProductCard({
  product,
  variant = "default",
}: ProductCardProps): ReactElement {
  const addToCart = useCartStore((s) => s.add);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const wishlisted = useWishlistStore((s) => s.has(product.id));
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
        )
      : null;

  return (
    <article
      className={`group flex w-full max-w-product-card flex-col rounded-md border border-transparent bg-surface transition hover:shadow-lg ${
        variant === "flash" ? "shadow-sm" : ""
      }`}
    >
      <div className="relative flex aspect-product w-full items-center justify-center overflow-hidden bg-surface-muted">
        <Link to={`/products/${product.id}`} className="absolute inset-0 z-0" aria-label={product.name}>
          <img
            src={product.imageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        {discount !== null && discount > 0 ? (
          <span className="absolute left-3 top-3 z-10 rounded-sm bg-sale px-3 py-1 font-sans text-title-12 text-fg-inverse">
            -{discount}%
          </span>
        ) : null}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100 tablet:opacity-100">
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full bg-surface text-fg shadow"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => {
              toggleWishlist(product);
            }}
          >
            <Heart
              className="size-5"
              strokeWidth={1.75}
              fill={wishlisted ? "currentColor" : "none"}
            />
          </button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full bg-surface text-fg shadow"
            aria-label="Add to cart"
            onClick={() => {
              addToCart(product, 1);
            }}
          >
            <ShoppingCart className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4 py-4">
        <Link
          to={`/products/${product.id}`}
          className="line-clamp-2 font-sans text-title-16 text-fg hover:underline"
        >
          {product.name}
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-sans text-title-16 font-medium text-sale">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice ? (
            <span className="font-sans text-title-16 text-fg line-through opacity-50">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2 font-sans text-title-12 text-fg opacity-70">
          <span>{product.rating.toFixed(1)}</span>
          <span aria-hidden>•</span>
          <span>({product.reviewCount})</span>
        </div>
      </div>
    </article>
  );
}
