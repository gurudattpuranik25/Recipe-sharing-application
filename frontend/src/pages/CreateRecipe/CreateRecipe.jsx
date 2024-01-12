import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createRecipe.css";
import Navbar from "../Navbar/Navbar";

function CreateRecipe() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    ingredients: "",
    stepsToPrepare: "",
    cookingTime: "",
    difficultyLevel: "",
    category: "",
    benifits: "",
    storageRecommendations: "",
  });
  const navigate = useNavigate();
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
      const response = await axios.post(
        "http://localhost:3000/recipe/createRecipe",
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
      navigate("/recipes");
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <section id="cr">
      <Navbar />
      <div className="create__recipe">
        <h1 id="form__title">Create Recipe</h1>
        <div className="form">
          <form
            className="create__recipe__form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <section className="section__one">
              <label>
                Name <sup>*</sup>
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Avocado and Blue Cheese Toasts"
                  onChange={handleChange}
                />
              </label>

              <label>
                Recipe Image <sup>*</sup>
                <input
                  type="file"
                  name="image"
                  value={image}
                  onChange={handleChange}
                />
              </label>

              <label>
                Description <sup>*</sup>{" "}
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  placeholder="Toast is a traditional breakfast food"
                  onChange={handleChange}
                />
              </label>

              <label>
                Ingredients (enter comma separated values) <sup>*</sup>
                <input
                  type="text"
                  name="ingredients"
                  value={ingredients}
                  placeholder="Fruits, cheese and veggies"
                  onChange={handleChange}
                />
              </label>

              <label>
                Steps To Prepare <sup>*</sup>{" "}
                <input
                  type="text"
                  name="stepsToPrepare"
                  value={stepsToPrepare}
                  placeholder="Combine avocado, lime juice, and blue cheese"
                  onChange={handleChange}
                />
              </label>
            </section>
            <section className="section__two">
              <label>
                Cooking Time <sup>*</sup>
                <input
                  type="text"
                  name="cookingTime"
                  value={cookingTime}
                  placeholder="15 min"
                  onChange={handleChange}
                />
              </label>
              {/* <div className="selections"> */}
              <label>
                Difficulty Level <sup>*</sup>{" "}
                <select
                  name="difficultyLevel"
                  value={difficultyLevel}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>{" "}
              </label>

              <label>
                Category <sup>*</sup>{" "}
                <select
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
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
              {/* </div> */}

              <label>
                Benifits <sup>*</sup>
                <input
                  type="text"
                  name="benifits"
                  value={benifits}
                  placeholder="Nut-free"
                  onChange={handleChange}
                />
              </label>

              <label>
                {" "}
                Storage Recommendations <sup>*</sup>{" "}
                <input
                  type="text"
                  name="storageRecommendations"
                  value={storageRecommendations}
                  placeholder="Keep not more than 2 days"
                  onChange={handleChange}
                />
              </label>
              <button>Create</button>
            </section>
          </form>
        </div>

        <h1>{isLoading ? "creating recipe, please wait..." : message}</h1>
      </div>
    </section>
  );
}

export default CreateRecipe;
