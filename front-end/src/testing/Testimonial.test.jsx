import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor, screen } from "@testing-library/react";
import { beforeEach, it, vi } from "vitest";
import Testimonial from "../components/Testimonial";
import { expect } from "vitest";
import { mockData, mockData3 } from "./SetupTest";
import { HelmetProvider } from "react-helmet-async";

describe("group of testing testimonial componnet", () => {
  vi.mock("../components/UseFetchQueries", () => ({
    __esModule: true,
    default: vi.fn(() => ({
      data1: mockData,
      data2: mockData3,
      isPending1: false,
      error1: null,
      isPending2: false,
      error2: null,
    })),
  }));
  const queryClient = new QueryClient();
  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Testimonial />
        </HelmetProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });
  it("should the right elements", async () => {
    const div = screen.getByTestId("div-testimonial");
    expect(div).toHaveStyle(
      `background: url(${mockData && mockData[7].images[5]}) center/cover `
    );
    const testH2 = screen.getByRole("heading", {
      name: "Echoes of Excellence: Guests Speak About Legend Hotel",
    });
    expect(testH2).toBeInTheDocument();
    const testP = screen.getAllByRole("paragraph")[0];
    expect(testP).toBeInTheDocument();
    // screen.debug(testP);
    expect(screen.getByText("you")).toBeInTheDocument();
  });
});
