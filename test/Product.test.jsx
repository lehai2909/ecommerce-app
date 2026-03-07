import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Product from "../src/components/Product";

const mockProduct = {
  id: 1,
  name: "Wireless Bluetooth Headphones",
  price: 79.99,
  image: "https://example.com/headphones.jpg",
  description: "Premium noise-cancelling wireless headphones",
  category: "Electronics",
  rating: 4.5,
  stock: 15,
};

describe("Product Component", () => {
  it("renders product information correctly", () => {
    render(<Product product={mockProduct} />);

    expect(
      screen.getByText("Wireless Bluetooth Headphones"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Premium noise-cancelling wireless headphones"),
    ).toBeInTheDocument();
    expect(screen.getByText("$79.99")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i }),
    ).toBeInTheDocument();
  });

  it("displays product image", () => {
    render(<Product product={mockProduct} />);

    const image = screen.getByAltText("Wireless Bluetooth Headphones");
    expect(image).toBeInTheDocument();
    expect(image.src).toBe("https://example.com/headphones.jpg");
  });

  it("handles image error by showing placeholder", () => {
    render(<Product product={mockProduct} />);

    const image = screen.getByAltText("Wireless Bluetooth Headphones");
    fireEvent.error(image);

    // After error, should show placeholder
    expect(image.src).toBe("https://via.placeholder.com/500x500?text=TV+Image");
  });

  it("formats price correctly", () => {
    const expensiveProduct = { ...mockProduct, price: 1234.56 };
    render(<Product product={expensiveProduct} />);

    expect(screen.getByText("$1234.56")).toBeInTheDocument();
  });
});
