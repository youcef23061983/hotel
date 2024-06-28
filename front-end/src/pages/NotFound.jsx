import React from "react";
import error from "../images/header/error.jpg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div
        className="headerimages"
        style={{
          background: `url(${error}) center/cover `,
        }}
      />
      <div className="errorDiv">
        <h2>Sorry ,The page you were looking for was not found</h2>
        <Link to="" className="nav-btn">
          return to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
