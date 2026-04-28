import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "sale" | "outline-muted";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-fg-inverse hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
  secondary:
    "border border-hairline border-fg bg-transparent text-fg hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50",
  ghost: "bg-transparent text-fg hover:bg-surface-muted",
  danger: "bg-sale text-fg-inverse hover:opacity-90",
  /** Figma primary actions (cart apply coupon, checkout, flash CTAs) */
  sale:
    "bg-sale font-medium text-fg-inverse hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
  /** Figma outline: border black ~50% opacity */
  "outline-muted":
    "border border-hairline border-border-outline bg-transparent text-fg hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...rest
}: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-control px-8 py-3 font-sans text-title-16 transition ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
