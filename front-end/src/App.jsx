import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import Rooms from "./components/Rooms";
import Details from "./components/Details";
import Restaurant from "./components/Restaurant";
import Wellness from "./components/Wellness";
import Experiences from "./components/Experiences";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Google from "./info & contact/Google";
import Privacy from "./info & contact/Privacy";
import Terms from "./info & contact/Terms";
import Cookies from "./info & contact/Cookies";
import Booking from "./booking/Booking";
import Testimonial from "./info & contact/Testimonial";
import NotFound from "./pages/NotFound";
import Login from "./info & contact/Login";
import SignUp from "./info & contact/SignUp";
import About from "./info & contact/About";
import ContactUs from "./info & contact/ContactUs";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./data managment/AppProvider";
import Order from "./info & contact/Order";

function App() {
  const location = useLocation();

  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    checked: false,
  });
  const { setFirebaseUser, setFormUser, checkAuthStatus, firebaseUser } =
    useContext(AppContext);

  const setAuth = (userData) => {
    setAuthState({
      isAuthenticated: true,
      userRole: userData?.user_role || "customer",
      checked: true,
    });
  };
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await checkAuthStatus();

        if (user) {
          setAuthState({
            isAuthenticated: true,
            userRole: user.user?.user_role || "customer",
            checked: true,
          });
          setFormUser(user);

          sessionStorage.setItem("token", user.token);
        } else if (firebaseUser) {
          setAuthState({
            isAuthenticated: true,
            userRole: user.user?.user_role || "customer",
            checked: true,
          });
          setFirebaseUser(user);
          sessionStorage.setItem("token", user.token);
        } else {
          setAuthState({
            isAuthenticated: false,
            userRole: null,
            checked: true,
          });
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          userRole: null,
          checked: true,
        });
      }
    };

    verifyAuth();
  }, [firebaseUser]);

  if (!authState.checked) {
    return <div>Loading...</div>; // Or your custom loader
  }
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:id" element={<Details />} />
        <Route path="about" element={<About />} />
        <Route path="restaurant" element={<Restaurant />} />
        <Route path="testimonial" element={<Testimonial />} />
        <Route path="wellness" element={<Wellness />} />
        <Route path="experiences" element={<Experiences />} />
        <Route path="events" element={<Events />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="order" element={<Order />} />

        <Route
          path="/login"
          element={
            !authState.isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate
                to={location.state?.from?.pathname || "/rooms"}
                replace
                state={{ from: location }}
              />
            )
          }
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="google" element={<Google />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="cookies" element={<Cookies />} />

        <Route
          path="/booking/:id"
          element={
            authState.isAuthenticated ? (
              <Booking />
            ) : (
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
