import React from "react";
import error__gif from "../assets/error__gif.gif";
import "./error.css";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div id="error__wrapper">
      <img id="error__gif" src={error__gif} alt="" />
      <button id="back__btn" onClick={() => navigate("/recipes")}>
        Back to recipes <i className="fa-solid fa-backward"></i>
      </button>
    </div>
  );
}

export default Error;
