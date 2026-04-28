import type { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react";


function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactElement {
  return (
    <div className="flex flex-col gap-footer-inner-gap text-footer-fg">
      <p className="font-sans text-title-20-md">{title}</p>
      <div className="flex flex-col gap-4 font-sans text-title-16">{children}</div>
    </div>
  );
}

export function SiteFooter(): ReactElement {
  return (
    <footer className="min-h-footer-min w-full bg-top text-footer-fg" data-name="Footer">
      <div className="mx-auto grid w-full  grid-cols-1 gap-10 px-4 py-16 tablet:grid-cols-2 lg:grid-cols-5 lg:gap-x-footer-col-gap lg:px-site">
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-display text-logo-24 font-bold tracking-logo text-footer-fg">
              Exclusive
            </p>
            <p className="mt-6 font-sans text-title-20-md">Subscribe</p>
            <p className="mt-4 font-sans text-title-16">Get 10% off your first order</p>
          </div>
          <label className="flex w-full max-w-56 items-center gap-8 rounded-control border border-hairline border-border-inverse py-3 pl-4 pr-3">
            <span className="sr-only">Email address</span>
            <input
              className="min-w-0 flex-1 bg-transparent font-sans text-title-16 text-footer-fg outline-none placeholder:text-footer-fg placeholder:opacity-40"
              placeholder="Enter your email"
              type="email"
            />
            <span className="inline-flex size-6 shrink-0 items-center justify-center" aria-hidden>
              <Send className="size-5" strokeWidth={1.5} />
            </span>
          </label>
        </div>
        <FooterColumn title="Support">
          <p className="max-w-44 whitespace-pre-wrap">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </FooterColumn>
        <FooterColumn title="Account">
          <Link className="hover:underline" to="/account">
            My Account
          </Link>
          <Link className="hover:underline" to="/login">
            Login / Register
          </Link>
          <Link className="hover:underline" to="/cart">
            Cart
          </Link>
          <Link className="hover:underline" to="/wishlist">
            Wishlist
          </Link>
          <Link className="hover:underline" to="/products">
            Shop
          </Link>
        </FooterColumn>
        <FooterColumn title="Quick Link">
          <span className="opacity-80">Privacy Policy</span>
          <span className="opacity-80">Terms Of Use</span>
          <span className="opacity-80">FAQ</span>
          <Link className="hover:underline" to="/contact">
            Contact
          </Link>
        </FooterColumn>
        <div className="flex flex-col gap-footer-inner-gap">
          <p className="font-sans text-title-20-md">Download App</p>
          <p className="font-sans text-title-12 font-medium opacity-70">
            Save $3 with App New User Only
          </p>
          <div className="flex items-center gap-2">
            <img
              src="/Qr Code.png"
              alt="QR code to download app"
              className="size-20 rounded-control border-2 border-solid border-fg-inverse bg-surface p-0.5 object-contain"
              loading="lazy"
            />
            <div className="flex flex-col gap-1">
              <div className="flex h-10 w-28 items-center justify-center rounded-control border border-hairline border-border-inverse bg-play-dark font-sans text-title-12 text-footer-fg">
                Google Play
              </div>
              <div className="flex h-10 w-28 items-center justify-center rounded-control border border-hairline border-border-inverse bg-top font-sans text-title-12 text-footer-fg">
                App Store
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-6">
            <Facebook className="size-6" strokeWidth={1.25} aria-hidden />
            <Twitter className="size-6" strokeWidth={1.25} aria-hidden />
            <Instagram className="size-6" strokeWidth={1.25} aria-hidden />
            <Linkedin className="size-6" strokeWidth={1.25} aria-hidden />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 w-full border-t border-fg-inverse opacity-40 px-4 pb-10 pt-6 text-center lg:px-site">
        <p className="inline-flex items-center gap-2 font-sans text-title-16 opacity-60">
          <span aria-hidden>©</span>
          <span>Copyright Rimel 2022. All right reserved</span>
        </p>
      </div>
    </footer>
  );
}
