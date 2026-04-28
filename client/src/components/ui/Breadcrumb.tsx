import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  items: Crumb[];
  /** Figma roadmap: earlier crumbs 50% opacity, current page full */
  variant?: "default" | "muted-trail";
}

export function Breadcrumb({ items, variant = "default" }: BreadcrumbProps): ReactElement {
  const trail = variant === "muted-trail";

  return (
    <nav aria-label="Breadcrumb" className="font-sans text-title-14 text-fg">
      <ol className="flex flex-wrap items-center gap-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const sep = !isLast ? <span aria-hidden className="opacity-40">/</span> : null;

          if (!isLast && item.to) {
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-3">
                <Link
                  className={trail ? "opacity-50 hover:underline hover:opacity-100" : "opacity-70 hover:underline"}
                  to={item.to}
                >
                  {item.label}
                </Link>
                {sep}
              </li>
            );
          }

          if (!isLast) {
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-3">
                <span className={trail ? "opacity-50" : "opacity-70"}>{item.label}</span>
                {sep}
              </li>
            );
          }

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-3">
              {item.to ? (
                <Link className={trail ? "hover:underline" : "font-medium hover:underline"} to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span className={trail ? "" : "font-medium"}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
