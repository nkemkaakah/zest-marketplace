import { fireEvent, render, screen } from "@testing-library/react";
import { CartQuantityControl } from "@/components/cart/CartQuantityControl";

describe("CartQuantityControl", () => {
  it("increases and decreases within min and max", () => {
    const onChange = jest.fn();

    const { rerender } = render(
      <CartQuantityControl value={2} min={1} max={5} onChange={onChange} label="Quantity for item" />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(onChange).toHaveBeenCalledWith(3);

    rerender(
      <CartQuantityControl value={2} min={1} max={5} onChange={onChange} label="Quantity for item" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(onChange).toHaveBeenCalledWith(1);

    rerender(
      <CartQuantityControl value={5} min={1} max={5} onChange={onChange} label="Quantity for item" />,
    );
    expect(screen.getByRole("button", { name: "Increase quantity" })).toBeDisabled();
  });
});
