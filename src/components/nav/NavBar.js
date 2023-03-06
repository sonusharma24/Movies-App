import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [show, handleShow] = useState();
  // sticky nav bar
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      });
    };
  }, []);
  return (
    <div
      className={`nav-bar ${show && "nav-black"} `}
      style={{
        display: "flex",
        padding: "0.5",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className={`title ${show && "font-color"} `}>Movie Verse</h1>
      </Link>
      <Link to="/favourites" style={{ textDecoration: "none" }}>
        <h2 className={`sub-heading ${show && "font-color"} `}>Favourites</h2>
      </Link>
    </div>
  );
};

export default NavBar;
