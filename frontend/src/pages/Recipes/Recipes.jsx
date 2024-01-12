import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateRecipe from "../EditRecipe/EditRecipe";
import "./recipes.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editRecipeFlag, setEditRecipeFlag] = useState(false);
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setIsLoading(true);
        const accessToken = JSON.parse(
          localStorage.getItem("userInfo")
        ).accessToken;
        const response = await axios.get(
          "http://localhost:3000/recipe/recipes",
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setRecipes(response.data.message);
        setIsLoading(false);
      } catch (error) {
        // setMessage(error.response.data.message);
        console.log(error);
        setIsLoading(false);
      }
    };
    getRecipes();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("userInfo")
      ).accessToken;
      const response = await axios.get(
        `http://localhost:3000/auth/users/getUser/${userId}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return {};
    }
  };

  useEffect(() => {
    const fetchDetailsForAllRecipes = async () => {
      const updatedRecipes = await Promise.all(
        recipes.map(async (recipe) => {
          const details = await fetchUserDetails(recipe.createdBy);
          return { ...recipe, userDetails: details };
        })
      );

      setRecipes(updatedRecipes);
    };

    if (recipes.length > 0) {
      fetchDetailsForAllRecipes();
    }
  }, [recipes]);

  const deleteRecipe = async (recipeId) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("userInfo")
      ).accessToken;
      await axios.delete(
        `http://localhost:3000/recipe/deleteRecipe/${recipeId}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const editRecipe = (recipeId) => {
    setEditRecipeId(recipeId);
    setEditRecipeFlag(true);
  };

  const addComment = async (recipeId) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("userInfo")
      ).accessToken;
      const email = JSON.parse(localStorage.getItem("userInfo")).email;
      await axios.post(
        `http://localhost:3000/recipe/addComment/${recipeId}`,
        { email, comment },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const deleteComment = async (recipeId, commentId) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("userInfo")
      ).accessToken;
      await axios.post(
        `http://localhost:3000/recipe/deleteComment/${recipeId}/${commentId}`,
        null,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

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
                <p>
                  Shared by :{" "}
                  <span id="shared__by">{recipe.userDetails?.name}</span>{" "}
                </p>
              </div>
              {/* 
              <p>{recipe.ingredients}</p>
              <p>{recipe.stepsToPrepare}</p>
              <p>{recipe.cookingTime}</p>
              <p>{recipe.difficultyLevel}</p> */}

              {/* <p>Comments:</p>
              {recipe.comments.length !== 0 &&
                recipe.comments.map((comment, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p>
                      {comment.name} : {comment.comment}
                    </p>
                    {comment.email ===
                      JSON.parse(localStorage.getItem("userInfo")).email && (
                      <button
                        onClick={() => deleteComment(recipe._id, comment._id)}
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
              <div>
                {recipe.userDetails?.email ===
                JSON.parse(localStorage.getItem("userInfo")).email ? (
                  <div>
                    <button onClick={() => editRecipe(recipe._id)}>Edit</button>
                    <button onClick={() => deleteRecipe(recipe._id)}>
                      Delete
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {recipe.userDetails?.email !==
                JSON.parse(localStorage.getItem("userInfo")).email ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Add comment"
                      value={comment}
                      required
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button onClick={() => addComment(recipe._id)}>Add</button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {editRecipeFlag && recipe._id === editRecipeId && (
                <UpdateRecipe
                  recipe={recipe}
                  setEditRecipeFlag={setEditRecipeFlag}
                />
              )} */}
            </div>
          );
        })}
      </section>

      <h1>{isLoading ? "loading..." : message}</h1>
    </div>
  );
}

export default Recipes;
