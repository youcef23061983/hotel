import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import Rooms from "../components/Rooms";
import About from "../components/About";
import userEvent from "@testing-library/user-event";

describe("group of testing Layout component", () => {
  const queryClient = new QueryClient();
  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="rooms" element={<Rooms />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  });
  it("should render the right Navbar element and send to the right page", async () => {
    const span = screen.getAllByText("LEGEND")[0];
    expect(span).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Romms & Suites" });
    const user = userEvent.setup();
    await user.click(link);
    const type = screen.getByRole("combobox", { name: "room &suite type" });
    expect(type).toBeInTheDocument();
  });
  it("should the right Footer elment and send to the right page", async () => {
    const follow = screen.getByRole("heading", { name: "Follow US" });
    expect(follow).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "About Us" });
    const user = userEvent.setup();
    await user.click(link);
    const text = screen.getByText(
      /Coastal Elegance: Legend Hotel's Enchanting Locale in Batu Ferringhi/i
    );
    expect(text).toBeInTheDocument();
    screen.debug(link);
  });
});
