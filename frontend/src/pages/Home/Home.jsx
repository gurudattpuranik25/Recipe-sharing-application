import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="nav__buttons">
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/recipes")}>Explore Recipes</button>
      </div>
      <h1 id="cover__title">
        Embark on a culinary journey with us! <br /> Explore a world of flavors,
        discover new recipes, and create delicious memories.
      </h1>
    </div>
  );
}

export default Home;
