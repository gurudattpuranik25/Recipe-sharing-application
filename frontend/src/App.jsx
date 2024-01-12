import "./App.css";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import Home from "./pages/Home/Home";
import RegisterUser from "./pages/Register/RegisterUser";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout";
import { Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes/Recipes";
import Recipe from "./pages/Recipe/Recipe";

function App() {
  return (
    <>
      {/* {localStorage.getItem("userInfo") && <Logout />} */}
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={RegisterUser} />
        <Route path="/login" Component={Login} />
        <Route path="/createRecipe" Component={CreateRecipe} />
        <Route path="/recipes" Component={Recipes} />
        <Route path="/recipes/:recipeName/:recipeId" Component={Recipe} />
      </Routes>
    </>
  );
}

export default App;
