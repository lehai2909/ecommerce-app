import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

// Mock the page components
vi.mock("../src/pages/Login", () => ({
  default: () => <div>Login Page</div>,
}));

vi.mock("../src/pages/Search", () => ({
  default: () => <div>Search Page</div>,
}));

vi.mock("../src/pages/Products", () => ({
  default: () => <div>Products Page</div>,
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockClear();
  });

  it("renders Login page by default", () => {
    localStorageMock.getItem.mockReturnValue(null); // Not logged in

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects to login when accessing protected route without authentication", () => {
    localStorageMock.getItem.mockReturnValue(null); // Not logged in

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("allows access to protected routes when authenticated", () => {
    localStorageMock.getItem.mockReturnValue("true"); // Logged in

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Search Page")).toBeInTheDocument();
  });

  it("allows access to products page when authenticated", () => {
    localStorageMock.getItem.mockReturnValue("true"); // Logged in

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Products Page")).toBeInTheDocument();
  });
});
