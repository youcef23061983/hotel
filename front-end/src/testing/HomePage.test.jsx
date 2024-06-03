import Homepage from "../pages/Homepage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

describe("group of testing HomePage component", () => {
  const queryClient = new QueryClient();
  beforeEach(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  });
});
