import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TopHeader } from "./TopHeader";

export function AppLayout(): ReactElement {
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
