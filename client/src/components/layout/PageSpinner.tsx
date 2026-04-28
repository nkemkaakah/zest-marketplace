import type { ReactElement } from "react";

export function PageSpinner(): ReactElement {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 bg-surface text-fg">
      <span
        className="size-10 animate-spin rounded-full border-2 border-border-subtle border-t-fg"
        aria-hidden
      />
      <span className="font-sans text-title-14 text-fg opacity-70">Loading…</span>
    </div>
  );
}
