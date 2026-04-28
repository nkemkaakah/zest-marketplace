import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export interface PaginationProps {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

export function Pagination({
  page,
  totalPages,
  buildHref,
}: PaginationProps): ReactElement {
  if (totalPages <= 1) {
    return <></>;
  }

  const pages: number[] = [];
  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <PaginationLink
        ariaLabel="Previous page"
        disabled={page <= 1}
        href={buildHref(page - 1)}
      >
        ‹
      </PaginationLink>
      {pages.map((p) => (
        <PaginationLink
          key={p}
          ariaLabel={`Page ${p}`}
          href={buildHref(p)}
          active={p === page}
        >
          {String(p)}
        </PaginationLink>
      ))}
      <PaginationLink
        ariaLabel="Next page"
        disabled={page >= totalPages}
        href={buildHref(page + 1)}
      >
        ›
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  href,
  children,
  disabled,
  active,
  ariaLabel,
}: {
  href: string;
  children: string;
  disabled?: boolean;
  active?: boolean;
  ariaLabel?: string;
}): ReactElement {
  if (disabled) {
    return (
      <span
        className="inline-flex min-w-10 items-center justify-center rounded-control border border-border-subtle px-3 py-2 font-sans text-title-14 text-fg opacity-40"
        aria-disabled="true"
        aria-label={ariaLabel}
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      className={[
        "inline-flex min-w-10 items-center justify-center rounded-control border px-3 py-2 font-sans text-title-14 transition",
        active
          ? "border-fg bg-fg text-fg-inverse"
          : "border-border-subtle text-fg hover:border-fg",
      ].join(" ")}
      to={href}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
