import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import {
  addComment,
  createRecipe,
  deleteComment,
  deleteRecipe,
  getRecipes,
  getSelectedRecipe,
  updateRecipe,
} from "../controllers/recipe.controller.js";
import { authenticateAccessToken } from "../middleware/authenticateAccessToken.js";

const router = Router();

router.post(
  "/createRecipe",
  upload.single("image"),
  authenticateAccessToken,
  createRecipe
);

router.get("/recipes", authenticateAccessToken, getRecipes);

router.get(
  "/getSelectedRecipe/:recipeId",
  authenticateAccessToken,
  getSelectedRecipe
);

router.delete("/deleteRecipe/:recipeId", authenticateAccessToken, deleteRecipe);

router.patch(
  "/updateRecipe/:recipeId",
  upload.single("image"),
  authenticateAccessToken,
  updateRecipe
);

router.post("/addComment/:recipeId", authenticateAccessToken, addComment);

router.post(
  "/deleteComment/:recipeId/:commentId",
  authenticateAccessToken,
  deleteComment
);

export default router;
