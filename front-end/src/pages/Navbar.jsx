import React, { useEffect, useRef, useState } from "react";
// import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const navCenter = useRef(null);
  // const queryFun = async () => {
  //   const res = await fetch("  http://localhost:3000/hotel");
  //   if (!res.ok) {
  //     throw Error("ther is no data");
  //   }
  //   return res.json();
  // };
  // const { data, error, isPending, isPlaceholderData } = useQuery({
  //   queryKey: ["hotel"],
  //   queryFn: queryFun,
  //   placeholderData: keepPreviousData,
  // });

  useEffect(() => {
    let isMounted = true;

    const handScroll = () => {
      if (!isMounted) {
        return; // Skip handling if the component is unmounted
      }

      const scrollHeight = window.scrollY;
      const navCenterHeight = navCenter.current.getBoundingClientRect().height;
      const links = document.querySelectorAll(".navlink");
      const span = document.querySelector(".logospan");

      if (scrollHeight > navCenterHeight) {
        navCenter.current.style.position = "fixed";
        navCenter.current.style.background = "white";
        span.style.color = "rgb(14, 15, 56)";
        links.forEach((link) => {
          link.style.color = "rgb(14, 15, 56)";
        });
      } else {
        navCenter.current.style.background = "transparent";
        span.style.color = "";

        links.forEach((link) => {
          link.style.color = ""; // reset the color to the default
        });
      }
    };

    window.addEventListener("scroll", handScroll);

    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
      window.removeEventListener("scroll", handScroll);
    };
  }, []);

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
          <button className="nav-btn">book</button>
          <Link className="navlink">contact</Link>
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
              <Link className="navlink">Dinning</Link>
            </li>
            <li>
              <Link className="navlink">WellNess & SPA</Link>
            </li>
            <li>
              <Link className="navlink">Experiences</Link>
            </li>
            <li>
              <Link className="navlink">Events</Link>
            </li>
            <li>
              <Link className="navlink">Gallery</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
