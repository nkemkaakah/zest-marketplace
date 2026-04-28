import { lazy, Suspense, type ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageSpinner } from "@/components/layout/PageSpinner";

const HomePage = lazy(async () => import("@/pages/HomePage"));
const ProductsPage = lazy(async () => import("@/pages/ProductsPage"));
const ProductDetailPage = lazy(async () => import("@/pages/ProductDetailPage"));
const CartPage = lazy(async () => import("@/pages/CartPage"));
const CheckoutPage = lazy(async () => import("@/pages/CheckoutPage"));
const LoginPage = lazy(async () => import("@/pages/LoginPage"));
const SignupPage = lazy(async () => import("@/pages/SignupPage"));
const WishlistPage = lazy(async () => import("@/pages/WishlistPage"));
const AccountPage = lazy(async () => import("@/pages/AccountPage"));
const AboutPage = lazy(async () => import("@/pages/AboutPage"));
const ContactPage = lazy(async () => import("@/pages/ContactPage"));
const NotFoundPage = lazy(async () => import("@/pages/NotFoundPage"));

export default function App(): ReactElement {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route
            path="account"
            element={
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            }
          />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
