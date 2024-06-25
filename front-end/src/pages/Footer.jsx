import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaSquareInstagram,
  FaSquareFacebook,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footerlogo">
          <Link to="/">
            <img src="./src/images/logo.png" alt="" className="img" />
          </Link>
          <span className="footerspan">LEGEND</span>
        </div>
        <div className="footerdiv">
          <h3>Explore</h3>
          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "#2138EF" : "grey" };
            }}
            className="footerlink"
            to="about"
          >
            About Us
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "#2138EF" : "grey" };
            }}
            className="footerlink"
            to="gallery"
          >
            Gallery
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "#2138EF" : "grey" };
            }}
            className="footerlink"
            to="testimonial"
          >
            Guest Review
          </NavLink>
        </div>
        <div className="footerdiv">
          <h3>Contact Us</h3>
          <p className="footerlink">Adreess:-------------------</p>
          <p className="footerlink">
            Email:
            <a href="">+00 00 00 00</a>
          </p>

          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "#2138EF" : "grey" };
            }}
            className="footerlink"
            to="google"
          >
            googleMaps
          </NavLink>
        </div>
        <div className="footerdiv">
          <h3>Follow US</h3>
          <Link className="footericon">
            <FaSquareInstagram />
          </Link>
          <Link className="footericon">
            <FaSquareFacebook />
          </Link>
          <Link className="footericon">
            <FaYoutube />
          </Link>
        </div>
      </div>
      <ul className="copyrights">
        <li className="footerReserved">
          <p className="footerReserved">
            © 2023 Legend’s Hotel All Rights Reserved
          </p>
        </li>
        <li className="footerlink">
          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "#2138EF" : "grey" };
            }}
            className="footerlink"
            to="privacy"
          >
            Privacy Policy |
          </NavLink>
        </li>
        <li className="footerlink">
          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "#2138EF" : "grey" };
            }}
            className="footerlink"
            to="terms"
          >
            Terms &amp; Conditions |{" "}
          </NavLink>
        </li>
        <li className="footerlink">
          <NavLink
            style={({ isActive }) => {
              return { color: isActive ? "#2138EF" : "grey" };
            }}
            className="footerlink"
            to="cookies"
          >
            Cookies Policy |{" "}
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Footer;
