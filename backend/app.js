import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import recipeRouter from "./routes/recipe.route.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth/users", userRouter);
app.use("/recipe", recipeRouter);

app.use("*", (req, res) => {
  errorHandler(res, 500, "Please check the endpoint once!");
});

export { app };
