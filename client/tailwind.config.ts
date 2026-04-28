import type { Config } from "tailwindcss";

/**
 * Design tokens mapped from Figma (Top Header, Header, Footer, variables).
 * Accent bar / flash-sale red matches component "Rectangle 18" in section headers.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        top: {
          DEFAULT: "#000000",
        },
        "top-text": "#FAFAFA",
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F5F5F5",
        },
        fg: {
          DEFAULT: "#000000",
          inverse: "#FFFFFF",
          muted: "#FAFAFA",
        },
        "footer-fg": "#FAFAFA",
        "play-dark": "#030406",
        sale: {
          DEFAULT: "#DB4444",
          surface: "#FEF2F2",
        },
        border: {
          DEFAULT: "#000000",
          subtle: "rgba(0, 0, 0, 0.3)",
          strong: "rgba(0, 0, 0, 0.4)",
          outline: "rgba(0, 0, 0, 0.5)",
          inverse: "#FAFAFA",
        },
        stock: {
          DEFAULT: "#00D965",
        },
      },
      boxShadow: {
        card: "0px 1px 13px 0px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        sans: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "title-12": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        "title-14": ["14px", { lineHeight: "21px", fontWeight: "400" }],
        "title-16": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "title-20-md": ["20px", { lineHeight: "28px", fontWeight: "500" }],
        "title-20-reg": ["20px", { lineHeight: "28px", fontWeight: "400" }],
        "logo-24": ["24px", { lineHeight: "24px", fontWeight: "700" }],
        "heading-32": ["32px", { lineHeight: "30px", fontWeight: "500" }],
        "heading-36": ["36px", { lineHeight: "48px", fontWeight: "600" }],
        /** Billing / checkout page title (Inter, Figma) */
        "heading-billing": [
          "36px",
          {
            lineHeight: "30px",
            fontWeight: "500",
            letterSpacing: "1.44px",
          },
        ],
        "heading-40": ["40px", { lineHeight: "48px", fontWeight: "600" }],
        "heading-54": ["54px", { lineHeight: "64px", fontWeight: "600" }],
        "heading-80": ["80px", { lineHeight: "96px", fontWeight: "600" }],
      },
      letterSpacing: {
        logo: "0.72px",
      },
      maxWidth: {
        site: "1170px",
        billing: "470px",
        "cart-total": "470px",
        coupon: "300px",
      },
      spacing: {
        site: "135px",
        "section-y-lg": "120px",
        "section-y-md": "80px",
        "cart-section-y": "80px",
        "cart-row-gap": "40px",
        "cart-inner-gap": "24px",
        "coupon-total-gap": "173px",
        "section-y-sm": "48px",
        "card-x": "30px",
        "card-y": "40px",
        "header-gap": "148px",
        "nav-gap": "48px",
        "actions-gap": "24px",
        "icon-hit": "32px",
        "footer-col-gap": "87px",
        "footer-inner-gap": "24px",
      },
      borderRadius: {
        control: "4px",
      },
      borderWidth: {
        hairline: "1.5px",
      },
      height: {
        "top-bar": "48px",
        "footer-min": "440px",
        "search-min": "38px",
      },
      width: {
        "product-card": "270px",
      },
      minHeight: {
        "hero-block": "344px",
      },
      screens: {
        md: "640px",
        tablet: "768px",
        desktop: "1024px",
        xl: "1280px",
        xxl: "1440px",
      },
      aspectRatio: {
        product: "270 / 210",
      },
    },
  },
  plugins: [],
} satisfies Config;
