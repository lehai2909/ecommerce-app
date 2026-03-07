import { describe, it, expect } from "vitest";
import { products } from "../src/data/products";

describe("Products Data", () => {
  it("should have products array", () => {
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("each product should have required properties", () => {
    products.forEach((product) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(typeof product.name).toBe("string");
      expect(product.name.length).toBeGreaterThan(0);

      expect(product).toHaveProperty("price");
      expect(typeof product.price).toBe("number");
      expect(product.price).toBeGreaterThan(0);

      expect(product).toHaveProperty("image");
      expect(typeof product.image).toBe("string");
      expect(product.image.length).toBeGreaterThan(0);

      expect(product).toHaveProperty("description");
      expect(typeof product.description).toBe("string");

      expect(product).toHaveProperty("category");
      expect(typeof product.category).toBe("string");

      expect(product).toHaveProperty("rating");
      expect(typeof product.rating).toBe("number");
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);

      expect(product).toHaveProperty("stock");
      expect(typeof product.stock).toBe("number");
      expect(product.stock).toBeGreaterThanOrEqual(0);
    });
  });

  it("product ids should be unique", () => {
    const ids = products.map((product) => product.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have reasonable price ranges", () => {
    products.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
      expect(product.price).toBeLessThan(10000); // Assuming no product costs more than $10k
    });
  });
});
