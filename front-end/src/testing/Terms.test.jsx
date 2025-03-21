import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect } from "vitest";
import Terms from "../components/Terms";
import { mockData1 } from "./SetupTest";
import { HelmetProvider } from "react-helmet-async";

describe("group of testing Terms component", () => {
  const queryClient = new QueryClient();
  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Terms />
        </HelmetProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });
  it("should render the right elements", async () => {
    const div = screen.getByTestId("div-Terms");
    expect(div).toHaveStyle(
      `background: url(${mockData1 && mockData1[7].images[7]}) center/cover `
    );
    const termsH2 = screen.getByRole("heading", { name: "TERMS & CONDITIONS" });
    expect(termsH2).toBeInTheDocument();
    const termsP = screen.getByRole("paragraph");
    expect(termsP).toBeInTheDocument();
  });
});
