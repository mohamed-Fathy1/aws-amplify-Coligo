import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import Home from "../../pages/Home";

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Create a mock navigate function
const mockNavigate = vi.fn();

// Mock the login function from authSlice
vi.mock("../../store/slices/authSlice", async () => {
  const actual = await vi.importActual("../../store/slices/authSlice");
  return {
    ...actual,
    login: vi.fn(() => ({
      type: "auth/login/fulfilled",
      payload: {
        token: "test-token",
        user: {
          id: "1",
          name: "Test User",
          email: "test@example.com",
          role: "student",
        },
      },
    })),
  };
});

describe("Login Flow Integration", () => {
  // Set up user event for testing interactions
  const user = userEvent.setup();

  beforeEach(() => {
    // Clear mocks between tests
    vi.clearAllMocks();
  });

  test("user is redirected to dashboard if already authenticated", async () => {
    // Render the Home component with authenticated state
    renderWithProviders(<Home />, {
      preloadedState: {
        auth: {
          isAuthenticated: true,
          loading: false,
          error: null,
          user: {
            id: "1",
            name: "Test User",
            email: "test@example.com",
            role: "student",
          },
          token: "test-token",
        },
      },
    });

    // The component should redirect immediately
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");

    // The login button should not be rendered (we implemented returning null in Home.tsx)
    expect(screen.queryByText("auth.login")).not.toBeInTheDocument();
  });
});
