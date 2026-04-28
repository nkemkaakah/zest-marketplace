import { useEffect, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ChevronRight,
  Gamepad2,
  Headphones,
  Monitor,
  Smartphone,
  Watch,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fetchProducts, type FetchProductsParams } from "@/services/products";
import type { Product } from "@/types/product";
import { ApiError } from "@/services/http";

/** Labels aligned with `server` product categories for filter links. */
const categories = [
  "Women's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
] as const;

const categoryTiles = [
  { label: "Phones", icon: Smartphone, to: "/products?category=Electronics" },
  { label: "Computers", icon: Monitor, to: "/products?category=Electronics" },
  { label: "SmartWatch", icon: Watch, to: "/products?category=Electronics" },
  { label: "Camera", icon: Camera, to: "/products?category=Electronics", active: true },
  { label: "HeadPhones", icon: Headphones, to: "/products?category=Electronics" },
  { label: "Gaming", icon: Gamepad2, to: "/products?category=Electronics" },
] as const satisfies readonly {
  label: string;
  icon: typeof Smartphone;
  to: string;
  active?: boolean;
}[];

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useProductsSection(options: FetchProductsParams): AsyncState<Product[]> {
  const { page, pageSize, sort, category, q, flashOnly } = options;
  const [state, setState] = useState<AsyncState<Product[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const res = await fetchProducts({
          page,
          pageSize,
          sort,
          category,
          q,
          flashOnly,
        });
        if (!cancelled) {
          setState({ data: res.items, loading: false, error: null });
        }
      } catch (e) {
        if (!cancelled) {
          const message =
            e instanceof ApiError
              ? e.message
              : e instanceof Error
                ? e.message
                : "Something went wrong";
          setState({ data: null, loading: false, error: message });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, pageSize, sort, category, q, flashOnly]);

  return state;
}

function ProductRow({
  state,
  emptyLabel,
  variant = "default",
}: {
  state: AsyncState<Product[]>;
  emptyLabel: string;
  variant?: "default" | "flash";
}): ReactElement {
  if (state.loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-md bg-surface-muted"
            aria-hidden
          />
        ))}
      </div>
    );
  }
  if (state.error) {
    return (
      <p className="rounded-md border border-sale bg-sale-surface px-4 py-3 font-sans text-title-14 text-sale">
        {state.error}
      </p>
    );
  }
  if (!state.data || state.data.length === 0) {
    return (
      <p className="font-sans text-title-16 text-fg opacity-70">{emptyLabel}</p>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {state.data.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}

export default function HomePage(): ReactElement {
  const initialCountdownSeconds = ((5 * 24 + 23) * 60 + 59) * 60 + 35;
  const [countdownSeconds, setCountdownSeconds] = useState(initialCountdownSeconds);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const flash = useProductsSection({
    flashOnly: true,
    pageSize: 8,
    page: 1,
    sort: "newest",
  });
  const best = useProductsSection({
    page: 1,
    pageSize: 4,
    sort: "price-desc",
  });
  const explore = useProductsSection({
    page: 1,
    pageSize: 8,
    sort: "newest",
  });
  const days = Math.floor(countdownSeconds / (24 * 60 * 60));
  const hours = Math.floor((countdownSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((countdownSeconds % (60 * 60)) / 60);
  const seconds = countdownSeconds % 60;

  return (
    <div className="bg-surface">
      <section className="mx-auto flex w-full flex-col gap-8 px-4 py-10 lg:flex-row lg:items-start lg:gap-8 lg:px-site xl:gap-12">
        <aside className="hidden lg:flex lg:min-h-[344px] lg:basis-[22%] lg:flex-col lg:gap-4 ">
          {categories.map((label, index) => {
            const withChevron = index === 0 || index === 1;
            return (
              <Link
                key={label}
                to={`/products?category=${encodeURIComponent(label)}`}
                className={`flex items-center font-sans text-[16px] font-normal leading-6 text-fg xl:text-[17px] ${
                  withChevron ? "justify-between" : ""
                }`}
              >
                <span>{label}</span>
                {withChevron ? (
                  <ChevronRight
                    className="size-5 xl:size-6"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
        </aside>

        <div className="relative h-[344px] w-full  overflow-hidden bg-top text-fg-inverse xl:h-[380px] 2xl:h-[420px]">
          <img
            src="https://www.figma.com/api/mcp/asset/b4ce37ff-c4f8-432f-8c02-387182eb435e"
            alt=""
            className="absolute left-[44.39%] top-[4.65%] h-[102.33%] w-[55.61%] max-w-none object-contain"
            loading="lazy"
          />

          <div className="absolute left-[7.18%] top-[16.86%] flex items-center gap-4 xl:gap-6">
            <img
              src="https://www.figma.com/api/mcp/asset/ee93f019-4014-4eea-a893-78e2b69cdffc"
              alt=""
              className="h-9 w-[30px] xl:h-[49px] xl:w-10"
              loading="lazy"
            />
            <span className="font-sans text-[14px] font-normal leading-6 text-fg-inverse xl:text-[16px]">
              iPhone 14 Series
            </span>
          </div>

          <h1 className="hidden md:block absolute left-[7%] top-[40%] w-[30%] font-display text-[36px] font-semibold leading-[46px] text-fg-inverse xl:text-[48px] xl:leading-[60px]">
            Up to 10% off Voucher
          </h1>

          <Link
            to="/products"
            className="absolute left-[10%] top-[70%] inline-flex items-center gap-2 font-sans text-[16px] font-medium leading-6 text-fg-inverse"
          >
            <span className="inline-flex border-b border-fg-inverse pb-0.5">Shop Now</span>
            <ArrowRight className="size-6" strokeWidth={1.75} aria-hidden />
          </Link>

          <div className="absolute left-1/2 top-[90%] flex h-[14px] w-[110px] -translate-x-1/2 items-center gap-3">
            <span className="size-3 rounded-full bg-fg-inverse/50" aria-hidden />
            <span className="size-3 rounded-full bg-fg-inverse/50" aria-hidden />
            <span className="size-[14px] rounded-full border-2 border-fg-inverse bg-sale" aria-hidden />
            <span className="size-3 rounded-full bg-fg-inverse/50" aria-hidden />
            <span className="size-3 rounded-full bg-fg-inverse/50" aria-hidden />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full  space-y-10 px-4 py-section-y-md lg:px-site">
        <SectionTitle
          eyebrow="Today’s"
          title="Flash Sales"
          action={
            <Button variant="secondary" type="button" className="hidden tablet:inline-flex">
              View all
            </Button>
          }
        />
        <ProductRow state={flash} emptyLabel="No flash sale items right now." />
      </section>

      <section className="mx-auto w-full space-y-[60px] px-4 py-section-y-md lg:px-site">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="inline-block h-10 w-5 rounded-control bg-sale" aria-hidden />
              <p className="font-sans text-[16px] font-semibold leading-5 text-sale">Categories</p>
            </div>
            <h2 className="font-display text-[36px] font-semibold leading-[48px] tracking-[0.04em] text-fg">
              Browse By Category
            </h2>
          </div>
          <div className="hidden items-center gap-2 tablet:flex">
            <button
              type="button"
              aria-label="Previous categories"
              className="inline-flex size-[46px] items-center justify-center rounded-full bg-surface-muted text-fg"
            >
              <ArrowLeft className="size-6" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Next categories"
              className="inline-flex size-[46px] items-center justify-center rounded-full bg-surface-muted text-fg"
            >
              <ArrowRight className="size-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-[30px]">
          {categoryTiles.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className={`flex h-[145px] min-w-0 flex-col items-center justify-center gap-4 rounded-control border text-center transition ${
                label === "Camera"
                  ? "border-transparent bg-sale text-fg-inverse shadow-card"
                  : "border-border-subtle bg-surface text-fg hover:border-fg/50"
              }`}
            >
              <Icon className="size-14" strokeWidth={1.5} />
              <span className="font-sans text-[16px] font-normal leading-6">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full space-y-[60px] px-4 py-section-y-md lg:px-site">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="inline-block h-10 w-5 rounded-control bg-sale" aria-hidden />
              <p className="font-sans text-[16px] font-semibold leading-5 text-sale">This Month</p>
            </div>
            <h2 className="font-display text-[36px] font-semibold leading-[48px] tracking-[0.04em] text-fg">
              Best Selling Products
            </h2>
          </div>
          <Link
            to="/products?sort=price-desc"
            className="inline-flex h-14 items-center justify-center rounded-control bg-sale px-12 font-sans text-[16px] font-medium text-fg-inverse"
          >
            View All
          </Link>
        </div>
        <ProductRow state={best} emptyLabel="No products to show." variant="default" />
      </section>

      <section className="mx-auto w-full px-4 py-section-y-md lg:px-site">
        <div className="relative h-[500px] w-full overflow-hidden bg-top">
          <div className="absolute left-[47.18%] top-0 h-full w-[43.08%]">
            <img
              src="https://www.figma.com/api/mcp/asset/dae8638d-3956-45dc-8a3f-94561a57ca44"
              alt=""
              className="h-full w-full scale-[1.4] object-cover opacity-70"
              loading="lazy"
            />
          </div>
          <div className="absolute left-[4.78%] top-[13.8%] space-y-8 text-fg-inverse">
            <p className="font-sans text-[16px] font-semibold leading-5 text-[#00FF66]">Categories</p>
            <h2 className="max-w-[443px] font-display text-[48px] font-semibold leading-[60px] tracking-[0.04em]">
              Enhance Your Music Experience
            </h2>
            <div className="flex items-center gap-6">
              {[
                { value: String(hours).padStart(2, "0"), label: "Hours" },
                { value: String(days).padStart(2, "0"), label: "Days" },
                { value: String(minutes).padStart(2, "0"), label: "Minutes" },
                { value: String(seconds).padStart(2, "0"), label: "Seconds" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex size-[62px] flex-col items-center justify-center rounded-full bg-surface text-fg"
                >
                  <span className="font-sans text-[16px] font-semibold leading-5">{item.value}</span>
                  <span className="font-sans text-[11px] leading-[18px]">{item.label}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center rounded-control bg-[#00FF66] px-12 font-sans text-[16px] font-medium leading-6 text-fg-inverse"
            >
              Buy Now!
            </button>
          </div>
          <div className="absolute left-[44.96%] top-[7.4%] h-[420px] w-[51.28%] overflow-hidden">
            <img
              src="https://www.figma.com/api/mcp/asset/ec14b19d-7d9a-4012-bd72-045d54b4df5f"
              alt=""
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full  space-y-[60px] px-4 py-section-y-md lg:px-site">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="inline-block h-10 w-5 rounded-control bg-sale" aria-hidden />
              <p className="font-sans text-[16px] font-semibold leading-5 text-sale">Our Products</p>
            </div>
            <h2 className="font-display text-[36px] font-semibold leading-[48px] tracking-[0.04em] text-fg">
              Explore Our Products
            </h2>
          </div>
          <div className="hidden items-center gap-2 tablet:flex">
            <button
              type="button"
              aria-label="Previous products"
              className="inline-flex size-[46px] items-center justify-center rounded-full bg-surface-muted text-fg"
            >
              <ArrowLeft className="size-6" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Next products"
              className="inline-flex size-[46px] items-center justify-center rounded-full bg-surface-muted text-fg"
            >
              <ArrowRight className="size-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
        <ProductRow state={explore} emptyLabel="No products to show." variant="default" />
        <div className="flex justify-center">
          <Link
            to="/products"
            className="inline-flex h-14 items-center justify-center rounded-control bg-sale px-12 font-sans text-[16px] font-medium text-fg-inverse"
          >
            View All Products
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full space-y-[60px] px-4 py-section-y-lg lg:px-site">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="inline-block h-10 w-5 rounded-control bg-sale" aria-hidden />
            <p className="font-sans text-[16px] font-semibold leading-5 text-sale">Featured</p>
          </div>
          <h2 className="font-display text-[36px] font-semibold leading-[48px] tracking-[0.04em] text-fg">
            New Arrival
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
          <div className="relative flex min-h-[600px] flex-col justify-end overflow-hidden rounded-control bg-top p-8">
            <img
              src="https://www.figma.com/api/mcp/asset/593d5abf-3ba8-44a2-902f-bc1d7e37d68a"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="relative z-10 max-w-xs text-fg-inverse">
              <p className="font-display text-[24px] font-semibold tracking-[0.03em]">PlayStation 5</p>
              <p className="mt-4 font-sans text-[14px] leading-[21px] opacity-90">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Link
                to="/products/1"
                className="mt-4 inline-flex border-b border-fg-inverse pb-0.5 font-sans text-[16px] font-medium"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2">
            <div className="relative col-span-full flex min-h-[284px] flex-col justify-end overflow-hidden rounded-control bg-top p-6 text-fg-inverse">
              <img
                src="https://www.figma.com/api/mcp/asset/1bec77fe-72e7-4dda-9705-89acc41b6b68"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="relative z-10">
                <p className="font-display text-[24px] font-semibold tracking-[0.03em]">Women’s Collections</p>
                <p className="mt-4 max-w-[255px] font-sans text-[14px] leading-[21px] opacity-90">
                  Featured woman collections that give you another vibe.
                </p>
                <Link
                  to={`/products?category=${encodeURIComponent("Women's Fashion")}`}
                  className="mt-4 inline-flex border-b border-fg-inverse pb-0.5 font-sans text-[16px] font-medium"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative flex min-h-[284px] flex-col justify-end overflow-hidden rounded-control bg-top p-6 text-fg-inverse">
              <img
                src="https://www.figma.com/api/mcp/asset/cc2c49d4-63f3-4920-ad27-4b5ac314cd8e"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="relative z-10">
                <p className="font-display text-[24px] font-semibold tracking-[0.03em]">Speakers</p>
                <p className="mt-2 font-sans text-[14px] leading-[21px] opacity-90">
                  Amazon wireless speakers
                </p>
                <Link
                  to="/products"
                  className="mt-3 inline-flex border-b border-fg-inverse pb-0.5 font-sans text-[16px] font-medium"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative flex min-h-[284px] flex-col justify-end overflow-hidden rounded-control bg-top p-6 text-fg-inverse">
              <img
                src="https://www.figma.com/api/mcp/asset/52480fcb-f348-4096-8344-342c4a983fc6"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="relative z-10">
                <p className="font-display text-[24px] font-semibold tracking-[0.03em]">Perfume</p>
                <p className="mt-2 font-sans text-[14px] leading-[21px] opacity-90">GUCCI INTENSE OUD EDP</p>
                <Link
                  to="/products"
                  className="mt-3 inline-flex border-b border-fg-inverse pb-0.5 font-sans text-[16px] font-medium"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
