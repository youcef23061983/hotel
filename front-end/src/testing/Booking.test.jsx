import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, expect, it, vi } from "vitest";
import { mockData, mockData2 } from "./SetupTest";
import { userEvent } from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import AppProvider from "../data managment/AppProvider";
import Booking from "../booking/Booking";

describe("group of testing Booking component", () => {
  vi.mock("../data managment/BookingUseFetch", () => ({
    __esModule: true,
    default: vi.fn(() => ({
      data: mockData2,
      isPending: false,
      error: null,
    })),
  }));

  const queryClient = new QueryClient();

  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <MemoryRouter initialEntries={["/booking/1"]}>
            <AppProvider>
              <Routes>
                <Route path="/booking/:id" element={<Booking />} />
              </Routes>
            </AppProvider>
          </MemoryRouter>
        </HelmetProvider>
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
    const today = new Date();
    const todayDay = today.getDate().toString();
    const todayButton = screen.getByText(todayDay);
    await userEvent.setup().click(todayButton);

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
