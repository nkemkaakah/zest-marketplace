import { useEffect, useState, type ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Minus, Plus, RotateCcw, Star, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProductById, fetchProducts } from "@/services/products";
import type { Product } from "@/types/product";
import { ApiError } from "@/services/http";
import { formatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/store/cartStore";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"] as const;

const COLOR_SWATCHES: { key: string; label: string; swatch: string }[] = [
  { key: "white", label: "White", swatch: "bg-white ring-1 ring-inset ring-fg/25" },
  { key: "black", label: "Black", swatch: "bg-fg" },
  { key: "sale",  label: "Red",   swatch: "bg-sale" },
  { key: "muted", label: "Grey",  swatch: "bg-surface-muted ring-1 ring-inset ring-fg/15" },
];

const COLOR_KEYS: readonly string[] = ["white", "black", "sale", "muted"];

function hashPick<T>(id: string, list: readonly T[]): T {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) {
    n += id.charCodeAt(i);
  }
  return list[n % list.length] as T;
}

function StarRating({ rating }: { rating: number }): ReactElement {
  const full = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < full ? "fill-[#FFAD33] text-[#FFAD33]" : "fill-none text-fg/25"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

interface ProductDetailViewProps {
  product: Product;
  related: Product[];
}

function ProductDetailView({ product, related }: ProductDetailViewProps): ReactElement {
  const addToCart = useCartStore((s) => s.add);
  const [selectedSize, setSelectedSize] = useState(() => hashPick(product.id, SIZE_OPTIONS));
  const [selectedColor, setSelectedColor] = useState(() => hashPick(product.id, COLOR_KEYS));
  const [qty, setQty] = useState(1);
  const inStock = product.stock > 0;

  const visibleSwatches = [COLOR_SWATCHES[0], COLOR_SWATCHES[2]];

  return (
    <div className="mx-auto w-full px-4 py-10 md:px-8 lg:px-site">

      <Breadcrumb
        variant="muted-trail"
        items={[
          { label: "Home", to: "/" },
          {
            label: product.category.charAt(0).toUpperCase() + product.category.slice(1),
            to: "/products",
          },
          { label: product.name },
        ]}
      />

      <div className="mt-8 flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-[70px]">

        <div className="flex flex-col gap-4 xl:flex-row xl:gap-[30px]">

          <div className="order-2 flex flex-row gap-4 overflow-x-auto xl:order-1 xl:flex-col xl:overflow-visible">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[138px] w-[170px] shrink-0 overflow-hidden rounded-control bg-surface-muted"
              >
                <img
                  src={product.imageUrl}
                  alt=""
                  className="h-full w-full object-contain p-3"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="order-1 flex min-h-[320px] items-center justify-center overflow-hidden rounded-control bg-surface-muted xl:order-2 xl:h-[600px] xl:min-h-0 xl:w-[500px] xl:shrink-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-[280px] w-full object-contain px-6 xl:max-h-[480px]"
              loading="lazy"
            />
          </div>
        </div>

        
        <div className="w-full  ">

          {/* Title — Inter SemiBold 24px / 24px leading / 0.72px tracking */}
          <h1 className="font-display text-[24px] font-semibold leading-6 tracking-[0.72px] text-fg">
            {product.name}
          </h1>

          {/* Stars · reviews · divider · stock — 40px below title */}
          <div className="mt-10 flex flex-wrap items-center gap-4 font-sans text-title-14 text-fg">
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="opacity-50">({product.reviewCount} Reviews)</span>
            </div>
            <span className="inline-block h-4 w-px bg-fg/50" aria-hidden />
            <span className={inStock ? "text-stock opacity-60" : "text-sale"}>
              {inStock ? "In Stock" : "Out of stock"}
            </span>
          </div>

          {/* Price — Inter Regular 24px / 0.72px tracking */}
          <p className="mt-9 font-display text-[24px] font-normal leading-6 tracking-[0.72px] text-fg">
            {formatPrice(product.price)}
          </p>

          {/* Description — Poppins Regular 14px / 21px leading / max 373px */}
          <p className="mt-12 max-w-[373px] font-sans text-title-14 leading-[21px] text-fg">
            {product.description}
          </p>

          {/* Horizontal rule — 400px / opacity 50% */}
          <div className="mt-6 h-px w-full max-w-[400px] bg-fg opacity-50" aria-hidden />

          {/* Colours — Inter Regular 20px label + 2 swatches, gap 24px */}
          <div className="mt-6 flex items-start gap-6">
            <p className="font-display text-[20px] font-normal leading-5 tracking-[0.6px] text-fg">
              Colours:
            </p>
            <div className="flex items-center gap-2">
              {visibleSwatches.map((c) => {
                const active = selectedColor === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    aria-label={c.label}
                    title={c.label}
                    aria-pressed={active}
                    onClick={() => { setSelectedColor(c.key); }}
                    className={`size-5 rounded-full transition ${c.swatch} ${
                      active ? "ring-2 ring-fg ring-offset-2" : ""
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Size — Inter Regular 20px label + 32×32 chips, gap 16px between chips */}
          <div className="mt-6 flex items-center gap-6">
            <p className="font-display text-[20px] font-normal leading-5 tracking-[0.6px] text-fg">
              Size:
            </p>
            <div className="flex flex-wrap gap-4">
              {SIZE_OPTIONS.map((s) => {
                const active = selectedSize === s;
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={active}
                    onClick={() => { setSelectedSize(s); }}
                    className={`size-8 rounded-control border font-sans text-[14px] font-medium leading-[21px] transition ${
                      active
                        ? "border-sale bg-sale text-fg-inverse"
                        : "border-[rgba(0,0,0,0.5)] text-fg hover:border-fg"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions row — stepper 159px (40+80+41) × 44px, Buy Now, Wishlist */}
          <div className="mt-6 flex flex-wrap items-center gap-4">

            {/* Qty stepper */}
            <div
              className="inline-flex h-11 shrink-0 overflow-hidden rounded-control"
              style={{ width: "159px" }}
              role="group"
              aria-label="Quantity"
            >
              <button
                type="button"
                className="flex h-11 w-10 items-center justify-center rounded-l-control border border-[rgba(0,0,0,0.5)] text-fg hover:bg-surface-muted disabled:opacity-40"
                aria-label="Decrease quantity"
                disabled={qty <= 1}
                onClick={() => { setQty((q) => Math.max(1, q - 1)); }}
              >
                <Minus className="size-4" />
              </button>
              <span className="flex h-11 w-20 items-center justify-center border-y border-[rgba(0,0,0,0.5)] font-sans text-[20px] font-medium leading-7 text-fg">
                {qty}
              </span>
              <button
                type="button"
                className="flex h-11 w-[41px] items-center justify-center rounded-r-control bg-sale text-fg-inverse hover:opacity-90 disabled:opacity-40"
                aria-label="Increase quantity"
                disabled={!inStock || qty >= product.stock}
                onClick={() => { setQty((q) => Math.min(product.stock, q + 1)); }}
              >
                <Plus className="size-4" />
              </button>
            </div>

            {/* Buy Now — px-48 py-10 */}
            <Button
              type="button"
              variant="sale"
              disabled={!inStock}
              className="px-12 py-[10px]"
              onClick={() => { addToCart(product, qty); }}
            >
              Buy Now
            </Button>

            {/* Wishlist — 40×40px bordered */}
            <button
              type="button"
              aria-label="Add to wishlist"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-[rgba(0,0,0,0.5)] text-fg hover:bg-surface-muted"
            >
              <Heart className="size-5" />
            </button>
          </div>

          {/* Delivery + Returns card — 399×180px, divider at 89px from top */}
          <div
            className="mt-10 w-full max-w-[399px] overflow-hidden rounded-control border border-[rgba(0,0,0,0.5)]"
            style={{ height: "180px" }}
          >
            {/* Row 1 — height 89px */}
            <div className="flex h-[89px] items-center gap-4 px-[15px]">
              <Truck className="size-10 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-title-16 font-medium leading-6">Free Delivery</p>
                <p className="font-sans text-[12px] font-medium leading-[18px] underline">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            {/* Divider at 89px */}
            <div className="h-px w-full bg-fg opacity-50" />
            {/* Row 2 — height 91px */}
            <div className="flex h-[91px] items-center gap-4 px-[15px]">
              <RotateCcw className="size-10 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-title-16 font-medium leading-6">Return Delivery</p>
                <p className="font-sans text-[12px] leading-[18px]">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-24 flex flex-col gap-[60px]">
        <div className="flex items-center gap-4">
          <span className="inline-block h-10 w-5 rounded-sm bg-sale" aria-hidden />
          <h2 className="font-sans text-[16px] font-semibold leading-5 text-sale">Related Item</h2>
        </div>
        {related.length === 0 ? (
          <p className="font-sans text-title-14 text-fg opacity-70">No related items.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function ProductDetailPage(): ReactElement {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(id ? null : "Missing product id");

  useEffect(() => {
    if (!id) {
      return;
    }
    let cancelled = false;
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const item = await fetchProductById(id);
        if (!cancelled) {
          setProduct(item);
          const rec = await fetchProducts({
            page: 1,
            pageSize: 4,
            category: item.category,
            sort: "newest",
          });
          if (!cancelled) {
            setRelated(rec.items.filter((p) => p.id !== item.id).slice(0, 4));
          }
        }
      } catch (e) {
        if (!cancelled) {
          const message =
            e instanceof ApiError
              ? e.message
              : e instanceof Error
                ? e.message
                : "Something went wrong";
          setError(message);
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!id) {
    return (
      <div className="mx-auto w-full max-w-site px-4 py-16 md:px-8 lg:px-0">
        <p className="font-sans text-title-16 text-sale" role="alert">
          Missing product id.
        </p>
        <Link className="mt-4 inline-block font-sans text-title-16 underline" to="/products">
          Back to products
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-site px-4 py-16 md:px-8 lg:px-0">
        <div className="h-10 w-64 animate-pulse rounded bg-surface-muted" />
        <div className="mt-10 flex flex-col gap-8 xl:flex-row xl:gap-[70px]">
          <div className="flex gap-[30px]">
            <div className="flex flex-col gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[138px] w-[170px] animate-pulse rounded-control bg-surface-muted" />
              ))}
            </div>
            <div className="h-[600px] w-[500px] animate-pulse rounded-control bg-surface-muted" />
          </div>
          <div className="w-full space-y-4 xl:w-[400px]">
            <div className="h-8 max-w-xs animate-pulse rounded bg-surface-muted" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-surface-muted" />
            <div className="h-24 w-full animate-pulse rounded bg-surface-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto w-full max-w-site px-4 py-16 md:px-8 lg:px-0">
        <p className="font-sans text-title-16 text-sale" role="alert">
          {error ?? "Product not found."}
        </p>
        <Link className="mt-4 inline-block font-sans text-title-16 underline" to="/products">
          Back to products
        </Link>
      </div>
    );
  }

  return <ProductDetailView key={product.id} product={product} related={related} />;
}
