import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Details from "./components/Details";
import Restaurant from "./components/Restaurant";
import Wellness from "./components/Wellness";
import Experiences from "./components/Experiences";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import ContactUs from "./components/ContactUs";
import Google from "./components/Google";
import Testimonial from "./components/Testimonial";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Cookies from "./components/Cookies";
import Booking from "./components/Booking";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<Details />} />
          <Route path="about" element={<About />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="wellness" element={<Wellness />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="google" element={<Google />} />
          <Route path="testimonial" element={<Testimonial />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="booking/:id" element={<Booking />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
