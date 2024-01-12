import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import {
  login,
  logout,
  register,
  getUser,
  getUserByEmail,
} from "../controllers/authentication.controller.js";
import { authenticateAccessToken } from "../middleware/authenticateAccessToken.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUser/:userId", authenticateAccessToken, getUser);
router.get("/fetchUserDetails/:email", authenticateAccessToken, getUserByEmail);

export default router;
