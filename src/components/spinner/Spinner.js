import React from "react";
import spinner from "../../assets/spinner.gif";
import "./spinner.css";
const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Spinner;
