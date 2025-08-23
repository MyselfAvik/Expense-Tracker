import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifySession = async (req, res, next) => {
  const access = req.cookies.accessToken;

  if (!access) {
    return res.status(400).json({
      message: "No One is Logged In || Token Not Found",
    });
  }
  let decodedUser;
  try {
    decodedUser = jwt.verify(access, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Access Token Expired Or Not Correct",
    });
  }

  const user = await User.findById(decodedUser._id);
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  req.user = user;
  next();
};
