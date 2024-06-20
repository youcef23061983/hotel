import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, expect, it, vi } from "vitest";
import { mockData, mockData2 } from "./SetupTest";
import Booking from "../components/Booking";
import { userEvent } from "@testing-library/user-event";

describe("group of testing Booking component", () => {
  vi.mock("../components/UseFetchQueries", () => ({
    __esModule: true,
    default: vi.fn(() => ({
      data1: mockData,
      data2: mockData2,
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
        <MemoryRouter initialEntries={["/booking/1"]}>
          <Routes>
            <Route path="/booking/:id" element={<Booking />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });

  it("should render the right elements", async () => {
    const div = screen.getByTestId("booking-div");
    expect(div).toHaveStyle(
      `background: url(src/images/rooms/standard single room/img1.jpg) center/cover`
    );
    const headerH2 = screen.getByRole("heading", { name: "SELECT YOUR DATES" });
    expect(headerH2).toBeInTheDocument();

    const submitBtn = screen.getByRole("button", { name: "submit" });
    expect(submitBtn).toBeInTheDocument();
    await userEvent.setup().click(submitBtn);
    const roomName = screen.getByText("Standard Single Room");
    expect(roomName).toBeInTheDocument();
    const maxChildren = screen.getByText("0");
    expect(maxChildren).toBeInTheDocument();
    const roomPrice = screen.getAllByText("120 $")[0];
    expect(roomPrice).toBeInTheDocument();

    screen.debug();
  });
});
