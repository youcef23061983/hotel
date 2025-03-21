import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect } from "vitest";
import Restaurant from "../components/Restaurant";
import { mockData } from "./SetupTest";
import { HelmetProvider } from "react-helmet-async";

describe("group of testing Restaurant component", () => {
  const queryClient = new QueryClient();
  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Restaurant />
        </HelmetProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });
  it("should render the proper elements", async () => {
    const restaurantH2 = screen.getByRole("heading", {
      name: "in dinning room",
    });
    expect(restaurantH2).toBeInTheDocument();
    const restaurantH4 = screen.getAllByRole("heading", {
      name: "Opening hours",
    })[0];
    expect(restaurantH4).toBeInTheDocument();
    const restaurantP = screen.getByTestId("restaurant-paragraph");
    expect(restaurantP).toBeInTheDocument();
    const images = mockData ? mockData[3].images : [];
    images.forEach(async (img, index) => {
      await waitFor(() => {
        expect(img).toHaveAttribute("src", mockData[3].images[index]);
      });
    });
  });
});
