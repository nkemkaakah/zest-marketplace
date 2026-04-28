import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export function TopHeader(): ReactElement {
  return (
    <div
      className="flex h-top-bar w-full items-center justify-center bg-top px-4 text-top-text"
      data-name="Top Header"
    >
      <div className="mx-auto flex w-full items-center justify-between gap-4 text-title-14 tablet:gap-header-gap">
        <div></div>
        <div>
          <p className="text-center font-sans text-title-14 font-normal tablet:flex-1 tablet:text-left">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link
            className="font-semibold text-top-text underline decoration-solid"
            to="/products"
          >
            ShopNow
          </Link>
        </p>
        </div>
        
        <div className="flex items-center gap-1 font-sans font-normal">
          <span>English</span>
          <span className="inline-flex size-6 items-center justify-center" aria-hidden>
            <ChevronDown className="size-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </div>
  );
}
