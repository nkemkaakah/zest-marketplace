import { useEffect, useMemo, useState, type ReactElement } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Pagination } from "@/components/ui/Pagination";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProducts } from "@/services/products";
import type { PaginatedProducts, ProductSort } from "@/types/product";
import { ApiError } from "@/services/http";

const sortOptions: { value: ProductSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ProductsPage(): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number.parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const sort = (searchParams.get("sort") as ProductSort | null) ?? "newest";
  const category = searchParams.get("category") ?? "";
  const q = searchParams.get("q") ?? "";

  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    data: PaginatedProducts | null;
  }>({ loading: true, error: null, data: null });

  const queryKey = useMemo(
    () => `${page}|${sort}|${category}|${q}`,
    [page, sort, category, q],
  );

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const data = await fetchProducts({
          page,
          pageSize: 12,
          sort: sortOptions.some((o) => o.value === sort) ? sort : "newest",
          category: category.length > 0 ? category : undefined,
          q: q.length > 0 ? q : undefined,
        });
        if (!cancelled) {
          setState({ loading: false, error: null, data });
        }
      } catch (e) {
        if (!cancelled) {
          const message =
            e instanceof ApiError
              ? e.message
              : e instanceof Error
                ? e.message
                : "Something went wrong";
          setState({ loading: false, error: message, data: null });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [queryKey, page, sort, category, q]);

  function buildHref(nextPage: number): string {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    return `/products?${next.toString()}`;
  }

  function updateSort(next: ProductSort): void {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("sort", next);
    nextParams.set("page", "1");
    setSearchParams(nextParams);
  }

  return (
    <div className="mx-auto w-full  px-4 py-10 lg:px-site">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Products" },
        ]}
      />
      <div className="mt-8 flex flex-col gap-8 tablet:flex-row tablet:items-end tablet:justify-between">
        <div>
          <h1 className="font-display text-heading-36 text-fg tablet:text-heading-40">
            All products
          </h1>
          {(category || q) && (
            <p className="mt-2 font-sans text-title-14 text-fg opacity-70">
              {category ? `Category: ${category}` : null}
              {category && q ? " · " : null}
              {q ? `Search: “${q}”` : null}
            </p>
          )}
        </div>
        <label className="flex flex-col gap-2 font-sans text-title-14 text-fg">
          <span className="sr-only">Sort products</span>
          <span>Sort by</span>
          <select
            className="rounded-control border border-border-subtle bg-surface px-4 py-3 font-sans text-title-16 text-fg"
            value={sort}
            onChange={(e) => {
              updateSort(e.target.value as ProductSort);
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {state.loading ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-md bg-surface-muted" />
          ))}
        </div>
      ) : null}

      {state.error ? (
        <p
          className="mt-10 rounded-md border border-sale bg-sale-surface px-4 py-3 font-sans text-title-16 text-sale"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      {!state.loading && state.data && state.data.items.length === 0 ? (
        <p className="mt-10 font-sans text-title-16 text-fg opacity-70">
          No products match your filters.{" "}
          <Link className="underline" to="/products">
            Clear filters
          </Link>
        </p>
      ) : null}

      {state.data && state.data.items.length > 0 ? (
        <>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {state.data.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12">
            <Pagination
              page={state.data.page}
              totalPages={state.data.totalPages}
              buildHref={buildHref}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
