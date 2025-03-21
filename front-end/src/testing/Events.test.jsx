import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor, screen } from "@testing-library/react";
import { Route, Routes, useLocation, MemoryRouter } from "react-router-dom";
import { beforeEach } from "vitest";
import Events from "../components/Events";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";

describe("group of events testing", () => {
  const MockContact = () => {
    const location = useLocation();
    return <div data-testid="Events-Contact">{location.pathname}</div>;
  };

  beforeEach(async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <MemoryRouter initialEntries={["/events"]}>
            <Routes>
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<MockContact />} />
            </Routes>
          </MemoryRouter>
        </HelmetProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });
  it("should render the proper elements", async () => {
    const EventsH2 = screen.getByTestId("EventsH2");
    expect(EventsH2).toBeInTheDocument();
    // screen.debug(EventsH2);
  });
  it("should go to the proper page", async () => {
    const user = userEvent.setup();
    const links = screen.getAllByRole("link", {
      name: "Contact Us",
    });
    // note:you can see locationDisplay by for of but you can not by forEach
    links.forEach(async (link) => {
      await user.click(link);

      await waitFor(() => {
        const locationDisplay = screen.getByTestId("Events-Contact");

        expect(locationDisplay).toHaveTextContent("/contact");
        screen.debug(locationDisplay);
      });
    });
  });
});
