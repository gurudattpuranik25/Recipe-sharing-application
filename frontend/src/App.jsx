import "./App.css";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import Home from "./pages/Home/Home";
import RegisterUser from "./pages/Register/RegisterUser";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes/Recipes";
import Recipe from "./pages/Recipe/Recipe";
import Error from "./pages/Error/Error";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={RegisterUser} />
        <Route path="/login" Component={Login} />
        <Route path="/createRecipe" Component={CreateRecipe} />
        <Route path="/recipes" Component={Recipes} />
        <Route path="/recipes/:recipeName/:recipeId" Component={Recipe} />
        <Route path="*" Component={Error} />
      </Routes>
    </>
  );
}

export default App;
