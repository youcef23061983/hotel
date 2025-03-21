import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect } from "vitest";
import Privacy from "../components/Privacy";
import { render, screen, waitFor } from "@testing-library/react";
import { mockData } from "./SetupTest";
import { HelmetProvider } from "react-helmet-async";
describe("group of testing Privacy component", () => {
  const queryClient = new QueryClient();

  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Privacy />
        </HelmetProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });
  it("should the proper elements", async () => {
    const div = screen.getByTestId("privecy-background");
    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle(
      `background: url(${mockData && mockData[7].images[6]}) center/cover`
    );
  });
  it("should render the right elemnts", async () => {
    const privecyH2 = screen.getByRole("heading", { name: "PRIVACY POLICY" });
    screen.debug(privecyH2);
    const privecyP = screen.getByTestId("privecy-paragraph");
    expect(privecyP).toBeInTheDocument();
  });
});
