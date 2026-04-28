import { formatPrice } from "../formatPrice";

describe("formatPrice", () => {
  it("formats whole dollars", () => {
    expect(formatPrice(12)).toBe("$12.00");
  });

  it("formats cents", () => {
    expect(formatPrice(12.5)).toBe("$12.50");
  });

  it("handles non-finite values", () => {
    expect(formatPrice(Number.NaN)).toBe("$0.00");
  });
});
