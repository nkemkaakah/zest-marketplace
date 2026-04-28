import { useMemo, useState, type FormEvent, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { CouponApplyRow } from "@/components/ui/CouponApplyRow";
import { Field } from "@/components/ui/Input";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatPrice";

interface FieldErrors {
  firstName?: string;
  street?: string;
  city?: string;
  phone?: string;
  email?: string;
}

function validate(values: {
  firstName: string;
  street: string;
  city: string;
  phone: string;
  email: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (values.firstName.trim().length < 2) {
    errors.firstName = "First name is required.";
  }
  if (values.street.trim().length < 4) {
    errors.street = "Street address is required.";
  }
  if (values.city.trim().length < 2) {
    errors.city = "Town/City is required.";
  }
  if (values.phone.trim().length < 6) {
    errors.phone = "Phone number is required.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Valid email is required.";
  }
  return errors;
}

const formId = "checkout-billing-form";

export default function CheckoutPage(): ReactElement {
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [payment, setPayment] = useState<"bank" | "cod">("cod");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [lines],
  );

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const next = validate({ firstName, street, city, phone, email });
    setErrors(next);
    if (Object.keys(next).length > 0) {
      return;
    }
    setSubmitted(true);
    clear();
  }

  if (lines.length === 0 && !submitted) {
    return (
      <div className="mx-auto w-full max-w-site px-4 py-16 md:px-8 lg:px-0">
        <p className="font-sans text-title-16 text-fg opacity-80">Your cart is empty.</p>
        <Link className="mt-4 inline-block font-sans text-title-16 underline" to="/products">
          Browse products
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto w-full  px-4 py-16 md:px-8 lg:px-0">
        <h1 className="font-display text-heading-36 text-fg">Thank you</h1>
        <p className="mt-4 max-w-xl font-sans text-title-16 text-fg opacity-80">
          Your order has been recorded. Payment integration with the Zest SDK can be wired here
          next — this is a development placeholder after successful validation.
        </p>
        <Link className="mt-8 inline-block font-sans text-title-16 underline" to="/">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full  px-4 py-10 md:px-8 lg:px-site">
      <Breadcrumb
        variant="muted-trail"
        items={[
          { label: "Account", to: "/account" },
          { label: "My Account", to: "/account" },
          { label: "Product", to: "/products" },
          { label: "View Cart", to: "/cart" },
          { label: "CheckOut" },
        ]}
      />
      <h1 className="mt-8 font-display text-heading-billing text-fg">Billing Details</h1>

      <div className="mt-10 flex flex-col gap-12 xl:grid xl:grid-cols-[470px_527px] xl:items-start xl:justify-between xl:gap-10">
        <form
          id={formId}
          className="flex w-full max-w-billing flex-col gap-8 xl:max-w-none"
          onSubmit={onSubmit}
          noValidate
        >
          <Field
            appearance="checkout"
            required
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            autoComplete="given-name"
            error={errors.firstName}
          />
          <Field
            appearance="checkout"
            label="Company Name"
            name="company"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            autoComplete="organization"
          />
          <Field
            appearance="checkout"
            required
            label="Street Address"
            name="street"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
            autoComplete="street-address"
            error={errors.street}
          />
          <Field
            appearance="checkout"
            label="Apartment, floor, etc. (optional)"
            name="apartment"
            value={apartment}
            onChange={(e) => {
              setApartment(e.target.value);
            }}
          />
          <Field
            appearance="checkout"
            required
            label="Town/City"
            name="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            autoComplete="address-level2"
            error={errors.city}
          />
          <Field
            appearance="checkout"
            required
            label="Phone Number"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            autoComplete="tel"
            error={errors.phone}
          />
          <Field
            appearance="checkout"
            required
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="email"
            error={errors.email}
          />
          <label className="flex cursor-pointer items-start gap-4 font-sans text-title-16 text-fg">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => {
                setSaveInfo(e.target.checked);
              }}
              className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-control accent-sale"
            />
            <span>Save this information for faster check-out next time</span>
          </label>
        </form>

        <div className="flex w-full flex-col gap-8 xl:w-[527px] xl:justify-self-end">
          <div className="flex flex-col gap-8">
            {lines.map((line) => (
              <div key={line.productId} className="flex items-center gap-6">
                <img
                  src={line.product.imageUrl}
                  alt=""
                  className="size-[54px] shrink-0 rounded object-cover"
                  loading="lazy"
                />
                <div className="flex min-w-0 flex-1 items-center justify-between gap-4 font-sans text-title-16 text-fg">
                  <span className="truncate">{line.product.name}</span>
                  <span className="shrink-0">{formatPrice(line.product.price * line.quantity)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full max-w-[422px] flex-col gap-4 font-sans text-title-16 text-fg">
            <div className="flex items-start justify-between gap-6">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="h-px max-w-[422px] bg-fg opacity-40" />
            <div className="flex items-start justify-between gap-6">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="h-px max-w-[422px] bg-fg opacity-40" />
            <div className="flex items-start justify-between gap-6">
              <span>Total:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 font-sans text-title-16 text-fg">
            <div className="flex flex-wrap items-center justify-between gap-4 xl:max-w-[422px]">
              <label className="flex cursor-pointer items-center gap-4">
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "bank"}
                  onChange={() => {
                    setPayment("bank");
                  }}
                  className="size-6 accent-sale"
                />
                <span>Bank</span>
              </label>
              <div className="flex items-center gap-2 opacity-90">
                <img
                  src="https://www.figma.com/api/mcp/asset/55bea2b5-bc9d-434f-a969-426e739b609b"
                  alt="Bkash"
                  className="h-7 w-[42px] object-contain"
                  loading="lazy"
                />
                <img
                  src="https://www.figma.com/api/mcp/asset/f0792f04-fe6a-436b-a233-49a8263ddf58"
                  alt="Visa"
                  className="h-7 w-[42px] object-contain"
                  loading="lazy"
                />
                <img
                  src="https://www.figma.com/api/mcp/asset/828023e4-ef22-4e6b-ab63-781254b48d5d"
                  alt="Mastercard"
                  className="h-7 w-[42px] object-contain"
                  loading="lazy"
                />
                <img
                  src="https://www.figma.com/api/mcp/asset/cb1b3284-7e9b-4488-9ee0-6364d9adcdad"
                  alt="Nagad"
                  className="h-7 w-[42px] object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <label className="flex cursor-pointer items-center gap-4">
              <input
                type="radio"
                name="payment"
                checked={payment === "cod"}
                onChange={() => {
                  setPayment("cod");
                }}
                className="size-6 accent-sale"
              />
              <span>Cash on delivery</span>
            </label>
          </div>

          <CouponApplyRow className="xl:max-w-[527px]" />

          <Button
            type="submit"
            form={formId}
            variant="sale"
            className="w-full px-12 py-4 sm:w-auto xl:min-w-[190px]"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
