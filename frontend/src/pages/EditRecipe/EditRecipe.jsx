import axios from "axios";
import React, { useState } from "react";
import "./editRecipe.css";

function EditRecipe({ recipe, setEditRecipeFlag, setOpen }) {
  const [formData, setFormData] = useState({
    name: recipe.name,
    image: "",
    description: recipe.description,
    ingredients: recipe.ingredients,
    stepsToPrepare: recipe.stepsToPrepare,
    cookingTime: recipe.cookingTime,
    difficultyLevel: recipe.difficultyLevel,
    category: recipe.category,
    benifits: recipe.benifits,
    storageRecommendations: recipe.storageRecommendations,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {
    name,
    image,
    description,
    ingredients,
    stepsToPrepare,
    cookingTime,
    difficultyLevel,
    category,
    benifits,
    storageRecommendations,
  } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("image", e.target.image.files[0]);
    form.append("description", description);
    form.append("ingredients", ingredients);
    form.append("stepsToPrepare", stepsToPrepare);
    form.append("cookingTime", cookingTime);
    form.append("difficultyLevel", difficultyLevel);
    form.append("category", category);
    form.append("benifits", benifits);
    form.append("storageRecommendations", storageRecommendations);

    try {
      setIsLoading(true);
      const accessToken = JSON.parse(
        localStorage.getItem("userInfo")
      ).accessToken;
      const response = await axios.patch(
        `http://localhost:3000/recipe/updateRecipe/${recipe._id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage(response.data.message);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="edit__recipe">
      <section className="edit__recipe__modal">
        <form className="modal__form" onSubmit={handleSubmit}>
          <section className="section__one">
            <label>
              Name{" "}
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={handleChange}
              />
            </label>
            <label>
              Recipe Image{" "}
              <input
                type="file"
                name="image"
                value={image}
                onChange={handleChange}
              />
            </label>
            <label>
              Description{" "}
              <input
                type="text"
                name="description"
                value={description}
                placeholder="Description"
                onChange={handleChange}
              />
            </label>
            <label>
              Ingredients (enter comma separated values){" "}
              <input
                type="text"
                name="ingredients"
                value={ingredients}
                placeholder="Ingredients (enter comma separated values)"
                onChange={handleChange}
              />
            </label>
            <label>
              Steps To Prepare{" "}
              <input
                type="text"
                name="stepsToPrepare"
                value={stepsToPrepare}
                placeholder="Steps To Prepare"
                onChange={handleChange}
              />
            </label>
          </section>

          <section className="section__two">
            <label>
              Cooking Time{" "}
              <input
                type="text"
                name="cookingTime"
                value={cookingTime}
                placeholder="Cooking Time"
                onChange={handleChange}
              />
            </label>
            <label>
              Difficulty Level{" "}
              <select
                name="difficultyLevel"
                value={difficultyLevel}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>

            <label>
              Category{" "}
              <select name="category" value={category} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Salad">Salad</option>
                <option value="Deserts">Deserts</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </label>
            <label>
              Benifits{" "}
              <input
                type="text"
                name="benifits"
                value={benifits}
                placeholder="Benifits"
                onChange={handleChange}
              />
            </label>
            <label>
              Storage Recommendations{" "}
              <input
                type="text"
                name="storageRecommendations"
                value={storageRecommendations}
                placeholder="Storage Recommendations"
                onChange={handleChange}
              />
            </label>
          </section>
          <button>Update</button>
          <button onClick={() => setOpen(false)}>Close</button>
        </form>
        <h1 id="error__message">
          {isLoading ? "Updating recipe, please wait..." : message}
        </h1>
      </section>
    </div>
  );
}

export default EditRecipe;
