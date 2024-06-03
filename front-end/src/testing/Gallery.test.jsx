import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect } from "vitest";
import Gallery from "../components/Gallery";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockData } from "./SetupTest";

describe("group ot Gallery testing elemnts", () => {
  const queryClient = new QueryClient();

  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Gallery />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });

  it("should render the proper background of div", async () => {
    const div = screen.getByTestId("div-gallery");
    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle(
      `background: url(src/images/gallery/room1.jpg) center/cover `
    );
  });
  it("should render the right images when we click on one of the buttons ", async () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(4);

    const diningButton = screen.getByRole("button", { name: /dining/i });
    const user = userEvent.setup();

    await user.click(diningButton);

    const diningImages = mockData.filter((d) => d.type === "dining").images;

    diningImages?.forEach(async (img, index) => {
      await waitFor(() => {
        expect(img).toHaveAttribute("src", mockData[1].images[index]);
      });
    });
  });
});
