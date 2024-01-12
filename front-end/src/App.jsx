import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Details from "./components/Details";
import Restaurant from "./components/Restaurant";
import Wellness from "./components/Wellness";
import Experiences from "./components/Experiences";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/:id" element={<Details />} />
            <Route path="about" element={<About />} />
            <Route path="restaurant" element={<Restaurant />} />
            <Route path="wellness" element={<Wellness />} />
            <Route path="experiences" element={<Experiences />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
