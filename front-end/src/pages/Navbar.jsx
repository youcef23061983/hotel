import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { LuUserCircle2 } from "react-icons/lu";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { auth } from "../info & contact/Firebase";
import { signOut } from "firebase/auth";
import { AppContext } from "../data managment/AppProvider";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLinks, setShowLinks] = useState(false);

  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const navCenter = useRef(null);
  const { logout, formUser, setFirebaseUser, setFormUser } =
    useContext(AppContext);
  const [firebaseUser, loading] = useAuthState(auth);

  useLayoutEffect(() => {
    setShowLinks(false);
    let isMounted = true;

    const handScroll = () => {
      if (!isMounted) {
        return;
      }

      const scrollHeight = window.scrollY;
      const navCenterHeight = navCenter.current.getBoundingClientRect().height;
      const links = document.querySelectorAll(".navlink");
      const span = document.querySelector(".logospan");

      if (scrollHeight > navCenterHeight) {
        navCenter.current.style.position = "fixed";
        navCenter.current.style.background = "white";
        navCenter.current.style.transition = "all 0.8s linear";
        span.style.color = "rgb(14, 15, 56)";
        links.forEach((link) => {
          link.style.color = "rgb(14, 15, 56)";
        });
      } else {
        navCenter.current.style.background = "transparent";
        span.style.color = "";

        links.forEach((link) => {
          link.style.color = "";
        });
      }
    };

    window.addEventListener("scroll", handScroll);

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handScroll);
    };
  }, [location]);

  return (
    <nav className="nav-center" ref={navCenter}>
      <div className="nav-header">
        <div className="logo">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="legnedImg"
              className="img"
              loading="lazy"
            />
          </Link>
          <span className="logospan">LEGEND</span>
        </div>

        <button
          className="nav-toggle"
          type="button "
          onClick={() => setShowLinks(!showLinks)}
        >
          <FaAlignJustify />
        </button>
      </div>
      <div ref={linksContainerRef}>
        <div className="book">
          <Link className="navlink" to="about">
            About US
          </Link>
          <div className="user">
            <div>
              {firebaseUser ? (
                <div className="cart">
                  <p className="displayName">
                    Welcome, {firebaseUser?.displayName}
                  </p>

                  <Link
                    to="/login"
                    className="linkIcon"
                    aria-label="User profile"
                  >
                    {firebaseUser?.photoURL ? (
                      <img
                        src={firebaseUser.photoURL}
                        className="img"
                        style={{ borderRadius: "50%" }}
                        alt="Profile"
                        loading="lazy"
                      />
                    ) : (
                      <LuUserCircle2 />
                    )}
                  </Link>
                  <Link
                    className="navlink"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        await signOut(auth);
                        setFirebaseUser(null);
                        setFormUser(null);
                        sessionStorage.removeItem("token");

                        navigate("/", { replace: true });
                      } catch (err) {
                        console.error("Error signing out:", err.message);
                      }
                    }}
                  >
                    Logout
                  </Link>
                </div>
              ) : formUser ? (
                <div className="cart">
                  <p className="navlink">Welcome, {formUser?.user?.username}</p>
                  <Link className="linkIcon">
                    <LuUserCircle2 className="w-10 h-10 rounded-full border border-gray-300 object-cover" />
                  </Link>

                  <Link className="navlink" onClick={logout}>
                    Logout
                  </Link>
                </div>
              ) : (
                <Link className="navlink" to="/login">
                  Login
                </Link>
              )}
            </div>
            <Link className="navlink" to="contact">
              contact
            </Link>
          </div>
        </div>
        <div>
          <ul
            className={`${showLinks ? "links show-nav" : "links"}`}
            ref={linksRef}
          >
            <li>
              <Link to="rooms" className="navlink">
                Rooms & Suites
              </Link>
            </li>
            <li>
              <Link className="navlink" to="restaurant">
                Dinning
              </Link>
            </li>
            <li>
              <Link className="navlink" to="wellness">
                WellNess & SPA
              </Link>
            </li>
            <li>
              <Link className="navlink" to="experiences">
                Experiences
              </Link>
            </li>
            <li>
              <Link className="navlink" to="events">
                Events
              </Link>
            </li>
            <li>
              <Link className="navlink" to="gallery">
                Gallery
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
