import React from "react";
import error from "../assets/error.gif";
import "./error.css";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div id="error__wrapper">
      <img id="error__gif" src={error} alt="" />
      <button id="back__btn" onClick={() => navigate("/recipes")}>
        Back to recipes <i className="fa-solid fa-backward"></i>
      </button>
    </div>
  );
}

export default Error;
