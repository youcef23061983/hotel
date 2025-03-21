import Homepage from "../pages/Homepage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { expect, it, vi } from "vitest";
import { mockData, mockData3 } from "./SetupTest";
import { HelmetProvider } from "react-helmet-async";

describe("group of testing HomePage component", () => {
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
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </MemoryRouter>
        </HelmetProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });
  it("should render the rifgt elements", async () => {
    const roomsHeader = screen.getByRole("heading", { name: "ROOMS & SUITES" });
    expect(roomsHeader).toBeInTheDocument();
    const roomsP = screen.getByText(
      /Nestled across two interconnected buildings/i
    );
    expect(roomsP).toBeInTheDocument();
  });
});
