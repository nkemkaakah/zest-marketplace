import { fireEvent, render, screen } from "@testing-library/react";
import { LanguageDropdown } from "@/components/layout/LanguageDropdown";

describe("LanguageDropdown", () => {
  it("opens and selects a language", () => {
    render(<LanguageDropdown />);

    const toggleButton = screen.getByRole("button", { name: "Select language" });
    fireEvent.click(toggleButton);

    const frenchOption = screen.getByRole("option", { name: "French" });
    fireEvent.click(frenchOption);

    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "English" })).not.toBeInTheDocument();
  });

  it("closes when pressing escape", () => {
    render(<LanguageDropdown />);

    fireEvent.click(screen.getByRole("button", { name: "Select language" }));
    expect(screen.getByRole("option", { name: "German" })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("option", { name: "German" })).not.toBeInTheDocument();
  });
});
