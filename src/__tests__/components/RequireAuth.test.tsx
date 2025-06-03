import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import RequireAuth from "../../components/auth/RequireAuth";

describe("RequireAuth", () => {
  test("redirects to home when user is not authenticated", () => {
    renderWithProviders(
      <RequireAuth>
        <div>Protected Content</div>
      </RequireAuth>,
      {
        preloadedState: {
          auth: {
            isAuthenticated: false,
          },
        },
        route: "/dashboard",
      }
    );

    // Should navigate to home, not render the protected content
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  test("renders children when user is authenticated", () => {
    renderWithProviders(
      <RequireAuth>
        <div>Protected Content</div>
      </RequireAuth>,
      {
        preloadedState: {
          auth: {
            isAuthenticated: true,
          },
        },
        route: "/dashboard",
      }
    );

    // Should render the protected content
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
