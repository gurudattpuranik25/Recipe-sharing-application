import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login.jpg";
import chefLogo from "../assets/chefLogo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Register/register.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/auth/users/login",
        { email: formData.email, password: formData.password }
      );
      const userInfo = {
        email: formData.email,
        accessToken: await response.data.accessToken,
      };
      const stringifiedUserInfo = JSON.stringify(userInfo);
      localStorage.setItem("userInfo", stringifiedUserInfo);
      setMessage(response.data.message);
      setIsLoading(false);
      navigate("/recipes");
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const showMessage = () => {
    toast.error(message, { theme: "light" });
  };

  return (
    <div className="register__page">
      <div className="register">
        <div className="register__form">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="company">
              <img className="logo" src={chefLogo} alt="Logo" />
            </div>
            <h2 id="welcome__title">
              Login to <span id="brand__name">FLAVOR</span>, the world of
              recipes!{" "}
            </h2>
            <label>
              Email <sup>*</sup>{" "}
              <input
                type="email"
                name="email"
                placeholder="david@gmail.com"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </label>
            <label>
              Password <sup>*</sup>{" "}
              <input
                type="password"
                name="password"
                placeholder="********"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </label>

            <button type="submit">Login</button>
            <p>
              New to Flavor?{" "}
              <Link to="/register" className="login__link">
                Sign Up
              </Link>
            </p>
          </form>
          <p id="authentication__error__message">
            {isLoading ? "loading..." : message}
          </p>
        </div>
        <img className="signUp__image" src={loginImage} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
