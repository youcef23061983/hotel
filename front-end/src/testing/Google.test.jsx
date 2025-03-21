import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect } from "vitest";
import Google from "../components/Google";
import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

describe("group of testing Google component", () => {
  const queryClient = new QueryClient();
  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Google />
        </HelmetProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });

  it("should render the poroper elements", async () => {
    const h2 = screen.getByRole("heading", {
      name: "Seaside Splendor: Discovering the Allure of Batu Ferringhi",
    });
    expect(h2).toBeInTheDocument();
    const p = screen.getByTestId("google-p");
    expect(p).toBeInTheDocument();
  });
});
