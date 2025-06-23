//////////////////// first method: mock data because of postgresql delay fetcging data:
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { render, screen, waitFor } from "@testing-library/react";
// import { beforeEach, expect, it } from "vitest";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import Layout from "../pages/Layout";
// import Rooms from "../components/Rooms";
// import About from "../components/About";
// import userEvent from "@testing-library/user-event";
// import { HelmetProvider } from "react-helmet-async";
// import AppProvider from "../data managment/AppProvider";
// import { mockData } from "./SetupTest";

// describe("group of testing Layout component", () => {
//   vi.mock("../data managment/UseFetch", () => ({
//     __esModule: true,
//     default: vi.fn(() => ({
//       data: mockData,
//       isPending: false,
//       error: null,
//     })),
//   }));
//   const queryClient = new QueryClient();

//   beforeEach(async () => {
//     render(
//       <QueryClientProvider client={queryClient}>
//         <HelmetProvider>
//           <MemoryRouter initialEntries={["/"]}>
//             <AppProvider>
//               <Routes>
//                 <Route path="/" element={<Layout />}>
//                   <Route path="rooms" element={<Rooms />} />
//                   <Route path="about" element={<About />} />
//                 </Route>
//               </Routes>
//             </AppProvider>
//           </MemoryRouter>
//         </HelmetProvider>
//       </QueryClientProvider>
//     );
//     await waitFor(() => {
//       expect(screen.queryByText("...is loading")).toBeNull();
//     });
//   });
//   it("should render the right Navbar element and send to the right page", async () => {
//     const span = screen.getAllByText("LEGEND")[0];
//     expect(span).toBeInTheDocument();
//     const link = screen.getByRole("link", { name: "Rooms & Suites" });

//     const user = userEvent.setup();
//     await user.click(link);
//     screen.debug();

//     const type = screen.getByRole("combobox", { name: "room & suite type" });
//     screen.debug(type);

//     expect(type).toBeInTheDocument();
//   });
//   it("should the right Footer elment and send to the right page", async () => {
//     const follow = screen.getByRole("heading", { name: "Follow US" });
//     expect(follow).toBeInTheDocument();
//     const link = screen.getByRole("link", { name: "About Us" });
//     const user = userEvent.setup();
//     await user.click(link);
//     const text = screen.getByText(
//       /Coastal Elegance: Legend Hotel's Enchanting Locale in Batu Ferringhi/i
//     );
//     expect(text).toBeInTheDocument();
//     // screen.debug(link);
//   });
// });

//////////////second method: use waitFor with a time delay to let it fetch data properly:

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import Rooms from "../components/Rooms";
import About from "../components/About";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import AppProvider from "../data managment/AppProvider";
import { mockData } from "./SetupTest";

describe("group of testing Layout component", () => {
  vi.mock("../data managment/UseFetch", () => ({
    __esModule: true,
    default: vi.fn(() => ({
      data: mockData,
      isPending: false,
      error: null,
    })),
  }));
  const queryClient = new QueryClient();

  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <MemoryRouter initialEntries={["/"]}>
            <AppProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="rooms" element={<Rooms />} />
                  <Route path="about" element={<About />} />
                </Route>
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
  it("should render the right Navbar element and send to the right page", async () => {
    const span = screen.getAllByText("LEGEND")[0];
    expect(span).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Rooms & Suites" });

    const user = userEvent.setup();
    await user.click(link);
    screen.debug();

    await waitFor(() => {
      const type = screen.getByRole("combobox", { name: "room & suite type" });
      screen.debug(type);

      expect(type).toBeInTheDocument();
    });
  }, 5000);
  it("should be the right Footer element and send to the right page", async () => {
    const follow = screen.getByRole("heading", { name: "Follow US" });
    expect(follow).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "About Us" });
    const user = userEvent.setup();
    await user.click(link);

    // screen.debug(link);
    await waitFor(() => {
      const text = screen.getByText(
        /Coastal Elegance: Legend Hotel's Enchanting Locale in Batu Ferringhi/i
      );
      expect(text).toBeInTheDocument();
    });
  }, 5000);
});
