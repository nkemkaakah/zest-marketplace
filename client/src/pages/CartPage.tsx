import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { CartQuantityControl } from "@/components/cart/CartQuantityControl";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { CouponApplyRow } from "@/components/ui/CouponApplyRow";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";

function CartTableHeader(): ReactElement {
  return (
    <div
      className="hidden min-h-[72px] shadow-card tablet:grid tablet:grid-cols-[24px_54px_minmax(0,1fr)_120px_100px_100px] tablet:items-center tablet:gap-4 tablet:rounded-control tablet:bg-surface tablet:px-10 tablet:py-4 tablet:font-sans tablet:text-title-16 tablet:text-fg"
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
    <div className="mx-auto w-full  px-4 py-10 lg:px-site">
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
        <div className="mt-10 flex flex-col gap-cart-section-y">
          <div className="flex flex-col gap-cart-inner-gap">
            <div className="flex flex-col gap-cart-row-gap">
              <CartTableHeader />
              <ul className="flex flex-col gap-4">
                {lines.map((line) => (
                  <li
                    key={line.productId}
                    className="rounded-control bg-surface px-4 py-4 shadow-card tablet:grid tablet:min-h-[102px] tablet:grid-cols-[24px_54px_minmax(0,1fr)_120px_100px_100px] tablet:items-center tablet:gap-4 tablet:px-10 tablet:py-6"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3 tablet:mb-0 tablet:block">
                      <button
                        type="button"
                        className="text-sale hover:opacity-80 tablet:mx-auto tablet:block"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => {
                          remove(line.productId);
                        }}
                      >
                        <X className="size-5" strokeWidth={1.5} />
                      </button>
                      <Link
                        to={`/products/${line.productId}`}
                        className="block shrink-0 tablet:hidden"
                      >
                        <img
                          src={line.product.imageUrl}
                          alt=""
                          className="size-14 rounded object-cover"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <Link to={`/products/${line.productId}`} className="hidden tablet:block">
                      <img
                        src={line.product.imageUrl}
                        alt=""
                        className="size-[54px] rounded object-cover"
                        loading="lazy"
                      />
                    </Link>
                    <div className="min-w-0 tablet:pr-2">
                      <Link
                        className="font-sans text-title-16 text-fg hover:underline"
                        to={`/products/${line.productId}`}
                      >
                        {line.product.name}
                      </Link>
                      <p className="mt-1 font-sans text-title-14 text-fg tablet:hidden">
                        {formatPrice(line.product.price)} each
                      </p>
                    </div>
                    <p className="hidden font-sans text-title-16 text-fg tablet:block">
                      {formatPrice(line.product.price)}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-4 tablet:mt-0 tablet:justify-start">
                      <span className="font-sans text-title-14 text-fg tablet:hidden">Qty</span>
                      <CartQuantityControl
                        value={line.quantity}
                        min={1}
                        max={line.product.stock}
                        label={`Quantity for ${line.product.name}`}
                        onChange={(n) => {
                          setQuantity(line.productId, n);
                        }}
                      />
                    </div>
                    <p className="mt-3 font-sans text-title-16 text-fg tablet:mt-0">
                      {formatPrice(line.product.price * line.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
              <Link
                to="/products"
                className="inline-flex w-full items-center justify-center rounded-control border border-hairline border-border-outline bg-transparent px-12 py-4 font-sans text-title-16 text-fg transition hover:bg-surface-muted tablet:w-auto"
              >
                Return To Shop
              </Link>
              <Button type="button" variant="outline-muted" className="w-full px-12 py-4 tablet:w-auto">
                Update Cart
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-10 tablet:flex-row tablet:flex-wrap tablet:items-start tablet:gap-coupon-total-gap">
            <CouponApplyRow className="w-full max-w-coupon shrink-0" />
            <aside className="w-full max-w-cart-total shrink-0 rounded-control border border-hairline border-fg bg-surface p-6">
              <h2 className="font-sans text-title-20-md text-fg">Cart Total</h2>
              <div className="mt-6 space-y-4 font-sans text-title-16 text-fg">
                <div className="flex items-center justify-between gap-4">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="h-px w-full bg-fg opacity-40" />
                <div className="flex items-center justify-between gap-4">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="h-px w-full bg-fg opacity-40" />
                <div className="flex items-center justify-between gap-4 font-sans text-title-16 text-fg">
                  <span>Total:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-control bg-sale px-12 py-4 font-sans text-title-16 font-medium text-fg-inverse transition hover:opacity-90"
              >
                Proceed to checkout
              </Link>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
