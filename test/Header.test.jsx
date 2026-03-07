import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../src/components/Header";

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

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it("renders header with user email", () => {
    localStorageMock.getItem.mockReturnValue("user@example.com");

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByText("Ecommerce Store")).toBeInTheDocument();
    expect(screen.getByText("Welcome, user@example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("does not show back button by default", () => {
    localStorageMock.getItem.mockReturnValue("user@example.com");

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(
      screen.queryByRole("button", { name: /back to search/i }),
    ).not.toBeInTheDocument();
  });

  it("shows back button when showBackButton is true", () => {
    localStorageMock.getItem.mockReturnValue("user@example.com");

    render(
      <BrowserRouter>
        <Header showBackButton={true} />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("button", { name: /back to search/i }),
    ).toBeInTheDocument();
  });

  it("handles logout correctly", () => {
    localStorageMock.getItem.mockReturnValue("user@example.com");

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("isLoggedIn");
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("userEmail");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("handles back to search navigation", () => {
    localStorageMock.getItem.mockReturnValue("user@example.com");

    render(
      <BrowserRouter>
        <Header showBackButton={true} />
      </BrowserRouter>,
    );

    const backButton = screen.getByRole("button", { name: /back to search/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/search");
  });
});
