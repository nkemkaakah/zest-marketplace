import { ChevronDown, ChevronUp } from "lucide-react";
import type { ReactElement } from "react";

export interface CartQuantityControlProps {
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
  label: string;
}

/**
 * Figma cart quantity: bordered control (~72×44) with stacked chevrons.
 */
export function CartQuantityControl({
  value,
  min,
  max,
  onChange,
  label,
}: CartQuantityControlProps): ReactElement {
  return (
    <div
      className="inline-flex h-11 w-[72px] shrink-0 overflow-hidden rounded-control border border-hairline border-border-strong bg-surface"
      role="group"
      aria-label={label}
    >
      <span className="flex flex-1 items-center justify-center font-sans text-title-16 text-fg">
        {value}
      </span>
      <div className="flex w-7 flex-col border-l border-hairline border-border-strong">
        <button
          type="button"
          className="flex flex-1 items-center justify-center text-fg hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
          disabled={value >= max}
          aria-label="Increase quantity"
          onClick={() => {
            onChange(Math.min(max, value + 1));
          }}
        >
          <ChevronUp className="size-3.5" strokeWidth={2} />
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center border-t border-hairline border-border-strong text-fg hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
          disabled={value <= min}
          aria-label="Decrease quantity"
          onClick={() => {
            onChange(Math.max(min, value - 1));
          }}
        >
          <ChevronDown className="size-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
