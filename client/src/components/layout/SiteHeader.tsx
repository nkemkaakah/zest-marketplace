import { useEffect, useState, type FormEvent, type ReactElement } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  CircleX,
  Heart,
  LogOut,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  UserRound,
} from "lucide-react";
import { useAuthStore } from "@/store";
import { useCartStore } from "@/store/cartStore";

const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  [
    "font-sans text-title-16 text-fg",
    isActive ? "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-fg after:opacity-50" : "",
  ].join(" ");

export function SiteHeader(): ReactElement {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const initialize = useAuthStore((state) => state.initialize);
  const logout = useAuthStore((state) => state.logout);
  const isSignedIn = Boolean(user);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const cartCount = useCartStore((s) =>
    s.lines.reduce((acc, line) => acc + line.quantity, 0),
  );

  useEffect(() => {
    void initialize();
  }, [initialize]);

  function onSearchSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = String(data.get("q") ?? "").trim();
    const params = new URLSearchParams();
    if (q.length > 0) {
      params.set("q", q);
    }
    navigate(`/products?${params.toString()}`);
  }

  async function onLogoutClick(): Promise<void> {
    await logout();
    setIsAccountMenuOpen(false);
    navigate("/login");
  }

  return (
    <header className="w-full bg-surface" data-name="Header">
      <div className="mx-auto flex w-full flex-col gap-6 px-4 pb-6 pt-10 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-0 tablet:px-4 lg:px-site">
        <div className="flex gap-6 md:flex-row tablet:items-start tablet:gap-10 xl:gap-28">
          <Link
            className="font-display text-logo-24 font-bold tracking-logo text-fg"
            to="/"
          >
            Exclusive
          </Link>
          <nav className="flex flex-wrap gap-6 font-sans tablet:gap-10 xl:gap-16" aria-label="Primary">
            <NavLink className={navLinkClass} to="/" end>
              Home
            </NavLink>
            <NavLink className={navLinkClass} to="/contact">
              Contact
            </NavLink>
            <NavLink className={navLinkClass} to="/about">
              About
            </NavLink>
            {isSignedIn ? null : (
              <NavLink className={navLinkClass} to="/signup">
                Sign Up
              </NavLink>
            )}
          </nav>
        </div>
        <div className="relative flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:gap-actions-gap">
          <form
            className="flex min-h-search-min w-full items-center rounded-control bg-surface-muted pl-5 pr-3 py-2 tablet:w-64 desktop:w-80"
            onSubmit={onSearchSubmit}
            role="search"
          >
            <input
              className="min-w-0 flex-1 bg-transparent font-sans text-title-12 text-fg outline-none placeholder:text-fg placeholder:opacity-50"
              name="q"
              placeholder="What are you looking for?"
              type="search"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="inline-flex size-icon-hit shrink-0 items-center justify-center text-fg"
              aria-label="Submit search"
            >
              <Search className="size-6" strokeWidth={1.75} />
            </button>
          </form>
          <div className="flex items-center justify-end gap-4">
            <Link
              className="relative inline-flex size-icon-hit items-center justify-center text-fg"
              to="/wishlist"
              aria-label="Wishlist"
            >
              <Heart className="size-7" strokeWidth={1.5} />
            </Link>
            <Link
              className="relative inline-flex size-icon-hit items-center justify-center text-fg"
              to="/cart"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="size-7" strokeWidth={1.5} />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-sale px-1 text-title-12 text-fg-inverse">
                  {cartCount > 99 ? "99+" : String(cartCount)}
                </span>
              ) : null}
            </Link>
            {isSignedIn ? (
              <button
                type="button"
                className="inline-flex size-8 items-center justify-center rounded-full bg-sale text-fg-inverse"
                aria-expanded={isAccountMenuOpen}
                aria-haspopup="menu"
                aria-label="Account menu"
                onClick={() => {
                  setIsAccountMenuOpen((prev) => !prev);
                }}
              >
                <UserRound className="size-4" strokeWidth={2} />
              </button>
            ) : null}
          </div>
          {isSignedIn && isAccountMenuOpen ? (
            <div
              className="absolute right-0 top-12 z-20 w-[225px] rounded-control bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.65)_100%)] px-5 py-[18px] text-top-text shadow-card backdrop-blur-[75px]"
              role="menu"
              aria-label="Account actions"
            >
              <div className="flex flex-col gap-[13px] font-sans text-title-14">
                <Link className="flex items-center gap-4" role="menuitem" to="/account">
                  <UserRound className="size-8" strokeWidth={1.5} />
                  <span>Manage My Account</span>
                </Link>
                <Link className="flex items-center gap-4" role="menuitem" to="/account#orders">
                  <ShoppingBag className="size-6" strokeWidth={1.5} />
                  <span>My Order</span>
                </Link>
                <Link className="flex items-center gap-4" role="menuitem" to="/account#cancellations">
                  <CircleX className="size-6" strokeWidth={1.5} />
                  <span>My Cancellations</span>
                </Link>
                <Link className="flex items-center gap-4" role="menuitem" to="/account#reviews">
                  <Star className="size-6" strokeWidth={1.5} />
                  <span>My Reviews</span>
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-4 text-left"
                  role="menuitem"
                  onClick={() => {
                    void onLogoutClick();
                  }}
                >
                  <LogOut className="size-6" strokeWidth={1.5} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="h-px w-full bg-fg opacity-30" aria-hidden />
    </header>
  );
}
