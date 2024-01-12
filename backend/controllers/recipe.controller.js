import { Recipe } from "../models/recipe.model.js";
import { User } from "../models/user.model.js";
import { uploadRecipeImageToCloudinary } from "../utils/cloudinary.js";
import errorHandler from "../utils/errorHandler.js";
import responseHandler from "../utils/responseHandler.js";

const createRecipe = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const {
    name,
    description,
    ingredients,
    stepsToPrepare,
    cookingTime,
    difficultyLevel,
    category,
    benifits,
    storageRecommendations,
    comments,
    ratings,
  } = req.body;
  const image = req.file?.path;
  try {
    const imagePath = await uploadRecipeImageToCloudinary(image);
    if (!imagePath) {
      return errorHandler(res, 500, "Failed to upload file on cloudinary!");
    }
    await Recipe.create({
      name,
      image: imagePath,
      description,
      ingredients,
      stepsToPrepare,
      cookingTime,
      difficultyLevel,
      category,
      benifits,
      storageRecommendations,
      comments,
      ratings,
      createdBy: user,
    }).then(() => {
      return responseHandler(res, 200, "Recipe created successfully");
    });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    if (recipes.length === 0) {
      return errorHandler(res, 500, "No recipes found!");
    }
    return responseHandler(res, 200, recipes);
  } catch (error) {
    return errorHandler(
      res,
      500,
      "Error fetching the recipes, please try after sometime!"
    );
  }
};

const getSelectedRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findOne({ _id: recipeId });
    if (!recipe) {
      return errorHandler(res, 500, "Recipe not found!");
    }
    return responseHandler(res, 200, recipe);
  } catch (error) {
    return errorHandler(
      res,
      500,
      "Failed to fetch the recipe. Please check recipe ID and try after sometime!"
    );
  }
};

const updateRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;
  const {
    name,
    description,
    ingredients,
    stepsToPrepare,
    cookingTime,
    difficultyLevel,
    category,
    benifits,
    storageRecommendations,
  } = req.body;
  const image = req.file?.path;
  try {
    const imagePath = await uploadRecipeImageToCloudinary(image);
    if (!imagePath) {
      return errorHandler(res, 500, "Failed to upload file on cloudinary!");
    }
    await Recipe.updateOne(
      {
        _id: recipeId,
      },
      {
        name,
        image: imagePath,
        description,
        ingredients,
        stepsToPrepare,
        cookingTime,
        difficultyLevel,
        category,
        benifits,
        storageRecommendations,
      }
    ).then(() => {
      return responseHandler(res, 200, "Recipe updated successfully");
    });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    await Recipe.deleteOne({ _id: recipeId })
      .then(() => {
        return responseHandler(res, 200, "Recipe deleted successfully!");
      })
      .catch((err) => {
        return errorHandler(res, 400, err.message);
      });
  } catch (error) {
    return errorHandler(
      res,
      500,
      "Error deleting the recipe, please try after sometime!"
    );
  }
};

const addComment = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const { email, comment, avatar } = req.body;
    const user = await User.findOne({ email });
    if (!comment) {
      return errorHandler(res, 400, "Please add a comment!");
    }
    const recipe = await Recipe.findOne({ _id: recipeId });
    recipe.comments.unshift({ comment, name: user.name, email, avatar });
    await recipe.save();
    return responseHandler(res, 200, "Comment added successfully!");
  } catch {
    return errorHandler(res, 500, "Failed to add the comment!");
  }
};

const deleteComment = async (req, res) => {
  const { recipeId, commentId } = req.params;
  try {
    const recipe = await Recipe.findOne({ _id: recipeId });
    if (!recipe) {
      return errorHandler(res, 404, "Recipe not found!");
    }
    recipe.comments.pull({ _id: commentId });
    await recipe.save();
    return responseHandler(res, 200, "Comment deleted successfully!");
  } catch (error) {
    return errorHandler(res, 500, "Failed to delete the comment!");
  }
};

export {
  createRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
  addComment,
  deleteComment,
  getSelectedRecipe,
};
