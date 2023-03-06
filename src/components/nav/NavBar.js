import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        verticalAlign: "middle",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>Movie Verse</h1>
      </Link>
      <Link to="/favourites" style={{ textDecoration: "none" }}>
        <h2>Favourites</h2>
      </Link>
    </div>
  );
};

export default NavBar;
