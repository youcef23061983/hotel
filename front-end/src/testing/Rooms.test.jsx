import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, expect, vi } from "vitest";
import Rooms from "../components/Rooms";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

describe("group of testing Rooms component", () => {
  const MockDetail = () => {
    const location = useLocation();
    return <div data-testid="detail-div">{location.pathname}</div>;
  };
  const queryClient = new QueryClient();

  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Rooms />} />
              <Route path="/:id" element={<MockDetail />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });

  it("should render the right room type elements", async () => {
    const div = screen.getByTestId("rooms-div");
    expect(div).toHaveStyle(
      `background: url(../images/header/roomsheader.jpg) center/cover`
    );
    const type = screen.getByRole("combobox", { name: "room &suite type" });

    const roomOption = screen.getByRole("option", { name: "room" });
    expect(roomOption).toBeInTheDocument();

    await userEvent.selectOptions(type, "room");

    // screen.debug(type);

    expect(type.value).toBe("room");
    const single = screen.getByRole("heading", { name: "single" });
    expect(single).toBeInTheDocument();

    const singlePrice = screen.getByText("170 $ per night");
    expect(singlePrice).toBeInTheDocument();
    const imges = screen.getAllByRole("img")[0];

    expect(imges).toHaveAttribute("src", "https://hotel.com/image1.jpg");
  });
  it("should render the right people guests elements", async () => {
    const people = screen.getByRole("combobox", {
      name: /guests/i,
    });
    expect(people).toBeInTheDocument();
    const user = userEvent.setup();
    await userEvent.selectOptions(people, "3");
    // screen.debug();

    expect(screen.getByRole("heading", { name: "terace" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "170 $ per night" })
    ).toBeInTheDocument();
  });
  it("should render the right maxPrice", () => {
    const price = screen.getByRole("slider");
    const minPrice = "110";
    fireEvent.change(price, { target: { value: minPrice } });
    expect(
      screen.getByRole("heading", { name: "penthouse" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "130 $ per night" })
    ).toBeInTheDocument();
    // screen.debug();
  });
  it("should render the right maxPrice", () => {
    const price = screen.getByRole("slider");
    const maxPrice = "110";
    fireEvent.change(price, { target: { value: maxPrice } });
    expect(
      screen.getByRole("heading", { name: "penthouse" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "130 $ per night" })
    ).toBeInTheDocument();
  });
  it("should the right interval of size", () => {
    const minSizeInput = screen.getByRole("spinbutton", { name: /min size/i });
    const maxSizeInput = screen.getByRole("spinbutton", { name: /max size/i });
    fireEvent.change(minSizeInput, { target: { value: "300" } });
    fireEvent.change(maxSizeInput, { target: { value: "500" } });
    // screen.debug();
    expect(
      screen.getByRole("heading", { name: "penthouse" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "130 $ per night" })
    ).toBeInTheDocument();
  });
  it("should the right butler", async () => {
    const butler_service = screen.getByRole("checkbox", {
      name: "butler_service",
    });
    const user = userEvent.setup();
    await user.click(butler_service);
    expect(butler_service).toBeEnabled();
    expect(
      screen.getByRole("heading", { name: "penthouse" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "130 $ per night" })
    ).toBeInTheDocument();
    // screen.debug();
  });
  it("should render max children", () => {
    const maxChildren = screen.getByRole("spinbutton", {
      name: "max children",
    });
    const maxNum = "3";
    screen.debug();
    fireEvent.change(maxChildren, { target: { value: maxNum } });
    expect(
      screen.getByRole("heading", { name: "penthouse" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "130 $ per night" })
    ).toBeInTheDocument();
  });
  it("should render the detail page", async () => {
    const explore = screen.getAllByText("explore more")[0];
    await userEvent.setup().click(explore);
    const detail = await screen.findByTestId("detail-div");
    expect(detail).toBeInTheDocument();
    expect(detail).toHaveTextContent("/6");
  });
});
