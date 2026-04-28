import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { CartQuantityControl } from "@/components/cart/CartQuantityControl";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { CouponApplyRow } from "@/components/ui/CouponApplyRow";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";

/** Column header row — visually hidden on mobile, grid on tablet+ */
function CartTableHeader(): ReactElement {
  return (
    <div
      className="hidden min-h-[72px] shadow-card tablet:grid tablet:items-center tablet:rounded-control tablet:bg-surface tablet:px-6 tablet:py-4 tablet:font-sans tablet:text-title-16 tablet:text-fg lg:px-10"
      style={{ gridTemplateColumns: "24px 54px 1fr 100px 110px 100px", gap: "16px" }}
      aria-hidden
    >
      <span />
      <span />
      <span>Product</span>
      <span>Price</span>
      <span>Quantity</span>
      <span>Subtotal</span>
    </div>
  );
}

export default function CartPage(): ReactElement {
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  return (
    /* Full-width container — gutters via responsive padding only (no max-w here) */
    <div className="w-full px-4 py-10 md:px-8 lg:px-site">
      <Breadcrumb
        variant="muted-trail"
        items={[
          { label: "Home", to: "/" },
          { label: "Cart" },
        ]}
      />
      <h1 className="sr-only">Shopping cart</h1>

      {lines.length === 0 ? (
        <div className="mt-12 rounded-control border border-border-subtle bg-surface-muted p-10 text-center shadow-card">
          <p className="font-sans text-title-16 text-fg opacity-80">Your cart is empty.</p>
          <Link className="mt-4 inline-block font-sans text-title-16 underline" to="/products">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-16 lg:gap-20">
          {/* ── table + action buttons ── */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <CartTableHeader />

              <ul className="flex flex-col gap-4">
                {lines.map((line) => (
                  <li
                    key={line.productId}
                    className="rounded-control bg-surface px-4 py-4 shadow-card tablet:min-h-[102px] tablet:items-center tablet:px-6 tablet:py-6 lg:px-10"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "12px",
                    }}
                  >
                    {/* --- mobile: stacked card layout --- */}
                    <div className="flex items-start gap-3 tablet:hidden">
                      {/* remove button */}
                      <button
                        type="button"
                        className="mt-0.5 shrink-0 text-sale hover:opacity-80"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => { remove(line.productId); }}
                      >
                        <X className="size-5" strokeWidth={1.5} />
                      </button>
                      <Link to={`/products/${line.productId}`} className="block shrink-0">
                        <img
                          src={line.product.imageUrl}
                          alt={line.product.name}
                          className="size-14 rounded object-cover"
                          loading="lazy"
                        />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          className="font-sans text-title-16 text-fg hover:underline"
                          to={`/products/${line.productId}`}
                        >
                          {line.product.name}
                        </Link>
                        <p className="mt-0.5 font-sans text-title-14 text-fg/70">
                          {formatPrice(line.product.price)} each
                        </p>
                        <div className="mt-3 flex items-center gap-4">
                          <CartQuantityControl
                            value={line.quantity}
                            min={1}
                            max={line.product.stock}
                            label={`Quantity for ${line.product.name}`}
                            onChange={(n) => { setQuantity(line.productId, n); }}
                          />
                          <span className="font-sans text-title-16 font-medium text-fg">
                            {formatPrice(line.product.price * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* --- tablet+: 6-col grid row --- */}
                    <div
                      className="hidden tablet:grid tablet:w-full tablet:items-center"
                      style={{
                        gridTemplateColumns: "24px 54px 1fr 100px 110px 100px",
                        gap: "16px",
                        gridColumn: "1 / -1",
                      }}
                    >
                      <button
                        type="button"
                        className="text-sale hover:opacity-80"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => { remove(line.productId); }}
                      >
                        <X className="size-5" strokeWidth={1.5} />
                      </button>
                      <Link to={`/products/${line.productId}`}>
                        <img
                          src={line.product.imageUrl}
                          alt={line.product.name}
                          className="size-[54px] rounded object-cover"
                          loading="lazy"
                        />
                      </Link>
                      <div className="min-w-0 pr-2">
                        <Link
                          className="font-sans text-title-16 text-fg hover:underline"
                          to={`/products/${line.productId}`}
                        >
                          {line.product.name}
                        </Link>
                      </div>
                      <p className="font-sans text-title-16 text-fg">
                        {formatPrice(line.product.price)}
                      </p>
                      <CartQuantityControl
                        value={line.quantity}
                        min={1}
                        max={line.product.stock}
                        label={`Quantity for ${line.product.name}`}
                        onChange={(n) => { setQuantity(line.productId, n); }}
                      />
                      <p className="font-sans text-title-16 text-fg">
                        {formatPrice(line.product.price * line.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Return To Shop / Update Cart */}
            <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
              <Link
                to="/products"
                className="inline-flex w-full items-center justify-center rounded-control border border-hairline border-fg/50 bg-transparent px-8 py-3.5 font-sans text-title-16 text-fg transition hover:bg-surface-muted tablet:w-auto"
              >
                Return To Shop
              </Link>
              <Button
                type="button"
                variant="outline-muted"
                className="w-full px-8 py-3.5 tablet:w-auto"
              >
                Update Cart
              </Button>
            </div>
          </div>

          {/* ── coupon + cart total ── */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Coupon – grows to fill left side */}
            <div className="w-full lg:max-w-[440px]">
              <CouponApplyRow />
            </div>

            {/* Cart Total – fixed-width card on the right */}
            <aside className="w-full shrink-0 rounded-control border border-hairline border-fg bg-surface p-6 lg:w-[470px]">
              <h2 className="font-sans text-title-20-md text-fg">Cart Total</h2>
              <div className="mt-6 space-y-4 font-sans text-title-16 text-fg">
                <div className="flex items-center justify-between gap-4">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="h-px w-full bg-fg/40" />
                <div className="flex items-center justify-between gap-4">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="h-px w-full bg-fg/40" />
                <div className="flex items-center justify-between gap-4">
                  <span>Total:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-control bg-sale px-8 py-4 font-sans text-title-16 font-medium text-fg-inverse transition hover:opacity-90"
              >
                Procees to checkout
              </Link>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
