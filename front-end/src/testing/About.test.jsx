import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { beforeEach, expect, vi } from "vitest";
import About from "../../src/components/About";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import AppProvider from "../data managment/AppProvider";

describe("group of testing About component", () => {
  const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
  };
  beforeEach(async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <MemoryRouter initialEntries={["/about"]}>
            <AppProvider>
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/google" element={<LocationDisplay />} />
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

  it("should render the proper elements", async () => {
    screen.debug();
    const headingText =
      "Coastal Elegance: Legend Hotel's Enchanting Locale in Batu Ferringhi";
    const h2 = screen.getByRole("heading", { name: headingText });
    expect(h2).toBeInTheDocument();
    // screen.debug(h2);
    const div = screen.getByTestId("about-element");
    expect(div).toBeInTheDocument();
    // screen.debug(div);
    expect(div).toHaveStyle(
      `background: url(https://hotel.com/image6.jpg) center/cover`
    );
    const p = screen.getByTestId("about-paragraph");
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(/Nestled along the pristine/i);
    // screen.debug(p);
    const link = screen.getByRole("link", { name: "location" });
    expect(link).toBeInTheDocument();
    const user = userEvent.setup();

    await user.click(link);

    const locationDisplay = await screen.findByTestId("location-display");

    expect(locationDisplay).toHaveTextContent("google");
    screen.debug(locationDisplay);
  });
});
