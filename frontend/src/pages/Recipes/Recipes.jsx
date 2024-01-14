import axios from "axios";
import React, { useEffect, useState } from "react";
import "./recipes.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setIsLoading(true);
        // const accessToken = JSON.parse(
        //   localStorage.getItem("userInfo")
        // ).accessToken;
        const response = await axios.get(
          "http://localhost:3000/recipe/recipes"
          // {
          //   headers: {
          //     authorization: `Bearer ${accessToken}`,
          //   },
          // }
        );
        setRecipes(response.data.message);
        setIsLoading(false);
      } catch (error) {
        // setMessage(error.response.data.message);
        console.log(error);
        // setIsLoading(false);
      }
    };
    getRecipes();
  }, []);

  return (
    <div className="recipes">
      <Navbar />
      <h1 id="tagline">Flavors of Fusion!</h1>
      <section className="recipe__grid">
        {recipes.map((recipe) => {
          return (
            <div className="recipe" key={recipe._id}>
              <img src={recipe.image} alt={recipe.name} id="recipe__img" />
              <div className="recipe__details">
                <h1 id="recipe__name">{recipe.name}</h1>
                <p id="description">{recipe.description.substring(0, 60)}...</p>
                <span id="category">{recipe.category}</span>
                <Link
                  id="read__more__link"
                  to={`/recipes/${recipe.name}/${recipe._id}`}
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </section>
      {localStorage.getItem("userInfo") === null && (
        <p id="login__comment">
          Login to post your flavorful recipes & add comments{" "}
          <Link to="/login" className="login__link">
            Login
          </Link>
        </p>
      )}

      <h1>{isLoading ? <div className="loader"></div> : message}</h1>
    </div>
  );
}

export default Recipes;
