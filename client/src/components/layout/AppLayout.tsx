import { useEffect, type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TopHeader } from "./TopHeader";

export function AppLayout(): ReactElement {
  const sync = useCartStore((s) => s.sync);

  useEffect(() => {
    void sync();
  }, [sync]);

  return (
    <div className="flex min-h-screen flex-col bg-surface text-fg w-full">
      <TopHeader />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
