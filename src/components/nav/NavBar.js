import React from "react";
import "./navbar.css";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        verticalAlign: "middle",
      }}
    >
      <h1>Movie Verse</h1>
      <h2>Favourites</h2>
    </div>
  );
};

export default NavBar;
