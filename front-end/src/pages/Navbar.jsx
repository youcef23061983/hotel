import React, { useLayoutEffect, useRef, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const navCenter = useRef(null);
  const location = useLocation();

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
            <img src="./src/images/logo.png" alt="" className="img" />
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
          <Link className="navlink" to="contact">
            contact
          </Link>
        </div>
        <div>
          <ul
            className={`${showLinks ? "links show-nav" : "links"}`}
            ref={linksRef}
          >
            <li>
              <Link to="rooms" className="navlink">
                Romms & Suites
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
