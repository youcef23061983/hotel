import React from "react";
import { Link } from "react-router-dom";
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
          <Link className="footerlink" to="about">
            About Us
          </Link>
          <Link className="footerlink" to="gallery">
            Gallery
          </Link>
          <Link className="footerlink" to="testimonial">
            Guest Review
          </Link>
        </div>
        <div className="footerdiv">
          <h3>Contact Us</h3>
          <p className="footerlink">Adreess:-------------------</p>
          <p className="footerlink">
            Email:
            <a href="">+00 00 00 00</a>
          </p>

          <Link className="footerlink" to="google">
            googleMaps
          </Link>
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
          <a href="/privacy">Privacy Policy |</a>
        </li>
        <li className="footerlink">
          <a href="/terms">Terms &amp; Conditions |</a>
        </li>
        <li className="footerlink">
          <a href="/cookies">Cookies Policy |</a>
        </li>
      </ul>
    </>
  );
};

export default Footer;
