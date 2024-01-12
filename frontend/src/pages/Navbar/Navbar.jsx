import React, { useEffect, useState } from "react";
import "./navbar.css";
import brand__logo from "../assets/chefLogo.jpg";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

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
      setUserDetails(response.data.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      return {};
    }
  };

  useEffect(() => {
    fetchUserDetailsByEmail();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/users/logout", {
        email: JSON.parse(localStorage.getItem("userInfo")).email,
      });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav>
      <section className="navbar">
        <section className="nav__links">
          <img id="brand__logo" src={brand__logo} alt="brand logo" />
          <button onClick={() => navigate("/recipes")}>Explore Recipes</button>
          <button onClick={() => navigate("/createRecipe")}>
            Create Recipe
          </button>
        </section>
        {userDetails !== null && (
          <section className="user__links">
            <section onClick={handleClick} className="user__info">
              <p id="username">{userDetails.name}</p>
              <img
                id="avatar"
                src={userDetails.avatar}
                alt="user profile pic"
              />
            </section>
            <Menu
              className="menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <p className="menu__item">
                {userDetails.email}
                <i className="fa-solid fa-envelope"></i>
              </p>
              <hr />
              <p onClick={handleLogout} className="menu__item">
                Logout
                <i className="fa-solid fa-right-from-bracket"></i>
              </p>
            </Menu>
          </section>
        )}
      </section>
    </nav>
  );
}

export default Navbar;
