import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, expect } from "vitest";
import Experiences from "../components/Experiences";
import { mockData } from "./SetupTest";
import userEvent from "@testing-library/user-event";

describe("group of Experiences testing", () => {
  const ContactMock = () => {
    const location = useLocation();
    return <div data-testid="Experiences-component">{location.pathname}</div>;
  };
  beforeEach(async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Experiences />} />
            {/* --------you have to put the original path in Experiences
    //         component------------- */}
            <Route path="/contact" element={<ContactMock />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });

  it("should render the proper elements", async () => {
    const Bannerp = screen.getByTestId("Experiences-paragraph");
    expect(Bannerp).toBeInTheDocument();
    const ExperiencesKayaking = screen.getByTestId("Experiences-Kayaking");
    expect(ExperiencesKayaking).toBeInTheDocument();
    const ExperiencesKayakingParagraph = screen.getByTestId(
      "Experiences-Kayaking-Paragraph"
    );
    expect(ExperiencesKayakingParagraph).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    images.forEach((img, index) => {
      expect(img).toHaveAttribute("src", mockData[4].images[index]);
    });
    // screen.debug(images);
  });
  it("should render the right page when we click on the link", async () => {
    const links = screen.getAllByRole("link");
    const user = userEvent.setup();
    for (const link of links) {
      await user.click(link);

      await waitFor(() => {
        const locationDisplay = screen.getByTestId("Experiences-component");
        expect(locationDisplay).toHaveTextContent("/contact");
        screen.debug(locationDisplay);
      });
    }
  });
});
