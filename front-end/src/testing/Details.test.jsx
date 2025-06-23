import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, expect, vi } from "vitest";
import Details from "../components/Details";
import { mockData2, mockData } from "./SetupTest";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import AppProvider from "../data managment/AppProvider";

describe("group of testing details component ", () => {
  vi.mock("../data managment/UseFetchQueries", () => ({
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

  const BookingMock = () => {
    const location = useLocation();
    return <div data-testid="booking-div">{location.pathname}</div>;
  };
  const queryClient = new QueryClient();
  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <MemoryRouter initialEntries={["/rooms/1"]}>
            <AppProvider>
              <Routes>
                <Route path="rooms/:id" element={<Details />} />
                <Route path="/booking/:id" element={<BookingMock />} />
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
  it("should render the right elemnts", async () => {
    const h2 = screen.getByTestId("h2");
    expect(h2).toBeInTheDocument();
    // screen.debug(h2);
    const img1 = screen.getAllByRole("img")[0];
    expect(img1).toHaveAttribute("src", `${mockData2.images[0]}`);

    expect(img1).toBeInTheDocument();
    const renderIcon = vi.fn().mockImplementation(() => {
      return;
    });
    const square = mockData2 ? mockData2.room_square_footage : [];
    renderIcon.mockReturnValue(square.icon);
    const p = screen.getAllByRole("paragraph")[0];
    renderIcon.mockReturnValue(square.p);
    // screen.debug(p);
    const link = screen.getByRole("link", { name: "book now" });
    const user = userEvent.setup();
    await user.click(link);
    const booking = await screen.findByTestId("booking-div");
    expect(booking).toBeInTheDocument();
    expect(screen.getByText(`/booking/${mockData2.id}`)).toBeInTheDocument();
    // screen.debug(booking);
  });
});
