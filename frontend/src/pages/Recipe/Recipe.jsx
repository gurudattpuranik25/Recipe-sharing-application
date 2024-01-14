import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./recipe.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EditRecipe from "../EditRecipe/EditRecipe";
import Navbar from "../Navbar/Navbar";

function Recipe() {
  const { recipeId } = useParams();

  const targetEl = useRef(null);

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [editRecipeFlag, setEditRecipeFlag] = useState(false);
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [comment, setComment] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const getRecipe = async () => {
    try {
      // const accessToken = JSON.parse(
      //   localStorage.getItem("userInfo")
      // ).accessToken;
      const response = await axios.get(
        `http://localhost:3000/recipe/getSelectedRecipe/${recipeId}`
        // {
        //   headers: {
        //     authorization: `Bearer ${accessToken}`,
        //   },
        // }
      );
      const details = await fetchUserDetails(response.data.message.createdBy);
      setRecipe({ ...response.data.message, userDetails: details });
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      // const accessToken = JSON.parse(
      //   localStorage.getItem("userInfo")
      // ).accessToken;
      const response = await axios.get(
        `http://localhost:3000/auth/users/getUser/${userId}`
        // {
        //   headers: {
        //     authorization: `Bearer ${accessToken}`,
        //   },
        // }
      );
      return response.data.user;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return {};
    }
  };

  const fetchUserDetailsByEmail = async () => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("userInfo")
      ).accessToken;
      const email = JSON.parse(localStorage.getItem("userInfo")).email;
      const response = await axios.get(
        `http://localhost:3000/auth/users/fetchUserDetails/${email}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.user.avatar;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return {};
    }
  };

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
      navigate("/recipes");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const editRecipe = (recipeId) => {
    setEditRecipeId(recipeId);
    // setEditRecipeFlag(true);
    setOpen(true);
  };

  const addComment = async (recipeId) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("userInfo")
      ).accessToken;
      const email = JSON.parse(localStorage.getItem("userInfo")).email;
      const avatar = await fetchUserDetailsByEmail();
      await axios.post(
        `http://localhost:3000/recipe/addComment/${recipeId}`,
        { email, comment, avatar },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error.response.data.message);
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
    <div className="recipe__page">
      <Navbar />
      {recipe !== null ? (
        <section className="recipe__info">
          <h1 id="name">{recipe.name}</h1>
          <section className="contributor__details">
            <div className="profile__details">
              <p>Shared by : </p>
              <img
                id="contributor__avatar"
                src={recipe.userDetails.avatar}
                alt=""
              />
              <p id="contributor__name">{recipe.userDetails?.name}</p>
            </div>
            <p>|</p>
            <p>Last updated : {recipe.updatedAt.substring(0, 10)}</p>
            <p>|</p>
            <p
              onClick={() =>
                targetEl.current.scrollIntoView({ behavior: "smooth" })
              }
              id="comments__count"
            >
              {recipe.comments.length +
                " " +
                `${recipe.comments.length === 1 ? "Comment" : "Comments"}`}
            </p>
          </section>

          <img src={recipe.image} alt={recipe.name} id="image" />
          <hr />
          <section className="about__recipe">
            <p>{recipe.description}</p>
            <p>
              {" "}
              <label>Category :</label> {recipe.category}
            </p>
            <p>
              {" "}
              <label>Ingredients : </label> {recipe.ingredients}
            </p>
            <p>
              {" "}
              <label>Steps to prepare : </label> {recipe.stepsToPrepare}
            </p>
            <p>
              {" "}
              <label>Cooking time :</label> {recipe.cookingTime}
            </p>
            <p>
              {" "}
              <label>Difficulty level :</label> {recipe.difficultyLevel}
            </p>
            <p>
              {" "}
              <label>Benifits :</label> {recipe.benifits}
            </p>
            <p>
              {" "}
              <label>Storage Recommendations :</label>{" "}
              {recipe.storageRecommendations}
            </p>
          </section>
          <hr />
          {localStorage.getItem("userInfo") !== null && (
            <section className="bottom__section">
              {recipe.userDetails?.email !==
              JSON.parse(localStorage.getItem("userInfo")).email ? (
                <div className="input__section">
                  <input
                    type="text"
                    placeholder="Write a comment"
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                    id="comment__input"
                  />
                  <button onClick={() => addComment(recipe._id)}>
                    <i className="fa-solid fa-paper-plane fa-beat-fade"></i>
                  </button>
                </div>
              ) : (
                ""
              )}

              <section ref={targetEl} className="comments">
                {recipe.comments.length !== 0 &&
                  recipe.comments.map((comment, index) => (
                    <div id="comment" key={index}>
                      <div id="comment__details">
                        <img id="comment__avatar" src={comment.avatar} alt="" />{" "}
                        <div id="comment__info">
                          <label>
                            {comment.name}.{" "}
                            <span>{comment.updatedAt.substring(0, 10)}</span>
                          </label>{" "}
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                      {comment.email ===
                        JSON.parse(localStorage.getItem("userInfo")).email && (
                        <button
                          id="delete__comment"
                          onClick={() => deleteComment(recipe._id, comment._id)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      )}
                    </div>
                  ))}
              </section>
            </section>
          )}

          {localStorage.getItem("userInfo") !== null && (
            <div>
              {recipe.userDetails?.email ===
              JSON.parse(localStorage.getItem("userInfo")).email ? (
                <div className="action__buttons">
                  <button id="edit__btn" onClick={() => editRecipe(recipe._id)}>
                    Edit recipe <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    id="delete__btn"
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete recipe <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              {open && recipe._id === editRecipeId && (
                <EditRecipe
                  recipe={recipe}
                  // setEditRecipeFlag={setEditRecipeFlag}
                  setOpen={setOpen}
                />
              )}
            </Box>
          </Modal>

          <button id="back__btn" onClick={() => navigate("/recipes")}>
            Back to recipes <i className="fa-solid fa-backward"></i>
          </button>
        </section>
      ) : (
        error
      )}
    </div>
  );
}

export default Recipe;
