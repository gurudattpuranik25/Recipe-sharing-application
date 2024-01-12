import mongoose, { mongo } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Recipe image is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    ingredients: {
      type: String,
      required: [true, "Ingredients are required"],
    },

    stepsToPrepare: {
      type: String,
      required: [true, "Please enter steps to prepare the recipe"],
    },

    cookingTime: {
      type: String,
      required: [true, "Cooking time is required"],
    },
    difficultyLevel: {
      type: String,
      required: [true, "Select the difficulty level"],
      enum: ["Easy", "Medium", "Hard"],
    },
    category: {
      type: String,
      required: [true, "Select the category"],
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Salad",
        "Deserts",
        "Appetizer",
        "Miscellaneous",
      ],
    },
    benifits: {
      type: String,
    },
    storageRecommendations: {
      type: String,
    },
    comments: [commentSchema],
    ratings: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
