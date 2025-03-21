import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import Cookies from "../components/Cookies";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

describe("group of Cookies testing", () => {
  const queryClient = new QueryClient();
  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <MemoryRouter initialEntries={["/cookies"]}>
            <Cookies />
          </MemoryRouter>
        </HelmetProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });

  it("should render the background image of the compponent", async () => {
    const cookiesH2 = screen.getByTestId("cookies-h2");
    expect(cookiesH2).toBeInTheDocument();
    // screen.debug(cookiesH2);
  });
});
