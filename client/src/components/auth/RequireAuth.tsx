import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store";

interface RequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: RequireAuthProps): ReactElement {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const loading = useAuthStore((state) => state.loading);

  if (!initialized || loading) {
    return <div className="mx-auto w-full max-w-site px-4 py-16 text-title-16">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
