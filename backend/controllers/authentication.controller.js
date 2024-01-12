import { User } from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import validator from "validator";
import bcrypt from "bcrypt";
import responseHandler from "../utils/responseHandler.js";
import { uploadProfileImageToCloudinary } from "../utils/cloudinary.js";
import { Session } from "../models/session.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const avatar = req.file?.path;
  if (!(name && email && password && avatar)) {
    return errorHandler(res, 406, "All fields are mandatory!");
  }
  if (!validator.isEmail(email)) {
    return errorHandler(res, 400, "Please enter valid email address!");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return errorHandler(
      res,
      409,
      `User with an email ${email} already exists in the database!`
    );
  }
  try {
    const avatarPath = await uploadProfileImageToCloudinary(avatar);
    if (!avatarPath) {
      return errorHandler(res, 500, "Failed to upload file on cloudinary!");
    }
    await User.create({ name, email, password, avatar: avatarPath }).then(
      () => {
        return responseHandler(res, 200, "User created successfully");
      }
    );
  } catch {
    return errorHandler(
      res,
      400,
      "An error occurred, please try registering again!"
    );
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const isActiveUser = await Session.findOne({ email });
  if (isActiveUser) {
    return errorHandler(
      res,
      400,
      "You're already logged in, kindly continue with the session!"
    );
  }
  if (!(email && password)) {
    return errorHandler(res, 406, "Email & password are mandatory!");
  }
  if (!validator.isEmail(email)) {
    return errorHandler(res, 400, "Please enter valid email address!");
  }
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return errorHandler(res, 400, `User is not registered!`);
  }
  try {
    const validUser = await bcrypt.compare(password, userExists.password);
    if (validUser) {
      jwt.sign(
        { name: userExists.name, email },
        process.env.JWT_SECRETKEY,
        {
          expiresIn: "1d",
        },
        async (err, token) => {
          await Session.create({ email, accessToken: token }).then(() => {
            return res.status(200).json({
              success: true,
              message: "Login successful!",
              accessToken: token,
            });
          });
        }
      );
    } else {
      return errorHandler(res, 404, "Invalid credentials!");
    }
  } catch {
    return errorHandler(
      res,
      400,
      "An error occurred, please try logging again!"
    );
  }
};

const logout = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email ID is mandatory." });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }
  // delete user session
  const loggedInUser = await Session.findOne({ email });
  if (loggedInUser) {
    await Session.deleteOne({ email })
      .then(() => {
        return responseHandler(res, 200, "Logout successful!");
      })
      .catch((err) => {
        return errorHandler(res, 400, err.message);
      });
  } else {
    return errorHandler(res, 401, "User is not logged in!");
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById({ _id: userId });
    return res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    return res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

export { register, login, logout, getUser, getUserByEmail };
