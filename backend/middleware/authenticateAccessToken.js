import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const authenticateAccessToken = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (!token)
    return errorHandler(res, 401, "Unauthorized - Token not provided");

  jwt.verify(token, process.env.JWT_SECRETKEY, (err, data) => {
    if (err) return errorHandler(res, 403, "Unauthorized - Invalid token!");
    req.user = data;
    next();
  });
};

export { authenticateAccessToken };
