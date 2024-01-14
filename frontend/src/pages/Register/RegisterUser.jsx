import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import chefLogo from "../assets/chefLogo.jpg";
import registerImage from "../assets/register.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
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

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("avatar", e.target.avatar.files[0]);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/auth/users/register",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setIsLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const showMessage = () => {
    toast(message);
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
              Hey 👋, welcome to <span id="brand__name">FLAVOR</span>{" "}
            </h2>
            <label>
              Name <sup>*</sup>{" "}
              <input
                type="text"
                name="name"
                placeholder="David Beckham"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </label>

            <label>
              Email <sup>*</sup>
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
              Password <sup>*</sup>
              <input
                type="password"
                name="password"
                placeholder="********"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </label>
            <label>
              Avatar <sup>*</sup>
              <input
                type="file"
                name="avatar"
                placeholder="avatar"
                onChange={handleChange}
                value={formData.avatar}
                accept="image/*"
                required
              />
            </label>

            <button type="submit">Sign Up</button>
            <p>
              Already a user?{" "}
              <Link to="/login" className="login__link">
                Login
              </Link>
            </p>
          </form>

          <p id="authentication__error__message">
            {isLoading ? "loading..." : message}
          </p>
        </div>
        <img className="signUp__image" src={registerImage} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterUser;
