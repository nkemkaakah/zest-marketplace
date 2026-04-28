import { useEffect, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
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
}: {
  state: AsyncState<Product[]>;
  emptyLabel: string;
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
        <ProductCard key={product.id} product={product} variant="flash" />
      ))}
    </div>
  );
}

export default function HomePage(): ReactElement {
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

      <section className="mx-auto w-full  space-y-10 px-4 py-section-y-md lg:px-site">
        <SectionTitle eyebrow="Categories" title="Browse By Category" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 6).map((label) => (
            <Link
              key={label}
              to={`/products?category=${encodeURIComponent(label)}`}
              className="flex aspect-square flex-col items-center justify-center gap-3 rounded-md border border-border-subtle bg-surface-muted p-4 text-center font-sans text-title-14 text-fg transition hover:border-fg"
            >
              <span className="inline-block size-14 rounded-full bg-surface shadow-inner" aria-hidden />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full  space-y-10 px-4 py-section-y-md lg:px-site">
        <SectionTitle
          eyebrow="This Month"
          title="Best Selling Products"
          action={
            <Link to="/products?sort=price-desc">
              <Button variant="secondary" type="button" className="w-full sm:w-auto">
                View All
              </Button>
            </Link>
          }
        />
        <ProductRow state={best} emptyLabel="No products to show." />
      </section>

      <section className="mx-auto w-full  space-y-10 px-4 py-section-y-md lg:px-site">
        <SectionTitle eyebrow="Our Products" title="Explore Our Products" />
        <ProductRow state={explore} emptyLabel="No products to show." />
        <div className="flex justify-center">
          <Link to="/products">
            <Button variant="secondary" type="button">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full  px-4 py-section-y-lg lg:px-site">
        <SectionTitle eyebrow="Featured" title="New Arrival" />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="relative flex min-h-80 flex-col justify-end overflow-hidden rounded-md bg-surface-muted p-8 lg:min-h-96">
            <img
              src="https://picsum.photos/seed/ps5-feature/800/600"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="relative z-10 max-w-xs text-fg-inverse">
              <p className="font-sans text-title-20-md">PlayStation 5</p>
              <p className="mt-3 font-sans text-title-14 opacity-90">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Link
                to="/products/1"
                className="mt-4 inline-flex font-sans text-title-16 text-fg-inverse underline underline-offset-8"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="relative flex min-h-64 flex-col justify-end overflow-hidden rounded-md bg-top p-6 text-fg-inverse">
              <img
                src="https://picsum.photos/seed/womens-collection/600/400"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="relative z-10">
                <p className="font-sans text-title-20-md">Women’s Collections</p>
                <p className="mt-2 font-sans text-title-14 opacity-90">
                  Featured woman collections that give you another vibe.
                </p>
                <Link
                  to={`/products?category=${encodeURIComponent("Women's Fashion")}`}
                  className="mt-3 inline-flex font-sans text-title-16 underline underline-offset-8"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative flex min-h-64 flex-col justify-end overflow-hidden rounded-md bg-surface-muted p-6">
              <div className="relative z-10 text-fg">
                <p className="font-sans text-title-20-md">Speakers</p>
                <p className="mt-2 font-sans text-title-14 opacity-80">
                  Amazon wireless speakers
                </p>
                <Link
                  to="/products"
                  className="mt-3 inline-flex font-sans text-title-16 underline underline-offset-8"
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
