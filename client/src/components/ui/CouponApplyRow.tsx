import { useState, type ReactElement } from "react";
import { Button } from "@/components/ui/Button";

export interface CouponApplyRowProps {
  className?: string;
}

/** Figma coupon field + red Apply Coupon (local UI only). */
export function CouponApplyRow({ className = "" }: CouponApplyRowProps): ReactElement {
  const [code, setCode] = useState("");

  return (
    <div className={`flex flex-wrap items-center gap-4 sm:flex-nowrap ${className}`}>
      <label className="sr-only" htmlFor="coupon-code">
        Coupon code
      </label>
      <input
        id="coupon-code"
        type="text"
        value={code}
        placeholder="Coupon Code"
        onChange={(e) => {
          setCode(e.target.value);
        }}
        className="h-14 w-full max-w-coupon rounded-control border border-hairline border-fg bg-transparent px-6 font-sans text-title-16 text-fg outline-none placeholder:text-fg/40 focus-visible:ring-2 focus-visible:ring-fg"
      />
      <Button type="button" variant="sale" className="shrink-0 px-12 py-4">
        Apply Coupon
      </Button>
    </div>
  );
}
