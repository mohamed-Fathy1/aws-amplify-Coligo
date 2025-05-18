import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import Home from "../../pages/Home";

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock the login function
vi.mock("../../store/slices/authSlice", () => {
  return {
    default: (
      state = { isAuthenticated: false, loading: false },
      action: any
    ) => {
      if (action.type === "auth/login/pending") {
        return { ...state, loading: true };
      }
      if (action.type === "auth/login/fulfilled") {
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
        };
      }
      return state;
    },
    login: () => ({
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
    }),
  };
});

describe("Home Component", () => {
  test("renders login page with Coligo title", () => {
    renderWithProviders(<Home />);

    expect(screen.getByText("Coligo")).toBeInTheDocument();
  });

  test("redirects to dashboard when already authenticated", () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        auth: {
          isAuthenticated: true,
          loading: false,
          error: null,
          user: null,
          token: "test-token",
        },
      },
    });

    // Home component should attempt to redirect to dashboard
    // We can't directly test navigation in this test environment
    // but we can verify the component doesn't render its content
    expect(screen.queryByText("auth.login")).not.toBeInTheDocument();
  });
});
