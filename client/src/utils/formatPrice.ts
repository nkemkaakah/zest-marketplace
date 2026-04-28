/**
 * Formats a number as USD for display (no locale-specific grouping beyond en-US).
 */
export function formatPrice(amount: number): string {
  if (!Number.isFinite(amount)) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
